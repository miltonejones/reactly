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
import { Home, Editor, Renderer } from "./components/pages";
import { Launch, Save, Sync, Add } from "@mui/icons-material";

import { useAppHistory } from "./hooks/useAppHistory";
import { AppStateContext } from "./hooks/AppStateContext";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Modal, { useModal } from "./components/Modal/Modal";

const Pane = styled(Grid)(({ short, wide }) => ({
  outline: "dotted 1px green",
  height: short ? 56 : "calc(100vh - 56px)",
  minWidth: wide ? "calc(100vw - 660px)" : 300,
  overflow: 'auto',
}));

function App() {
  const appHistory = useAppHistory();
  const [queryState, setQueryState] = React.useState({
    loaded: false,
    data: null,
  });

  const store = useLocalStorage({
    menu_pos: "bottom",
    use_menus: "1",
    page_db_items: JSON.stringify(AppData),
  });

  const menuPos = store.getItem("menu_pos");
  const useMenus = store.getItem("use_menus");
  const appText = store.getItem("page_db_items");
  const PopComponent = useMenus === "1" ? Popover : Drawer;
  const MenuComponent = useMenus === '1' ? Menu : Drawer;
  const modal = useModal();

  const appData = JSON.parse(appText);


  const path = [appData.path].concat(!queryState.page?.PagePath ? [] : queryState.page.PagePath)

  const setAppData = data => store.setItem('page_db_items', JSON.stringify(data));
 

  return (
    <AppStateContext.Provider
      value={{
        appData,
        setAppData,
        queryState,
        setQueryState,
        ...appHistory,  
        ...modal,
        menuPos,
        MenuComponent,
        PopComponent,
      }}
    >
     
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home appData={appData} />} />  
          <Route path="/edit/:appname" element={<Editor applications={appData} />} />  
          <Route path="/apps/:appname" element={<Renderer applications={appData} />} />  
          <Route path="/apps/:appname/:pagename" element={<Renderer applications={appData} />} />  
        </Routes>
      </BrowserRouter>
      <Modal {...modal.modalProps}/>
    </AppStateContext.Provider>
  );
}

export const Addressbox = ({ value, onChange, onClose, ...props }) => {
  const startAdornment = <InputAdornment position="start">URL</InputAdornment>;

  const adornment = {
    startAdornment,
    endAdornment: (
      <InputAdornment position="end">
        <Launch />
        Open
      </InputAdornment>
    ),
  };

  return (
    <TextField
      size="small"
      {...props}
      sx={{ width: "calc(100vw - 480px)" }}
      value={value}
      autoComplete="off"
      onChange={onChange}
      InputProps={adornment}
      autoFocus
    />
  );
};

export default App;
