import React from 'react';
import { styled, Card, Stack, Typography, Switch, TextField } from '@mui/material';
import { QuickSelect, Flex, Spacer, TextBtn, Pill } from '../../..';
import { Json } from '../../../../colorize';
  


const StateValue = ({ Value, Type, handleChange, ...props }) => {
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
      selected={p.value === Value} key={p.name}>
        <Typography sx={{fontWeight: p.value === Value ? 600 : 400}} variant="caption">{p.name}</Typography>
        
        </Pill>)}
    </Flex> 
  }
  return <Stack>
  <Typography>to</Typography>
    <TextField size="small" label="enter value" {...props} value={Value} onChange={e => {
    handleChange && handleChange(e.target.value)
  }}  /></Stack>
}

const SetState = ({ event = {}, page, handleSave }) => {
  const [state, setState ] = React.useState({ ...event.action, type: 'setState' });
  const { target, value } = state;

  const handled = !(page.state && event.action) 
    ? {}
    : page.state.find(f => f.Key === target);

  const selectedState = page.state.find(f => f.Key === target);
 return (
  <>
  <Card sx={{p: 1, mt: 2, mb: 2}}>
   <Stack sx={{mt: 2}} spacing={2} data-testid="test-for-SetState"> 
      <Typography>Set the value of</Typography>
     <QuickSelect options={page.state.map(d => d.Key)} value={target} 
            onChange={value => setState(s => ({...s, target: value}))}/>
      
 
      <StateValue 
        {...handled} 
        Type={selectedState?.Type}
        Value={value}
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
      <Json> 
      {JSON.stringify(event,0,2)}
      </Json>  */}
</>

 );
}
SetState.defaultProps = {};
export default SetState;
