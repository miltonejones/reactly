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
  Text
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
  Newspaper, Widgets
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
import { ChipBox } from "../..";
import { ApplicationTree } from "../..";
import StatusPane from "../../StatusPane/StatusPane";
import { uniqueId } from "../../library/util";
import { ConsoleDrawer } from "../..";

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
  const { Confirm, queryState } = React.useContext(AppStateContext);

  const appData = applications.find((f) => f.path === appname);

  const handleEventChange = (componentID, event) => {
    setComponentEvent(appData.ID, queryState.page?.ID, componentID, event);
  };

  const handledEventDelete = async (componentID, eventID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this event?",
      "Confirm delete"
    );
    if (!ok) return;
    dropComponentEvent(appData.ID, queryState.page?.ID, componentID, eventID);
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
    setComponentCustomName
  } = useEditor(apps);
  const [drawerState, setDrawerState] = React.useState({
    stateOpen: false,
    scriptOpen: false,
    connectOpen: false,
  });

  const { handleResourceDelete, handleConnectionDelete } = useConnectionEdit(apps);
  const { copy, copied } = useClipboard();
  const [ collapsed, setCollapsed ] = React.useState({
    left: false,
    right: false,
  });
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
     
    setShowTrace,
    showTrace,

  } = React.useContext(AppStateContext);

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

  const componentParent = queryState.page || appData;

  const path = ["apps", appData.path].concat(
    !queryState.page?.PagePath ? [] : queryState.page.PagePath
  );

  const handleStyleChange = (componentID, label, value, selector) => {
    // alert (selector) //white
    setComponentStyle(
      appData.ID,
      queryState.page?.ID,
      componentID,
      label,
      value,
      selector
    );
  };

  const handleSettingsChange = (componentID, label, value) => {
  // alert(JSON.stringify({label, value}, 0, 2))
    setComponentProp(appData.ID, queryState.page?.ID, componentID, label, value);
  };
  const handleNameChange = async (componentID, old) => {
    const name = await Prompt(
      `Enter a new name for "${old}"`,
      "Rename component",
      old
    );
    if (!name) return;
    setComponentName(appData.ID, queryState.page?.ID, componentID, name);
  };

  const handleStateChange = (stateID, label, value, type) => { 
    const update =  {}
 
    label?.split(',').map(key => {
      setPageState(appData.ID, queryState.page?.ID, stateID, key, value, type, pg => {
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
    setPageParent(appData.ID, queryState.page?.ID, pageID)
  }

  const handleComponentImport = async (sourceID, destID, componentID) => {
    importComponent(appData.ID, sourceID, destID, componentID);
  }

  const handleScriptChange = async (scriptID, name, code, fn, existingName, pageID) => {
    const scriptName = name || await Prompt('Enter a name for the script', 'Name new script', existingName);
    if (!scriptName) return;
    setPageScript(appData.ID, pageID || queryState.page?.ID, scriptID, scriptName, code, fn);
  };

  const handlePropChange = (props, state) => {
    if (state) {
      return setPageEvent(appData.ID, queryState.page?.ID, state); //alert (JSON.stringify(state))
    }
    setPageProps(appData.ID, queryState.page?.ID, props);
  };

  const handleEventChange = (componentID, event, type) => {
    const command = type === 'connection' 
      ? setResourceEvent
      : setComponentEvent
      // alert (command.toString())
      command(appData.ID, queryState.page?.ID, componentID, event);
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
    command(appData.ID, queryState.page?.ID, componentID, eventID);
  };

  const handleThemeChange = async (themeID, themeName, theme) => {
    const ok = themeName || await Prompt('Enter a theme name');
    if (!ok) return;
    setTheme (appData.ID, theme, ok)
  };

  const handleStateDrop = (stateID) => {
    dropPageState(appData.ID, queryState.page?.ID, stateID);
  };

  const handleMove = (componentID, parentID) => {
    setComponentParent(appData.ID, queryState.page?.ID, componentID, parentID);
  };

  const handleCustomName = async (componentID) => {
    const customName = await Prompt('Enter name for custom component', 'Name component');
    if (!customName) return 
    setComponentCustomName(appData.ID, queryState.page?.ID, componentID, customName);
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
        appLoaded: false
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
      name: `Loud logging`,
      action: () => setLoud(!loud),
      on: loud,
    },
    {
      name: "Show client state",
      action: () => {
        const { records, ...rest} = queryState.page ? pageClientState : applicationClientState;
        Alert(<Json>
        {JSON.stringify(rest, 0, 2)}
      </Json>, queryState.page?.PageName + ' Client State')}
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

  const handleDropScript = async (scriptID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this script?",
      "Confirm delete"
    );
    if (!ok) return;
    dropPageScript(appData.ID, queryState.page?.ID, scriptID);
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
    dropComponent(appData.ID, queryState.page?.ID, componentID);
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
   const res = addComponent(appData.ID, queryState.page?.ID, component, {...options, 
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

  const pageTree =  <PageTree
    tree={appData.pages}
    selected={queryState.page?.PageName}
    setPage={createPage}
    dropPage={handlePageDelete}
    duplicatePage={id => duplicatePage(appData.ID, id)}
    onClick={(name) =>
      setQueryState((s) => ({
        ...s,
        page: appData.pages.find((f) => f.PageName === name),
        pageLoaded: false,
       // appLoaded: false
      }))
    }
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

              <Chip color="primary" variant="outlined" label={<b>{appData.Name}</b>} />

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
                  
                  <IconButton onClick={() => closeLib()}>
                    <Widgets />
                  </IconButton>

              <Addressbox value={`/${path.join("/")}`}  
                queryState={queryState}
                setQueryState={setQueryState}
                selectedPage={queryState.page}
              />

              <FormControlLabel
                sx={{ m: 1 }}
                label={<Text small>Show JSON</Text>}
                control={
                  <Switch
                    checked={json}
                    size="small"
                    onChange={(e) => setJSON(e.target.checked)}
                  />
                }
              />
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
            </Flex>
          </Pane>
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
                    <Text small>
                      <b>Page</b>
                    </Text>
                    <QuickMenu
                      small
                      caret
                      options={appData.pages.map((f) => f.PageName)}
                      title="Choose Page"
                      label={queryState.page?.PageName || "none selected"}
                      onChange={(p) => {
                        setQueryState((s) => ({
                          ...s,
                          page: appData.pages.find((f) => f.PageName === p),
                        }));
                      }}
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
                    deg={collapsed.left ? 270 : 90}
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
          </Pane>
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
                  selectedPage={queryState.page}

                />
                
            <ApplicationTree {...applicationTreeProps} application={appData} />

            </Collapse>
          </Pane>
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
                selectedPage={queryState.page}
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
        handleSwitch={ state => setDrawerState(s => ({ ...s, ...state}))}
        open={scriptOpen}
        handleClose={() => {
          setDrawerState((s) => ({ ...s, scriptOpen: false }));
        }}
      />

      <ConnectionDrawer
        appID={appData.ID}
        application={appData}
        selectedPage={queryState.page}
        dropResource={handleResourceDelete}
        dropConnection={handleConnectionDelete}
        setResource={setResource}
        setConnection={setConnection}
        handleSwitch={ state => setDrawerState(s => ({ ...s, ...state}))}
        connections={appData.connections}
        resources={appData.resources}
        onEventChange={handleEventChange}
        onEventDelete={handledEventDelete}
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
      sx={{ width: "calc(100vw - 740px)" }}
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
