import React from 'react';
import { Switch, Box } from '@mui/material';
import { Flex, PillMenu , Spacer } from '../../..';
  
 
const BooleanComponentInput = ({
  trueProp,
  header,
  value,
  handleChange
}) => {
  return <Flex>
    {header}
  <Spacer />
    <Box>
      
    <Switch  size="small"
      checked={!!trueProp 
        ? value === trueProp 
        : value
    }
      onChange={e => {
        handleChange(e.target.checked); 
      }} 
    />

    </Box>
  </Flex>
}

BooleanComponentInput.defaultProps = {};
export default BooleanComponentInput;
