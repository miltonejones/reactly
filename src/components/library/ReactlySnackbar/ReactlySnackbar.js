import React from 'react';
import { Snackbar } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Icecream } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentSnackbar = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={Snackbar} {...props}>
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
          title: 'Label',
          label: 'label' 
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [ ], 
        } 
      ]
    },
  ]
}


const ReactlySnackbar = {
  Icon: Icecream,
  Component: ReactlyComponentSnackbar,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlySnackbar;


