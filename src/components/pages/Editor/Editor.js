import React from "react";
import {
  Popover, 
  Grid,
  Box,
  Chip,
  styled,
  InputAdornment,
  TextField, 
  Stack,
  Divider, 
  IconButton, 
  Collapse, 
} from "@mui/material";
import {
  Flex,
  TextBtn,
  QuickMenu,
  Spacer,
  StateDrawer,
  RotateButton, 
  ScriptDrawer,
  ComponentPanel,
  ContentTree,
  PageTree,
  ComponentTree,
  ConnectionDrawer,
  PopoverPrompt, 
  LibraryTree,
  Text, 
} from "../..";
import {
  ExpandMore,
  Close,
  Launch,
  Save, 
  Add,
  Home, 
  AppRegistration, 
  Code,
  Article,
  Gamepad,
  Newspaper, Construction, ArrowBack
} from "@mui/icons-material";
import {
  AppStateContext,
  EditorStateContext,
} from "../../../hooks/AppStateContext"; 
import { useEditor } from "../../../hooks/useEditor";
import { Json } from "../../../colorize";  
import { Icons } from "../../library/icons";
import { JsonView } from "../../../colorize"; 
import { ApplicationTree } from "../..";
import StatusPane from "../../StatusPane/StatusPane"; 
import { ConsoleDrawer } from "../..";
import { useNavigate  } from "react-router-dom";
import { DrawerNavigation, NavigationTabs, ComponentTabs, ParameterPopover, ControlButton } from "./components";
import { useReactly } from "../../../hooks"; 
import { recurse } from "../../library/util";
import { Hide, Sidebar, SidePane, Treebox } from "./styled";

const BorderButton = styled(IconButton)(({ active , theme}) => ({
  // borderWidth: active ? 1  : 0,
  outline: !active ? '' : ('solid 2px ' + theme.palette.primary.main)
}))

const Pane = styled(Grid)(({ short, wide, left, right, thin, state="", side, tool }) => {
  const args = {
    minWidth: `var(--${side}${state}-width)`,  //  wide ? "calc(100vw - var(--workspace-width))" : "var(--sidebar-width)",
    maxWidth: `var(--${side}${state}-width)`  // wide ? "calc(100vw - var(--workspace-width))" : "var(--sidebar-width)",
  };
 
  return {
    // outline: wide ? "" : "dotted 1px green",
    height: short ? 'fit-content' : "calc(100vh - 64px)",
    transition: "all .2s linear",
    ...args,
    overflow: "auto",
  };
});

export const useConnectionEdit = (apps) => {
  
  const { 
    dropConnection,
    dropResource,
    setConnection,
    setResource,
  } = useEditor(apps);
  const { Confirm, appContext } = React.useContext(AppStateContext);
 


  const handleResourceDelete = async (ID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this resource?",
      "Confirm delete"
    );
    if (!ok) return;
    dropResource(appContext.ID, ID);
  };

  const handleConnectionDelete = async (ID, confirmed) => {
    const ok =confirmed ||  await Confirm(
      "Are you sure you want to delete this connection?",
      "Confirm delete"
    );
    if (!ok) return;
    dropConnection(appContext.ID, ID);
  };

  return {
    handleResourceDelete,
    handleConnectionDelete,
    setConnection,
    setResource,
  };
};

export const useResourceEdit = (apps) => {
  
  const { 
    setComponentEvent,
    dropComponentEvent, 
  } = useEditor(apps);
  const { Confirm, appContext , selectedPage} = React.useContext(AppStateContext);
 

  const handleEventChange = (componentID, event) => {
    setComponentEvent(appContext.ID, selectedPage?.ID, componentID, event);
  };

  const handledEventDelete = async (componentID, eventID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this event?",
      "Confirm delete"
    );
    if (!ok) return;
    dropComponentEvent(appContext.ID, selectedPage?.ID, componentID, eventID);
  };

  return {
    handleEventChange,
    handledEventDelete,
    setComponentEvent,
    dropComponentEvent, 
  };

}

