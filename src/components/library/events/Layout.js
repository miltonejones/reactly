import React from 'react';
import { Box } from '@mui/material'; 
import { Flex, Spacer, Text, TextBtn } from '../..'; 
  
 
const Layout = ({ title, children, handleSave, ...props }) => { 



 return (
   <Box>
    <Text small>{title}</Text>  
  

      {children}


    <Flex sx={{mt: 2}}>
      <Spacer />
      <TextBtn onClick={() => handleSave()}>Cancel</TextBtn>
      <TextBtn variant="contained" onClick={handleSave}>Save</TextBtn>
    </Flex>
   </Box>
 );
}
Layout.defaultProps = {};
export default Layout;
