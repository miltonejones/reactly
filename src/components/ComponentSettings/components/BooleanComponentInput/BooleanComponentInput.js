import React from 'react';
import { Switch, Box } from '@mui/material';
import { Flex, PillMenu , Spacer } from '../../..';
  
 
const BooleanComponentInput = ({
  trueProp,
  header,
  value,
  handleChange,
  binding,
  bindingValue,
}) => {
  const checked = (!!trueProp 
  ? value === trueProp 
  : value) || !!bindingValue

  return <Flex onClick={() => handleChange(!checked)}>
    {header} 
    {/* [[{binding?.toString()}]]
    <pre>
    [[{JSON.stringify(bindingValue,0,2)}]]
    </pre> */}
  <Spacer />
    <Box> 
      <Switch  size="small" checked={checked} /> 
    </Box>
  </Flex>
}

BooleanComponentInput.defaultProps = {};
export default BooleanComponentInput;
