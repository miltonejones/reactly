import * as React from "react";
import { BrowserRouter, Routes, Route,useParams, Navigate, useLocation } from "react-router-dom"; 
import "./App.css";
import { styled ,Snackbar } from "@mui/material";  
import { Home, Editor, Renderer, Detail } from "./components/pages"; 
 
import { AppStateContext } from "./hooks/AppStateContext"; 
import Modal, { useModal } from "./components/Modal/Modal";
   
import useDynamoStorage from "./hooks/DynamoStorage";
import LibraryTree from "./components/LibraryTree/LibraryTree";
 
import { useApplicationState } from "./hooks/useApplicationState";
import { useApplicationLoader } from "./hooks/useApplicationLoader";
import { useApplicationUtil } from "./hooks/useApplicationUtil";
import { useReactlyLibrary } from "./hooks/useReactlyLibrary";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Redirector from "./components/Redirector/Redirector";
   

function App() { 
 

  return (
    <BrowserRouter>
      <Routes>


        <Route path="/" element={<RenderComponent component={Home} />} />  
        <Route path="/library" element={<RenderComponent component={LibraryTree}  />} />  
        <Route path="/library/:appname" element={<RenderComponent component={LibraryTree}  />} />  
        
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

  const { appname, pagename } =  useParams ();
  const { removeProgItem } = useDynamoStorage();
 
  const state = useApplicationState();
  const util = useApplicationUtil(state);
  const loader = useApplicationLoader(state);
  const reactly = useReactlyLibrary(state); 

  // get current context based on location
  const { homePage, appContext, selectedPage } = loader.getApplicationContext();

  // download library and application components before rendering
  const initializePage = React.useCallback(async () => {

    state.setBusy(`Loading initial data...`);
    
    // download app config
    await loader.downloadApplicationConfig();

    // download reactly component library
    await reactly.getReactlyConfig();
  }, [state]);
 

  // runs on location, i.e. route, change
  React.useEffect(() => { 
    if (!pagename || !state.applicationData) return;
    util.shout({ location, pagename }, 
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

 
  if  (!(!!state.applicationData && !!appContext)) { 
    return <LoadingScreen />
  } 

 
  if (!!homePage && !pagename && !preview && appContext) {
    // setQueryState(s => ({...s, pageLoaded: false}));
    const path = appContext.pages.find(f => f.ID === homePage).PagePath;
    if (path) {
      const rootPath = debug ? 'debug' : 'apps';
      const redirectPath = `/${rootPath}/${appname}/${path}`;
      return <Navigate to={redirectPath} />
    }
  }


  return (
    <AppStateContext.Provider
      value={{
        ...state,
        ...util, 
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
      <Redirector />
 
      <Component debug={debug} {...props} appData={state.applicationData} applications={state.applicationData} />
 
      {/* global modal component  */}
      <Modal {...modal.modalProps}/>

      {/* app notifications  */}
      <Snackbar message={state.busy.toString()} open={state.busy} 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} />
    </AppStateContext.Provider>
  );
}
 


 
export default App;
