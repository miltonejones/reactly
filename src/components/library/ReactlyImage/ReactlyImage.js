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


const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Image Source',
          label: 'src' ,
          bindable: 1,
          type: 'chip'
        }, 
        {
          title: 'Image Title',
          label: 'alt' ,
          bindable: 1,
          type: 'chip'
        }, 
      ]
    }, 
  ]
}


const ReactlyImage = {
  Icon: Photo,
  Component: ReactlyComponentImage,
  Settings,
  Styles: {
    categories: [
      ...GenericStyles.categories,
      ...ColorStyles.categories
    ]
    }, 
  Defaults: { }
}
 

export default ReactlyImage;


