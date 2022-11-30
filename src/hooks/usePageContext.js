import * as React from 'react';
import { useNavigate } from "react-router-dom"; 


export const PageStateContext = React.createContext({});


export const eventTypes =  [
  {
    name: 'onClick',
    description: 'When component is clicked'
  },
  {
    name: 'onKeyup',
    description: 'When user releases a key on the keyboard'
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
];
 
/**
 * 
 * 

 */


export const usePageContext = () => { 
  const { pageClientState, 
          setPageClientState,
          pageResourceState, 
          setPageResourceState,
          pageRefState, 
          setPageRefState,
          pageModalState, 
          setPageModalState,
          selectedPage, 
          appContext, 
          setQueryState,
          preview
        } = React.useContext(PageStateContext);


        const navigate = useNavigate();

  const executeComponentRequest = async (connections,  qs,  { connectionID, path, node, columns }) => {
    const connection = connections.find(f => f.ID === connectionID);
    const url = new URL(path, connection.root); 
    const endpoint = `${url}?${qs}`;
 
    const response = await fetch(endpoint); 
    const json = await response.json();

    const rows = !node ? json : json[node];

    const collated = rows.map(row => columns.reduce((items, res) => { 
      items[res] = row[res]
      return items
    }, {})); 

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

  const openPath = (path) => {
    const targetPage = appContext.pages.find((f) => f.PagePath === path); 
    if (targetPage) {
      return openLink(targetPage.ID);
    }
    alert (`Invalid path ${path}`)
  }

  const openLink = (ID) => {
    const targetPage = appContext.pages.find((f) => f.ID === ID); 
    if (!preview) {
      return navigate(`/apps/${appContext.path}/` + targetPage.PagePath)
    }
    
    setQueryState((s) => ({
      ...s,
      page: targetPage,
    }))
  }

  const stringToggle = (state, { target, value }) => {
    if (value?.indexOf('|') < 0) {
      return value;
    }
    const [trueProp, falseProp] = value.split('|');
    return state[target] === trueProp ? falseProp : trueProp;
  }


  const handleComponentEvent = (event, eventProps, events) => {
    // alert (JSON.stringify(eventProps))
    const { component, name , options, sources, connect , stateProps} = eventProps;
    if (!(events || component?.events)) return;

    const triggers = (events || component?.events).filter( e => e.event === name);
 
    triggers.map(trigger => { 
      switch(trigger.action.type) {
        case "setState":  
          setPageClientState(s => ({...s, 
            [trigger.action.target]: trigger.action.value === 'toggle' 
              ? !s[trigger.action.target]
              : stringToggle(s, trigger.action) }))
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
          const qs = Object.keys(trigger.action.terms).map(term => {
            const prop = stater[trigger.action.terms[term]];
            return `${term}=${prop}`
          }).join('&');

          executeComponentRequest(connect || appContext.connections, qs, resource)
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
          const scr = selectedPage.scripts.find(f => f.ID === trigger.action.target);
          if (scr) { 
            // create a function that returns the client script
            const block = `function runscript() {
              return  ${scr.code}
            }`;

            try {

              // call that function to get the client function
              const action = eval(`(${block})()`); 

              // call the client function
              action(selectedPage, {
                state: pageClientState, 
                setState: setPageClientState,
                data: options,
                api: { getRef, getRefByName, openLink, openPath }
              })
            } catch (ex) {
              alert (ex.message);
            }
          }  
          break;
        default:
          // do nothing
      } 
  
    })
  } 

  const getRefByName = (name) => {
    const component = selectedPage.components.find(f => f.ComponentName === name);
    if (component) {
      return getRef(component.ID)
    }
    alert ('Could not find component ' + name)
  }

  const getRef = (ID) => {
     return pageRefState[ID]
  }

  const attachEventHandlers = component => {
    const eventHandlers = eventTypes.map(e => e.name).reduce((handlers, eventName) => {
      const supported = component.events?.find( f => f.event === eventName);
      if (!supported) return handlers;
      handlers[eventName] = (e, options) => handleComponentEvent(e, {
        name: eventName ,
        component,
        pageClientState,
        options,
        api: { getRef, getRefByName, openLink, openPath }
      });  
      return handlers;
    }, {});
  

    
    const bound = component.settings?.find(f => f.SettingName === 'bound' && !!f.SettingValue);

    !!bound && console.log({bound, pageClientState})
 
    if (bound && pageClientState) {
      const node = component.settings?.find(f => f.SettingName === 'target');
      if (node) {
        const target = node.SettingValue;
        Object.assign(eventHandlers, {
          [bound.SettingValue]: pageClientState[target],
          onChange: e => setPageClientState(s => ({...s, [target]: !e.target ? e : e.target.value}))
        })
      }
    } 
      
    return eventHandlers;

  }




  return {
    handleComponentEvent ,
    pageClientState,
    setPageClientState,
    attachEventHandlers,
    executeComponentRequest,
    handleComponentRequest
  }

}

