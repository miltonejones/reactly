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
  Typography, IconButton
} from "@mui/material";
import { Flex, TextBtn, QuickMenu, Spacer, StateDrawer,
  ComponentPanel, ContentTree, PageTree, ComponentTree } from "../..";
import { Launch, Save, Sync, Add, Home, AutoStories,AppRegistration, RecentActors, Code } from "@mui/icons-material";
import { AppStateContext, useNavigation } from '../../../hooks/AppStateContext';
import { useParams } from "react-router-dom";
import { useEditor } from '../../../hooks/useEditor';
 
const Pane = styled(Grid)(({ short, wide }) => ({
  outline: "dotted 1px green",
  height: short ? 56 : "calc(100vh - 64px)",
  minWidth: wide ? "calc(100vw - 830px)" : 380,
  maxWidth:  wide ? "calc(100vw - 830px)" : 380,
  overflow: 'auto',
}));

 
 
const Editor = ({ applications: apps = {} }) => {
  const { appname } = useParams();
  const { applications, setComponentProp, setPageState
    , dropPageState, setComponentStyle } = useEditor(apps);
  const [ drawerState, setDrawerState] = React.useState({
    stateOpen: false
  })

  const { stateOpen } = drawerState;

  const { queryState = {}, setQueryState } = React.useContext(AppStateContext);
  const appData = applications.find(f => f.path === appname);
  
  const path = ['apps', appData.path].concat(!queryState.page?.PagePath ? [] : queryState.page.PagePath); 
  
  const handleStyleChange = (componentID, label, value) => {  
    setComponentStyle(appData.ID, queryState.page.ID, componentID, label, value);
  }


  const handleSettingsChange = (componentID, label, value) => { 
    setComponentProp(appData.ID, queryState.page.ID, componentID, label, value);
  }
 
  const handleStateChange = (stateID, label, value) => { 
    setPageState(appData.ID, queryState.page.ID, stateID, label, value);
  }

  const handleStateDrop = (stateID) => { 
    dropPageState(appData.ID, queryState.page.ID, stateID);
  }


 return (
   <>
      <Flex baseline fullWidth>
        <Stack sx={{justifyContent: 'space-between', alignItems: 'center',  height: '95vh'}}>

        <Box>
          <IconButton href="/" sx={{mt: 4}}>
            <Home />
          </IconButton>
        </Box>
        
         <Stack>
          <IconButton  sx={{mt: 1}}>
              <AutoStories />
            </IconButton>
            <IconButton sx={{mt: 1}}>
              <Code />
            </IconButton>
            <IconButton sx={{mt: 1}} onClick={() => {
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
                <QuickMenu small caret options={["Edit Page Settings"]} title="App Menu" label="Menu" onChange={window.alert}/>
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


          <ComponentTree preview tree={queryState.page?.components} />
          
           
          </Pane>
          <Pane item>
            
            {!!queryState.selectedComponent && <ComponentPanel 
            onStyleChange={handleStyleChange}
            onSettingsChange={handleSettingsChange}
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
  const startAdornment = <InputAdornment position="start">URL</InputAdornment>; 

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
