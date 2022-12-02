import React from 'react';
import { LinearProgress } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { LinearScale } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentLinearProgress = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={LinearProgress} {...props}>
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
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [ 'buffer'
, 'determinate'
, 'indeterminate'
, 'query'], 
        } ,
        {
          title: 'Color',
          label: 'color',
          types: [ 
'inherit'
, 'primary'
, 'secondary'], 
        } ,
      ]
    },
  ]
}


const ReactlyLinearProgress = {
  Icon: LinearScale,
  Component: ReactlyComponentLinearProgress,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyLinearProgress;


