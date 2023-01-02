import React from "react";
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
  IconButton,
  FormControlLabel,
  Switch,
  Collapse,
  Tabs,
} from "@mui/material";
import {
  Flex,
  TextBtn,
  QuickMenu,
  Spacer,
  StateDrawer,
  RotateButton,
  useClipboard,
  ScriptDrawer,
  ComponentPanel,
  ContentTree,
  PageTree,
  ComponentTree,
  ConnectionDrawer,
  PopoverPrompt,
  SearchBox, 
  LibraryTree,
  Text,
  TabButton,
} from "../..";
import {
  ExpandMore,
  Close,
  Launch,
  Save,
  CopyAll,
  Sync,
  Add,
  Home,
  AutoStories,
  AppRegistration,
  RecentActors,
  Code,
  Article,
  Gamepad,
  Newspaper, Construction, ArrowBack
} from "@mui/icons-material";
import {
  AppStateContext,
  EditorStateContext,
} from "../../../hooks/AppStateContext";
import { useParams } from "react-router-dom";
import { useEditor } from "../../../hooks/useEditor";
import { Json } from "../../../colorize"; 
import { TextInput } from "../..";
import { Icons } from "../../library/icons";
import { JsonView } from "../../../colorize";
import { ChipBox, TinyButton } from "../..";
import { ApplicationTree } from "../..";
import StatusPane from "../../StatusPane/StatusPane";
import { uniqueId } from "../../library/util"; 
import { ConsoleDrawer } from "../..";
import { useNavigate  } from "react-router-dom";
import { ParameterPopover } from "./components";

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
  const { appname } = useParams();
  const {
    applications,
    dropConnection,
    dropResource,
    setConnection,
    setResource,
  } = useEditor(apps);
  const { Confirm } = React.useContext(AppStateContext);

  const appData = applications.find((f) => f.path === appname);

  const handleResourceDelete = async (ID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this resource?",
      "Confirm delete"
    );
    if (!ok) return;
    dropResource(appData.ID, ID);
  };

  const handleConnectionDelete = async (ID, confirmed) => {
    const ok =confirmed ||  await Confirm(
      "Are you sure you want to delete this connection?",
      "Confirm delete"
    );
    if (!ok) return;
    dropConnection(appData.ID, ID);
  };

  return {
    handleResourceDelete,
    handleConnectionDelete,
    setConnection,
    setResource,
  };
};

export const useResourceEdit = (apps) => {
  const { appname } = useParams();
  const {
    applications,
    setComponentEvent,
    dropComponentEvent, 
  } = useEditor(apps);
  const { Confirm, queryState , selectedPage} = React.useContext(AppStateContext);

  const appData = applications.find((f) => f.path === appname);

  const handleEventChange = (componentID, event) => {
    setComponentEvent(appData.ID, selectedPage?.ID, componentID, event);
  };

  const handledEventDelete = async (componentID, eventID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this event?",
      "Confirm delete"
    );
    if (!ok) return;
    dropComponentEvent(appData.ID, selectedPage?.ID, componentID, eventID);
  };

  return {
    handleEventChange,
    handledEventDelete,
    setComponentEvent,
    dropComponentEvent, 
  };

}

