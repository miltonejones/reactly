import React from 'react';
import { styled, Collapse, Box, Alert, Card, Stack, Typography } from '@mui/material';
import Library from '../library';
import { Flex, TextBtn, Spacer, Tiny, QuickSelect, Text } from '..';
import { Add, Close, Delete } from "@mui/icons-material";
import { SetState, RunScript, OpenLink, DataExec, ModalOpen } from '../library/events';
import { eventTypes } from '../../hooks/usePageContext';
import { EditorStateContext } from '../../hooks/AppStateContext'; 
 
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
      <Typography variant="caption"><b>{title}</b></Typography>
      <Typography variant="caption">{description}</Typography>
    </Stack>
  </Card>
}

const HandlerCard = ({ ID, event: eventName, action, page, selected, onSelect, onDelete  }) => {
  const { appData  } = React.useContext(EditorStateContext);
  const { pages, resources } = appData;
  const [rise, setRise] = React.useState(1);
  
  if (!action) return <u />
  const chosenEvent = eventTypes.find(f => f.name === eventName)
  const title = !chosenEvent ? `unknown event ${eventName}` : chosenEvent.description; 
  let act = 'Unknown action'
  const obj = resources.find(e => e.ID === action.target)
  switch(action.type) {
    case 'setState':
      act = <>Set the value of "{action.target}" to <b>{action.value.toString()}</b></>
      break;
    case 'dataExec':
      act = <>Execute "{obj.name} - {obj.method}"</>
      break;
    case 'dataReset': 
      act = <>Reset  "{obj.name} - {obj.method}"</>
      break;
    case 'openLink':
      const href = pages.find(e => e.ID === action.target).PageName
      act = <>Open a link to "{href}"</>
      break;
    case 'modalOpen':
      const dialogName = page.components.find(e => e.ID === action.target)
      act = <>{action.open ? 'Open' : 'Close'} modal <b>{dialogName?.ComponentName}</b></>
      break;
    case 'scriptRun':
      const scr = page.scripts.find(f => f.ID === action.target);
      if (scr) {
        act = <>Run script "{scr.name}"</>
      } else {
        act = <>Could not find script {action.target}</>
      }
      break;
    default:
      //do nothing;
  }

  return <Card sx={{p: 2, cursor: 'pointer', mb: 1,
        outline: selected === ID ? 'solid 2px red' : ''}} 
          elevation={2}  
    >
    <Stack>
      <Flex>
        <Text small onClick={() => onSelect && onSelect(eventName, ID)} variant="caption"><b>{title}</b></Text>
        <Spacer />
        <Tiny icon={Delete} onClick={() => onDelete && onDelete(ID)}/>
      </Flex>
      <Text small onClick={() => onSelect && onSelect(eventName, ID)} variant="caption">{act}</Text>
 
    </Stack>
 
  </Card>
}

 
const ComponentEvents = ({ selectedPage, component, onEventDelete, onChange, connections, resources }) => {
  const [open, setOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState(false)
  const [selectedHandler, setSelectedHandler] = React.useState(false)
  const [selectedType, setSelectedType] = React.useState(false)
  const supportedEvents = Library [component.ComponentType].Events  ;

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

  const modalsExist = ['Dialog', 'Menu'].some(type => selectedPage.components.find(f => f.ComponentType === type)) 

  const handleSave = state => {  
    setSelectedEvent(null); 
    setSelectedHandler(null); 
    !!state && onChange && onChange(component.ID, state)
  }

  const options = [
    {
      name: 'Set state value',
      value: 'setState'
    },
    {
      name: 'Execute client script',
      value: 'scriptRun'
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
  } ]: []).concat(modalsExist ? {
    name: 'Open or close a modal component',
    value: 'modalOpen'
  } : []);

  const forms = {
    setState: SetState,
    scriptRun: RunScript,
    openLink: OpenLink,
    dataExec: DataExec,
    dataReset: DataExec,
    modalOpen: ModalOpen
    
  }

  const EventEditor = forms[selectedType]
  
 return (
   <Layout>

    {/* panel header  */}
    <Flex sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
      <Spacer />
      <TextBtn onClick={() => setOpen(!open)} endIcon={<Icon />}>{args.label}</TextBtn>
    </Flex>

    {/* events that the component supports  */}
    <Collapse in={open}>
    <Flex sx={{ borderBottom: 1, borderColor: 'divider', mb: 1, mt: 2 }}>
        <Typography variant="caption"> <b>Supported Events</b></Typography>
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
    {!!component.events?.length && !selectedEvent &&  <>    
      <Flex sx={{ borderBottom: 1, borderColor: 'divider', mb: 1, mt: 2 }}>
        <Typography variant="caption"> <b>Component Events</b></Typography>
      </Flex>
      {component.events?.map(e => <HandlerCard 
        selected={selectedHandler} 
        page={selectedPage}
        onSelect={(key, id) => {
        setSelectedEvent(key)
        setSelectedHandler(id)
        setSelectedType(null)
      }} {...e} onDelete={(id) => onEventDelete(component.ID, id)} />)}
    </>} 
 

    {!selectedHandler && !selectedType && !!selectedEvent && 
      <><QuickSelect options={options.map(o => o.name)}
             onChange={b => {
              setSelectedType(options.find(e => e.name === b).value)
             }} /></>}

    {!selectedHandler && !!selectedType && !!selectedEvent && 
      <><EventEditor
            resources={resources}
            handleSave={handleSave}
            event={freshEvent} 
            page={selectedPage} 
            selectedType={selectedType}
            /></>}
 

      {!!selectedHandler && !!selectedEvent && 
        component.events
          .filter(f => f.ID === selectedHandler)
          .map (e => {
            const Editor = forms[e.action.type];
            if (!Editor) return <>could not render editor {e.type}</>
            return <Editor
              resources={resources}
              handleSave={handleSave}
              selectedType={e.action.type}
              event={e} key={e.action.type} page={selectedPage} />
          }) }
 
   
   </Layout>
 );
}
ComponentEvents.defaultProps = {};
export default ComponentEvents;
