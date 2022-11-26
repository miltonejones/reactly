import React from 'react';
import { styled, Collapse, Box, Alert, Card, Stack, Typography } from '@mui/material';
import Library from '../library';
import { Flex, TextBtn, Spacer, Tiny } from '..';
import { Add, Close, Delete } from "@mui/icons-material";
import { SetState } from '../library/events';
import { eventTypes } from '../../hooks/usePageContext';
 
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

const HandlerCard = ({ ID, event: eventName, action, selected, onSelect, onDelete  }) => {
  const [rise, setRise] = React.useState(1);
  
  if (!action) return <u />
  const title = eventTypes.find(f => f.name === eventName).description; // 'When component is clicked';

  let act = 'Unknown action'
  switch(action.type) {
    case 'setState':
      act = <>Set the value of "{action.target}" to <b>{action.value.toString()}</b></>
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
        <Typography onClick={() => onSelect && onSelect(eventName, ID)} variant="caption"><b>{title}</b></Typography>
        <Spacer />
        <Tiny icon={Delete} onClick={() => onDelete && onDelete(ID)}/>
      </Flex>
      <Typography onClick={() => onSelect && onSelect(eventName, ID)} variant="caption">{act}</Typography>
 
    </Stack>
 
  </Card>
}

 
const ComponentEvents = ({ selectedPage, component, onEventDelete, onChange }) => {
  const [open, setOpen] = React.useState(false)
  const [selectedEvent, setSelectedEvent] = React.useState(false)
  const [selectedHandler, setSelectedHandler] = React.useState(false)
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

  const handleSave = state => {  
    setSelectedEvent(null); 
    setSelectedHandler(null); 
    !!state && onChange && onChange(component.ID, state)
  }
  
 return (
   <Layout>

    {/* panel header  */}
    <Flex sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
      <Spacer />
      <TextBtn onClick={() => setOpen(!open)} endIcon={<Icon />}>{args.label}</TextBtn>
    </Flex>

    {/* events that the component supports  */}
    <Collapse in={open}>
      {supportedEvents
        .filter(f => !selectedEvent || f.name === selectedEvent)
        .map (d => <EventCard selected={selectedEvent}  onClick={(e) => {
          setSelectedEvent(selectedEvent ? null : e);
          setSelectedHandler(null)
        }}  {...d} key={d.name} />)} 
    </Collapse>

    {/* events that have handlers  */}
    {!!component.events?.length && !selectedEvent &&  <>    
      <Flex sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
        <Typography variant="caption"> <b>Component Events</b></Typography>
      </Flex>
      {component.events?.map(e => <HandlerCard selected={selectedHandler} onSelect={(key, id) => {
        setSelectedEvent(key)
        setSelectedHandler(id)
      }} {...e} onDelete={(id) => onEventDelete(component.ID, id)} />)}
    </>} 

      {!selectedHandler && !!selectedEvent && 
      <><SetState
            handleSave={handleSave}
            event={freshEvent} page={selectedPage} /></>}

      {/* [{JSON.stringify(selectedEvent)}] */}

      {!!selectedHandler && !!selectedEvent && 
        component.events
          .filter(f => f.ID === selectedHandler)
          .map (e => <SetState
            handleSave={handleSave}
            event={e} key={e.type} page={selectedPage} />) }

{/* {JSON.stringify(freshEvent)} */}
     {/* {!!selectedEvent && <SetState handleSave={handleSave} page={selectedPage} event={freshEvent} />} */}

   
   </Layout>
 );
}
ComponentEvents.defaultProps = {};
export default ComponentEvents;
