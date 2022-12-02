import React from 'react';
import { CircularProgress } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { RotateLeft } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentCircularProgress = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={CircularProgress} {...props}>
      {children}
   </ReactlyComponent>
 );
}


const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Value',
          label: 'value',
          bindable: 1 
        }, 
        {
          title: 'Size',
          label: 'size', 
        }, 
        {
          title: 'Thickness',
          label: 'thickness', 
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
, 'determinate'
, 'indeterminate'
], 


        } ,
        {
          title: 'Disable Shrink',
          label: 'disableShrink', 
          type: 'boolean',
          when: p => p.variant === 'indeterminate'
        }, 
        {
          title: 'Color',
          label: 'color',
          types: [ 
'inherit'
, 'primary'
, 'secondary'
, 'error'
, 'info'
, 'success'
, 'warning'
], 
        } ,
      ]
    },
  ]
}


const ReactlyCircularProgress = {
  Icon: RotateLeft,
  Component: ReactlyComponentCircularProgress,
  Settings,
  Styles: GenericStyles, 
  Defaults: { 
  thickness:3.6,
  size: 40,
  value: 0
  }
}
 

export default ReactlyCircularProgress;


