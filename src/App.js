import * as React from "react";
import { BrowserRouter, Routes, Route,useParams, useLocation } from "react-router-dom"; 
import "./App.css";
import {
  Popover,
  Drawer,
  Grid,
  Box,
  Chip,
  styled,
  InputAdornment,
  TextField,
  Menu,
  Button,
  Stack,
  Divider,
  Typography,
  Snackbar,
  Avatar,
  Switch
} from "@mui/material";
import { Flex, TextBtn, QuickMenu, Spacer, ContentTree, PageTree } from "./components";
import { AppData } from "./data";
import { Home, Editor, Renderer, Detail } from "./components/pages";
import { Launch, Save, Sync, Add } from "@mui/icons-material";

import { useAppHistory } from "./hooks/useAppHistory";
import { AppStateContext } from "./hooks/AppStateContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Modal, { useModal } from "./components/Modal/Modal";

import Library from "./components/library";
import { expandLibrary, config } from "./components/library";
import { objectReduce } from "./components/library/util";
import useDynamoStorage from "./hooks/DynamoStorage";
import LibraryTree from "./components/LibraryTree/LibraryTree";
import { reduceComponent } from "./components/library/library";
import { useAppParams } from "./hooks/AppStateContext";
import { uniqueId } from "./components/library/util";
import { getApplications } from "./connector/sqlConnector";
import { setApplication } from "./connector/sqlConnector";
import { getApplicationInfo } from "./connector/sqlConnector";
import { getPageByPath } from "./connector/sqlConnector";
import { getPageByID } from "./connector/sqlConnector";
  
 

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

        <Route path="/info/:appname" element={<RenderComponent component={Detail}  />} />  


        <Route path="/apps/:appname" element={<RenderComponent component={Renderer} />} />  
        <Route path="/apps/:appname/:pagename" element={<RenderComponent component={Renderer} />} /> 
        <Route path="/apps/:appname/:pagename/*" element={<RenderComponent component={Renderer}   />} />  
      </Routes>
  </BrowserRouter>
  );
}
 
