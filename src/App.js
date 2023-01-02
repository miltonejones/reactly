import * as React from "react";
import { BrowserRouter, Routes, Route,useParams,  useLocation } from "react-router-dom"; 
import "./App.css";

import {  Snackbar } from "@mui/material";  

import { Home, Editor, Renderer, Detail } from "./components/pages";  
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Redirector from "./components/Redirector/Redirector";
 
import { AppStateContext } from "./hooks/AppStateContext"; 
import Modal, { useModal } from "./components/Modal/Modal";
   
import useDynamoStorage from "./hooks/DynamoStorage";  
import { useApplicationState } from "./hooks/useApplicationState";
import { useApplicationLoader } from "./hooks/useApplicationLoader";
import { useApplicationUtil } from "./hooks/useApplicationUtil";
import { useReactlyLibrary } from "./hooks/useReactlyLibrary";
   

function App() { 
 

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<RenderComponent component={Home} />} />   
        
        <Route path="/edit/:appname" element={<RenderComponent preview component={Editor}  />} />  
        <Route path="/edit/:appname/:pagename" element={<RenderComponent preview component={Editor}  />} />  
        <Route path="/edit/:appname/:pagename/*" element={<RenderComponent preview component={Editor}  />} />  

        <Route path="/info/:appname" element={<RenderComponent preview component={Detail}  />} />  


        <Route path="/apps/:appname" element={<RenderComponent redirect component={Renderer} />} />  
        <Route path="/apps/:appname/:pagename" element={<RenderComponent component={Renderer} />} /> 
        <Route path="/apps/:appname/:pagename/*" element={<RenderComponent component={Renderer}   />} />  

        <Route path="/debug/:appname" element={<RenderComponent debug component={Renderer} />} />  
        <Route path="/debug/:appname/:pagename" element={<RenderComponent debug component={Renderer} />} /> 
        <Route path="/debug/:appname/:pagename/*" element={<RenderComponent debug component={Renderer}   />} />  
      </Routes>
  </BrowserRouter>
  );
}
 
function RenderComponent({ preview, debug, component: Component, ...props}) {
 
  const modal = useModal();
  const location = useLocation(); 

  const { pagename } =  useParams ();
  const { removeProgItem } = useDynamoStorage();
 
  // manages state vars for the app context
  const state = useApplicationState();
  
  // app utils
  const utils = useApplicationUtil(state);
  
  // loads the application and any pages
  const loader = useApplicationLoader(state, preview);

  // manages the reactly component library
  const reactly = useReactlyLibrary(state); 

  // get current context based on location
  const {  appContext, selectedPage } = loader.getApplicationContext();

  // download library and application components before rendering
  const initializePage = React.useCallback(async () => {
    
    // download app config
    await loader.downloadApplicationConfig();

    // download reactly component library
    await reactly.getReactlyConfig();
  }, [loader, reactly]);
 

  // runs on location, i.e. route, change
  React.useEffect(() => { 
    if (!pagename || !state.applicationData) return;
    utils.shout({ location, pagename }, 
      'Loading page from server', 'green', 600);
    loader.downloadCurrentPage(pagename) ; 
  }, [location, pagename]);
  

 // runs on page load. downloads initial config
  React.useEffect(() => { 
    if (!state.libraryLoaded) {
      initializePage(); 
      state.setLibraryLoaded(true);
    }
  },  [state])

 
  if  (!(Boolean(state.applicationData) && Boolean(appContext))) { 
    return <LoadingScreen />
  }  


  return (
    <AppStateContext.Provider
      value={{
        ...state,
        ...utils, 
        ...modal,
        ...reactly,
        ...loader,

        Library: state.hydratedLibrary, 
        appBusy: state.busy,
        appData: state.applicationData,
  

        // app methods
        setAppData:  state.setApplicationData,
        removeProgItem,

        // should be state variables
        // maybe one? as an object?
        appContext,
        selectedPage,

        preview,

        // remove
        pagename,

        // true when navigating with the ConsoleDrawer enabled
        debugMode: debug,
          
      }}
    > 

      {/* redirect to app home page if no page specified  */}
      <Redirector />
 
 
      <Component debug={debug} {...props} appData={state.applicationData} applications={state.applicationData} />
 
 
      <Modal {...modal.modalProps}/>

      {/* app notifications */}
      <Snackbar message={state.busy.toString()} open={state.busy} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
    </AppStateContext.Provider>
  );
}
 


 
export default App;
