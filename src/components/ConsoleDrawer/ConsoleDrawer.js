import React from 'react';
import { styled, List, ListItemButton, ListItemText, Box, Stack, Tabs, Switch, Grid, Collapse, Drawer, Typography, Divider } from '@mui/material';
import { Flex, TinyButton, TextBtn, TabButton, Text, Spacer } from '..';
import { ExpandMore  } from "@mui/icons-material";  
import { AppStateContext } from "../../context";
import { JsonView } from "../../colorize";
import { useTextTransform } from '../../hooks/useTextTransform';
import { DrawerNavigation } from '../pages/Editor/components';
import moment from 'moment';
 
const humanize = time => { 
  var duration = moment.duration(new Date().getTime() - time);
  return duration.humanize() + ' ago'
}

const Layout = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '65vh'
}));

const ListItem = styled(ListItemButton)(({ theme, active }) => ({
  fontWeight: active ? 500 : 400,
  color: active ? 'white' :'#222',
  backgroundColor: !active ? 'white' : theme.palette.primary.main
}))
 

const SectionHead = ({ children }) => {
  return <>
      <Typography sx={{pl: 1}} variant="caption"><b>{children}</b></Typography>
          <Divider  sx={{mb: 2}}/>
  </>
}

const LogEntry = (props) => {

  const {   
    openTraceLog,  
    setOpenTraceLog
  } = React.useContext(AppStateContext);

  const { id, message, json, color, timestamp, fontWeight } = props;
  const boxProps = { 
    sx: {borderBottom: 1, borderColor: 'divider', color, fontWeight }, 
  }

  const now = new Date().getTime()

  return <Box>

    <Flex nowrap {...boxProps}>
      <TinyButton icon={ExpandMore} deg={openTraceLog[id] ? 180 : 0} /> 

      <Text onClick={() => {
        setOpenTraceLog(s => ({
          ...s,
          [id]: !openTraceLog[id]
        }))
      }} small active={openTraceLog[id]}>{message}</Text>
 
      {/* {(now - timestamp) / 1000}ms ago */}

    </Flex>

 
    <Collapse in={openTraceLog[id]}>
     {!!openTraceLog[id] && <Box {...boxProps}>
     {!!json.trigger && <JsonView initial={0} string json={json.trigger}/>}
     {!json.trigger &&  <JsonView initial={0} string short json={json}/> }

        {/* <pre>{JSON.stringify(json, 0, 2)}</pre>  */}
      </Box>}
      <Text small muted>{humanize(timestamp)}</Text>
    </Collapse>

  </Box>
}
 
const ConsoleDrawer = () => {
  const {  
    setShowTrace,
    showTrace,
    messages,  
    applicationClientState,
    pageClientState, 
    setOpenTraceLog,  
    setMessages,
    loud,
    queryState,
    setLoud,
    supportedEvents,
    monitorEvent, 
    monitoredEvents,  
  } = React.useContext(AppStateContext);
  const [tab, setTab] = React.useState(0)
  const [evt, setEvent] = React.useState(0);

  const { getParametersInScope } = useTextTransform()

  const gridProps = {
    // xs={3} sx={}
    sx: {borderRight: 1, borderColor: 'divider'}
  }

  const handleChange = (setter) => (event, newValue) => {
    setter(newValue);
  };

  const states = [
    pageClientState,
    applicationClientState,
    getParametersInScope(),
    queryState
  ]

  const triggerTypes = ['methodCall','setState','modalOpen','dataReset', 'dataRefresh', 'onApplicationLoad',
  'executeComponentRequest','createPageParams', 'openPath', 'attachEventHandlers',
  'openLink','scriptRun','dataExec','onPageLoad'].map(name => ({ name }));
  const triggerNames = [
    supportedEvents,
    triggerTypes
  ]
 return (
  <Drawer open={showTrace} anchor="bottom">
   <Layout data-testid="test-for-ConsoleDrawer">
   <Flex>
        <Typography variant="subtitle1">
          <b>Debug</b>
        </Typography> 

        <TextBtn onClick={() => {
            setMessages([]);
            setOpenTraceLog({})
        }}>Clear log</TextBtn>
        <Flex onClick={() => setLoud(!loud)} >
          <Switch size="small" checked={loud} />
          <Text small>Logging {loud ? "on" : "off"}</Text>
        </Flex>
        <Spacer />

          <Text small>

        {window.location.href}
          </Text>
          
        <DrawerNavigation  onClose={() => setShowTrace(false)} horizontal /> 
         
      </Flex>
      <Divider />
     
     <Grid container sx={{height: '100%'}}>
        {!!messages?.length && <Grid xs={5} item {...gridProps}>
          <SectionHead>Log</SectionHead>
          <Stack sx={{height: 560, overflow: 'auto'}}>
            {messages?.map((entry, i) => <LogEntry {...entry} key={i} id={`box${i}`} {...entry} />)}
          </Stack>
        </Grid>}

        <Grid xs={4} item {...gridProps}>
          <SectionHead>State variables</SectionHead>
         <Flex sx={{ml: 2}}>
          <Text active small>Scope</Text>
         <Tabs value={tab} sx={{minHeight: 24, ml: 1, mb: 0 }} onChange={handleChange(setTab)}>
            <TabButton label="Page" />
            <TabButton label="Application" />
            <TabButton label="Route params" />
            <TabButton label="App state" />
          </Tabs>
         </Flex>
          <Box sx={{height: 500, p: 2, overflow: 'auto'}}>
          <JsonView initial={0} string short json={states[tab]}/>
          
            {/* <pre>
              {JSON.stringify(states[tab],0,2)}
            </pre> */}
          </Box>
        </Grid>
        <Grid xs={3} item {...gridProps}>
          <SectionHead>Monitored events</SectionHead>
          <Tabs value={evt} sx={{minHeight: 24, ml: 1, mb: 0 }} onChange={handleChange(setEvent)}>
            <TabButton label="Events" />
            <TabButton label="Triggers" />
          </Tabs>
          <Flex baseline fullWidth sx={{height: 500, p: 2, overflow: 'auto',
             alignContent: 'flex-start', flexWrap: 'wrap', width: '100%'}}>

              <List dense sx={{width: '100%'}}>
                {triggerNames[evt]
                  .sort((a,b) => a.name > b.name ? 1 : -1)
                  .map(e => <ListItem
                    onClick={() => monitorEvent(e.name)}
                   active={ monitoredEvents.indexOf(e.name) > -1 }
                   key={e.name}> 
                  <ListItemText primary= {e.name} secondary={e.description}/>
                </ListItem>)}
              </List>

          {/* {triggerNames[evt].map(e => <TextBtn size="small" onClick={() => monitorEvent(e.name)} 
          variant={ monitoredEvents.indexOf(e.name) > -1 ? "contained" : "outlined" }
          sx={{ ml: 1, mb: 1,  overflow: 'hidden',   
              }} key={e.name}>{e.name}</TextBtn>)} */}

          </Flex>
        </Grid>
     </Grid>
   </Layout>
   </Drawer>
 );
}
ConsoleDrawer.defaultProps = {};
export default ConsoleDrawer;
