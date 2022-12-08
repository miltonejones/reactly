import React from 'react';
import { BottomNavigation } from '@mui/material';   
import { getSettings } from '../util';
import ReactlyComponent  from '../reactly'; 
  
const ReactlyComponentBottomNavigation = ({ children, ...props }) => {
  const args = getSettings(props.settings); 
 return (
   <ReactlyComponent component={BottomNavigation} {...props} {...args} /> 
 );
}

 

const ReactlyBottomNavigation = { 
  Component: ReactlyComponentBottomNavigation 
}
 

export default ReactlyBottomNavigation;


