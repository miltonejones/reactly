import React from 'react';
import { git } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentgit = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={git} {...props}>
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


const Reactlygit = {
  Icon: add,
  Component: ReactlyComponentgit,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default Reactlygit;