const Editor = ({ applications: apps = {} }) => {
  const { appname, pagename } = useParams();
  const {
    applications,
    setComponentProp,
    setPageState,
    setComponentEvent,
    dropComponent,
    setComponentName,
    dropPageState,
    setComponentStyle,
    setPageProps,
    addComponent,
    setResource,
    dropComponentEvent,
    setComponentParent,
    setPageScript,
    dropPageScript,
    dropResource,
    dropConnection,
    setConnection,
    setPage, 
    duplicatePage,
    importComponent,
    dropPage,setTheme, 
    dropTheme, 
    setPageEvent,
    setResourceEvent, 
    dropResourceEvent,
    setPageParent,
    setParameter, 
    dropParameter,
    setComponentCustomName,
    promotePageScript,
    pasteComponentProps
  } = useEditor(apps);
  const [drawerState, setDrawerState] = React.useState({
    stateOpen: false,
    scriptOpen: false,
    connectOpen: false,
  });

  
  const navigate = useNavigate(); 
  const { handleResourceDelete, handleConnectionDelete } = useConnectionEdit(apps);
  const { copy, copied } = useClipboard();
  const [ collapsed, setCollapsed ] = React.useState({
    left: false,
    right: false,
  });
  const [ showTabs,  setShowTabs ] = React.useState(true);
  const [ expandedNodes,  setExpandedNodes ] = React.useState({});
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
    disableLinks: false, 
    showSettings: false,  
    message: 'Unknown action', 
    showTrace: false,  
  });

  const [ 
    setJSON, 
    setShowLib, 
    setLoaded, 
    setContentFilter ,
    setHilit
  ] = [ 'json', 'showLib', 'loaded', 'contentFilter', 'hilit']
    .map(name => (value) => setEditorState(key => ({ ...key, [name]: value })));

  const { json, hilit, showLib, loaded, contentFilter } = editorState;
  const { stateOpen, scriptOpen, connectOpen } = drawerState;

  const {
    loud,
    setLoud, 
    selectedPage,
    queryState = {},
    setQueryState,
    setAppData,
    CreateComponent,
    Shout,
    Alert,
    Confirm,
    Prompt,
    pageClientState, 
    setPageClientState,
    pageResourceState,  
    setPageResourceState,
    applicationClientState, 
    pageModalState,
    Library,
    uploadApplicationConfig,
    dirty,
    setDirty, 
    setShowTrace,
    showTrace,
    appContext,
    pageTabs,   
    

  } = React.useContext(AppStateContext);

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


  if (!applications.find) {
    return <>error</>;
  }
  const appData = appContext;// applications.find((f) => f.path === appname);
 

  const componentParent = selectedPage || appContext;

  const path = ["apps", appData.path].concat(
    !selectedPage?.PagePath ? [] : selectedPage.PagePath
  );

  const handleStyleChange = (componentID, label, value, selector) => {
    // alert (selector) //white
    setComponentStyle(
      appData.ID,
      selectedPage?.ID,
      componentID,
      label,
      value,
      selector
    );
  };

  const handleSettingsPaste =(componentID, type, props) => {
    pasteComponentProps(appData.ID, selectedPage?.ID, componentID, type, props)
  }

  const handleSettingsChange = (componentID, label, value) => { 
    setComponentProp(appData.ID, selectedPage?.ID, componentID, label, value);
  };

  const handleNameChange = async (componentID, old) => {
    const name = await Prompt(
      `Enter a new name for "${old}"`,
      "Rename component",
      old
    );
    if (!name) return;
    setComponentName(appData.ID, selectedPage?.ID, componentID, name);
  };

  const handleStateChange = (stateID, label, value, type) => { 
    const update =  {}
 
    label?.split(',').map(key => {
      setPageState(appData.ID, selectedPage?.ID, stateID, key, value, type, pg => {
        setQueryState(s => ({
          ...s,
          page: pg
        }))
      });
      Object.assign(update, {[key]: value});
    })
    setPageClientState(s => ({
      ...s, 
      ...update
    }))
    ;
  };

  const handlePageMove = async (pageID) => {
    setPageParent(appData.ID, selectedPage?.ID, pageID)
  }

  const handleComponentImport = async (sourceID, destID, componentID) => {
    importComponent(appData.ID, sourceID, destID, componentID);
  }

  const handleScriptChange = async (
      scriptID, name, code, 
     { fn, existingName, pageID , parentID, comment }
    ) => {
      //  alert(JSON.stringify({scriptID,name,code,parentID},0,2))
    const scriptName = name || await Prompt('Enter a name for the script', 'Name new script', existingName);
    if (!scriptName) return;
    setPageScript(appData.ID, pageID || selectedPage?.ID, scriptID, scriptName, code, fn, parentID, comment);
  };

  const handlePropChange = (props, state) => {
    if (state) {
      return setPageEvent(appData.ID, selectedPage?.ID, state); //alert (JSON.stringify(state))
    }
    setPageProps(appData.ID, selectedPage?.ID, props);
  };

  const handleEventChange = (componentID, event, type) => {
    const command = type === 'connection' 
      ? setResourceEvent
      : setComponentEvent
      // alert (command.toString())
      command(appData.ID, selectedPage?.ID, componentID, event);
  };

  const handledEventDelete = async (componentID, eventID, type, confirmed) => {
    const command = type === 'connection' 
      ? dropResourceEvent
      : dropComponentEvent
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this event?",
      "Confirm delete"
    );
    if (!ok) return;
    command(appData.ID, selectedPage?.ID, componentID, eventID);
  };

  const handleThemeChange = async (themeID, themeName, theme) => {
    const ok = themeName || await Prompt('Enter a theme name');
    if (!ok) return;
    setTheme (appData.ID, theme, ok)
  };

  const handleStateDrop = (stateID) => {
    dropPageState(appData.ID, selectedPage?.ID, stateID);
  };

  const handleMove = (componentID, parentID) => {
    setComponentParent(appData.ID, selectedPage?.ID, componentID, parentID);
  };

  const handleCustomName = async (componentID) => {
    const customName = await Prompt('Enter name for custom component', 'Name component');
    if (!customName) return 
    setComponentCustomName(appData.ID, selectedPage?.ID, componentID, customName);
  }

  const createPage = async (pageID, pageName) => {
    const PageName = pageName || await Prompt('Enter a name for your page', 'Create Page');
    if (!PageName) return;
    const page = {
      PageName,
      PagePath: PageName.toLowerCase().replace(/\s/g, '-'),
      pageID,
      components: [],
    }
    setPage(appData.ID, page, pg => { 
      setQueryState((s) => ({
        ...s,
        page: pg,
        pageLoaded: false,
        appLoaded: false, 
      }))
    });
  }

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

  const handleScriptPromote = async (scriptID) => {
    const ok = await Confirm(
      <Stack>
        Are you sure you want to promote this script?
        <Text small active error>This will remove it from the current page</Text>
      </Stack>,
      "Confirm promote"
    );
    if (!ok) return;
    promotePageScript(appData.ID, selectedPage?.ID, scriptID)
  }

  const handleDropScript = async (scriptID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this script?",
      "Confirm delete"
    );
    if (!ok) return;
    dropPageScript(appData.ID, selectedPage?.ID, scriptID);
  };

  const handlePageDelete = async (pageID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this page?",
      "Confirm delete"
    );
    if (!ok) return;
    dropPage(appData.ID, pageID);
  };

  const handleDropComponent = async (componentID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this component?" + componentID,
      "Confirm delete"
    );
    if (!ok) return;
    dropComponent(appData.ID, selectedPage?.ID, componentID);
  };

  const quickComponent = async (selected, componentID) => {
    const max =
      (componentParent.components || []).filter((f) => f.ComponentType === selected)
        .length + 1;
    const name = `${selected}-${max}`;
    return appendComponent({
      selected,
      name,
    }, componentID);
  };

  const appendComponent = (ok, componentID, options) => { 
    const component = {
      ComponentType: ok.selected,
      ComponentName: ok.name,
      componentID,
      children: Library[ok.selected].allowChildren, // , ok.selected === 'Box' ,
      state: [],
      styles: [],
      events: [],
      settings: [],
      scripts: [],
      data: [],
    };
   const res = addComponent(appData.ID, selectedPage?.ID, component, {...options, 
    fn: (comp) => {
      // return Alert(<pre>{JSON.stringify(comp,0,2)}</pre>)
      setQueryState(s => ({...s, selectedComponent: comp}));
    }}); 
  };

  const createComponent = async (componentID, options) => {
    const ok = await CreateComponent(componentParent.components);
    if (!ok) return;
    appendComponent(ok, componentID, options);
  };

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
    const clickedPage = !!name && appData.pages?.find((f) => f.PageName === name);
 

    if (!clickedPage) { 
      return navigate(`/edit/${appData.path}`);
    }
 

    const suffix = !parameters 
      ? ''
      : `/${Object.values(parameters).join('/')}`
 
      navigate(`/edit/${appData.path}/${clickedPage.PagePath}${suffix}`);
  }

  const componentTabs = queryState.tabs?.[selectedPage?.PageName];

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

  const pageTree =  <PageTree
    tree={appData.pages}
    selected={selectedPage?.PageName}
    setPage={createPage}
    dropPage={handlePageDelete}
    duplicatePage={id => duplicatePage(appData.ID, id)}
    onClick={handlePageNavigate}
  />;

  const applicationTreeProps = {  
    selectedComponent: queryState.selectedComponent,
    preview: true,
    queryState,
    setQueryState,  
    hilit
  }

  const contentTree =  <ContentTree
    filter={contentFilter}
    onDrop={handleDropComponent}
    onNameChange={handleNameChange}
    onCustomName={handleCustomName}
    quickComponent={quickComponent}
    selectComponent={selectComponent}
    expandedNodes={expandedNodes}
    setExpandedNodes={setExpandedNodes}
    onCreate={(type, options) => createComponent(type, options)}
    tree={componentParent?.components}
  />

  const componentType = Library[queryState.selectedComponent?.ComponentType];

  const recurse = (page, selected, open = false) => { 
 

    if (!selected) {
      return open;
    }
    
    const parents = page?.components?.filter(f => f.ID === selected.componentID);
 

    if (parents?.length) {
      const out = parents.map(kid => { 
        return recurse(page, kid, open || kid.ComponentType === 'Drawer' )
      }) 
      const ok = out.some(f => !!f);
      return ok
    }

    return open || page.ComponentType === 'Drawer';
  }
  
  const isInApplicationScope = !!componentParent.Name
  const parentOpen = recurse(componentParent, queryState.selectedComponent) ; 


  const navigationPane = 
          <Pane
            item
            side="left"
            state={collapsed.left ? "-off" : ""}
            sx={{ borderRight: 1, borderColor: "divider" }}
            thin={collapsed.left ? 1 : 0}
          >
 
            <Stack sx={{ p: collapsed.left ? 0 : 1, height: 300 }}>
              <Flex nowrap spacing={1}>
                {!collapsed.left && (
                  <>
                   {!!selectedPage?.PageName && <Text small>
                      <b>Page</b>
                    </Text>}
                    <QuickMenu
                      small
                      caret
                      options={appData?.pages?.map((f) => f.PageName)}
                      title="Choose Page"
                      label={selectedPage?.PageName || <b>{ appData.Name}</b>}
                      onChange={handlePageNavigate}
                    />

                    <Spacer /> 
                    <PopoverPrompt 
                    onChange={(value) => !!value && createPage(null, value)}
                      label="Enter a name for your page" endIcon={<Add />} >Create</PopoverPrompt>
                  </>
                )}

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
  
               <Stack>
                  <RotateButton
                    deg={!parentOpen ? 270 : 90}
                    onClick={() =>
                      setCollapsed((s) => ({ ...s, left: !collapsed.left }))
                    }
                  >
                    {collapsed.left ? <ExpandMore /> : <Close />}
                  </RotateButton>
                  
                  {collapsed.left && <>
                  <RotateButton 
                    onClick={handlePopoverClick(pageTree)}
                  >
                    <Article />
                  </RotateButton>
                  <RotateButton 
                    onClick={handlePopoverClick(contentTree)}
                  >
                    <Newspaper />
                  </RotateButton>
                  </>}
               </Stack>
              </Flex>

              {!collapsed.left && (
                <>
                  <Box sx={{ border: "solid 1px gray", height: 240, overflow: 'auto', p: 1 }}>
                   {pageTree}
                  </Box>
                </>
              )}
            </Stack>

            {!collapsed.left && (
              <>
                <Divider />

                <Stack sx={{ p: 1, height: "calc(100vh - 404px)" }}>
                  {!!componentParent && (
                    <Flex spacing={1}>
                      <Flex fullWidth>
                        <Text small>
                          <b>Content</b>
                        </Text>

                        <Spacer />
                        <QuickMenu
                          onChange={quickComponent}
                          options={libraryKeys}
                          icons={libraryKeys.map(
                            (e) => Icons[Library[e].Icon]
                          )}
                          label={<TextBtn endIcon={<Add />}>Add</TextBtn>}
                        />
                        {/* <TextBtn onClick={() => createComponent()} endIcon={<Add />}>Add</TextBtn> */}
                      </Flex>
                    </Flex>
                  )}
                  {!!componentParent?.components && <>
                  
                 <Box sx={{mb: 1}}>
                 {/* <SearchBox label="Search" size="small" onChange={e => setContentFilter(e.target.value)} 
                      value={contentFilter} /> */}
                 </Box>
                  {contentTree}
                  </>
                    
                  }
                </Stack>
              </>
            )}
          </Pane>;

