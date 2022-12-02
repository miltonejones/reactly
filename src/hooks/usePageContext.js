import * as React from 'react';
import { useNavigate } from "react-router-dom"; 
import { AppStateContext } from './AppStateContext';


export const PageStateContext = React.createContext({});


export const eventTypes =  [
  {
    name: 'onClick',
    description: 'When component is clicked'
  },
  {
    name: 'onProgress', 
    description: 'Audio player track position changes.'
  }, 
  {
    name: 'onKeyup',
    description: 'When user releases a key on the keyboard'
  },
  {
    name: 'onPlayerPaused', 
    description: 'Audio player track is paused.'
  }, 
  {
    name: 'onKeyDown',
    description: 'When user presses a key on the keyboard'
  },
  {
    name: 'onBlur',
    description: 'When component loses focus'
  },
  {
    name: 'onChange',
    description: 'When component value changes'
  },
  {
    name: 'onFocus',
    description: 'When component obtains focus'
  },
  {
    name: 'onDelete',
    description: 'When component delete icon is clicked'
  },
  {
    name: 'onCardClick', 
    description: 'User clicks on the card.'
  }, 
  {
    name: 'onMenuClick', 
    description: 'User clicks on the menu icon at the right of a card.'
  }, 
  {
    name: 'onPageChange', 
    description: 'Page value changes'
  },
  {
    name: 'onItemClick',
    description: 'WHen user clicks a list item'
  },
 {
    name: 'onSecondaryClick', 
    description: 'User clicks on the icon at the right of a list item.'
 },

 {
  name: 'onImageLoad', 
  description: 'Image, when present finishes loading.'
},  
 {
  name: 'onPlayerStart', 
  description: 'Audio player playing event fires.'
}, 
{
  name: 'onPlayerStop', 
  description: 'Audio stop playing event fires.'
}, 
{
  name: 'onPlayerEnded', 
  description: 'Audio player track reaches its end.'
}, 
 {
  name: 'onRowClick', 
  description: 'User clicks on a row in the list.'
}, 
{
  name: 'onMenuClick', 
  description: 'User clicks on a item in the menu.'
},  
{
  name: 'onPageLoad', 
  description: 'Page  finishes loading.'
},
{
  name: 'onCellClick', 
  description: 'User clicks on a cell in a row.'
}, 
{
  name: 'dataLoaded', 
  description: 'User clicks on a cell in a row.'
}, 
];
 
/**
 * 
 * 

 */


