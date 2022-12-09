import React from 'react';
import { styled, Card, Stack, Typography, Switch, TextField } from '@mui/material';
import { QuickSelect, Flex, Spacer, TextBtn, Pill } from '../../..';
import { Json } from '../../../../colorize';
import { getPropertyOptions } from '../../util';
  


const StateValue = ({ Value, Type, handleChange, page, component, resources, selectedEvent, ...props }) => {
  const options = getPropertyOptions(page,selectedEvent, component, resources)
  const pills = [
    {
      name: 'true',
      value: true
    },
    {
      name: 'false',
      value: false
    },
    {
      name: 'toggle',
      value: 'toggle'
    },
  ]
  if (Type === 'boolean') {
    return <Flex>
      To
      <Spacer />
      {pills.map(p => <Pill 
      onClick={() => handleChange(p.value)}
      selected={p.value === Value || (!p.value && !Value)} key={p.name}>
        <Typography sx={{fontWeight: p.value === Value ? 600 : 400}} variant="caption">{p.name}</Typography>
        
        </Pill>)}
    </Flex> 
  }
 

  const helperText =  `Use "|" to toggle between 2 values`;

  if (options?.length) {
    return <>
    <QuickSelect options={options} free onChange={handleChange} value={Value?.toString()} label="to"/>
    {/* {JSON.stringify(Value)}{typeof(Value)} */}
    </>
  }

  return <Stack>

     
  <Typography>to</Typography>
    <TextField helperText={helperText} size="small" label="enter value" {...props} value={Value} onChange={e => {
    handleChange && handleChange(e.target.value)
  }}  /></Stack>
}

const SetState = ({ event = {}, page, component, resources, handleSave, selectedEvent }) => {
  const [state, setState ] = React.useState({ ...event.action, type: 'setState' });
  const { target, value } = state;

  const { parameters } = page;

  if (!page.state && !parameters) {
    return <>Page has no state variables</>
  }

  const handled = !(page.state && event.action) 
    ? {}
    : page.state.find(f => f.Key === target);

  const selectedState = page.state?.find(f => f.Key === target);
  const options = !page.state ? [] : page.state.map(d => d.Key);
 return (
  <>
  <Card sx={{p: 1, mt: 2, mb: 2}}>
   <Stack sx={{mt: 2}} spacing={2} data-testid="test-for-SetState"> 
      <Typography>Set the value of</Typography>


     <QuickSelect options={options} value={target} 
            onChange={value => setState(s => ({...s, target: value}))}/>
      
 
      <StateValue 
        {...handled} 
        resources={resources}
        Type={selectedState?.Type}
        Value={value}
        component={component}
        selectedEvent={selectedEvent}
        page={page}
        handleChange={value => setState(s => ({...s, value}))}
      />


      <Flex>
        <Spacer />
        <TextBtn onClick={() => handleSave()}>Cancel</TextBtn>
        <TextBtn variant="contained" onClick={() => handleSave({
          ...event,
          action: state
        })}>Save</TextBtn>
      </Flex>
    
    
   </Stack></Card>

   
   {/* <Json> 
      {JSON.stringify(state,0,2)}
      </Json>
      {JSON.stringify(selectedEvent,0,2)} */}
</>

 );
}
SetState.defaultProps = {};
export default SetState;
