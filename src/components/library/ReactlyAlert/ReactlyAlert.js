import React from 'react'; 
import { Box, Alert } from '@mui/material';  
import { Error } from "@mui/icons-material";
import ReactlyComponent from '../reactly';
import { GenericStyles } from '../styles'; 

 


const ReactlyAlertComponent = ({ children, ...props}) => { 
  return (
   <ReactlyComponent component={Alert} {...props} > 
     {children}
   </ReactlyComponent> 
  );
}



const Settings = {
  categories: [
    {
      name: 'General',
      always: true,

      settings:  [
        {
          title: 'Label',
          label: 'children' 
        }, 
    
      ]
    },
    {
      name: 'Apperance',
      settings: [
        {
          title: 'Variant',
          label: 'variant',
          types: ['filled', 'outlined', 'standard'],
          start: 'filled',
          type: 'pill',
        },
        {
          title: 'Severity',
          label: 'severity',
          types: ['error', 'info', 'success', 'warning'], 
          type: 'pill',
        },  
      ]
    },
 
   
  ]
}
 

const ReactlyAlert = {
  Icon: Error,
  Component: ReactlyAlertComponent ,
  Settings,
  Styles: GenericStyles,
  Defaults: {
    severity: 'info',
    children: 'This will be your alert text'
  }
}
 


ReactlyAlert.defaultProps = {};
export default ReactlyAlert;
