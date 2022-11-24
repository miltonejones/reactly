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
    page_data_items: AppData,
  });

  const menuPos = store.getItem("menu_pos");
  const useMenus = store.getItem("use_menus");
  const appData = store.getItem("page_data_items");
  const PopComponent = useMenus === "1" ? Popover : Drawer;
  const MenuComponent = useMenus === '1' ? Menu : Drawer;

  const path = [appData.path].concat(!queryState.page?.PagePath ? [] : queryState.page.PagePath)
 

  return (
    <AppStateContext.Provider
      value={{
        queryState,
        setQueryState,
        ...appHistory,  
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
