import React from 'react';
import { Switch, Box } from '@mui/material';
import { Flex, PillMenu , Spacer } from '../../..';
  
 
const BooleanComponentInput = ({
  trueProp,
  header,
  value,
  handleChange
}) => {
  const checked = !!trueProp 
  ? value === trueProp 
  : value

  return <Flex onClick={() => handleChange(!checked)}>
    {header}
  <Spacer />
    <Box> 
      <Switch  size="small" checked={checked} /> 
    </Box>
  </Flex>
}

BooleanComponentInput.defaultProps = {};
export default BooleanComponentInput;
