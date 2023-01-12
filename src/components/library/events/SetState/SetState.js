import React from 'react';
import { styled, Card, Stack, Typography, Switch, TextField } from '@mui/material';
import { QuickSelect, Flex,TinyButton, Spacer, TextBtn,Text, PillMenu, Pill } from '../../..';
import { Json } from '../../../../colorize';
import { getPropertyOptions } from '../../util';
import {  Save } from "@mui/icons-material"; 
import { useReactly } from '../../../../hooks/useReactly';
import { AppStateContext } from '../../../../context';
  
const NEW_STATE_ITEM = 'New date variable...';

const StateValue = ({ Value, Type, handleChange, page, component, application, resources, selectedEvent, ...props }) => {
  const options = [NEW_STATE_ITEM].concat (
    getPropertyOptions(page, selectedEvent, component, resources, application?.state)
  );
  const initialType = typeof Value === 'string' && Value.indexOf('|') > 0 ? 'toggle' : 'system';
  const [first, last] = typeof Value !== 'string' ? [] : Value.split('|')
  const [inputType, setInputType] = React.useState(initialType);
  const [parts, setParts] = React.useState({
    this: first,
    that: last
  });
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
      selected={p.value?.toString() === Value?.toString() || (!p.value && !Value)} key={p.name}>
        <Typography sx={{fontWeight: p.value.toString() === Value?.toString()  ? 600 : 400}} variant="caption">{p.name}</Typography>
        
        </Pill>)}
        {/* {Value?.toString()} */}
    </Flex> 
  }
 

  const helperText =  `Use "|" to toggle between 2 values`;

  if (inputType === 'toggle') {
    return <>
    {/* [{Type}] */}

    <Flex spacing={2}>

    <TextField value={parts.this}
      onChange={(e) => setParts(s => ({...s,  this: e.target.value, dirty: 1}))}
      size="small" label="this"/>
    <Text small active>or</Text>
    <TextField value={parts.that} 
      onChange={(e) => setParts(s => ({...s,  that: e.target.value, dirty: 1}))}
      size="small" label="that"/>

    </Flex>
    
    {!!parts.dirty && <Flex>
      
      "{parts.this} "or "{parts.that}" <TinyButton icon={Save} onClick={() => {
        handleChange(`${parts.this}|${parts.that}`);
        setParts(s => ({...s, dirty: 0}))
      }} />
      </Flex>}

    <Flex>
       <PillMenu options={['system', 'text', 'toggle']} value={inputType} onChange={setInputType} />
    </Flex>
    {/* {JSON.stringify(application?.state)}{typeof(page)} */}
    </>
  }

  if (options?.length && inputType !== 'text') {
    return <>
    {/* [{Type}] */}
    <QuickSelect 
      options={options} 
      free 
      onChange={handleChange} 
      value={Value?.toString()} 
      label="to"
    />

    <Flex>
       <PillMenu options={['system', 'text', 'toggle']} value={inputType} onChange={setInputType} />
    </Flex>
    {/* {JSON.stringify(application?.state)}{typeof(page)} */}
    </>
  }

  return <Stack>
 
  <Typography>to</Typography>
    <TextField helperText={helperText} size="small" label="enter value" {...props} value={Value} onChange={e => {
    handleChange && handleChange(e.target.value)
  }}  />
  
  
  {options?.length && <Flex>
       <PillMenu options={['system', 'text', 'toggle']} value={inputType} onChange={setInputType} />
    </Flex>}
  
  </Stack>
}

const SetState = ({ event = {}, application, page, component, resources, handleSave, selectedEvent }) => {
  const [state, setState ] = React.useState({ ...event.action, type: 'setState' });
  const { target, value } = state;

  const { parameters } = page;

  const { Prompt } = React.useContext(AppStateContext);
  const reactly = useReactly();

  if (!page.state && !parameters && !application.state) {
    return <>Page has no state variables</>
  }
  const stateList = ((page.state||[]).concat(application.state||[]));

// console.log ({ stateList, target: state.target })

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
  });

  const handleStateCreate = async () => {
    const stateKey = await Prompt('Enter a name for the new state');
    if (!stateKey) return false;
    reactly.onStateChange(null, stateKey);
    return stateKey;
  }




 return (
  <>
  <Card sx={{p: 1, mt: 2, mb: 2}}>
   <Stack sx={{mt: 2}} spacing={2} data-testid="test-for-SetState"> 
      <Typography>Set the value of</Typography>


     <QuickSelect options={[NEW_STATE_ITEM].concat(options)} value={target} 
            onChange={async (value) => {
              if (value === NEW_STATE_ITEM) {
                const prop = await handleStateCreate();// alert(1)
                if (!prop) return;
                value = prop;
              }
              setState(s => ({...s, target: value}))
            }}/>
 
      <StateValue 
        {...selectedState} 
        resources={resources}
        Type={selectedState?.Type}
        Value={value}
        application={application}
        component={component}
        selectedEvent={selectedEvent}
        page={page}
        handleChange={async (value) => { 
          if (value === NEW_STATE_ITEM) {
            const prop = await handleStateCreate();// alert(1)
            if (!prop) return;
            value = prop;
          }
          setState(s => ({...s, value}))
        }}
      />

{/* <pre>
[{JSON.stringify(state,0,2)}] 
{state.target}
</pre> */}

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
