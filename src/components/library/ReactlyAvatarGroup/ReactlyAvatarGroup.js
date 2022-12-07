import React from 'react';
import { AvatarGroup } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentAvatarGroup = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={AvatarGroup} {...props}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyAvatarGroup = {
  Icon: Add,
  Component: ReactlyComponentAvatarGroup, 
}
 

export default ReactlyAvatarGroup;


