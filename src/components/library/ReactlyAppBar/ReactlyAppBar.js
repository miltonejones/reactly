import React from 'react';
import { AppBar } from '@mui/material'; 
import { LayoutStyles } from '../styles'; 
import { BuildCircle } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentAppBar = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={AppBar} {...props}>
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
          title: 'Position',
          label: 'position' ,
          types: [
            'absolute'
              , 'fixed'
              , 'relative'
              , 'static'
              , 'sticky'
          ]
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Color',
          label: 'color',
          types: ['default'
          , 'inherit'
          , 'primary'
          , 'secondary'
          , 'transparent' ], 
        } 
      ]
    },
  ]
}


const ReactlyAppBar = {
  Icon: BuildCircle,
  Component: ReactlyComponentAppBar,
  allowChildren: !0,
  Settings,
  Styles: LayoutStyles, 
  Defaults: { 
    position: 'static',
    color: 'primary'
  }
}
 

export default ReactlyAppBar;


