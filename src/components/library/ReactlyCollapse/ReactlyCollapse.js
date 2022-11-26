import React from 'react';
import { Collapse } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { UnfoldLess } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentCollapse = ({ children, ...props }) => {
  
 return (
  <>
  <ReactlyComponent component={Collapse} {...props}>
      {children}
   </ReactlyComponent>
  </>
 );
}


const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Expanded',
          label: 'in' ,
          type: 'boolean',
          when: e => !e.bound 
        }, 
        {
          title: 'State Variable',
          label: 'target',
          type: 'state', 
          when: e => e.bound 
        },
        {
          title: 'Bind value to client state',
          label: 'bound',
          type: 'boolean',
          trueProp: 'in'
        },
      ]
    }, 
  ]
}


const ReactlyCollapse = {
  Icon: UnfoldLess,
  Component: ReactlyComponentCollapse,
  allowChildren: !0,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyCollapse;


