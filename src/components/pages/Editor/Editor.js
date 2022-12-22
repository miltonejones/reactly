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

const BorderButton = styled(IconButton)(({ active , theme}) => ({
  // borderWidth: active ? 1  : 0,
  outline: !active ? '' : ('solid 2px ' + theme.palette.primary.main)
}))

const Pane = styled(Grid)(({ short, wide, left, right, thin, state="", side, tool }) => {
  const args = {
    minWidth: `var(--${side}${state}-width)`,  //  wide ? "calc(100vw - var(--workspace-width))" : "var(--sidebar-width)",
    maxWidth: `var(--${side}${state}-width)`  // wide ? "calc(100vw - var(--workspace-width))" : "var(--sidebar-width)",
  };
  // if (thin) {
  //   Object.assign(args, {
  //     minWidth: 60,
  //     maxWidth: 60,
  //   });
  // } else if (left && right && wide) {
  //   Object.assign(args, {
  //     minWidth: "calc(100vw - 180px)",
  //     maxWidth: "calc(100vw - 180px)",
  //   });
  // } else if ((left || right) && wide) {
  //   Object.assign(args, {
  //     minWidth: "calc(100vw - 510px)",
  //     maxWidth: "calc(100vw - 510px)",
  //   });
  // }

  return {
    // outline: wide ? "" : "dotted 1px green",
    height: short ? 56 : "calc(100vh - 64px)",
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
  const { appname } = useParams();
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
    dropPage,setTheme, dropTheme, setPageEvent,
    setResourceEvent, dropResourceEvent,
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
    pageError: null,  
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
    getPageResourceState,
    setPageResourceState,
    applicationClientState, 
    pageModalState,
    Library,
    commitProg,
    dirty,
    setDirty,
    setPageError,
    setShowTrace,
    showTrace,

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
  const appData = applications.find((f) => f.path === appname);

  const componentParent = selectedPage || appData;

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
  // alert(JSON.stringify({label, value}, 0, 2))
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

  const handleScriptChange = async (scriptID, name, code, fn, existingName, pageID) => {
    const scriptName = name || await Prompt('Enter a name for the script', 'Name new script', existingName);
    if (!scriptName) return;
    setPageScript(appData.ID, pageID || selectedPage?.ID, scriptID, scriptName, code, fn);
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
        pageError: false
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
        {JSON.stringify(pageModalState, 0, 2)}
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

  const componentTreeProps = {
    loud,
    setLoud,
    pageClientState, 
    setPageClientState,
    setEditorState,
    editorState,
    pageResourceState, 
    getPageResourceState,
    setPageResourceState, 
  };

  const handlePageNavigate = name => {
    const clickedPage = !!name && appData.pages.find((f) => f.PageName === name);
    if (!clickedPage) return navigate(`/edit/${appData.path}`);
        setPageError(null)
    navigate(`/edit/${appData.path}/${clickedPage.PagePath}`);
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
    onCreate={(type, options) => createComponent(type, options)}
    tree={componentParent?.components}
  />

  const componentTabs = queryState.tabs?.[selectedPage?.PageName];

  const selectComponentByID = (ID, on) => {
    const component = componentParent.components.find(f => f.ID === ID);
    !!component && selectComponent(component, on);
  }
 

  const selectComponent = (component, on) => {

    setQueryState(s => {
      if (!s.tabs) {
        Object.assign(s, { tabs: {}})
      }

      Object.assign(s.tabs, {
        [selectedPage.PageName]: {
          ...s.tabs[selectedPage.PageName],
          [component.ID]: `${component.ComponentType}: ${component.ComponentName}`
        }
      })

      if (on) {
        delete s.tabs[selectedPage.PageName][component.ID]
      }

      return {...s, selectedComponent: on ? null :  component};
    });

  }

  const componentType = Library[queryState.selectedComponent?.ComponentType];

  const recurse = (page, selected, open = false) => { 
 

    if (!selected) {
      return open;
    }
    
    const parents = page?.components.filter(f => f.ID === selected.componentID);
 

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
                      options={appData.pages.map((f) => f.PageName)}
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
                 <SearchBox label="Search" size="small" onChange={e => setContentFilter(e.target.value)} 
                      value={contentFilter} />
                 </Box>
                  {contentTree}
                  </>
                    
                  }
                </Stack>
              </>
            )}
          </Pane>;


  return (
    <EditorStateContext.Provider value={{ 
      appData 
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
                  
              <Addressbox value={`/${path.join("/")}`}  
                queryState={queryState}
                setQueryState={setQueryState}
                selectedPage={selectedPage}
              />

             <BorderButton active={showLib} disabled={!!json} onClick={() => closeLib()}>
                <Construction />
              </BorderButton>

              <BorderButton active={json} disabled={showLib} onClick={() => setJSON(!json)}>
                <Code />
              </BorderButton>

              <IconButton
                sx={{ border: 1, borderColor: "divider" }}
                size="small"
                onClick={() => {
                  setQueryState(null);
                  setAppData(null);
                  window.location.reload();
                }}
                variant="outlined"
              >
                <Sync />
              </IconButton>
              
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
                  commitProg(appData);
                  setDirty(false);
                }}
              >
                Save
              </TextBtn>
            </Flex>
          </Pane>
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

                <ComponentTree
                  
                  {...componentTreeProps}
                  loadID={uniqueId()}
                  onEventDelete={handledEventDelete}
                  hilit={hilit}
                  themes={appData?.themes || []}
                  appContext={appData}
                  loaded={loaded}
                  setLoaded={setLoaded}
                  preview
                  selectedPage={selectedPage}

                />
                
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
 
            {!!componentParent && (
              <ComponentPanel
                onCollapse={() =>
                  setCollapsed((s) => ({ ...s, right: !collapsed.right }))
                } 
                onSettingsPaste={handleSettingsPaste}
                setEditorState={setEditorState} 
                editorState={editorState}
                onPageMove={handlePageMove}
                connections={appData.connections}
                resources={appData.resources}
                themes={appData.themes}
                application={appData}
                onMove={handleMove}
                Confirm={Confirm}
                collapsed={collapsed.right}
                selectedPage={selectedPage}
                onPropChange={handlePropChange}
                onComponentImport={handleComponentImport}
                onThemeChange={handleThemeChange}
                onStyleChange={handleStyleChange}
                onSettingsChange={handleSettingsChange}
                onEventChange={handleEventChange}
                onEventDelete={handledEventDelete}
                component={queryState.selectedComponent}
              />
            )}
          </Pane>
        </Grid>
      </Flex>
      <ConsoleDrawer
        handleSwitch={ state => setDrawerState(s => ({ ...s, ...state}))}
       />

      <ScriptDrawer
        scripts={componentParent?.scripts}
        application={appData}
        handleDrop={handleDropScript}
        handleChange={handleScriptChange}
        handleScriptPromote={handleScriptPromote}
        handleSwitch={ state => setDrawerState(s => ({ ...s, ...state}))}
        open={scriptOpen}
        handleClose={() => {
          setDrawerState((s) => ({ ...s, scriptOpen: false }));
        }}
      />

      <ConnectionDrawer
        appID={appData.ID}
        application={appData}
        selectedPage={selectedPage}
        dropResource={handleResourceDelete}
        dropConnection={handleConnectionDelete}
        setResource={setResource}
        setConnection={setConnection}
        handleSwitch={ state => setDrawerState(s => ({ ...s, ...state}))}
        connections={appData.connections}
        resources={appData.resources}
        onEventChange={handleEventChange}
        onEventDelete={handledEventDelete}
        onStateChange={handleStateChange}
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverClick =  (event) => {  
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => { 
    setAnchorEl(null); 
  };

  const handleButtonClick = (event) => {
    if (selectedPage.parameters && 
        Object.keys(selectedPage.parameters).length) {
      return handlePopoverClick(event);
    }
    window.open(value)
  }


  const openPage = () => {
    const path = [value, Object.values(selectedPage?.parameters).join('/')].join('/'); 
    window.open(path)
    handlePopoverClose ()
  }

  const { appLoaded, pageLoaded} = queryState

  const startAdornment = <InputAdornment position="start">URL</InputAdornment>;

  const adornment = {
    startAdornment,
    endAdornment: (
      <InputAdornment
        sx={{ cursor: "pointer" }}
        onClick={handleButtonClick}
        position="end"
      >
        <>
        <Text small active error={!pageLoaded}>Loaded</Text>
        <Switch size="small" checked={appLoaded} />app  
        <Switch size="small" checked={pageLoaded} />page 
        </>
        <Launch />
        Open

      </InputAdornment>
    ),
  };

  return (
   <>
 
   <TextField
      size="small"
      disabled
      {...props}
      sx={{ width: "calc(100vw - 700px)" }}
      value={value}
      autoComplete="off"
      onChange={onChange}
      InputProps={adornment}
      autoFocus
    />
    
  {!!selectedPage?.parameters && <Popover 
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose} 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
     <Box sx={{width: 300, p: 2}}>
      <Text small><b>Set page parameters</b></Text>
     </Box>
      <Divider />
     <Box sx={{width: 300, p: 2}}>
      {Object.keys(selectedPage?.parameters).map(param => <Flex sx={{mt: 1}}>
        {param} <TextInput 
            size="small"
            onChange={e => {
              setQueryState(s => ({
                ...s,
                page: {
                  ...s.page,
                  parameters: {
                    ...s.page.parameters,
                    [param]: e.target.value 
                  }
                }
              }))
            }}
            value={selectedPage?.parameters[param]} />
      </Flex>)}

      <Flex sx={{mt: 1}}>
        <Spacer />
        <TextBtn
          onClick={openPage}
          variant="outlined"
          startIcon={<Launch />}
        >Open</TextBtn>
      </Flex>
     </Box>

    </Popover>}

    
    </> 
  );
};

Editor.defaultProps = {};
export default Editor;
