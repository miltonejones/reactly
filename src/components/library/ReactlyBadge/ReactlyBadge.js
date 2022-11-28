import React from 'react';
import { Badge } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { LocalPolice } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentBadge = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={Badge} {...props}>
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
          label: 'badgeContent' ,
          bindable: !0
        }, 
        {
          title: 'Maximum value',
          label: 'max'
        },
        {
          title: 'Show when zero items',
          label: 'showZero' ,
          type: 'boolean'
        }, 
        {
          title: 'Color',
          label: 'color',
          types: ['primary', 'secondary', 'warning', 'error', 'success']
        },
        {
          title: 'Invisible',
          label: 'invisible' ,
          type: 'boolean'
        }
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [ 'dot'
          ,'standard'], 
        } 
      ]
    },
  ]
}


const ReactlyBadge = {
  Icon: LocalPolice,
  Component: ReactlyComponentBadge,
  Settings,
  allowChildren: !0,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyBadge;


