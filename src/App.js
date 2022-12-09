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
  Avatar
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
import useDynamoStorage from "./hooks/DynamoStorage";
import LibraryTree from "./components/LibraryTree/LibraryTree";
import { reduceComponent } from "./components/library/library";
 

function ChildRoute({ pages, path, appData })  {
  const routes = pages
    .filter(f => !!f.parameters).reduce((items, pg) => {
      const path = Object.keys(pg.parameters).map(e => `:${e}`).join('/')
      items.push([`/apps/${path}/${pg.path}`, path].join('/'))
      return items;
  }, []);

  return routes.map(path => <Route path={path} element={<Renderer applications={appData} />} />  ) 
}

function App() {
  const appHistory = useAppHistory();
  const { appname } = useParams()

  const [dynamoProgs, setDynamoProgs] = React.useState(null)
  const [supportedEvents, setSupportedEvents] = React.useState([])
  const [dbItems, setDbItems] = React.useState({});
  const [libraryJSON, setLibraryJSON] = React.useState({});
  const [hydratedLibrary, setHydratedLibrary] = React.useState({});
  const [libraryLoaded, setLibraryLoaded] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [pageClientState, setPageClientState] = React.useState({});
  const [pageResourceState, setPageResourceState] = React.useState([]);
  const [queryState, setQueryState] = React.useState({
    loaded: false,
    data: null,
  });
  const [dirty, setDirty] = React.useState(false);

  const store = useLocalStorage({
    menu_pos: "bottom",
    use_menus: "1",
    page_db_items: JSON.stringify(AppData),
    app_library: '{}',
    page_resource_state: '[]'
  });

  const commitProg = async (app) => {
    await setProgItem(`app-${app.ID}`, JSON.stringify(app))
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
    setDynamoProgs(converted)
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

  

    setHydratedLibrary(lib)  
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
  const appText = store.getItem("page_db_items");
  const appLib = store.getItem("app_library");
  const PopComponent = useMenus === "1" ? Popover : Drawer;
  const MenuComponent = useMenus === '1' ? Menu : Drawer;
  const modal = useModal();
  const { setItem, getItems,  removeProgItem, getProgItems, setProgItem } = useDynamoStorage()


  let appData = appText === null || appText === 'null' 
    ? AppData 
    : JSON.parse(appText);

  if (dynamoProgs) {
    appData = dynamoProgs;
  }

  const createBreadcrumbs = React.useCallback((pages, node, items = []) => {
    if (!pages) return items.concat('huh');
    const selectedPage  = pages.find(f => f.ID === node.pageID);

    if (selectedPage) {
      return createBreadcrumbs(pages, selectedPage).concat(node.PageName);
    }

    return items.concat(node.PageName); //.concat(node.PageName)
  } , [ appData ])
   
  

  const setAppData = data => store.setItem('page_db_items', JSON.stringify(data)); 
  const getPageResourceState = () => pageResourceState
  let routes = []


  if (queryState.path) {
     routes = queryState.pages
      .filter(f => !!f.parameters).reduce((items, pg) => {
        const path = Object.keys(pg.parameters).map(e => `:${e}`).join('/')
        items.push([`/apps/${queryState.path}/:pagename`, path].join('/'))
        return items;
    }, []);

    
 
  }

  if (!dynamoProgs) {

   

    return <Flex sx={{width: '100vw', height: '100vh', justifyContent: 'center'}}>
     <Avatar className="App-logo" src="/logo192.png" alt="loader" >A</Avatar>
    Loading application info from database...
     </Flex>
  }

  // return <>
  // return <>
  //   <pre>
  //     {JSON.stringify(dynamoProgs,0,2)}
  //   </pre>
  // </>
  // <Flex sx={{p: 2}} wrap spacing={2}>

  // {Object.keys(config).map(c => <Box key={c}>
  //   <Button 
  //   variant={!!dbItems && !!dbItems[`reactly-${c}`] ? "contained" : 'outlined'}
  //   onClick={async () => {
  //     await setItem(`reactly-${c}`, JSON.stringify(config[c]))
  //     const items = await getItems();
  //     setDbItems(items)
  //   }}>Add {c}</Button>

  //   </Box>)}
  // </Flex>
     
  // <pre>
  // {JSON.stringify(hydratedLibrary.Button,0,2)}
  // </pre>
  // </>

  // return <pre>{Object.keys(hydratedLibrary).map(key => <>
  //  {key}[ {hydratedLibrary[key].Icon}]
  //  <br />
  // </>)}</pre>

  return (
    <AppStateContext.Provider
      value={{

        Library: hydratedLibrary,
        setHydratedLibrary,
        config: libraryJSON,
        updateLib,
        commitComponent,
        appData,
        setAppData,
        queryState,
        setQueryState,
        supportedEvents,
        refreshLib,
        commitProg,
        refreshProgs,
        // "persistent" state values 

        pageClientState, 
        setPageClientState,
        
        removeProgItem,

        pageResourceState, 
        getPageResourceState,
        setPageResourceState,


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

      <BrowserRouter>
        <Routes>
 

          <Route path="/" element={<Home appData={appData} />} />  
          <Route path="/library" element={<LibraryTree appData={appData} />} />  
          <Route path="/library/:appname" element={<LibraryTree appData={appData} />} />  
          <Route path="/edit/:appname" element={<Editor applications={appData} />} />  
          <Route path="/info/:appname" element={<Detail applications={appData} />} />  
          <Route path="/apps/:appname" element={<Renderer applications={appData} />} />  


 
   
          
          <Route path="/apps/:appname/:pagename" element={<Renderer applications={appData} />} /> 
          <Route path="/apps/:appname/:pagename/*" element={<Renderer applications={appData} />} />  
        </Routes>
      </BrowserRouter>
      <Modal {...modal.modalProps}/>
      <Snackbar message={busy.toString()} open={busy} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} >

      </Snackbar>
    </AppStateContext.Provider>
  );
}
 
export default App;
