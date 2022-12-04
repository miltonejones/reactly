import React from 'react';
import { Switch, Box, useTheme } from '@mui/material';
import { Flex, PillMenu , Spacer, QuickSelect } from '../../..'; 
  
 
const ShadowComponentInput = ({
  trueProp,
  header,
  value,
  handleChange,
  binding,
  bindingValue,
}) => {

  const theme = useTheme();
  const checked = (!!trueProp 
  ? value === trueProp 
  : value) || !!bindingValue

  return <QuickSelect options={theme.shadows.map((e,i) => i)} onChange={i => handleChange(theme.shadows[i])} 
      value={theme.shadows.indexOf(value)}  />  
}

ShadowComponentInput.defaultProps = {};
export default ShadowComponentInput;
