import React from 'react';
import { Box } from '@mui/material'; 
import { GenericStyles, ColorStyles } from '../styles'; 
import { Photo } from '@mui/icons-material'; 
import { getStyles, getSettings } from '../util';
import { useImageLoader } from '../ReactlyInfoCard/ReactlyInfoCard';
  
const ReactlyComponentImage = ({ children, styles, ...props }) => {
  const args = getSettings(props.settings);
  const style = getStyles(styles) ; 
  const { image } = useImageLoader(args.src, args.default_image);

 return ( 
   <img {...props} {...args} title={image} src={args.src || props.src || image} style={style}/> 
 );
}

 

const ReactlyImage = { 
  Component: ReactlyComponentImage, 
}
 

export default ReactlyImage;

  
