import React from 'react';
import { Box } from '@mui/material'; 
import { GenericStyles, ColorStyles } from '../styles'; 
import { Photo } from '@mui/icons-material'; 
import { getStyles, getSettings } from '../util';
  
const ReactlyComponentImage = ({ children, styles, ...props }) => {
  const args = getSettings(props.settings);
  const style = getStyles(styles) ; 
 return ( 
   <img {...props} {...args} style={style}/> 
 );
}

 

const ReactlyImage = { 
  Component: ReactlyComponentImage, 
}
 

export default ReactlyImage;


