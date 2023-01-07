import React from 'react';
import { styled, Collapse, Box, Alert, Card, Stack } from '@mui/material'; 
import { Flex, TextBtn, Spacer, Tiny, QuickSelect, Text } from '..';
import { Add, Close, Delete , Error} from "@mui/icons-material";
import { SetState, RunScript, OpenLink, DataExec, ModalOpen, MethodCall } from '../library/events'; 
import { EditorStateContext, AppStateContext } from '../../context'; 
import { useRunScript } from '../../hooks/subhook/useRunScript';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));

const EventCard = ({ name, title, description, selected, onClick }) => {
  const [rise, setRise] = React.useState(1)
  return <Card sx={{p: 2, cursor: 'pointer', mb: 1,
        outline: selected === name ? 'solid 2px red' : ''
      }} 
    elevation={rise}
    onClick={() => onClick && onClick(name)}
    onMouseDown={() => setRise(0)}
    onMouseUp={() => setRise(3)}
    onMouseEnter={() => setRise(3)}
    onMouseLeave={() => setRise(1)}>
    <Stack>
      <Text small><b>{title}</b></Text>
      <Text small>{description}</Text>
    </Stack>
  </Card>
}

const HandlerCard = ({ ID, event: eventName, action, application, page, selected, onSelect, onDelete  }) => {
  const { getApplicationScripts } = useRunScript() 
  const { supportedEvents, appContext } = React.useContext(AppStateContext); 
  const { pages, resources } = appContext; 
  
  if (!action) return <u />
  const chosenEvent = supportedEvents.find(f => f.name === eventName)
  const title = !chosenEvent ? `unknown event ${eventName}` : chosenEvent.description; 
  let act = 'Unknown action'
  const obj = resources.find(e => e.ID === action.target)
  let ok = true;
  switch(action.type) {
    case 'setState':
      const label = action.value?.toString().split('|').join(' or ')
      act = <Box>Set the value of "{action.target}" to <b>{label}</b></Box>
      break;
    case 'dataExec':
      if (obj) {
        act = <>Execute "{obj.name} - {obj.method}"</>
      } else {
        ok = false
      }
      break;
    case 'dataReset': 
      act = <>Reset  "{obj.name} - {obj.method}"</>
      break;
    case 'dataRefresh': 
      act = <>Refresh  "{obj.name} - {obj.method}"</>
      break;
    case 'openLink':
      const targetPage = pages.find(e => e.ID === action.target);
      const href = targetPage?.PageName || <>Deleted page</>
      act = <>Open a link to "{href}"</>
      break;
    case 'methodCall':
      act = <Box>Execute method "{action.methodName}" on 
        component "{action.componentName}" after {action.delay}ms</Box>
      break;
    case 'modalOpen':
      const dialogName = page?.components?.find(e => e.ID === action.target)
      const appModal = application?.components?.find(e => e.ID === action.target)
      const modalLabel = dialogName?.ComponentName || `application.${appModal?.ComponentName}`;
      act = <>{action.open ? 'Open' : 'Close'} component <b>{modalLabel}</b></>
      ok = !!dialogName || !! appModal;
      break;
    case 'scriptRun':
      const scripts = getApplicationScripts();
      const scr = scripts.find(f => f.ID === action.target);
       
      // const scr = page.scripts && page.scripts.find(f => f.ID === action.target);
      if (scr) {
        act = <>Run script <b>{scr.page}.</b>{scr.name}</>
      } else {
        act = <>Could not find script {action.target}</>
        ok = false;
      }
      break;
    default:
      //do nothing;
  }

  if (!ok) {
    return <Card sx={{p: 2, cursor: 'pointer', mb: 1, }} 
      elevation={2}  
     > <Stack><Flex ><Tiny icon={Error} /> <Text small active error >missing definition ({ID})</Text>

<Spacer />

     <Tiny icon={Delete} onClick={() => onDelete && onDelete(ID)}/> </Flex>
   
     <Flex wrap> <Text small>
     The target for the  "{eventName}.{action.type}" cannot be found. Replace it or  
      
      </Text>
      
       </Flex>
      
      <Flex>

      <Spacer />

      <TextBtn color="error" variant="contained" size="small" onClick={() => onDelete && onDelete(ID)}> delete 
       event trigger</TextBtn>
      </Flex>
       
       </Stack></Card>
  }

  return <Card sx={{p: 2, cursor: 'pointer', mb: 1,
        outline: selected === ID ? 'solid 2px red' : ''}} 
          elevation={2}  
    >
    <Stack>
      <Flex>
        <Text small onClick={() => onSelect && onSelect(eventName, ID)}><b>{title}</b></Text>
        <Spacer />
        <Tiny icon={Delete} onClick={() => onDelete && onDelete(ID)}/>
      </Flex>
      <Text small onClick={() => onSelect && onSelect(eventName, ID)}>{act}</Text>
 
    </Stack>
 
  </Card>
}

 
const Events =  [
  {
    name: 'onPageLoad',
    title: 'Page loads',
    description: 'Page finishes loading.'
  },  
]

const appEvents =  [
  {
    name: 'onApplicationLoad',
    title: 'Application loads',
    description: 'Application finishes loading.'
  },  
]


