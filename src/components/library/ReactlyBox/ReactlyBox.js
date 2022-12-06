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
  allowChildren: !0,
  Component: ReactlyBoxComponent, 
  Styles: LayoutStyles, 
}
 

ReactlyBox.defaultProps = {};
export default ReactlyBox;
