import React from 'react';
import { Typography } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { FormatColorText } from "@mui/icons-material";
import ReactlyComponent from '../reactly'; 
import ReactlyButton from '../ReactlyButton/ReactlyButton';

 
const ReactlyTypographyComponent = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={Typography} {...props}>
      {children}
   </ReactlyComponent>
 );
}

const ReactlyTypographySettings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Label',
          label: 'children' 
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [
            'body1'
              , 'body2'
              , 'button'
              , 'caption'
              , 'h1'
              , 'h2'
              , 'h3'
              , 'h4'
              , 'h5'
              , 'h6'
              , 'inherit'
              , 'overline'
              , 'subtitle1'
              , 'subtitle2'
                        ], 
        },
        {
          title: 'Use paragraph tag',
          label: 'paragraph', 
          type: 'boolean'
        },
        {
          title: 'Disable text wrap',
          label: 'noWrap', 
          type: 'boolean'
        }, 
      ]
    },
  ]
}


const ReactlyTypography = {
  Icon: FormatColorText,
  Component: ReactlyTypographyComponent,
  Settings: ReactlyTypographySettings,
  Styles: GenericStyles, 
  Events: ReactlyButton.Events,
  Defaults: {
    Label: 'Typography text',
    variant: 'body1'
  }
}
 

ReactlyTypography.defaultProps = {};
export default ReactlyTypography;


