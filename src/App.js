import * as React from "react";
import { BrowserRouter, Routes, Route, } from "react-router-dom"; 
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
  Stack,
  Divider,
  Typography,
} from "@mui/material";
import { Flex, TextBtn, QuickMenu, Spacer, ContentTree, PageTree } from "./components";
import { AppData } from "./data";
import { Home, Editor, Renderer, Detail } from "./components/pages";
import { Launch, Save, Sync, Add } from "@mui/icons-material";

import { useAppHistory } from "./hooks/useAppHistory";
import { AppStateContext } from "./hooks/AppStateContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Modal, { useModal } from "./components/Modal/Modal";
 

function App() {
  const appHistory = useAppHistory();

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
    page_resource_state: '[]'
  });
 

  const menuPos = store.getItem("menu_pos");
  const useMenus = store.getItem("use_menus");
  const appText = store.getItem("page_db_items");
  const PopComponent = useMenus === "1" ? Popover : Drawer;
  const MenuComponent = useMenus === '1' ? Menu : Drawer;
  const modal = useModal();

  const appData = appText === null || appText === 'null' 
    ? AppData 
    : JSON.parse(appText);

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

  return (
    <AppStateContext.Provider
      value={{
        appData,
        setAppData,
        queryState,
        setQueryState,


        // "persistent" state values 

        pageClientState, 
        setPageClientState,
        
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
          <Route path="/edit/:appname" element={<Editor applications={appData} />} />  
          <Route path="/info/:appname" element={<Detail applications={appData} />} />  
          <Route path="/apps/:appname" element={<Renderer applications={appData} />} />  
          <Route path="/apps/:appname/:pagename" element={<Renderer applications={appData} />} />  
        </Routes>
      </BrowserRouter>
      <Modal {...modal.modalProps}/>
    </AppStateContext.Provider>
  );
}
 
export default App;
