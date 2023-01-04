import React from 'react';
import Layout from '../Layout';
import { AppStateContext } from '../../../../context'; 
import { styled, Box, Stack, Typography, Divider } from '@mui/material'; 
import { QuickSelect, Flex, Spacer, Text, TextBtn, TextInput, Pill } from '../../..';



const MethodCall = ({ event , page, handleSave, selectedEvent }) => { 
  const { Library } = React.useContext(AppStateContext);
  const [state, setState ] = React.useState({ ...event.action, type: 'methodCall', delay: event.action?.delay || 0 });

  const o = Object.keys(Library)
  .filter(f => page?.components && page.components.some(e => e.ComponentType === f))
  .reduce((out, key) => {
    const methods = Library[key].Methods;
    if (!methods) return out;
    const carriers = page.components.filter(e => e.ComponentType === key);
    
    const items = carriers.reduce((list, carrier) => {
      list = list.concat(methods.map(f => ({...f, callee: carrier.ID, component: carrier.ComponentName})))
      return list;
    }, []);


    if (methods) {
      out = out.concat(items)
    }
    return out;
  }, [])



  const renderOption = (props, option) => {
    if (!option?.name) {
      return <Box {...props}>- none -</Box>
    }
     
    return <Box {...props}>
     {option.component}.{option.name }  
    </Box>
  }
       
 const getOptionLabel =  (option ) => {
  
  if (typeof option === 'string') {
    return state.componentName + '.' + state.methodName
    // const found = page.components?.find(f => f.ID === option)
    // if (found) {
    //   return found.ComponentName;
    // }
  }
  
  return option.component + '.' + option?.name ; 
}


  
  return <Layout title="Call component method" 
      handleSave={() => handleSave({
        ...event,
        action: state
      })}>
 
 <Stack spacing={2}>

 <QuickSelect 
      
      getOptionLabel={getOptionLabel} 
      options={o} 
      value={state.target}
      renderOption={renderOption}
      onChange={value => setState(s => ({...s, 
        target: value?.ID || null,
        callee: value.callee,
        methodName: value.name,
        componentName: value.component
        }))}
/>



      <TextInput label="Delay" helperText="Time in milliseconds" size="small" value={state.delay} onChange={e => setState(s => ({
        ...s,
        delay: e.target.value
      }))}/>

 </Stack>

{/* <pre>
{JSON.stringify(event,0,2)}
</pre>
<pre>
{JSON.stringify(state,0,2)}
</pre>
<pre>
{JSON.stringify(o,0,2)}
</pre> */}
  </Layout>

}


MethodCall.defaultProps = {};
export default MethodCall;