const Editor = () => { 
 

  const [drawerState, setDrawerState] = React.useState({
    stateOpen: false,
    scriptOpen: false,
    connectOpen: false,
  });

  
  const navigate = useNavigate();  
  const [ collapsed, setCollapsed ] = React.useState({
    left: false,
    right: false,
  });
  const [ showTabs,  setShowTabs ] = React.useState(true); 
  // const [ pageTabs,  setPageTabs ] = React.useState({});
  const [ popoverContent,  setPopoverContent ] = React.useState(null);
  const [ anchorEl, setAnchorEl ] = React.useState(null);

  
  const [ editorState, setEditorState ] = React.useState({
    json: false,
    loud: false,
    showLib: false,
    loaded: false,
    hilit: false,
    contentFilter: '',
    box: {},  
    expandedNodes: {},
    disableLinks: false, 
    showSettings: false,  
    message: 'Unknown action', 
    showTrace: false,  
  });

  const [ 
    setJSON, 
    setShowLib,  
    setHilit,
    setExpandedNodes
  ] = [ 'json', 'showLib',  'hilit', 'expandedNodes']
    .map(name => (value) => setEditorState(key => ({ ...key, [name]: value })));

  const { json, hilit, showLib, expandedNodes } = editorState; 
 
  const {
    loud,
    setLoud, 
    selectedPage,
    queryState = {},
    setQueryState,  
    Alert, 
    pageClientState,  
    pageResourceState,   
    applicationClientState,  
    Library,
    uploadApplicationConfig,
    dirty,
    setDirty, 
    setShowTrace, 
    appContext,
    pageTabs,   
    

  } = React.useContext(AppStateContext);

  const reactly = useReactly();

  React.useEffect(() => {
    console.log ('editor loading')
  }, [])

  const open = Boolean(anchorEl);

  const handlePopoverClick = (content) => (event) => {
    setPopoverContent(content)
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); 
  };
  

  const componentParent = selectedPage || appContext;

  const path = ["apps", appContext.path].concat(
    !selectedPage?.PagePath ? [] : selectedPage.PagePath
  );
 
 
  const closeLib = () => {
    setShowLib(!showLib);
    setCollapsed((s) => ({ ...s, left: !showLib, right: !showLib }))
  }

  const getMenuOption = () => {
    const labels = menuOptions.filter(f => !!f.on);
    return labels.map(label => label.name);
  }
  
  const menuOptions = [
    {
      name: collapsed.left ? "Show Navigation Panel" : "Hide Navigation Panel",
      action: () => setCollapsed((s) => ({ ...s, left: !s.left })),
      on: collapsed.left
    },
    {
      name: collapsed.right ? "Show Settings Panel" : "Hide Settings Panel",
      action: () => setCollapsed((s) => ({ ...s, right: !s.right })),
      on: collapsed.right
    }, 
    {
      name: "-",
    },
    {
      name: `Hilight all components`,
      action: () => setHilit(!hilit),
      on: hilit,
    },
    {
      name: `${showTabs ? 'Hide' : 'Show'} Tabs`,
      action: () => setShowTabs(!showTabs),
      on: showTabs,
    },
    {
      name: `Loud logging`,
      action: () => setLoud(!loud),
      on: loud,
    },
    {
      name: "Show client state",
      action: () => {
        const { records, ...rest} = selectedPage ? pageClientState : applicationClientState;
        Alert(<Json>
        {JSON.stringify(rest, 0, 2)}
      </Json>, selectedPage?.PageName + ' Client State')}
    },
    {
      name: "Show application state",
      action: () => { 
        Alert(<Json>
        {JSON.stringify(applicationClientState, 0, 2)}
      </Json>, 'Application Client State')}
    },
    {
      name: "Show resource state",
      action: () => Alert(<Json>
        {JSON.stringify(pageResourceState, 0, 2)}
      </Json>)
    },
    {
      name: "Status Pane",
      action: () => Alert(<StatusPane />)
    },
  ];  
   
 
  const libraryKeys = Object.keys(Library)
    .filter(f => !Library[f].hidden)
    .sort((a,b) => a > b ? 1 : -1);

  let center_state = '';
  if (collapsed.right && collapsed.left) {
    center_state = '-both';
  } else if (collapsed.right) {
    center_state = '-right';
  } else if (collapsed.left) {
    center_state = '-left'
  }
 

  const handlePageNavigate = (name,  parameters) => {
    const clickedPage = !!name && appContext.pages?.find((f) => f.PageName === name);
 

    if (!clickedPage) { 
      return navigate(`/edit/${appContext.path}`);
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

  const chooseComponent = (component, on) => {

    setQueryState(s => {
      if (!s.tabs) {
        Object.assign(s, { tabs: {}})
      }

      if (selectedPage?.PageName) {

        Object.assign(s.tabs, {
          [selectedPage.PageName]: {
            ...s.tabs[selectedPage.PageName],
            [component.ID]: `${component.ComponentType}: ${component.ComponentName}`
          }
        })
  
        if (on) {
          delete s.tabs[selectedPage.PageName][component.ID]
        }
  
      }

      return {...s, componentLoading: false, selectedComponent: on ? null :  component};
    });

  }
  /**  --left-width: 320px;
  --left-off-width: 40px; */

  const PANE_HEIGHT = 'calc(100vh - 64px)';
  const LEFT_PANE_WIDTH = collapsed.left ? 40 : 280;
  const RIGHT_PANE_WIDTH = collapsed.left ? 40 : 380;

  let centerOffset = 56;
  centerOffset += LEFT_PANE_WIDTH;
  centerOffset += RIGHT_PANE_WIDTH;
  
  const paneProps = {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    '--left-pane-height': PANE_HEIGHT,
    '--left-pane-width': LEFT_PANE_WIDTH + 'px',
    '--left-pane-overflow': collapsed.left ? 'hidden' : 'auto',
    '--top-pane-width': '100vw',
    '--top-pane-height': 'fit-content',
    '--right-pane-height': PANE_HEIGHT,
    '--right-pane-width': RIGHT_PANE_WIDTH + 'px',
    '--center-pane-width': `calc(100vw - ${centerOffset}px)`,
    '--right-pane-overflow': collapsed.right ? 'hidden' : 'auto',
    '--content-height-offset': !!pageTabs && !!Object.keys(pageTabs).length ? '460px' : '420px'
  }

  const componentType = Library[queryState.selectedComponent?.ComponentType];
 
  const isInApplicationScope = !!componentParent.Name
  const parentOpen = recurse(componentParent, queryState.selectedComponent) ; 
 
  const menuProps = {
    component: {
      onChange: reactly.quickComponent,
      options: libraryKeys,
      icons: libraryKeys.map(
          (e) => Icons[Library[e].Icon]
        ),
      label: <TextBtn endIcon={<Add />}>Add</TextBtn>
    },
    page: {
      onChange: handlePageNavigate,
      options: appContext.pages?.map((f) => f.PageName),
      small: true,
      caret: true,
      label: selectedPage?.PageName || <b>{ appContext.Name}</b>,
      title: "Choose Page"
    },
    toolbar: {
      onChange: (n) => {
        if (!n) return;
        const { action } = menuOptions.find((f) => f.name === n);
        action();
      },
      title: "App Menu",
      value: getMenuOption(),
      options: menuOptions.map((f) => f.name),
      label: "Menu",
      small: true,
      caret: true,
    }
  }

  const navigationButtons = [
    {
      deg: !parentOpen ? 270 : 90,
      onClick: () =>  setCollapsed((s) => ({ ...s, left: !collapsed.left })),
      icon: collapsed.left ? <ExpandMore /> : <Close />
    },
    { 
      onClick: () => handlePopoverClick(<PageTree />),
      icon: <Article />,
      hidden: !collapsed.left
    },
    { 
      onClick: () => handlePopoverClick(<ContentTree />),
      icon: <Newspaper />,
      hidden: !collapsed.left
    }
  ]

  const navigationPane = 
          <SidePane item side="left">
 
            <Stack sx={{ p: collapsed.left ? 0 : 1, height: 300 }}>

              <Flex nowrap spacing={1}>
                <Hide hidden={collapsed.left}>
                  {!!selectedPage?.PageName && <Text small>
                    <b>Page</b>
                  </Text>}

                  <QuickMenu {...menuProps.page}  />

                  <Spacer /> 

                  <PopoverPrompt 
                    onChange={(value) => !!value && reactly.createPage(null, value)}
                    label="Enter a name for your page" 
                    endIcon={<Add />} 
                    >Create</PopoverPrompt> 
                </Hide>
                
               <Stack>
                 {navigationButtons
                  .map((button, i) => <ControlButton key={i} {...button} />)} 
               </Stack>

              </Flex>



              <Treebox hidden={collapsed.left}>
                <PageTree />
               </Treebox>
            </Stack>

            <Hide hidden={collapsed.left || !componentParent }> 
              <Divider />

              <Stack sx={{ p: 1, height: "calc(100vh - 404px)" }}>
                <Flex spacing={1}>
                  <Flex fullWidth>
                    <Text small>
                      <b>Content</b>
                    </Text>

                    <Spacer />
                    <QuickMenu {...menuProps.component} />
                  
                  </Flex>
                </Flex>

                <ContentTree   />

              </Stack>
            </Hide>
          
          </SidePane>;

 
  return (
    <EditorStateContext.Provider value={{ 
      appData: appContext ,
      selectComponent,
      setDrawerState,
      ...drawerState,
      setCollapsed,
      collapsed,
      setEditorState,
      editorState,
      setShowTrace,
      handlePageNavigate,
      hilit,
      setExpandedNodes, 
      expandedNodes,
      selectComponentByID,
      showTabs

      }}>
      <Box style={paneProps}>

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
            <SidePane item xs={12} side="top" >
              <Flex sx={{ p: 1 }}>
                <Flex
                  sx={{ borderRight: 1, borderColor: "divider", pr: 2, mr: 1 }}
                >
                  <AppRegistration />
                  <b>Reactly</b>
                </Flex>

                <IconButton onClick={() => window.history.back()}>
                  <ArrowBack />
                </IconButton>

                <Chip color="primary" 
                  onClick={() => handlePageNavigate()}
                  variant={isInApplicationScope ? "outlined" : "filled" } label={<b>{appContext.Name}</b>} />

                <Flex nowrap>
                  <QuickMenu {...menuProps.toolbar} />
                </Flex>
                    
                {(queryState.pageLoaded || queryState.appLoaded) && <Addressbox value={`/${path.join("/")}`}  
                  queryState={queryState}
                  setQueryState={setQueryState}
                  selectedPage={selectedPage}
                />}


              <BorderButton active={showLib} disabled={!!json} onClick={() => closeLib()}>
                  <Construction />
                </BorderButton>

                <BorderButton active={json} disabled={showLib} onClick={() => setJSON(!json)}>
                  <Code />
                </BorderButton>

                <IconButton 
                  size="small"
                  onClick={() => window.open(`/${path.join("/")}`.replace('apps',  'debug'))} 
                >
                
                  <Gamepad  />
                </IconButton>
            
            
                <TextBtn
                  variant="contained"
                  endIcon={<Save />}
                  disabled={!dirty} 
                  onClick={() => { 
                    uploadApplicationConfig(appContext);
                    setDirty(false);
                  }}
                >
                  Save
                </TextBtn>
              </Flex>
            </SidePane>
  
            <SidePane item xs={12} side="top"  >
                
                <NavigationTabs />
              
            </SidePane> 
            
            {!(componentType?.modal || parentOpen) && <>
              {navigationPane}
            </>}

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

            {/* right side navigation panel */}
            {(componentType?.modal || parentOpen) && <>
              {navigationPane}
            </>}
            
            {/* component settings panel */}
            <SidePane item side="right" >
  
              {!!componentParent && <ComponentPanel  />}
            </SidePane>
          </Grid>
        </Flex>

        
        <ConsoleDrawer />
        <ScriptDrawer />
        <ConnectionDrawer /> 
        <StateDrawer  />

      </Box>

      <Popover 
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose} 
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{width: 300, p: 2}}>
          {popoverContent}
        </Box>

      </Popover>
  
    </EditorStateContext.Provider>
  );
};

