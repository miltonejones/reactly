import React from 'react';
import { BottomNavigationAction } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
  
const ReactlyComponentBottomNavigationAction = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[props.icon || args.icon];
 return (
   <ReactlyComponent component={BottomNavigationAction} {...props}   {...args} icon={!Icon ? null : <Icon />} >
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyBottomNavigationAction = {
  Icon: Add,
  Component: ReactlyComponentBottomNavigationAction 
}
 

export default ReactlyBottomNavigationAction;


