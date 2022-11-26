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
          bindable: !0,  
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


