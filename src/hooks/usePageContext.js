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
];
 
export const usePageContext = () => { 
  const { pageClientState, setPageClientState} = React.useContext(PageStateContext);

  const handleComponentEvent = (event, options) => {
    const { component, name } = options;
    const trigger = component.events.find( e => e.event === name);
    console.log ({ trigger , component, name })
    if (!trigger) return;

    switch(trigger.action.type) {
      case "setState":  
        setPageClientState(s => ({...s, 
          [trigger.action.target]: trigger.action.value === 'toggle' 
            ? !s[trigger.action.target]
            : trigger.action.value }))
        break;
      default:
        // do nothing
    } 
  } 

  const attachEventHandlers = component => {

    const eventHandlers = eventTypes.map(e => e.name).reduce((handlers, event) => {
      const supported = component.events?.find( f => f.event === event);
      if (!supported) return handlers;

      handlers[event] = e => handleComponentEvent(e, {
        name: event ,
        component,
        pageClientState
      });  
      return handlers;
    }, {});
  

    
    const bound = component.settings?.find(f => f.SettingName === 'bound' && !!f.SettingValue);


 
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
  component.ComponentType === 'Chip' && console.log ({ eventHandlers })
      
    return eventHandlers;

  }

  return {
    handleComponentEvent ,
    pageClientState,
    setPageClientState,
    attachEventHandlers
  }

}

