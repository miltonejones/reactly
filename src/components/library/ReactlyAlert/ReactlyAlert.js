import React from 'react'; 
import { Box, Alert } from '@mui/material';  
import { Error } from "@mui/icons-material";
import ReactlyComponent from '../reactly';
import { GenericStyles } from '../styles';
import { Icons } from '../icons';
import { getSettings } from '../util';


const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
}


const ReactlyAlertComponent = ({ children, ...props}) => {
  const args = getSettings(props.settings);
   
  const Icon = Icons[args.icon];
  return (
   <ReactlyComponent component={Alert} {...props} > 
     {children}
   </ReactlyComponent> 
  );
}
const ReactlyAlertSettings = {
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

    // {
    //   name: 'Icons',
    //   settings: [
    //     {
    //       title: 'Icon',
    //       label: 'icon',
    //       types: Object.keys(Icons),
  //       renderOption
    //     }, 
    //   ]
    // },
   
  ]
}
 

const ReactlyAlert = {
  Icon: Error,
  Component: ReactlyAlertComponent ,
  Settings: ReactlyAlertSettings,
  Styles: GenericStyles,
  Defaults: {
    severity: 'info',
    children: 'This will be your alert text'
  }
}
 


ReactlyAlert.defaultProps = {};
export default ReactlyAlert;
