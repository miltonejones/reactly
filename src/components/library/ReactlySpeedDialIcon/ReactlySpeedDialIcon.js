import React from 'react';
import { SpeedDialIcon } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentSpeedDialIcon = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={SpeedDialIcon} {...props}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlySpeedDialIcon = {
  Icon: Add,
  Component: ReactlyComponentSpeedDialIcon 
}
 

export default ReactlySpeedDialIcon;


