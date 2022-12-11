import React from 'react';
import Marquee from "react-fast-marquee";
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentScrollText = ({ children, ...props }) => {
  const args = getSettings(props.settings);
 return (
   <ReactlyComponent component={Marquee} {...props} {...args}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyScrollText = {
  Icon: Add,
  Component: ReactlyComponentScrollText 
}
 

export default ReactlyScrollText;


