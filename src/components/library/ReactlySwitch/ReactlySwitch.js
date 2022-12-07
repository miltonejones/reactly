import React from 'react';
import { Switch, FormControlLabel } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentSwitch = ({ children, ...props }) => {
  const args = getSettings(props.settings);
 return (
  <FormControlLabel value={args.value} label={args.label} control={<ReactlyComponent component={Switch} {...props}
    {...args}>
      {children}
   </ReactlyComponent>} /> 
 );
}

 

const ReactlySwitch = {
  Icon: Add,
  Component: ReactlyComponentSwitch 
}
 

export default ReactlySwitch;