//  return JSON.stringify(editorState)
  return (
    <EditorStateContext.Provider value={{ 
      appData ,
      setDrawerState,
      ...drawerState,
      setCollapsed,
      collapsed,
      setEditorState,
      editorState,
      hilit


      }}>
      <Flex spacing={0} baseline fullWidth>
        <Stack
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            height: "100vh",
            width: 48,
            color: "white",
            backgroundColor: (t) => t.palette.primary.dark,
          }}
        >
          <Box>
            <IconButton href="/" sx={{ mt: 4 }} color="inherit">
              <Home />
            </IconButton>
          </Box>

          <Stack>
          <IconButton
              color="inherit"
              sx={{ mt: 1 }}
              onClick={() => {
                setDrawerState((s) => ({ ...s, 
                  connectOpen: !1 , 
                  scriptOpen: !1 , 
                  connectOpen: !1 
                }));
                setShowTrace(true);
              }}
            >
              <Gamepad />
            </IconButton>

            {!!componentParent && <>
                        <IconButton
              color="inherit"
              sx={{ mt: 1 }}
              onClick={() => {
                setDrawerState((s) => ({ ...s, connectOpen: !connectOpen }));
              }}
            >
              <AutoStories />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ mt: 1 }}
              onClick={() => {
                setDrawerState((s) => ({ ...s, scriptOpen: !scriptOpen }));
              }}
            >
              <Code />
            </IconButton>
            </>}

            <IconButton
              color="inherit"
              sx={{ mt: 1, mb: 4 }}
              onClick={() => {
                setDrawerState((s) => ({ ...s, stateOpen: !stateOpen }));
              }}
            >
              <RecentActors />
            </IconButton>
          </Stack>
        </Stack>
        <Grid container >

          <Pane
            short
            item
            xs={12}
            sx={{ borderBottom: 1, borderColor: "divider", whiteSpace: 'nowrap' }}
          >
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
                variant={isInApplicationScope ? "outlined" : "filled" } label={<b>{appData.Name}</b>} />

              <Flex nowrap>
                <QuickMenu
                  small
                  caret
                  value={getMenuOption()}
                  options={menuOptions.map((f) => f.name)}
                  title="App Menu"
                  label="Menu"
                  onChange={(n) => {
                    if (!n) return;
                    const { action } = menuOptions.find((f) => f.name === n);
                    action();
                  }}
                />
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
              {/* [{selectedPage?.dirty?.toString()}] */}
              {/* <FormControlLabel
                sx={{ m: 1 }}
                label={<Text small>Show JSON</Text>}
                control={
                  <Switch
                    checked={json}
                    size="small"
                    onChange={(e) => setJSON(e.target.checked)}
                  />
                }
              /> */}
              <TextBtn
                variant="contained"
                endIcon={<Save />}
                disabled={!dirty}
                sx={{ cursor: !copied ? "pointer !important" : "progress" }}
                onClick={() => {
                  // copy(JSON.stringify(applications, 0, 2));
                  uploadApplicationConfig(appData);
                  setDirty(false);
                }}
              >
                Save
              </TextBtn>
            </Flex>
          </Pane>
 
         {!!pageTabs && !!Object.keys(pageTabs).length && <Pane   
            short
            item
            xs={12}
            sx={{ borderBottom: 1, borderColor: "divider", whiteSpace: 'nowrap' }}>

              <Flex sx={{pl: 1}}>
                <Text small active>Pages</Text>
                <Tabs 
                onChange={(event, index) => {
                  const name = Object.keys(pageTabs)[index];
                  const tab = pageTabs[name];
                  handlePageNavigate(name, tab.parameters); 
                }}
                value={
               Math.max(0,  Object.keys(pageTabs)
               .map(tab => pageTabs[tab].path)
               .indexOf(selectedPage?.PagePath))
              } sx={{minHeight: 24, ml: 1, mb: 0 }} >
              {Object.keys(pageTabs)
              .map(tab => <TabButton key={tab} label={tab} icon={<TinyButton 
                onClick={() => handlePageNavigate() } icon={Close} />} iconPosition="end" />)}
            </Tabs>



              </Flex>
      
          </Pane>}
          
          {!(componentType?.modal || parentOpen) && <>
            {navigationPane}
          </>}

          <Pane wide {...collapsed} item sx={{ p: 1 }} 
       
            state={center_state}
            side="work">
 

            <Collapse in={showLib && !json}>
             {!!showLib && <LibraryTree onClose={closeLib} />}
            </Collapse>

            <Collapse in={json && !showLib}>
              {!!json &&  <JsonView json={appData}/>} 
            </Collapse>
  
            <Collapse in={!json && !showLib}>

              {!!componentTabs && showTabs &&  <Box sx={{mb: 1, borderBottom: 1, borderColor: 'divider'}}>
                <Tabs  sx={{minHeight: 24, ml: 1, mb: 0 }} 
                onChange={(e, index) => selectComponentByID(Object.keys(componentTabs)[index])}
                    value={Object.keys(componentTabs).indexOf(queryState.selectedComponent?.ID)}>
                  {Object.keys(componentTabs).map((tab) => <TabButton 
                    icon={<TinyButton 
                      onClick={() => selectComponentByID(tab, 1) } icon={Close} />} 
                    iconPosition="end"
                    key={tab} label={componentTabs[tab]} />)}
                </Tabs>
                </Box>}
 
            <ApplicationTree {...applicationTreeProps} application={appData} />

           {  !!selectedPage &&   <ComponentTree  />}
                
            </Collapse>
          </Pane>
        {(componentType?.modal || parentOpen) && <>
          {navigationPane}
        </>}
          <Pane
            item
            side="right"
            state={collapsed.right ? "-off" : ""}
            sx={{ borderLeft: 1, borderColor: "divider" }}
          >
 
            {!!componentParent && <ComponentPanel  />}
          </Pane>
        </Grid>
      </Flex>

      
      <ConsoleDrawer
        handleSwitch={ state => setDrawerState(s => ({ ...s, ...state}))}
       />

      <ScriptDrawer   />

      <ConnectionDrawer

        appID={appData.ID}
        application={appData}
        selectedPage={selectedPage}
        connections={appData.connections}
        resources={appData.resources}

        setResource={setResource}
        setConnection={setConnection}
        dropResource={handleResourceDelete}
        dropConnection={handleConnectionDelete}
        onEventChange={handleEventChange}
        onEventDelete={handledEventDelete}
        onStateChange={handleStateChange}

        handleSwitch={ state => setDrawerState(s => ({ ...s, ...state}))}
        open={connectOpen}
        handleClose={() => {
          setDrawerState((s) => ({ ...s, connectOpen: false }));
        }}
      />

      <StateDrawer
        handleDrop={handleStateDrop}
        handleChange={handleStateChange}
        handleSwitch={ state => setDrawerState(s => ({ ...s, ...state}))}
        state={componentParent?.state}
        open={stateOpen}
        handleClose={() => {
          setDrawerState((s) => ({ ...s, stateOpen: false }));
        }}
      />
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


  const { appLoaded, pageLoaded} = queryState

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
