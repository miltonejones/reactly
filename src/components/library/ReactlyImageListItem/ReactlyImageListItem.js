import React from 'react';
import { ImageListItem } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentImageListItem = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={ImageListItem} {...props}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyImageListItem = {
  Icon: Add,
  Component: ReactlyComponentImageListItem 
}
 

export default ReactlyImageListItem;


