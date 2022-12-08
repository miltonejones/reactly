import React from 'react';
import { Tooltip, Box } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentTooltip = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={Tooltip} {...props}>
     <Box sx={{ width: 'fit-content'}}>
      {children}
     </Box>
   </ReactlyComponent>
 );
}

 


const ReactlyTooltip = {
  Icon: Add,
  Component: ReactlyComponentTooltip, 
}
 

export default ReactlyTooltip;


