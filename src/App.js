import * as React from "react";
import { BrowserRouter, Routes, Route,useParams } from "react-router-dom"; 
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
  
 

function App() { 
 
  React.useEffect(() => {

    const styleSheets = Array.from(document.styleSheets).filter(
      (styleSheet) => !styleSheet.href || styleSheet.href.startsWith(window.location.origin)
    );
      for (let style of styleSheets) {
        if (style instanceof CSSStyleSheet && style.cssRules) {
          console.log ({ styles: style.rules })
        }
      }



    console.log ('app loading');
  }, [])

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

  const [monitoredEvents, setMonitoredEvents] = React.useState([])
  const [applicationData, setApplicationData] = React.useState(null)

  const [pageModalState, setPageModalState] = React.useState({});
  // const [pageClientState, setPageClientState] = React.useState({});
  const [pageResourceState, setPageResourceState] = React.useState([]);
  const [queryState, setQueryState] = React.useState({
    loaded: false,
    data: null,
    appLoaded: true,
  });
  const [dirty, setDirty] = React.useState(false);
  let [t, setT] = React.useState(0);


  React.useEffect(() => {
    console.log ('renderer loading')
  }, [])

  const monitorEvent = eventName => setMonitoredEvents(e => e.indexOf(eventName) > -1 ? e.filter(f => f !== eventName) : e.concat(eventName) )

  const store = useLocalStorage({
    menu_pos: "bottom",
    use_menus: "1",
    page_dyno_items: JSON.stringify(AppData),
    app_library: '{}',
    page_resource_state: '[]'
  });

  const commitProg = async (app) => { 
    setBusy(`Committing changes...`)
    await setProgItem(`app-${app.ID}`, JSON.stringify(app))
    await refreshProgs()
   }


   const udpateLocalProgs = updated => {
    const converted =  updated.map(app => ({
      ...app, 
      pages: app.pages?.map(page => ({
        ...page,
        components: page.components?.map(component => ({
          pageID: page.ID,
          ...component, 
        }))
      }))
    }));
    setApplicationData(converted)
    setDynamoProgs(updated)
   }
  
   const refreshProgs = async () => { 
    setBusy(`Reloading data...`)
    const items = await getProgItems();
    const converted = Object.keys(items).reduce((out, item) => {
      const [label, key] = item.split('-');
      out = out.concat (JSON.parse(atob(items[item])))
      return out;
    }, []);
    console.log(converted)
    udpateLocalProgs(converted)
    setBusy(false)
    return converted;
  }
 
  const refreshLib = async () => { 
    setBusy(`Reloading data...`)
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
    setT(d => d++)
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
   

  if (!applicationData) {
    return <>Loading application data</>
   }

  const appContext = applicationData?.find(f => f.path === appname);
  const homePageID =  appContext?.HomePage;
  const defaultPage = !homePageID
   ? appContext?.pages?.[0]
   : appContext?.pages?.find(f => f.ID === homePageID) ;

  const targetPage = !!pagename ? appContext?.pages?.find(f => f.PagePath === pagename) : defaultPage;
   
  const selectedPage = (preview && (!pagename || !!queryState.page))  ? queryState.page : targetPage;


  const stateProps = !selectedPage?.state
    ? {}
    : objectReduce(selectedPage.state); 
     

  

  const shout =  async( j, m = 'message') => {
      
      setMessages(msgs => msgs.concat({
        json: j,
            message: m
          }) 
        )
      //   await modal.Alert (<Stack>
      //     {/* <Text>{m}</Text> */}
      //     <pre>
      //     {JSON.stringify(j,0,2)}
      //     </pre>
      // </Stack>, m)
    if (loud) {
      console.log("%s\n------------------\n%o", m, j)
    }
  } 

  const setAppData = data => setApplicationData(s => data); // store.setItem('page_dyno_items', JSON.stringify(data)); 
 


  const getPageResourceState = () => pageResourceState;

  const sessionID = uniqueId();
 
  if (!dynamoProgs) {
 
    return <Flex sx={{width: '100vw', height: '100vh', justifyContent: 'center'}}>
     <Avatar className="App-logo" src="/logo192.png" alt="loader" >A</Avatar>
    Loading application info from database...
     </Flex>
  }
 
  // const current_state = JSON.parse(store.state.page_dyno_items);

//  return <pre>{JSON.stringify({preview,page: !!queryState.page, pg:pagename},0,2)}</pre>

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
        // "persistent" state values 
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
