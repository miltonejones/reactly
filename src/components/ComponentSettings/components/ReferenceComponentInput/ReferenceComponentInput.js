import React from 'react';
import { Stack } from '@mui/material';
import { Flex, PillMenu , Spacer, QuickSelect } from '../../..'; 
import {
  AppStateContext 
} from "../../../../hooks/AppStateContext";
  
 
const ReferenceComponentInput = ({
  trueProp,
  header,
  value,
  handleChange,
  binding,
  bindingValue,
}) => {

  const { pageRefState } = React.useContext(AppStateContext);
  const options = Object.keys(pageRefState).map(key => pageRefState[key].id)
 

  return <Stack>
    {header}
    <QuickSelect fullWidth options={options} onChange={i => handleChange(i)} 
      value={value}  /></Stack>   
}

ReferenceComponentInput.defaultProps = {};
export default ReferenceComponentInput;
