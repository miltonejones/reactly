import * as React from 'react';
export const PageStateContext = React.createContext({});


const eventTypes =  [
  'onClick', 'onKeyup', 'onKeyDown', 'onBlur',
  'onChange', 'onFocus'
];

export const usePageContext = () => { 
  const { pageClientState, setPageClientState} = React.useContext(PageStateContext);

  const handleComponentEvent = (event, options) => {
    const { component, name } = options;
    const trigger = component.events.find( e => e.event === name);
    if (!trigger) return;

    switch(trigger.action.type) {
      case "setState": 
        setPageClientState(s => ({...s, [trigger.action.target]: trigger.action.value}))
        break;
      default:
        // do nothing
    }
    console.log ({ trigger, options })
  } 

  const attachEventHandlers = component => {

    const eventHandlers = eventTypes.reduce((handlers, event) => {
      handlers[event] = e => handleComponentEvent(e, {
        event ,
        component,
        pageClientState
      });  
      return handlers;
    },{});
  
    const bound = component.settings?.find(f => f.SettingName === 'bound' && !!f.SettingValue);
 
    if (bound && pageClientState) {
      const node = component.settings?.find(f => f.SettingName === 'target');


      if (node) {
        const target = node.SettingValue;
        Object.assign(eventHandlers, {
          value: pageClientState[target],
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
    attachEventHandlers
  }

}

