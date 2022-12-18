import React from 'react';
import { SnackbarContent } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentSnackbarContent = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={SnackbarContent} {...props} style={{color: 'black'}}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlySnackbarContent = {
  Icon: Add,
  Component: ReactlyComponentSnackbarContent 
}
 

export default ReactlySnackbarContent;