export const Addressbox = ({ value, onChange, onClose, queryState, setQueryState, selectedPage, ...props }) => { 
  const [parameters, setParameters] = React.useState(selectedPage?.parameters)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverClick =  (event) => {  
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => { 
    setAnchorEl(null); 
  };

  const handleButtonClick = (event) => { 
    if (parameters && 
        Object.keys(parameters).length) {
      return handlePopoverClick(event);
    } 
    window.open(value)
  }

  const openPage = () => {
    const path = [value, Object.values(parameters).join('/')].join('/');  
    window.open(path)
    handlePopoverClose ()
  }


  const handleParameterChange = param => event => {
    setParameters(params => ({
      ...params,
      [param]: event.target.value 
    }))
  }

 

  const startAdornment = <InputAdornment position="start">URL</InputAdornment>;

  const adornment = {
    startAdornment,
    endAdornment: (
      <InputAdornment
        sx={{ cursor: "pointer" }} 
        position="end"   onClick={handleButtonClick}
      >
        {/* <>
        <Text small active error={!pageLoaded}>Loaded</Text>
        <Switch size="small" checked={appLoaded} />app  
        <Switch size="small" checked={pageLoaded} />page 
        </> */}
        <Launch />
        Open

      </InputAdornment>
    ),
  };

  return (
   <>
 
   <TextField
    disabled
      size="small" 
      {...props}
      sx={{ width: "calc(100vw - 700px)" }}
      value={value}
      autoComplete="off"
      onChange={onChange}
      InputProps={adornment}
      autoFocus
    />
    
  {!!parameters && <ParameterPopover 
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          handleParameterChange={handleParameterChange}
          openPage={openPage}
          parameters={parameters}
    />}

    
    </> 
  );
};

Editor.defaultProps = {};
export default Editor;
