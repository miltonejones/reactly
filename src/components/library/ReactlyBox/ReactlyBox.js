import React from 'react';
import { Box } from '@mui/material'; 
import { LayoutStyles } from '../styles'; 
import { Inventory } from "@mui/icons-material";
import ReactlyComponent from '../reactly';
  
 
const ReactlyBoxComponent = ( { children, ...props } ) => { 
 return (
  <ReactlyComponent component={Box} {...props}> 
    {children}
  </ReactlyComponent> 
 );
}
 

const ReactlyBox = {
  Icon: Inventory, 
  Component: ReactlyBoxComponent 
}
 

ReactlyBox.defaultProps = {};
export default ReactlyBox;
