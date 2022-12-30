import React from 'react';
import {  Popover, Divider, Box } from '@mui/material';
import { Flex, Text, TextBtn, TextInput, Spacer } from '../../../..';
import { Launch } from "@mui/icons-material";
 
const ParameterPopover = ({ anchorEl, onClose, setQueryState, openPage, parameters }) => { 
  const open = Boolean(anchorEl);

  if (!parameters && Object.keys(parameters).length) {
    return <>nope</>
  }
 

  const handleParameterChange = param => event => {
    setQueryState(state => ({
      ...state,
      page: {
        ...state.page,
        parameters: {
          ...state.page.parameters,
          [param]: event.target.value 
        }
      }
    }))
  }

 return (
   <Popover 
      open={open}
      anchorEl={anchorEl}
      onClose={onClose} 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
     <Box sx={{width: 300, p: 2}}>
      <Text small><b>Set page parameters</b></Text>
     </Box>

      <Divider />

     <Box sx={{width: 300, p: 2}}>

      {Object.keys(parameters).map(param => <Flex sx={{mt: 1}}>
        {param} <TextInput 
            size="small"
            onChange={handleParameterChange(param)}
            value={parameters[param]} />
      </Flex>)}

      <Flex sx={{mt: 1}}>
        <Spacer />
        <TextBtn
          onClick={openPage}
          variant="outlined"
          startIcon={<Launch />}
        >Open</TextBtn>
      </Flex>
     </Box>

    </Popover>
 );
}
ParameterPopover.defaultProps = {};
export default ParameterPopover;
