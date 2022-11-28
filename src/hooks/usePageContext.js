import * as React from 'react';
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
    name: 'onItemClick',
    description: 'WHen user clicks a list item'
  },
 {
    name: 'onSecondaryClick', 
    description: 'User clicks on the icon at the right of a list item.'
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
        } = React.useContext(PageStateContext);



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



  const handleComponentEvent = (event, eventProps) => {
    const { component, name , options } = eventProps;
    const triggers = component.events.filter( e => e.event === name);
 
    triggers.map(trigger => { 
      switch(trigger.action.type) {
        case "setState":  
          setPageClientState(s => ({...s, 
            [trigger.action.target]: trigger.action.value === 'toggle' 
              ? !s[trigger.action.target]
              : trigger.action.value }))
          break;
        case "modalOpen":  
            const state = {
              ...pageModalState,
              [trigger.action.target]: trigger.action.open,
              anchorEl: event.currentTarget
            } 
            setPageModalState(state)
          break;
        case 'dataReset':
          
          setPageResourceState(s => s.map(state => state.resourceID === trigger.action.target 
                 ? {
                  resourceID: state.resourceID,
                  name: state.name,
                  records: []
                 } : state));

          break;
        case 'dataExec':
          const resource = appContext.resources.find(f => f.ID === trigger.action.target);
          const { target, action } = trigger.action; 

          const qs = Object.keys(trigger.action.terms).map(term => {
            const prop = pageClientState[trigger.action.terms[term]];
            return `${term}=${prop}`
          }).join('&');

          executeComponentRequest(appContext.connections, qs, resource)
            .then(records => { 
              setPageResourceState(s => s.filter(e => e.resourceID !== trigger.action.target)
                .concat({
                  resourceID: resource.ID,
                  name: resource.name,
                  records
                }))
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
                api: { getRef, getRefByName }
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
        api: { getRef, getRefByName }
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
          onChange: e => setPageClientState(s => ({...s, [target]: e.target.value}))
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

