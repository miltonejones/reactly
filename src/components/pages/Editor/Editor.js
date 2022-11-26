import React from 'react';
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
  Collapse
} from "@mui/material";
import { Flex, TextBtn, QuickMenu, Spacer, StateDrawer,RotateButton,
  ComponentPanel, ContentTree, PageTree, ComponentTree } from "../..";
import { ExpandMore, Close, Launch, Save, Sync, Add, Home, AutoStories,AppRegistration, RecentActors, Code } from "@mui/icons-material";
import { AppStateContext, useNavigation } from '../../../hooks/AppStateContext';
import { useParams } from "react-router-dom";
import { useEditor } from '../../../hooks/useEditor';
import { Json } from '../../../colorize'; 
import Library from '../../library';
 
const Pane = styled(Grid)(({ short, wide, left, right, thin, tool }) => {

  const args = {
    minWidth: wide ? "calc(100vw - 830px)" : 380,
    maxWidth:  wide ? "calc(100vw - 830px)" : 380,
  };
  if (thin) {
    Object.assign(args, {
      minWidth: 60,
      maxWidth: 60
    })
  } else if (left && right && wide) {
    Object.assign(args, {
      minWidth: "calc(100vw - 180px)"  ,
      maxWidth:  "calc(100vw - 180px)"  
    })
  } else if ((left || right) && wide) {
    Object.assign(args, {
      minWidth: "calc(100vw - 510px)"  ,
      maxWidth:  "calc(100vw - 510px)"  
    })
  }

  return  {
    // outline: wide ? "" : "dotted 1px green",
    height: short ? 56 : "calc(100vh - 64px)",
    transition: 'all .2s linear', 
    ...args,
    overflow: 'auto', 
  }
});

 
 
