import React from 'react';
import { Alert, Stack } from '@mui/material';
import { QuickSelect } from '../../..';
import {
  AppStateContext, 
} from "../../../../hooks/AppStateContext";
import { useEditor } from "../../../../hooks/useEditor";
  
const NEW_STATE_TEXT = 'New state variable...'
 
const StateComponentInput = ({
  selectedPage,
  helperText,
  value,
  header,
  binding,
  handleChange
}) => {

  const { 
    Prompt ,
    appData
  } = React.useContext(AppStateContext);
  const { 
    setPageState, 
  } = useEditor(appData);

  const onChange = React.useCallback(async (value) => {  
    handleChange(value, binding)
  }, [binding, handleChange])

  if (!selectedPage.state) {
    return <Alert>No state vars are available</Alert>
  }

  return <Stack>
    {header}
   {/* (( {JSON.stringify(value)})) */}
    <QuickSelect helperText={helperText} 
        options={selectedPage.state?.map(d => d.Key)}  
        value={value} 
        onChange={onChange}/>
      
  </Stack> 
}
StateComponentInput.defaultProps = {};
export default StateComponentInput;
