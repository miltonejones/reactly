import React from 'react';
import { Alert, Stack } from '@mui/material';
import { QuickSelect } from '../../..';
  
 
const StateComponentInput = ({
  selectedPage,
  helperText,
  value,
  header,
  handleChange
}) => {


  if (!selectedPage) {
    return <Alert>No state vars are available</Alert>
  }

  return <Stack>
    {header}
    <QuickSelect helperText={helperText} 
        options={selectedPage.state?.map(d => d.Key)}  
        value={value} 
        onChange={handleChange}/>
  </Stack> 
}
StateComponentInput.defaultProps = {};
export default StateComponentInput;
