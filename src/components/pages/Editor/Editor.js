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
  Typography, IconButton,
  Collapse
} from "@mui/material";
import { Flex, TextBtn, QuickMenu, Spacer, StateDrawer,
  ComponentPanel, ContentTree, PageTree, ComponentTree } from "../..";
import { Launch, Save, Sync, Add, Home, AutoStories,AppRegistration, RecentActors, Code } from "@mui/icons-material";
import { AppStateContext, useNavigation } from '../../../hooks/AppStateContext';
import { useParams } from "react-router-dom";
import { useEditor } from '../../../hooks/useEditor';
import { Json } from '../../../colorize';
 
const Pane = styled(Grid)(({ short, wide }) => ({
  outline: "dotted 1px green",
  height: short ? 56 : "calc(100vh - 64px)",
  minWidth: wide ? "calc(100vw - 830px)" : 380,
  maxWidth:  wide ? "calc(100vw - 830px)" : 380,
  overflow: 'auto',
}));

 
 
const Editor = ({ applications: apps = {} }) => {
  const { appname } = useParams();
  const { applications, setComponentProp, setPageState, setComponentEvent
    , dropPageState, setComponentStyle, setPageProps } = useEditor(apps);
  const [ drawerState, setDrawerState] = React.useState({
    stateOpen: false
  })

  const [json, setJSON] = React.useState(false)

  const { stateOpen } = drawerState;

  const { queryState = {}, setQueryState  } = React.useContext(AppStateContext);

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
          <Pane short item xs={12}>
            <Flex sx={{ p: 1 }}>

              <Flex sx={{borderRight: 1, borderColor: 'divider', pr: 2 , mr: 1}}>
                <AppRegistration />
                <b>Reactly</b>
              </Flex>

              <Chip label={appData.Name} />

              <Box>
                <QuickMenu small caret options={[json ? "Hide JSON" : "Show JSON"]} title="App Menu" label="Menu" 
                    onChange={() => setJSON(!json)}/>
              </Box>

              <Addressbox value={`/${path.join('/')}`} />

              <IconButton  
              sx={{ border: 1, borderColor: 'divider'}}
              size="small"
              onClick={() => {
                setQueryState(null);
                window.location.reload()
              }}
                variant="outlined"><Sync /></IconButton>
              <TextBtn variant="contained">Save</TextBtn>
            </Flex>
          </Pane>
          <Pane item >
            <Stack sx={{p: 1, height: 300}} >


            <Flex baselinespacing={1}>

            <Typography variant="caption">
              <b>Page</b>
            </Typography>
              <QuickMenu small caret options={appData.pages.map(f => f.PageName)} title="Choose Page" label={queryState.page?.PageName || "non selected"} onChange={p => {
                 setQueryState(s => ({...s, page: appData.pages.find(f => f.PageName === p)}))
              }}/>

              <Spacer />
              <TextBtn endIcon={<Add />}>Create</TextBtn>
            </Flex>
              <Box  sx={{border: 'solid 1px gray', height: 240, p: 1}}>

                <PageTree tree={appData.pages} selected={queryState.page?.PageName}
                    onClick={(name) => setQueryState(s => ({...s, page: appData.pages.find(f => f.PageName === name)}))}/>

              </Box>

            </Stack>
              <Divider />

              <Stack sx={{p: 1, height: 'calc(100vh - 404px)'}}>

            <Flex  spacing={1}>

              <Flex fullWidth>

              <Typography variant="caption">
                <b>Content</b>
              </Typography>
             

              <Spacer />
              <TextBtn endIcon={<Add />}>Add</TextBtn>
              </Flex>

            </Flex>

            <ContentTree tree={queryState.page?.components} />
 
              </Stack> 
          </Pane>
          <Pane wide item>

          <Collapse in={json}>
              
              <Json>
                {JSON.stringify(appData, 0, 2)}
              </Json>
           </Collapse>
       
           <Collapse in={!json}>
              
              <ComponentTree preview selectedPage={queryState.page} />
           </Collapse>
       
           
          </Pane>
          <Pane item>
            
         {!!queryState.page &&  <ComponentPanel 
            selectedPage={queryState.page}
            onPropChange={handlePropChange}
            onStyleChange={handleStyleChange}
            onSettingsChange={handleSettingsChange}
            onEventChange={handleEventChange}
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
      sx={{ width: "calc(100vw - 500px)" }}
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