export const usePageContext = () => { 
  const { pageClientState, 
          setPageClientState,
          // pageResourceState, 
          // setPageResourceState,
          // getPageResourceState,
          pageRefState, 
          setPageRefState,
          pageModalState, 
          setPageModalState,
          selectedPage, 
          appContext, 
          setQueryState,
          getPageClientState,
          preview
        } = React.useContext(PageStateContext);
 const {
    pageResourceState, 
    setPageResourceState,
    getPageResourceState,
 }  = React.useContext(AppStateContext);

        const navigate = useNavigate();

  const executeComponentRequest = async (connections,  qs,  { events, connectionID, path, node, columns }, slash = '?') => {
    const connection = connections.find(f => f.ID === connectionID);
    const url = new URL(path, connection.root); 
    const endpoint = `${url}${slash}${qs}`;
    
    const response = await fetch(endpoint); 
    const json = await response.json();

    const rows = !node ? json : json[node];

    const collated = rows.map(row => columns.reduce((items, res) => { 
      items[res] = row[res]
      return items
    }, {})); 

    if (events) {
      events.map(e => { 
        handleComponentEvent({}, {
          name: e.event,
          options: json,
          label: 'hello??'
        }, events)
      }) 
    }

    return collated ;
  }

  const handleScriptRequest = async (block, opts) => {

    try {

      // call that function to get the client function
      const action = eval(`(${block})()`); 
      if (block.indexOf('async') > -1) { 
        await action(selectedPage, opts) ;
      }
      // call the client function
      action(selectedPage, opts)
    } catch (ex) {
      alert (ex.message);
    }
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

  const openLink = React.useCallback((ID) => {
    const targetPage = appContext.pages.find((f) => f.ID === ID); 
    if (!preview) {
      return navigate(`/apps/${appContext.path}/` + targetPage.PagePath)
    }
    
    setQueryState((s) => ({
      ...s,
      page: targetPage,
    }))
  }, [appContext, navigate, preview, setQueryState])

  const openPath = React.useCallback((path) => {
    const targetPage = appContext.pages.find((f) => f.PagePath === path); 
    if (targetPage) {
      return openLink(targetPage.ID);
    }
    alert (`Invalid path ${path}`)
  }, [appContext, openLink])

  const stringToggle = (state, { target, value }, options) => {
    if (value?.indexOf('.') > 0) {
      const [key, prop] = value.split('.'); 
      return options[prop]
    }
    if (value?.indexOf('|') < 0) {
      return value;
    }
    const [trueProp, falseProp] = value.split('|');
    return state[target] === trueProp ? falseProp : trueProp;
  }


  const getResourceByName =  (name) => {
    const state = getPageResourceState()
    console.log ({
      pageResourceState,
      state,
      name
    })
    return state?.find(e => e.name === name);
  } 

  // const getResource =  (resources) => (ID) => {
  //   return resources.find(e => e.resourceID === ID);
  // }


  const getRef = React.useCallback((ID) => {
    return pageRefState[ID]
 }, [pageRefState])

  const getRefByName = React.useCallback((name) => {
    const component = selectedPage.components.find(f => f.ComponentName === name);
    if (component) {
      return getRef(component.ID)
    }
    alert ('Could not find component ' + name)
  }, [selectedPage, getRef])

  const handleComponentEvent = (event, eventProps, events) => {
    const { component, name , label, options, sources, connect , stateProps } = eventProps;
    
    // alert((!(events || component?.events)).toString())
    if (!(events || component?.events)) return;

    const triggers = (events || component?.events).filter( e => e.event === name);
 
    triggers.map((trigger, index) => { 
      switch(trigger.action.type) {
        case "setState":  
          setPageClientState(s => ({...s, 
            [trigger.action.target]: trigger.action.value === 'toggle' 
              ? !s[trigger.action.target]
              : stringToggle(s, trigger.action, options) }))
          break;
        case "modalOpen":  
             
            setPageModalState(s => ({
              ...s,
              [trigger.action.target]:  trigger.action.open === 'toggle' 
              ? !s[trigger.action.target]
              : trigger.action.open ,
              anchorEl: event.currentTarget
            } ))
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
          const targetPage = appContext.pages.find((f) => f.ID === trigger.action.target); 
          if (!preview) {
            return navigate(`/apps/${appContext.path}/` + targetPage.PagePath)
          }
          
          setQueryState((s) => ({
            ...s,
            page: targetPage,
          }))

          break;
        case 'dataExec':
          const resources = appContext?.resources || sources;
          if (!resources) {
            alert (JSON.stringify(sources))
            return alert ('no resources were found to  meet this request.')
          }
          const resource = resources.find(f => f.ID === trigger.action.target);
          const { target, action } = trigger.action; 
 
          const stater = !pageClientState ? stateProps : pageClientState; 
          
          const slash = resource.format === 'rest' ? '/' : '&';
          const qs = Object.keys(trigger.action.terms).map(term => {

            let prop = stater[trigger.action.terms[term]];
            if (trigger.action.terms[term].indexOf('.') > 0) {
              const [p, datum] = trigger.action.terms[term].split('.');
              prop = options[datum];
            }
            return resource.format === 'rest' ? prop : `${term}=${prop}`
          }).join(slash);

 
 

          executeComponentRequest(connect || appContext.connections, qs, resource, resource.format === 'rest' 
            ? '/'
            : '?')
            .then(records => {  
              const datum = {
                resourceID: resource.ID,
                name: resource.name,
                records
              }

              if (!pageResourceState) { 
                return setPageResourceState([datum])
              }
              setPageResourceState(s => (s||[]).filter(e => e.resourceID !== trigger.action.target)
                .concat(datum)) 
            })
           
          break;
        case "scriptRun":  
      
          const scr = selectedPage.scripts
            .find(f => f.ID === trigger.action.target);

          const opts = {
            state: getPageClientState(), 
            setState: setPageClientState,
            data: options,
            api: { getRef, getRefByName, openLink, openPath,
              getResourceByName 
            }
          }
          // console.log ({opts, index})
          if (scr) {  
            return handleScriptRequest(`function runscript() {
              return  ${scr.code}
            }`, opts)
          } 
          alert ('Could not find script') 
          break;
        default:
          // do nothing
      } 
  
    })
  } 

// 
  const attachEventHandlers = React.useCallback ( component => {
    const { settings, events, boundProps } = component;
    const eventHandlers = eventTypes.map(e => e.name).reduce((handlers, eventName) => {
      
      const supported = events?.find( f => f.event === eventName);
      if (!supported) return handlers;
 
      handlers[eventName] = (function(state){ return (e, options) => { 
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
  
    if (boundProps) {

      // get current state at the time the component renders
      const clientState = getPageClientState();
      boundProps.map(boundProp => {
        const { attribute, boundTo } = boundProp;    
  
    
        if (attribute && clientState ) { 


        //  ['label','value'].some(f => attribute === f) && console.log ('%s.%s', component.ComponentName, attribute)

          Object.assign(eventHandlers, {
            // set current component value to client state
            [attribute]: pageClientState[boundTo],
          });

          if (attribute === 'value') {
            // console.log ('assigning %s.%s', component.ComponentName, attribute)
            Object.assign(eventHandlers, {

              // add onChange event to update client state
              onChange: e => {
                // console.log ('%s: setting boundTo: %s, attribute: %s to %s', 
                // component.ComponentName,
                //   boundTo, attribute, !e.target ? e : e.target.value)
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

