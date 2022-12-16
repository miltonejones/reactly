import React from 'react';
import { styled, Card, Stack, Typography, Switch, TextField } from '@mui/material';
import { QuickSelect, Flex, Spacer, TextBtn, Pill } from '../../..';
import { Json } from '../../../../colorize';
import { getPropertyOptions } from '../../util';
  


const StateValue = ({ Value, Type, handleChange, page, component, application, resources, selectedEvent, ...props }) => {
  const options = getPropertyOptions(page, selectedEvent, component, resources, application?.state)
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
    [{Type}]
    <QuickSelect options={options} free onChange={handleChange} value={Value?.toString()} label="to"/>
    {/* {JSON.stringify(application?.state)}{typeof(page)} */}
    </>
  }

  return <Stack>

     [{Type}]
  <Typography>to</Typography>
    <TextField helperText={helperText} size="small" label="enter value" {...props} value={Value} onChange={e => {
    handleChange && handleChange(e.target.value)
  }}  /></Stack>
}

const SetState = ({ event = {}, application, page, component, resources, handleSave, selectedEvent }) => {
  const [state, setState ] = React.useState({ ...event.action, type: 'setState' });
  const { target, value } = state;

  const { parameters } = page;

  if (!page.state && !parameters && !application.state) {
    return <>Page has no state variables</>
  }

  // const handled = !((page.state || application.state) && event.action) 
  //   ? {}
  //   : (page.state.concat(application.state)).find(f => {
  //     const [key,val] = state.target?.split('.');
  //     if (val) {
  //       return f.Key === val;
  //     }
  //     return f.Key === state.target 
  //   });

  const stateList = ((page.state||[]).concat(application.state||[]));

console.log ({ stateList, target: state.target })

  const selectedState = !state.target ? {} : stateList?.find(f => {
    const [key,val] = state.target?.split('.');
    if (val) {
      return f.Key === val;
    }
    return f.Key === state.target
  });
  
  const options = !page.state ? [] : page.state.map(d => d.Key);


  !!application.state && application.state.map(s => {
    return options.push(`application.${s.Key}`);
  })

 return (
  <>
  <Card sx={{p: 1, mt: 2, mb: 2}}>
   <Stack sx={{mt: 2}} spacing={2} data-testid="test-for-SetState"> 
      <Typography>Set the value of</Typography>


     <QuickSelect options={options} value={target} 
            onChange={value => setState(s => ({...s, target: value}))}/>
 
      <StateValue 
        {...selectedState} 
        resources={resources}
        Type={selectedState?.Type}
        Value={value}
        application={application}
        component={component}
        selectedEvent={selectedEvent}
        page={page}
        handleChange={value => setState(s => ({...s, value}))}
      />

[{JSON.stringify(event)}] 
{state.target}

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
