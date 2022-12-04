import React from 'react';
import { Divider } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { HorizontalRule } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentDivider = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={Divider} {...props}>
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
          title: 'Orientation',
          label: 'orientation' ,
          type: 'pill',
          types: [
            'horizontal', 'vertical'
          ]
        }, 
        {
          title: 'Text Align',
          label: 'textAlign',
          type: 'pill',
          types: [
            'center'
            , 'left'
            , 'right'
          ]
        },
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          type: 'pill',
          types: [ 'fullWidth'
          , 'inset'
          , 'middle'], 
        } 
      ]
    },
  ]
}


const ReactlyDivider = {
  Icon: HorizontalRule,
  allowChildren: !0,
  Component: ReactlyComponentDivider,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyDivider;