const ComponentEvents = ({ 
    selectedPage, 
    component, 
    onEventDelete, 
    onChange, 
    application,
    addedEvents,
    connections, 
    resources }) => {
  const [open, setOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState(false)
  const [selectedHandler, setSelectedHandler] = React.useState(false)
  const [selectedType, setSelectedType] = React.useState(false);

  
  const { Library, appContext } = React.useContext(AppStateContext);

  const isInApplicationScope = !component && !selectedPage?.PageName;

  const availableEvents = isInApplicationScope ? appEvents : Events;
  const availableOwner = isInApplicationScope ? appContext : selectedPage;
  const defaultEvents = !addedEvents ? availableEvents : addedEvents;
  const supportedEvents = !!addedEvents || !component ? defaultEvents : Library[component.ComponentType].Events  ;


  const eventOwner = !component ? availableOwner : component;


  const { scriptList } = useRunScript()
  

  if (!supportedEvents) {
    return <Alert sx={{ m: 1 }}>This component has no configurable events.</Alert>
  } 
  const args = {
    label: open ? 'Cancel' : 'Add event mapping',
    icon: open ? Close : Add
  }
  const Icon = args.icon;

  const freshEvent = {
    event: selectedEvent
  }

 

  const handleSave = state => {  
    setSelectedEvent(null); 
    setSelectedHandler(null); 
    !!state && onChange && onChange(eventOwner.ID, state, !!component)
  }

  const options = [
    {
      name: 'Set state value',
      value: 'setState',
      when: () => eventOwner.state?.length
    },
    {
      name: 'Execute client script',
      value: 'scriptRun',
      when: () => !!scriptList?.length // appContext.pages?.some(pg => pg.scripts?.length) // !!selectedPage?.scripts?.length
    } ,
    {
      name: 'Call a component method',
      value: 'methodCall', 
    } ,
    {
      name: 'Open or close a modal component',
      value: 'modalOpen'
    } ,
    {
      name: 'Link to page',
      value: 'openLink'
    } 
  ].concat(resources?.length ? [
    {
    name: 'Execute data resource',
    value: 'dataExec'
  },
  {
    name: 'Reset data resource',
    value: 'dataReset'
  },
  {
    name: 'Refresh data resource',
    value: 'dataRefresh'
  } ]: [])
  .filter(f => !f.when || !!f.when())
  .sort((a,b) => a.name > b.name ? 1 : -1);

  const forms = {
    setState: SetState,
    scriptRun: RunScript,
    openLink: OpenLink,
    dataExec: DataExec,
    dataReset: DataExec,
    dataRefresh: DataExec,
    modalOpen: ModalOpen,
    methodCall: MethodCall
    
  }

  const EventEditor = forms[selectedType];
  const supportedEvent = supportedEvents?.find(n => n.name === selectedEvent);
  
 return (
   <Layout>
 {/* [{JSON.stringify(isInApplicationScope.toString())}] */}
    {/* panel header  */}
    <Flex sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
      <Spacer />
      <TextBtn 
        size="small"
        variant={open?"contained":"outlined"} 
        onClick={() => setOpen(!open)} 
        endIcon={<Icon />}
        >{args.label}</TextBtn>
    </Flex>

    {/* events that the component supports  */}
    <Collapse in={open}>
    <Flex sx={{ borderBottom: 1, borderColor: 'divider', mb: 1, mt: 2 }}>
        <Text small> <b>Supported Events</b></Text>
      </Flex>
      {supportedEvents
        .filter(f => !selectedEvent || f.name === selectedEvent)
        .map (d => <EventCard selected={selectedEvent}  onClick={(e) => {
          setSelectedEvent(selectedEvent ? null : e);
          setSelectedHandler(null)
          setSelectedType(null)
        }}  {...d} key={d.name} />)} 
    </Collapse>
 
    {/* events that have handlers  */}
    {!!eventOwner.events?.length && !selectedEvent &&  <>    
      <Flex sx={{ borderBottom: 1, borderColor: 'divider', mb: 1, mt: 2 }}>
        <Text small> <b>Active Events</b></Text>
      </Flex>
      {eventOwner.events?.map(e => <HandlerCard 
        selected={selectedHandler} 
        page={selectedPage}
        application={appContext}
        onSelect={(key, id) => {
        setSelectedEvent(key)
        setSelectedHandler(id)
        setSelectedType(null)
      }} {...e} onDelete={(id) => onEventDelete(eventOwner.ID, id, !!component)} />)}
    </>} 
 

    {!selectedHandler && !selectedType && !!selectedEvent && 
      <><QuickSelect options={options.map(o => o.name)}
             onChange={b => {
              setSelectedType(options.find(e => e.name === b).value)
             }} /></>}

    {!selectedHandler && !!selectedType && !!selectedEvent && 
      <>
      
      <Text small sx={{ml: 1}}>When</Text>
      <Text small active sx={{ml: 1}}>{supportedEvent.description}</Text>

      <EventEditor
            resources={resources}
            handleSave={handleSave}
            component={component}
            application={appContext}
            event={freshEvent} 
            selectedEvent={supportedEvent}
            page={selectedPage} 
            selectedType={selectedType}
            /></>}
 
 


      {!!selectedHandler && !!selectedEvent && supportedEvent &&
        eventOwner.events?.filter(f => f.ID === selectedHandler)
          .map (e => {
            const Editor = forms[e.action.type];
            if (!Editor) return <>could not render editor {e.type}</>
            return <>
            
          <Text small sx={{ml: 1}}>When</Text>
          <Text small active sx={{ml: 1}}>{supportedEvent.description}</Text>
            <Editor
              component={component}
              resources={resources}
              application={appContext}
              selectedEvent={supportedEvent}
              handleSave={handleSave}
              selectedType={e.action.type}
              event={e} key={e.action.type} page={selectedPage} />
            </>
          }) }
 
   
   </Layout>
 );
}
ComponentEvents.defaultProps = {};
export default ComponentEvents;
