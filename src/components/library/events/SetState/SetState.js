import React from 'react';
import { styled, Card, Stack, Typography, Switch, TextField } from '@mui/material';
import { QuickSelect, Flex, Spacer, TextBtn } from '../../..';
import { Json } from '../../../../colorize';
  


const StateValue = ({ Value, Type, handleChange, ...props }) => {
  if (Type === 'boolean') {
    return <Switch  size="small"
      checked={!!Value}
      onChange={e => {
        handleChange && handleChange(e.target.checked);
      }} 
    />
  }
  return <TextField size="small" label="enter value" {...props} value={Value} onChange={e => {
    handleChange && handleChange(e.target.value)
  }}  />
}

const SetState = ({ event = {}, page, handleSave }) => {
  const [state, setState ] = React.useState({ ...event.action, type: 'setState' });
  const { target, value } = state;

  const handled = !(page.state && event.action) 
    ? {}
    : page.state.find(f => f.Key === target);
 return (
  <>
  <Card sx={{p: 1, mt: 2, mb: 2}}>
   <Stack sx={{mt: 2}} spacing={1} data-testid="test-for-SetState">
   <Typography><b>Set state value</b></Typography>
      <Typography>Set the value of</Typography>
     <QuickSelect options={page.state.map(d => d.Key)} value={target} onChange={value => setState(s => ({...s, target: value}))}/>
      <Typography>to</Typography>
      <StateValue 
        {...handled} 
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
