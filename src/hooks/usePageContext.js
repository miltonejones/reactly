import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom"; 
import { fixText, getParams } from '../components/library/util';
import { AppStateContext } from './AppStateContext';
import moment from 'moment';


export const PageStateContext = React.createContext({});


export const eventTypes =  [
  {
    name: 'onSliderChange', 
    description: 'User clicks the slider.'
  },
  {
    name: 'onCarouselClick', 
    description: 'User clicks on component or focuses and presses SPACE.', 
  }, 
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
    name: 'onEnterPress', 
    description: 'User presses the enter key.'
  },
  {
    name: 'onMenuClick', 
    description: 'User clicks on the menu icon at the right of a card.'
  }, 
  {
    name: 'onButtonClick', 
    description:  'User clicks on a button in the group.'
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
    handleClick
  } = React.useContext(PageStateContext);

 const {
    Alert,
    queryState
 } = React.useContext(AppStateContext);


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
      Alert (ex.message);
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

  const openLink = React.useCallback((ID, parameters, options) => {
    const targetPage = appContext.pages.find((f) => f.ID === ID); 


    const params = {}
    !!parameters && Object.keys(parameters).map(key => {
      const triggerKey = parameters[key];
      let triggerProp = pageClientState[ triggerKey ];
      if (triggerKey.indexOf('.') > 0) {
        const [t, optionKey] = triggerKey.split('.') ;
        triggerProp = options[optionKey];
      }
      Object.assign(params, {[key]: triggerProp })
    })


    if (!preview) {
      const value = `/apps/${appContext.path}/${targetPage.PagePath}`;
      const path = [value, Object.values(params).join('/')].join('/'); 
      return window.location.replace(path)
    }
    
    setQueryState((s) => ({
      ...s,
      page: targetPage,
      params ,
    }))
  }, [appContext, navigate, preview, setQueryState])

  const openPath = React.useCallback((path, parameters, options) => {
    const targetPage = appContext.pages.find((f) => f.PagePath === path); 
    if (targetPage) {
      return openLink(targetPage.ID, parameters, options);
    }
    Alert (`Invalid path ${path}`)
  }, [appContext, openLink])

  const stringToggle = (state, { target, value }, options) => {
    const regex = /\{([^}]+)\}/g;
    const literal = regex.exec(value);
    if (literal) {
      alert (JSON.stringify(literal))
      return literal[1];
    }
    if (!value) {
      return ''
    }
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

  const getRef = React.useCallback((ID) => {
    return pageRefState[ID]
  }, [pageRefState])


  const execRefByName = React.useCallback((name, fn) => {
    setPageRefState(refState => {
      const component = selectedPage.components.find(f => f.ComponentName === name);
      if (component) {
        const ref = refState[component.ID]
        fn(ref);
      } else {
        Alert ('Could not find component ' + name);
        console.log ({ refState })
      }
      return refState;
    });
    
  }, [selectedPage])


  const getRefByName = React.useCallback((name) => {
    const component = selectedPage.components.find(f => f.ComponentName === name);
    if (component) {
      return getRef(component.ID)
    }
    Alert ('Could not find component ' + name)
  }, [selectedPage, getRef])

  const execResourceByName =  (name, fn) => { 
    setPageResourceState(resourceState => { 
      const state = resourceState.find(e => e.name === name); 
      fn(state);
      return resourceState;
    }) 
  } 

  const executeScriptByName = (scriptName, options) => {
    const scr = selectedPage.scripts?.find(f => f.name === scriptName);
    return executeScript(scr.ID, options)
  }

  const executeScript = (scriptID, options) => {

    const scr = selectedPage.scripts?.find(f => f.ID === scriptID);

    const opts = {
      state: {} ,
      setState: setPageClientState, 
      data: options,
      api: { 
        getRef, 
        getRefByName, 
        openLink, 
        openPath,
        getPageResourceState,
        pageResourceState,
        Alert,
        getResourceByName ,
        execResourceByName,
        executeScriptByName,
        execRefByName,
        moment
      }
    }
    // console.log ({opts, index})
    if (scr) {  
      return handleScriptRequest(`function runscript() {
        return  ${scr.code}
      }`, opts)
    } 
    console.log ('Could not find script') 
  }

  const getResourceByName =  (name) => {
    const state = getPageResourceState()
    // console.log ({
    //   pageResourceState,
    //   state,
    //   name
    // })
    return state?.find(e => e.name === name);
  } 

  // const getResource =  (resources) => (ID) => {
  //   return resources.find(e => e.resourceID === ID);
  // }


  const handleComponentEvent = (event, eventProps, events, over) => {
    const { component, name , label, options, sources, connect , stateProps } = eventProps;
     
    if (!(events || component?.events)) return;

    const triggers = (events || component?.events).filter( e => e.event === name);

    triggers.map((trigger, index) => { 
      trigger.event !== 'onProgress' && console.log ('%s, triggering "%s" script', index, trigger.action.type, trigger);

 
      // if (event.currentTarget && !over) {
      //   return handleClick (event, {
      //     label: `Execute ${trigger.action.type} event`,
      //     action: () => handleComponentEvent(event, eventProps, events, !0)
      //   });
      // } 

      // console.log ({ event })
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
              anchorEl: event?.currentTarget
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

          const params = {}
          !!trigger.action.params && Object.keys(trigger.action.params).map(key => {
            const triggerKey = trigger.action.params[key];
            let triggerProp = pageClientState[ triggerKey ];
            if (triggerKey.indexOf('.') > 0) {
              const [t, optionKey] = triggerKey.split('.') ;
              triggerProp = options[optionKey];
            }
            Object.assign(params, {[key]: triggerProp })
          })

          if (!preview) {
            const value = `/apps/${appContext.path}/${targetPage.PagePath}`;
            const path = [value, Object.values(params).join('/')].join('/'); 
            return window.location.replace(path)
            return navigate(path)
          }

          

          
          setQueryState((s) => ({
            ...s,
            page: targetPage,
            params ,
            pageLoaded: false
          }))

          break;
        case 'dataExec':
          const resources = appContext?.resources || sources;
          if (!resources) {
            Alert (JSON.stringify(sources))
            return Alert ('no resources were found to  meet this request.')
          }
          const resource = resources.find(f => f.ID === trigger.action.target);
          const { target, action } = trigger.action; 
 
          const stater = !pageClientState ? stateProps : pageClientState; 
          
          const slash = resource.format === 'rest' ? '/' : '&';

          const validate = Object.keys(trigger.action.terms).filter(term => {
            return !stater[trigger.action.terms[term]];
          });

          if (validate.length) {
            console.log ({ stater, validate })
            // return Alert (`Could not complete request because 
            // the fields ${validate.join(' and ')} is/are missing`)
          }
          

          const routes = getParams(queryState, selectedPage, routeParams)
          // console.log ({ queryState, selectedPage, routes })

          const qs = Object.keys(trigger.action.terms).map(term => {
            const propKey = trigger.action.terms[term];

            const regex = /\{([^}]+)\}/g;
            const literal = regex.exec(propKey);

            let prop = stater[propKey]; 
            if (literal) {
              prop = literal[1]
            } else if (propKey.indexOf('parameters.') === 0) {
              const [name, key] = propKey.split('.');
              prop = routes[key]
              // prop = !queryState.params 
              //   ? selectedPage.parameters[key]
              //   : queryState.params[key];
            }  else if (propKey.indexOf('.') > 0) {
              const [p, datum] = propKey.split('.');
              prop = options[datum];
            }
            
            return resource.format === 'rest' ? prop : `${term}=${prop}`
          }).join(slash);

 

          executeComponentRequest(connect || appContext.connections, 
            qs, resource, resource.format === 'rest' 
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
          executeScript(trigger.action.target, options);  
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
   
    if (boundProps) {

      // get current state at the time the component renders
      const clientState = getPageClientState();
      boundProps.map(boundProp => {
        const { attribute, boundTo } = boundProp;    
  
        if (attribute && clientState ) { 

          const routes = getParams(queryState, selectedPage, routeParams)

          // console.log ({ routes })

          const attributeProp = fixText(pageClientState[boundTo], clientState, routes)
          Object.assign(eventHandlers, {
            // set current component value to client state
            [attribute]: attributeProp,
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

