import React from 'react';
import { ImageListItemBar } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentImageListItemBar = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={ImageListItemBar} {...props}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyImageListItemBar = {
  Icon: Add,
  Component: ReactlyComponentImageListItemBar 
}
 

export default ReactlyImageListItemBar;


