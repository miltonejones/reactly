import * as React from 'react';
export const PageStateContext = React.createContext({});


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

  return {
    handleComponentEvent ,
    pageClientState,
    setPageClientState
  }

}