const Editor = ({ applications: apps = {} }) => {
  const { appname } = useParams();
  const { applications, setComponentProp, setPageState, setComponentEvent, dropComponent
    , setComponentName, dropPageState, setComponentStyle, setPageProps, addComponent,
    dropComponentEvent, setComponentParent } = useEditor(apps);
  const [ drawerState, setDrawerState] = React.useState({
    stateOpen: false
  })

  const [collapsed, setCollapsed] = React.useState({
    left: false,
    right: false,
  })

  const [json, setJSON] = React.useState(false)

  const { stateOpen } = drawerState;

 
  const { queryState = {}, setQueryState, CreateComponent,Shout, Confirm, Prompt  } = React.useContext(AppStateContext);

  if (!applications.find) {
    return <>error</>
  }
  const appData = applications.find(f => f.path === appname);
  
  const path = ['apps', appData.path].concat(!queryState.page?.PagePath ? [] : queryState.page.PagePath); 
  
  const handleStyleChange = (componentID, label, value) => {  
    setComponentStyle(appData.ID, queryState.page.ID, componentID, label, value);
  }

  const handleSettingsChange = (componentID, label, value) => { 
    setComponentProp(appData.ID, queryState.page.ID, componentID, label, value);
  }
  const handleNameChange = async (componentID, old) => {
    const name = await Prompt(`Enter a new name for "${old}"`, 'Rename component' , old);
    if (!name) return; 
    setComponentName(appData.ID, queryState.page.ID, componentID, name);
  }
  
  const handleStateChange = (stateID, label, value, type) => { 
    setPageState(appData.ID, queryState.page.ID, stateID, label, value, type);
  }
  const handlePropChange = (props) => { 
    setPageProps(appData.ID, queryState.page.ID, props);
  }

  const handleEventChange = (componentID, event) => { 
    setComponentEvent(appData.ID, queryState.page.ID, componentID, event);
  }

  const handleStateDrop = (stateID) => { 
    dropPageState(appData.ID, queryState.page.ID, stateID);
  }

  const handleMove = (componentID, parentID) => {
    setComponentParent(appData.ID, queryState.page.ID, componentID, parentID)
  }

  const menuOptions = [ 
    {
      name: 'Show Components',
      action: CreateComponent
    }, 
    {
      name: collapsed.left ? 'Show Navigation Panel' : 'Hide Navigation Panel',
      action: () => setCollapsed(s => ({...s, left: !s.left}))
    },
    {
      name: collapsed.right ? 'Show Settings Panel' : 'Hide Settings Panel',
      action: () => setCollapsed(s => ({...s, right: !s.right}))
    },
  ]

  const handleDropComponent = async (componentID) => {
    const ok = await Confirm('Are you sure you want to delete this component?', 'Confirm delete');
    if (!ok) return;
    dropComponent(appData.ID, queryState.page.ID, componentID)
  }

  const handledEventDelete = async (componentID, eventID) => { 
    const ok = await Confirm('Are you sure you want to delete this event?', 'Confirm delete');
    if (!ok) return;
    dropComponentEvent(appData.ID, queryState.page.ID, componentID, eventID) 
  }
 
  const createComponent = async (componentID, options) => {
    const ok = await CreateComponent();
    if (!ok) return;
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
      data: []
    }
    addComponent(appData.ID, queryState.page.ID, component, options); 
  }


 return (
   <>
      <Flex baseline fullWidth>
        <Stack sx={{justifyContent: 'space-between', alignItems: 'center',  height: '100vh', width: 48,
          color: 'white',
            backgroundColor: t => t.palette.primary.dark }}>

        <Box>
          <IconButton href="/" sx={{mt: 4}} color="inherit">
            <Home />
          </IconButton>
        </Box>
        
         <Stack>
          <IconButton color="inherit" sx={{mt: 1}}>
              <AutoStories />
            </IconButton>
            <IconButton color="inherit" sx={{mt: 1}}>
              <Code />
            </IconButton>
            <IconButton color="inherit" sx={{mt: 1, mb: 4}} onClick={() => {
              setDrawerState(s => ({...s, stateOpen: !stateOpen}))
            }}>
              <RecentActors />
            </IconButton>
         </Stack>
        </Stack>
        <Grid container>
          <Pane short item xs={12} sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Flex sx={{ p: 1 }}>

              <Flex sx={{borderRight: 1, borderColor: 'divider', pr: 2 , mr: 1}}>
                <AppRegistration />
                <b>Reactly</b>
              </Flex>

              <Chip label={appData.Name} />

              <Box>
                <QuickMenu small caret options={menuOptions.map(f => f.name)} title="App Menu" label="Menu" 
                    onChange={(n) => {
                      if((!n)) return;
                      const {action} = menuOptions.find(f => f.name === n)
                      action()
                    }}/>
              </Box>

              <Addressbox value={`/${path.join('/')}`} />

              <FormControlLabel
                  sx={{m: 1}}
                        label="Show JSON"
                        control={ <Switch 
                          checked={json}
                          size="small"
                          onChange={e => setJSON(e.target.checked)} 
                        />}
                      />
              <IconButton  
              sx={{ border: 1, borderColor: 'divider'}}
              size="small"
              onClick={() => {
                setQueryState(null);
                window.location.reload()
              }}
                variant="outlined"><Sync /></IconButton>
              <TextBtn variant="contained" disabled>Save</TextBtn>
            </Flex>
          </Pane>
          <Pane item sx={{borderRight: 1, borderColor: 'divider'}} thin={ collapsed.left ? 1 : 0 }>
            <Stack sx={{p: 1, height: 300}} >


            <Flex  spacing={1}>

              {!collapsed.left && <>
                <Typography variant="caption">
                  <b>Page</b>
                </Typography>
                  <QuickMenu small caret options={appData.pages.map(f => f.PageName)} title="Choose Page" label={queryState.page?.PageName || "non selected"} onChange={p => {
                    setQueryState(s => ({...s, page: appData.pages.find(f => f.PageName === p)}))
                  }}/>

                  <Spacer />
                  <TextBtn endIcon={<Add />}>Create</TextBtn>

              </>}

                  <RotateButton deg={collapsed.left ? 270 : 90}
                    
                      onClick={() => setCollapsed(s => ({...s, left: !collapsed.left}))}>
                  {collapsed.left ? <ExpandMore /> : <Close />}
                  </RotateButton>

            </Flex>


            {!collapsed.left && <>
              <Box  sx={{border: 'solid 1px gray', height: 240, p: 1}}>

                <PageTree tree={appData.pages} selected={queryState.page?.PageName}
                    onClick={(name) => setQueryState(s => ({...s, page: appData.pages.find(f => f.PageName === name)}))}/>

              </Box>
              </>}

            </Stack>

            {!collapsed.left && <>
               
                <Divider />

                <Stack sx={{p: 1, height: 'calc(100vh - 404px)'}}>

                {!!queryState.page && <Flex  spacing={1}>

                <Flex fullWidth>

                <Typography variant="caption">
                  <b>Content</b>
                </Typography>


                <Spacer />
                <TextBtn onClick={() => createComponent()} endIcon={<Add />}>Add</TextBtn>
                </Flex>

                </Flex>}

                <ContentTree 
                  onDrop={handleDropComponent}
                  onNameChange={handleNameChange}
                  onCreate={(type, options) => createComponent (type, options)} tree={queryState.page?.components} />

                </Stack> 
              </>}

          </Pane>
          <Pane wide {...collapsed} item sx={{p: 1}}>

          <Collapse in={json}>
              
              <Json>
                {JSON.stringify(appData, 0, 2)}
              </Json>
           </Collapse>
       
           <Collapse in={!json}>
              
              <ComponentTree preview selectedPage={queryState.page} />
           </Collapse>
       
           
          </Pane>
          <Pane item thin={ collapsed.right ? 1 : 0 }  sx={{borderLeft: 1, borderColor: 'divider'}}>
            
         {!!queryState.page &&  <ComponentPanel 
            onCollapse={() => setCollapsed(s => ({...s, right: !collapsed.right}))}
            onMove={handleMove}
            collapsed={collapsed.right}
            selectedPage={queryState.page}
            onPropChange={handlePropChange}
            onStyleChange={handleStyleChange}
            onSettingsChange={handleSettingsChange}
            onEventChange={handleEventChange}
            onEventDelete={handledEventDelete}
            component={queryState.selectedComponent} />}

          </Pane>
        </Grid>
      </Flex>

      <StateDrawer 
        handleDrop={handleStateDrop}
        handleChange={handleStateChange}
        state={queryState.page?.state} open={stateOpen} handleClose={() => {
        setDrawerState(s => ({...s, stateOpen: false}))
      }} />
   </>
 );
}


export const Addressbox = ({ value, onChange, onClose, ...props }) => {
  const startAdornment = <InputAdornment  
  position="start">URL</InputAdornment>; 

  const adornment = {
    startAdornment,
    endAdornment: (
      <InputAdornment sx={{cursor: 'pointer'}} onClick={() => window.open(value)} position="end">
        <Launch />
        Open
      </InputAdornment>
    ),
  };

  return (
    <TextField
      size="small"
      disabled
      {...props}
      sx={{ width: "calc(100vw - 660px)" }}
      value={value}
      autoComplete="off"
      onChange={onChange}
      InputProps={adornment}
      autoFocus
    />
  );
};



Editor.defaultProps = {};
export default Editor;
