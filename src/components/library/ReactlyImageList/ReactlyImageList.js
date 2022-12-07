import React from 'react';
import { ImageList } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentImageList = ({ children, ...props }) => {
  const args = getSettings(props.settings);
 return (
 
  <ReactlyComponent component={ImageList} {...props} {...args}>
      {children}
   </ReactlyComponent>
 
 );
}

 

const ReactlyImageList = {
  Icon: Add,
  Component: ReactlyComponentImageList 
}
 

export default ReactlyImageList;


