import * as React from "react";

export  const useApplicationState = () => {
   
  const monitoredText = localStorage.getItem('monitored');
  const monitored = !monitoredText ? [] : JSON.parse(monitoredText);
  
  const [loud, setLoud] = React.useState(false);
  const [jsonLog, setMessages] = React.useState([]);
   
  // debugger support
  const [ pageTabs,  setPageTabs ] = React.useState({});
  const [ showTrace, setShowTrace ] = React.useState(false);
  const [ disableLinks, setDisableLinks ] = React.useState(false);
  const [ disableRequests, setDisableRequests] = React.useState(false);
  const [ openTraceLog, setOpenTraceLog ] = React.useState({});
   
  // lisr of events supported by the system
  const [ supportedEvents, setSupportedEvents ] = React.useState([])
  
  // const [ dbItems, setDbItems ] = React.useState({});
  
  const [ libraryJSON, setLibraryJSON ] = React.useState({});
  const [ hydratedLibrary, setHydratedLibrary ] = React.useState({});
  const [ libraryLoaded, setLibraryLoaded ] = React.useState(false);
  
  const [ busy, setBusy ] = React.useState(false);
  
  const [ pageRefState, setPageRefState ] = React.useState({}); 
  const [ applicationClientState, setApplicationClientState ] = React.useState({});
  const [ applicationData, setApplicationData ] = React.useState(null);
  const [ pageModalState, setPageModalState ] = React.useState({});
  const [ pageResourceState, setPageResourceState ] = React.useState([]);
  const [ pageClientState, setPageClientState ] = React.useState({});

  const [ monitoredEvents, setMonitoredEvents ] = React.useState(monitored)
 
  const [ queryState, setQueryState ] = React.useState({
    loaded: false,
    data: null,
    appLoaded: false,
    pageLoaded: false, 
  });

  const [ dirty, setDirty ] = React.useState(false); 

  const [environment, setEnvironment] = React.useState({
    appContext: null,
    selectedPage: null
  });

  // create async versions of state setters than need waiting for
  const asyncable = {
    setPageClientState, 
    setPageRefState,
    setApplicationData,
    setPageModalState,
    setPageResourceState,
    setMonitoredEvents,
    setQueryState,
    setEnvironment
  };

  const asynced = Object.keys(asyncable).reduce((out, key) => {
    const stateSetter = asyncable[key];
    out[`${key}Async`] = (props) => new Promise(resolve => {
    
      stateSetter(old => {
        const better = {
          ...old,
          ...props
        };
        resolve (better);
        return props;
  
      });
    });
  
    return out;
  }, {});

  return {
    loud, 
    
    environment, 

    pageTabs, 
    disableLinks, 
    disableRequests, 
    openTraceLog, 
    supportedEvents, 
    libraryJSON, 
    hydratedLibrary, 
    libraryLoaded, 
    busy, 
    pageRefState, 
    pageModalState, 
    pageResourceState, 
    monitoredEvents, 
    queryState, 
    jsonLog, 
    pageClientState, 
    applicationData, 
    
    dirty, 

    setPageTabs, 
    setLoud, 
    setMessages,
    setEnvironment,
    setDisableLinks,
    setDisableRequests, 
    setOpenTraceLog,
    setSupportedEvents,
    setLibraryJSON,
    setHydratedLibrary,
    setLibraryLoaded,
    showTrace, 
    setBusy,
    setShowTrace,
    applicationClientState, 
    setApplicationClientState,
    setDirty ,
    
    ...asyncable,

    // async versions of key state setters  
    ...asynced,


  }

}