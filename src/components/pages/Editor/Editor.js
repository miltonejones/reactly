import React from "react";
import { 
  Grid,
  Box,
  Chip,   
  IconButton, 
  Collapse, 
} from "@mui/material";
import {
  Flex,
  TextBtn, 
  StateDrawer, 
  ScriptDrawer,
  ComponentPanel, 
  ComponentTree,
  ConnectionDrawer, 
  LibraryTree, 
  ConsoleDrawer, 
  ApplicationTree 
} from "../..";
import { 
  Save,  
  Home, 
  AppRegistration, 
  Code, 
  Gamepad, 
  Construction, 
  ArrowBack
} from "@mui/icons-material";
import {
  AppStateContext,
  EditorStateContext,
} from "../../../context";   
import { JsonView } from "../../../colorize";  
import { useNavigate  } from "react-router-dom";
import { DrawerNavigation,  MainMenu, NavigationPane, NavigationTabs, Addressbox, ComponentTabs } from "./components";
import { useEditorState } from "../../../hooks";  
import { Hide, Sidebar, SidePane, BorderButton, Layout } from "./styled";  
import Toolbar from "./components/Toolbar/Toolbar";
 
const Editor = () => { 
 
  const navigate = useNavigate();  
  const settings = useEditorState();

  const {  
    json,  
    showLib, 
    collapsed, 
    setCollapsed,  
  } = settings; 
 
  const { 
    selectedPage,
    queryState = {},
    setQueryState,   
    appContext,
    pageTabs,    
  } = React.useContext(AppStateContext);

  const componentParent = selectedPage || appContext;
   
  const closeLib = () => {
    settings.setShowLib(!showLib);
    setCollapsed((s) => ({ ...s, left: !showLib, right: !showLib }))
  }
 
  const handlePageNavigate = (name,  parameters) => {
    if (name === '/') { 
      return navigate(`/edit/${appContext.path}`);
    }
 
    const clickedPage = !!name && appContext.pages?.find((f) => f.PageName === name);
    if (!clickedPage) {
      return;// alert ('No page for ' + name)
    }
 
    const suffix = !parameters 
      ? ''
      : `/${Object.values(parameters).join('/')}`
 
    navigate(`/edit/${appContext.path}/${clickedPage.PagePath}${suffix}`);
  }
 
  const selectComponentByID = (ID, on) => {
    const component = componentParent.components.find(f => f.ID === ID);
    !!component && selectComponent(component, on);
  }
 
  const selectComponent = (component, on) => {
    setQueryState(state => ({
      ...state,
      componentLoading: true
    }));
    setTimeout(() => {
      chooseComponent(component, on);
    }, 0)
  }

  const addComponentTab = (component, active) => { 
    setQueryState(state => { 
      if (!state.tabs) {
        Object.assign(state, { tabs: {}})
      }

      if (selectedPage?.PageName) { 
        Object.assign(state.tabs, {
          [selectedPage.PageName]: {
            ...state.tabs[selectedPage.PageName],
            [component.ID]: `${component.ComponentType}: ${component.ComponentName}`
          }
        });
  
        if (active) {
          delete state.tabs[selectedPage.PageName][component.ID];
        } 
      }

      return state
    }); 
  }

  const chooseComponent = (component, on) => {
    addComponentTab(component, on);
    setQueryState(state =>  ({
      ...state, 
      componentLoading: false, 
      selectedComponent: on ? null :  component
    })); 
  } 
 
  return (
    <EditorStateContext.Provider value={{  
      ...settings.drawerState, 
      ...settings,
 
      handlePageNavigate, 
      selectComponent,  
      selectComponentByID, 
      closeLib
      }}>
      <Layout collapsed={collapsed} showTabs={!!pageTabs && !!Object.keys(pageTabs).length}>
 
        <Flex spacing={0} baseline fullWidth>
          <Sidebar >
            <Box>
              <IconButton href="/" sx={{ mt: 4 }} color="inherit">
                <Home />
              </IconButton>
            </Box>

            <DrawerNavigation /> 
          </Sidebar>


          <Grid container >

            {/* toolbar  */}
            <Toolbar />
  
            <SidePane item xs={12} side="top"  > 
              <NavigationTabs />    
            </SidePane> 
            
            <NavigationPane />

            <SidePane item sx={{ p: 1 }} side="center">
 
              
              {/* component library editor */}
              <Collapse in={showLib && !json}>
              {!!showLib && <LibraryTree onClose={closeLib} />}
              </Collapse>

              {/* application JSON */}
              <Collapse in={json && !showLib}>
                {!!json &&  <JsonView json={appContext}/>} 
              </Collapse>
              
              {/* editor workspace  */}
              <Collapse in={!json && !showLib}>

                {/* component tabs */}
                <ComponentTabs />
  
                {/* application scope components */}
                <ApplicationTree  />

                {/* page scope components */}
                <ComponentTree  />
                  
              </Collapse>
            </SidePane>
 
            
            {/* component settings panel */}
            <SidePane item side="right" > 
                <ComponentPanel  />
            </SidePane>
          </Grid>
        </Flex>

        
        <ConsoleDrawer />
        <ScriptDrawer />
        <ConnectionDrawer /> 
        <StateDrawer  />

      </Layout>

    </EditorStateContext.Provider>
  );
};


Editor.defaultProps = {};
export default Editor;
