import React from 'react';
import { Tab } from '@mui/material';  
import ReactlyComponent from '../reactly'; 
import { Icons } from '../icons';
import { getSettings } from '../util';
  
const ReactlyComponentTab = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[props.icon || args.icon];
 return (
   <ReactlyComponent component={Tab} {...props}
    icon={!Icon ? null : <Icon />}
    >
      {children}
   </ReactlyComponent>
 );
}

 
 
const ReactlyTab = { 
  Component: ReactlyComponentTab, 
}
 

export default ReactlyTab;


