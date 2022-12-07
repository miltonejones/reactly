import React from 'react';
import { Alert, Stack, IconButton } from '@mui/material';
import { QuickSelect, QuickMenu } from '../../..';
import {
  AppStateContext, 
} from "../../../../hooks/AppStateContext";
import { useEditor } from "../../../../hooks/useEditor";
import { MoreVert } from "@mui/icons-material";
  
const NEW_STATE_TEXT = 'New state variable...'
 
const StateComponentInput = ({
  selectedPage,
  helperText,
  value,
  header,
  binding,
  handleChange,
  menu, 
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

  
  if (!selectedPage.state && !selectedPage.parameters) {
    return <i/>
  }

  const Component = menu ? QuickMenu : QuickSelect;

  const options = !selectedPage.state ? [] : selectedPage.state.map(d => d.Key);
  !!selectedPage.parameters && Object.keys(selectedPage.parameters).map(paramKey => {
    return options.push(`parameters.${paramKey}`);
  })
  return <Stack>
    {header}
   {/* (( {JSON.stringify(value)})) */}
    <Component helperText={helperText} 
        options={options}  
        value={value} 
        label={!menu ? '' : <IconButton>
          <MoreVert />
        </IconButton>}
        onChange={onChange}/>
      
  </Stack> 
}
StateComponentInput.defaultProps = {};
export default StateComponentInput;
