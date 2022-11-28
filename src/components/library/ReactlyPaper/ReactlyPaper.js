import React from 'react';
import { Paper } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Description } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentPaper = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={Paper} {...props}>
      {children}
   </ReactlyComponent>
 );
}


const Settings = {
  categories: [

   
    {
      name: 'Appearance',
      always: true,
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [ 'elevation', 'outline'], 
        } ,
        {
          title: 'Elevation',
          label: 'elevation', 
          types: [1,2,3,4,5,6]
        } ,

        {
          title: 'Square',
          label: 'square',
          type: 'boolean'
        } 
      ]
    },
  ]
}


const ReactlyPaper = {
  Icon: Description,
  allowChildren: !0,
  Component: ReactlyComponentPaper,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyPaper;