function RenderComponent({ preview, component: Component, ...props}) {
  const appHistory = useAppHistory();
  const location = useLocation();
  const monitoredText = localStorage.getItem('monitored');
  const monitored = !monitoredText ? [] : JSON.parse(monitoredText);

  const params =  useParams ();
  const { appname, pagename } = params;
  
  const [ pageError,  setPageError ] = React.useState(null)
  const [loud, setLoud] = React.useState(false);
  const [jsonLog, setMessages] = React.useState([]);
  const [pageRefState, setPageRefState] = React.useState({}); 
   
  const [showTrace, setShowTrace] = React.useState(false);
  const [disableLinks, setDisableLinks] = React.useState(false);
  const [disableRequests, setDisableRequests] = React.useState(false);
  const [openTraceLog, setOpenTraceLog] = React.useState({});
  const [dynamoProgs, setDynamoProgs] = React.useState(null)
  const [supportedEvents, setSupportedEvents] = React.useState([])
  const [dbItems, setDbItems] = React.useState({});
  const [libraryJSON, setLibraryJSON] = React.useState({});
  const [hydratedLibrary, setHydratedLibrary] = React.useState({});
  const [libraryLoaded, setLibraryLoaded] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [applicationClientState, setApplicationClientState] = React.useState({});

  const [monitoredEvents, setMonitoredEvents] = React.useState(monitored)
  const [applicationData, setApplicationData] = React.useState(null);

  const [pageModalState, setPageModalState] = React.useState({});
  // const [pageClientState, setPageClientState] = React.useState({});
  const [pageResourceState, setPageResourceState] = React.useState([]);
  const [queryState, setQueryState] = React.useState({
    loaded: false,
    data: null,
    appLoaded: false,
    loadTime: new Date().getTime()
  });
  const [dirty, setDirty] = React.useState(false);
  let [t, setT] = React.useState(0);

 

  const monitorEvent = eventName => setMonitoredEvents(e => {
    const monitored = e.indexOf(eventName) > -1 ? e.filter(f => f !== eventName) : e.concat(eventName);
    localStorage.setItem('monitored', JSON.stringify(monitored))
    return monitored;
  } )

  const shout =  async( j, m = 'message', color, fontWeight) => {
      
    setMessages(msgs => msgs.concat({
          json: j,
          message: m,
          color,
          fontWeight,
          timestamp: new Date().getTime()
        }) 
      ) 
      if (loud) {
        console.log("%s\n------------------\n%o", m, j)
      }
  } 

  const store = useLocalStorage({
    menu_pos: "bottom",
    use_menus: "1",
    page_dyno_items: JSON.stringify(AppData),
    app_library: '{}',
    page_resource_state: '[]'
  });

  const commitProg = async (app) => { 
    setBusy(`Committing changes...`)
    // console.log ({app})
    // const { pages, ...rest} = app;
    // let total = 0;
    // app.pages.map(page => {
    //   total += JSON.stringify(page).length;
    //   console.log (page, JSON.stringify(page).length)
    // })
    // total += JSON.stringify(rest).length;
    // console.log (rest, JSON.stringify(rest).length)
    // console.log ({ total })

    await setApplication(app);

    //  await setProgItem(`app-${app.ID}`, app);

    await refreshProgs()
   }


   const udpateLocalProgs = async (updated) => {
    const converted =  updated.map(app => ({
      ...app, 
      pages: app.pages?.map(page => ({
        ...page,
        components: page.components?.map(component => ({
          pageID: page.ID,
          ...component, 
          children: Library[component.ComponentType].allowChildren
        })),
        scripts: page.scripts?.map(script => ({
          pageID: page.ID,
          ...script, 
        }))
      }))
    }));
    setApplicationData(converted)
    setDynamoProgs(updated);

 
   }

   React.useEffect(() => {
    // runs on location, i.e. route, change
    console.log('handle route change here', location)
    if (!pagename) return;
    shout({location, pagename}, 'Loading page from server', 'green', 600);
    getCurrentPage(pagename) ;
   
  }, [location, pagename]);
 
   const refreshProgs = async () => { 
    setBusy(`Reloading data for "${pagename || 'application'}"...`);

    // get application data
    const items = await getApplicationInfo(pagename);
    
    udpateLocalProgs(items)
    setBusy(false)
    return items;
  }
 
  const refreshLib = async () => { 
    setBusy(`Reloading data...`);

    // get library components
    const items = await getItems();
    const converted = Object.keys(items).reduce((out, item) => {
      const [label, key] = item.split('-');
      out[key] = JSON.parse(atob(items[item]))
      return out;
    }, {});
    setLibraryJSON(s => converted);
    setBusy(false)
    return converted;
  }
 
  const commitComponent = async (key, data) => { 
    setBusy(`Saving ${key}...`); 
    console.log ({ data })
    const x = reduceComponent(data);
    
    console.log ({ x });

    await setItem(`reactly-${key}`, JSON.stringify(x))
    const updated = await refreshLib();
    updateLib(updated)
  }

  const processLib = lib => {

    const eventNames = Object.keys(lib).reduce ((out, key) => {
      const events = lib[key].Events;
      if (!events) return out;
      out = out.concat(events.filter(e => !out.find(f => f.name === e.name) ));
      return out;
    }, [])
 
    setSupportedEvents(eventNames);

  

    setHydratedLibrary(s => lib)  
  }

  const updateLib = async (conf) => {
    const lib = expandLibrary(Library, conf); 
    setLibraryJSON(conf)
    processLib(lib)  
    setBusy(false)
  }
 
  React.useEffect(() => { 
  
    if (!libraryLoaded) {
      (async () => {
        await refreshProgs()
        setBusy(`Loading initial data...`)
        const f = await refreshLib()
        setLibraryJSON(f);
        const lib = expandLibrary(Library, f);
        processLib(lib)  
        setBusy(false)
      })();
    }
    setLibraryLoaded(true)
  },  [libraryLoaded, store, config])

  const menuPos = store.getItem("menu_pos");
  const useMenus = store.getItem("use_menus");
  const appLib = store.getItem("app_library");
  const PopComponent = useMenus === "1" ? Popover : Drawer;
  const MenuComponent = useMenus === '1' ? Menu : Drawer;
  const modal = useModal();
  const { setItem, getItems,  removeProgItem, getProgItems, setProgItem } = useDynamoStorage()
  
 
  const [pageClientState, setPageClientState] = React.useState({});


  const getPageClientStateAsync = fn => {
    setPageClientState( state => fn(state) );
  }

  const getApplicationClientStateAsync = fn => {
    setApplicationClientState( state => fn(state) );
  }

  const createBreadcrumbs = React.useCallback((pages, node, items = []) => {
    if (!pages) return items.concat('huh');
    const currentPage  = pages.find(f => f.ID === node.pageID);

    if (currentPage) {  
      return createBreadcrumbs(pages, currentPage).concat(node.PageName);
    }

    return items.concat(node.PageName); //.concat(node.PageName)
  } , [  ])
   

  //  return <pre>{JSON.stringify(applicationData,0,2)}</pre>
 

  const appContext = applicationData?.find(f => f.path === appname);
  const homePageID =  appContext?.HomePage;
  const defaultPage = !homePageID
   ? appContext?.pages?.[0]
   : appContext?.pages?.find(f => f.ID === homePageID) ;

  const targetPage = !!pagename ? appContext?.pages?.find(f => f.PagePath === pagename) : defaultPage;
   
  const selectedPage = (preview && (!pagename || (!!queryState && !!queryState.page)))  ? queryState.page : targetPage;

  const getCurrentPage = React.useCallback(async (requestedPage) => { 
    const lookupPage = requestedPage || pagename;
    if (!lookupPage || !targetPage?.skeleton) {
      return shout({lookupPage, targetPage}, 'Not reloading this page', 'purple')
    }
    setBusy(`Reloading page "${lookupPage}"...`);
    const desiredPage = appContext.pages.find(page => page.PagePath === lookupPage);
    if (!desiredPage) return;
 
    const currentPage = await getPageByID(desiredPage.ID);

    shout(currentPage, 'Got server page ' + currentPage?.PageName);
 

    const stateProps = !currentPage?.state
    ? null
    : objectReduce(currentPage.state); 

    const update = applicationData.map(app => ({

      ...app,

      pages: app.pages.map(page => page.ID === currentPage.ID 
        ? currentPage 
        : page)
        .map(page => ({
          ...page,
          components: page.components?.map(component => ({
            ...component,
            children: Library[component.ComponentType].allowChildren
          }))
        }))


    }));
 
    
    setApplicationData(update)
    setBusy(false)
    
    // alert (JSON.stringify(update));
   }, [pagename, appContext, targetPage])
  
  if (!applicationData) {
    return <>Loading application data</>
   }


  const stateProps = !selectedPage?.state
    ? {}
    : objectReduce(selectedPage.state); 
     

  

  const setAppData = data => setApplicationData(s => data); 
  
  const getPageResourceState = () => pageResourceState;

  const sessionID = uniqueId();
 


  if (!dynamoProgs) {
 
    return <Flex sx={{width: '100vw', height: '100vh', justifyContent: 'center'}}>
     <Avatar className="App-logo" src="/logo192.png" alt="loader" >A</Avatar>
    Loading application info from database...
     </Flex>
  }
 


  return (
    <AppStateContext.Provider
      value={{
        applicationClientState, 
        setApplicationClientState,
        Library: hydratedLibrary,
        setHydratedLibrary,
        config: libraryJSON,
        updateLib,
        commitComponent,
        appData: applicationData,
        setAppData,
        queryState,
        setQueryState,
        supportedEvents,
        refreshLib,
        commitProg,
        refreshProgs,
        appBusy: busy,
        appContext,
        selectedPage,
        preview,
        showTrace, 
        setShowTrace,
        pagename,
        // "persistent" state values 
        setBusy,
        getCurrentPage,
        setPageError, 
        pageError ,
        shout,
        openTraceLog, 
        setOpenTraceLog,
        jsonLog, 
        setMessages,
        loud, 
        setLoud,
        pageRefState, 
        setPageRefState,

        pageClientState, 
        setPageClientState,
        getPageClientStateAsync,
        getApplicationClientStateAsync,
        removeProgItem,
        monitorEvent,
        
        monitoredEvents, 
        setMonitoredEvents,

        pageResourceState, 
        getPageResourceState,
        setPageResourceState, 

        disableRequests, 
        setDisableRequests,
        
        pageModalState, 
        setPageModalState, 
        sessionID,
        ...appHistory,  
        ...modal,
        menuPos,
        MenuComponent,
        PopComponent,
        dirty, 
        setDirty,
        createBreadcrumbs
      }}
    > 
 
   
 
      <Component {...props} appData={applicationData} applications={applicationData} />
 
      <Modal {...modal.modalProps}/>
      <Snackbar message={busy.toString()} open={busy} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >

      </Snackbar>
    </AppStateContext.Provider>
  );
}
 


 
export default App;
