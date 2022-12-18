import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom";  
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
import { useTextTransform } from './useTextTransform';

 

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
    

    handleClick,
    loud

  } = React.useContext(PageStateContext);

 const {

    setPageError,
    pageResourceState, 
    setPageResourceState,
    getPageResourceState,

    preview,

    pageModalState, 
    setPageModalState,
 
    shout,

    pageRefState, 
    setPageRefState,
 
    setQueryState,
    pageClientState, 
    setPageClientState, 
    // getPageClientState,

    appContext,
    selectedPage,

    Alert,
    queryState,
    Library,
    setApplicationClientState,
    applicationClientState,
    supportedEvents
 } = React.useContext(AppStateContext);

  const { openLink, openPath, createPageParams } = useOpenLink();
  const { getRefByName, execRefByName, getRef } = usePageRef();

  const {
    getApplicationScripts,
    executeScriptByName,
    executeScript
  } = useRunScript();

  const {
    getResourceByName,
    execResourceByName
  } = useDataResource();

  // const applicationScope = !getPageClientState_

  // const getPageClientState = () => applicationScope
  //   ? pageClientState
  //   : applicationClientState

  const { 
    interpolateText,
    getParametersInScope,
    getPropertyScope
    } = useTextTransform();

  const includedEvents = eventTypes.concat(!supportedEvents ? [] : supportedEvents)  
  const routeParams = useParams()
  const navigate = useNavigate();

  const hello = async (json, msg) => {
    if (!shout) return console.log({shoutless: json});
    await shout(json, msg)
  }


  const drillPath = (object, path) => {
    const arr = path.split('.');
    const first = arr.shift(); 
    const node = object[first] 
  
    if (arr.length) {
      return drillPath(node, arr.join('.'))
    }
  
    return node;
  }
  
  const executeComponentRequest = async (connections, querystring, res, delimiter = '?') => {
    const  { events, connectionID, method, path, node, columns, transform } = res;
    const connection = connections.find(f => f.ID === connectionID);
    const url = new URL(path, connection.root);  

    const isGetRequest = method === 'GET';

    const endpoint = isGetRequest ? `${url}${delimiter}${querystring}` : url;

    await hello ({ endpoint, connection, path, querystring })


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



    let requestOptions = null
    const scriptList = getApplicationScripts()

    if (transform && !isGetRequest) {
      const script = scriptList?.find(f => f.ID === transform.ID);
      querystring = await executeScript( script.ID, querystring );

      requestOptions = {
        method,
        body: JSON.stringify(querystring),
        headers: { 'Content-Type': 'application/json' },
      };
    }


    const response = await fetch(endpoint, requestOptions); 
    let json = await response.json();

    
    if (transform && isGetRequest) { 
      const script = scriptList?.find(f => f.ID === transform.ID);
      json = await executeScript( script.ID, json )
    }



    const rows = !node ? json : drillPath(json, node);

    const collated = !isGetRequest ? json : rows.map(row => columns.reduce((items, res) => { 
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

  const handleComponentRequest = (querystring, resource) => {
 
    executeComponentRequest(appContext.connections, querystring, resource)
    .then(records => { 
      setPageResourceState(s => s.filter(e => e.resourceID !== resource.ID)
        .concat({
          resourceID: resource.ID,
          name: resource.name,
          records
        }))
    })
   
  } 
  

  const handleComponentEvent = async (event, eventProps, events) => {
    const { 
      component,
      name , 
      options, 
      sources, 
      connect , 
      stateProps 
    } = eventProps; 
    
  

    if (!(events || component?.events)) return console.log('No events in the component');

    const triggers = (events || component?.events).filter( e => e.event === name);

    setPageError && setPageError(null);
 
    await map(triggers, async (trigger, index) => { 

      // temporary logging
        !!loud &&   trigger.event !== 'onProgress' && 
        console.log ('%s, triggering "%s" script on %s', index, 
            trigger.action.type, 
            trigger.action.target, 
                trigger, {
                  caller: event?.currentTarget,
                  eventProps
                });
 

        const { page: previewPage } = queryState; 
        const targetPage = preview ? previewPage : selectedPage;

        const {  selectedComponent, ...rest} = queryState;
 
        const currentParameters = getParametersInScope()
        const pageParameters = createPageParams(trigger.action.params, options)
 

        if (trigger.event !== 'onProgress') {
          await hello ({ trigger, currentParameters, pageParameters, queryState: rest}, 
                `Trigger ${index}. ${trigger.event}.${trigger.action.type} [${trigger.action.target}]`)
        }
      
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

            const {
              boundTo, 
              stateSetter
            } = getPropertyScope(trigger.action.target);

            stateSetter(state => ({ 
              ...state, 
              [boundTo]: trigger.action.value === 'toggle' 
                ? !state[boundTo]
                : getPropertyValueFromString(state, {...trigger.action, target: boundTo}, 
                      options, pageParameters, hello) }))
            break;
          case "modalOpen":   

              

              const componentList = (targetPage?.components||[]).concat(appContext.components||[])
              const component = componentList?.find(f => f.ID === trigger.action.target);


              if (component) {
                

                setPageModalState(s => ({
                    ...s,
                    [trigger.action.target]:  trigger.action.open === 'toggle' 
                    ? !s[trigger.action.target]
                    : trigger.action.open ,
                    anchorEl: event?.currentTarget,
                    index
                  } ))


                  hello({ trigger }, `${trigger.action.open?'Opened':'Closed'} modal ${component.ComponentName} on ${selectedPage?.PageName}`)

              } else {

                const existing = appContext.pages.reduce((out, pg) => {
                  const modal = pg.components && pg.components.find(f => f.ID === trigger.action.target);
                  if (!modal) return out;
                  return {...modal, page: pg.PageName, selectedPage: selectedPage?.PageName};
                }, false)


                hello({ trigger, existing, preview, previewPage: previewPage?.PageName }, 'Modal does not exist')
                // console.log ( { appContext, trigger } )
                // Alert(<>Could not find modal {trigger.action.target}</>)
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

            const { triggers } = trigger.action;
            
            const resource = resources.find(f => f.ID === trigger.action.target); 

            // set state source to read values from
            const clientState = !pageClientState ? stateProps : pageClientState;  
            
            // set URL delimiter
            const delimiter = resource.format === 'rest' ? '/' : '&'; 

            let querystring;
 
            
            // quick method to get a property value from a term key
            const getProp = value => getPropertyValueFromString(
              clientState,
              {
                ...trigger.action,
                value 
              },
              options,
              currentParameters,
              hello
            )

            // returns a number if value is not isNaN
            const trueProp = val => {
              if (isNaN(val)) return val;
              return parseInt(val)
            }
            
            // validate querystring if there is one
            // TODO: make this its own method
            if (resource.method === 'GET') {
              
              const valid = Object.keys(trigger.action.terms).reduce((ok, term) => {
                const property = getProp(trigger.action.terms[term]) ; 
                const comparison = resource.values?.find(f => f.key === term);
                const type1 = typeof trueProp(comparison?.value);
                const type2 = typeof trueProp(property);
                
                const mismatch = !!comparison && typeof trueProp(comparison.value) !== typeof trueProp(property);
                console.log ('validating %s:  %s', term, property)
                hello ({ term, property }, 'Validating fields')
                if (!property) ok.push(`${term} is missing`)
                if (mismatch) ok.push(`${term} (${JSON.stringify(trueProp(property))}) is ${type2} when type ${type1} was expected.`)
                return ok
              }, [])

              // build query string from trigger params
               querystring = Object.keys(trigger.action.terms).map(term => { 
                const property = getProp(trigger.action.terms[term]) ; 
                return resource.format === 'rest' ? property : `${term}=${property}`
              }).join(delimiter);

              if (valid.length) {
                const plural = valid.length !== 1 ? 's are' : ' is'
                const msg = <div>
                  Could not complete "{resource.name}" request because {valid.length} 
                  {" "}field{plural}{" "}has problems: {valid.map(f => <b>{f}</b>)}
                
                </div>
                return setPageError && setPageError(msg);
                // return await Alert(msg, 'Request cancelled'); 
              }
  
            } else {
              querystring = options; 
            }
             


            const records = await executeComponentRequest(connect || appContext.connections, 
              querystring, resource, resource.format === 'rest' 
              ? '/'
              : '?')
           
            const datum = {
              resourceID: resource.ID,
              name: resource.name,
              records
            }
          
            await hello (resource, 'data received')
            if (!pageResourceState) { 
               setPageResourceState([datum])
            } else {
              setPageResourceState(s => (s||[]).filter(e => e.resourceID !== trigger.action.target)
                .concat(datum)) 
            }

            // const eventsOnPage = targetPage.components?.reduce((out, part) => {
            //   const items = part.items?.filter(f => f.action.type === 'dataExec')
            //   return out.concat(items);
            // }, []);

            // const triggered = eventsOnPage?.find(f => !!f && f.action.triggers === resource.ID)

            // console.log ({ eventsOnPage,
            //     id: resource.ID,
            //     triggered })

            // if (triggered) {
            //   Alert (<pre>{JSON.stringify(triggered, 0, 2)}</pre>)
            //   console.log ('%ctriggered %o', 'color:lime', { triggered })
            //   handleComponentEvent({}, {options: triggered, magically: 1}, eventsOnPage)
            // }
              
            break;
          case "scriptRun":  
            executeScript(trigger.action.target, options, trigger );  
            break;
          default:
            // do nothing
        } 
  
    });


  } 
 
  const attachEventHandlers = React.useCallback ( component => {
    const { settings, events, boundProps } = component;
    const { Methods } = Library[component.ComponentType] ?? {}; 


    const { page: previewPage } = queryState; 
    const targetPage = preview ? previewPage : selectedPage;
 

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
          state: pageClientState,
          options,
          api: { getRef, getRefByName, openLink, openPath }
        });  
      }})(pageClientState)
      return handlers;
    }, {});

   

    // Object.assign(eventHandlers, { boundProps });
   
    if (boundProps) {

      // get current state at the time the component renders
      boundProps.map(boundProp => {
        const { attribute, boundTo: boundKey } = boundProp;    
        const {
          boundTo,
          clientState,
          stateSetter
        } = getPropertyScope(boundKey);

    

  
        if (attribute && clientState ) { 

          const currentParameters = getParametersInScope()

          //  console.log ({ currentParameters })

          const attributeProp = interpolateText(clientState[boundTo])
          
          // console.log ( { attributeProp, boundTo })
        
          Object.assign(eventHandlers, {
            // set current component value to client state
            [attribute]: attributeProp,
          });


          if (attributeProp?.indexOf && attributeProp?.split && attributeProp.indexOf('.') > 0) {
            const [type, val] = attributeProp.split('.');
            if (type === 'parameters') {

              Object.assign(eventHandlers, {
                // set current component value to client state
                [attribute]: currentParameters[val],
              });
    
            }
          }
          

 
          if (attribute === 'value') {
            // console.log ('assigning %s.%s', component.ComponentName, attribute)
            Object.assign(eventHandlers, {

              // add onChange event to update client state
              onChange: e => {
            
                stateSetter(s => ({...s, [boundTo]: !e.target ? e : e.target.value}))
              }

            })
          }
        } 
      }); 
        
    }
    return eventHandlers;

  }, [
    pageClientState, 
    // getPageClientState, 
    getRef, 
    getRefByName, 
    handleComponentEvent, 
    openLink, 
    openPath, 
    selectedPage,
    queryState,
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