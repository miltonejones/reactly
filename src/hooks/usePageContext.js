import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom"; 
import { fixText, getParams } from '../components/library/util';
import { AppStateContext } from './AppStateContext';
import moment from 'moment';
import Observer from '../util/Observer';
import { PageStateContext } from './PageStateContext';
import { useOpenLink } from './subhook';
import { usePageRef } from './subhook';
import { useDataResource } from './subhook';
import { useRunScript } from './subhook';
import { getPropertyValueFromString } from '../components/library/util';
import { map } from '../components/library/util';

 

export const eventTypes =  [ 
  {
    name: 'onPageLoad', 
    description: 'Page  finishes loading.'
  },
  {
    name: 'dataLoaded', 
    description: 'Data finishes loading.'
  }, 
  {
    name: 'loadStarted', 
    description: 'Data starts loading.'
  }, 
];
  

export const usePageContext = () => { 
  const { 
    pageClientState, 
    setPageClientState, 
    pageRefState, 
    setPageRefState,
    pageModalState, 
    setPageModalState,
    selectedPage, 
    appContext, 
    setQueryState,
    getPageClientState,
    preview,
    pageResourceState, 
    setPageResourceState,
    getPageResourceState,
    handleClick,
    setPageError,
    shout,
    loud
  } = React.useContext(PageStateContext);

 const {
    Alert,
    queryState,
    Library,
    supportedEvents
 } = React.useContext(AppStateContext);

  const { openLink, openPath, createPageParams } = useOpenLink();
  const { getRefByName, execRefByName, getRef } = usePageRef();
  const {
    executeScriptByName,
    executeScript
  } = useRunScript();
  const {
    getResourceByName,
    execResourceByName
  } = useDataResource();


  const includedEvents = eventTypes.concat(!supportedEvents ? [] : supportedEvents)  
  const routeParams = useParams()
  const navigate = useNavigate();

  const drillPath = (object, path) => {
    const arr = path.split('.');
    const first = arr.shift(); 
    const node = object[first] 
  
    if (arr.length) {
      return drillPath(node, arr.join('.'))
    }
  
    return node;
  }
  
  const executeComponentRequest = async (connections,  qs, res, slash = '?') => {
    const  { events, connectionID, path, node, columns } = res;
    const connection = connections.find(f => f.ID === connectionID);
    const url = new URL(path, connection.root); 
    const endpoint = `${url}${slash}${qs}`; 

    await shout ({ endpoint, connection, path, qs })

    if (events) {
      events.filter(e => e.event === 'loadStarted').map(e => { 
        handleComponentEvent({}, {
          name: e.event,
          options: {
            url,
            endpoint
          }, 
        }, events)
      }) 
    }



    const response = await fetch(endpoint); 
    const json = await response.json();

    const rows = !node ? json : drillPath(json, node);

    const collated = rows.map(row => columns.reduce((items, res) => { 
      items[res] = row[res]
      return items
    }, {})); 


    if (events) {
      events.filter(e => e.event === 'dataLoaded').map(e => { 
        handleComponentEvent({}, {
          name: e.event,
          options: json, 
        }, events)
      }) 
    }

    
    return collated ;
  } 

  const handleComponentRequest = (qs, resource) => {

    executeComponentRequest(appContext.connections, qs, resource)
    .then(records => { 
      setPageResourceState(s => s.filter(e => e.resourceID !== resource.ID)
        .concat({
          resourceID: resource.ID,
          name: resource.name,
          records
        }))
    })
   
  } 
 
  const getApplicationScripts = () => {
    return appContext.pages.reduce((out, page) => {
      out = out.concat(page.scripts || []);
      return out;
    }, [])
  } 

  const handleComponentEvent = async (event, eventProps, events, over) => {
    const { 
      component,
      name , 
      options, 
      sources, 
      connect , 
      stateProps 
    } = eventProps;
     
    if (!(events || component?.events)) return;

    const triggers = (events || component?.events).filter( e => e.event === name);

    setPageError(null);

    await map(triggers, async (trigger, index) => { 

      // temporary logging
      !!loud && trigger.event !== 'onProgress' && 
        console.log ('%s, triggering "%s" script on %s', index, 
            trigger.action.type, 
            trigger.action.target, 
                trigger, {
                  caller: event?.currentTarget
                });

 
        const routes = getParams(queryState, selectedPage, routeParams)
        const pageParameters = createPageParams(trigger.action.params, options)
 
        const {page, selectedComponent, ...rest} = queryState;

        await shout ({ routes, pageParameters, queryState: rest}, 
              `Trigger ${index}. ${trigger.event}.${trigger.action.type} [${trigger.action.target}]`)
      
        switch(trigger.action.type) {
          case "methodCall": 
            setTimeout(() => {

              // TODO: add support for arguments
              execRefByName(trigger.action.componentName, callee => {
                // call a method on a component that has them
                callee[trigger.action.methodName].call (callee)
              }) 

            }, trigger.action.delay || 2)
            break;
          case "setState":   
            setPageClientState(state => ({ 
              ...state, 
              [trigger.action.target]: trigger.action.value === 'toggle' 
                ? !state[trigger.action.target]
                : getPropertyValueFromString(state, trigger.action, 
                      options, pageParameters, shout) }))
            break;
          case "modalOpen":   

  
              const component = selectedPage?.components?.find(f => f.ID === trigger.action.target);
              if (component) {
                

                setPageModalState(s => ({
                    ...s,
                    [trigger.action.target]:  trigger.action.open === 'toggle' 
                    ? !s[trigger.action.target]
                    : trigger.action.open ,
                    anchorEl: event?.currentTarget,
                    index
                  } ))


              } else {
                console.log ( { skipping: {...trigger.action} } )
              }
              

            break;
          case 'dataReset':
            
            setPageResourceState(s => s.map(state => state.resourceID === trigger.action.target 
                  ? {
                    resourceID: state.resourceID,
                    name: state.name,
                    records: []
                  } : state));

            break;
          case 'openLink':  
            
            return openLink(
              // ID of the target link
              trigger.action.target,

              // parameters included in the event
              trigger.action.params,

              // options passed from the event
              options, 
                );

            break;
          case 'dataExec':
            const resources = appContext?.resources || sources;
            if (!resources) {
              Alert (JSON.stringify(sources))
              return Alert ('no resources were found to  meet this request.')
            }
            
            const resource = resources.find(f => f.ID === trigger.action.target); 
            const clientState = !pageClientState ? stateProps : pageClientState;  
            const slash = resource.format === 'rest' ? '/' : '&'; 

            // TODO: fix validation method
            const validate = Object.keys(trigger.action.terms).filter(term => {
              return !clientState[trigger.action.terms[term]];
            });

            if (validate.length) {
              console.log ({ clientState, validate })
              // return Alert (`Could not complete request because 
              // the fields ${validate.join(' and ')} is/are missing`)
            } 

            const getProp = value => getPropertyValueFromString(
              clientState,
              {
                ...trigger.action,
                value 
              },
              options,
              routes,
              shout
            )

            const valid = Object.keys(trigger.action.terms).reduce((ok, term) => {
              const property = getProp(trigger.action.terms[term]) ; 
              console.log ('validating %s:  %s', term, property)
              shout ({ term, property}, 'Validating fields')
              if (!property) ok.push(term)
              return ok
            }, [])

            // build query string from trigger params
            const qs = Object.keys(trigger.action.terms).map(term => { 
              const property = getProp(trigger.action.terms[term]) ; 
              return resource.format === 'rest' ? property : `${term}=${property}`
            }).join(slash);

            if (valid.length) {
              const plural = valid.length !== 1 ? 's are' : ' is'
              const msg = <div>
                Could not complete "{resource.name}" request because {valid.length} 
                {" "}field{plural}{" "}missing: {valid.map(f => <b>{f}</b>)}
              
              </div>
              setPageError(msg);
              return await Alert(msg, 'Request cancelled');//shout({ qs, valid }, 'API path')
            }


            executeComponentRequest(connect || appContext.connections, 
              qs, resource, resource.format === 'rest' 
              ? '/'
              : '?')
              .then(async (records) => {  
                const datum = {
                  resourceID: resource.ID,
                  name: resource.name,
                  records
                }
                await shout (resource, 'data received')
                if (!pageResourceState) { 
                  return setPageResourceState([datum])
                }
                setPageResourceState(s => (s||[]).filter(e => e.resourceID !== trigger.action.target)
                  .concat(datum)) 
              })
            
            break;
          case "scriptRun":  
            executeScript(trigger.action.target, options);  
            break;
          default:
            // do nothing
        } 
  
    });


  } 
 
  const attachEventHandlers = React.useCallback ( component => {
    const { settings, events, boundProps } = component;
    const { Methods } = Library[component.ComponentType] ?? {};

    // const calls = []
    // Methods?.map(method => {
    //   const observer = new Observer(method.name)
    //   calls.push({
    //     observer,
    //     action_title: method.name,
    //     callee: component.ID,
    //     ...method
    //   })
    // })


    // !!Methods && setPageRefState(refState => { 
    //   return {
    //     ...refState,
    //     calls
    //   };
    // });


    const eventHandlers = includedEvents.map(e => e.name).reduce((handlers, eventName) => {
      
      const supported = events?.find( f => f.event === eventName);
      if (!supported) return handlers;
 
      handlers[eventName] = (function(state){ return (e, options) => { 
        // console.log ('%s calling %s', component.ComponentName || component.name, eventName);
        return handleComponentEvent(e, {
          name: eventName ,
          component,
          pageClientState,
          
          // get current state at the time the event fires
          state: getPageClientState(),
          options,
          api: { getRef, getRefByName, openLink, openPath }
        });  
      }})(pageClientState)
      return handlers;
    }, {});

   

    // Object.assign(eventHandlers, { calls });
   
    if (boundProps) {

      // get current state at the time the component renders
      const clientState = getPageClientState();
      boundProps.map(boundProp => {
        const { attribute, boundTo } = boundProp;    
  
        if (attribute && clientState ) { 

          const routes = getParams(queryState, selectedPage, routeParams)

          //  console.log ({ routes })

          const attributeProp = fixText(pageClientState[boundTo], clientState, routes)
          
          Object.assign(eventHandlers, {
            // set current component value to client state
            [attribute]: attributeProp,
          });

          if (attributeProp?.indexOf && attributeProp.indexOf('.') > 0) {
            const [type, val] = attributeProp.split('.');
            if (type === 'parameters') {

              Object.assign(eventHandlers, {
                // set current component value to client state
                [attribute]: routes[val],
              });
    
            }
          }
          

 
          if (attribute === 'value') {
            // console.log ('assigning %s.%s', component.ComponentName, attribute)
            Object.assign(eventHandlers, {

              // add onChange event to update client state
              onChange: e => {
            
                setPageClientState(s => ({...s, [boundTo]: !e.target ? e : e.target.value}))
              }

            })
          }
        } 
      }); 
        
    }
    return eventHandlers;

  }, [
    pageClientState, 
    getPageClientState, 
    getRef, 
    getRefByName, 
    handleComponentEvent, 
    openLink, 
    openPath, 
    setPageClientState
  ])


  return {
    handleComponentEvent ,
    pageClientState,
    setPageClientState,
    attachEventHandlers,
    executeComponentRequest,
    handleComponentRequest
  }

}

export {
  PageStateContext
}