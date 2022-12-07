import React from 'react';
import { Radio, FormControlLabel } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentRadio = ({ children, ...props }) => {
  const args = getSettings(props.settings);

  const content = <ReactlyComponent component={Radio} {...props}>
  {children}
</ReactlyComponent>

return   <FormControlLabel value={args.value} control={content} label={args.label} />

  
}
 
const ReactlyRadio = {
  Icon: Add,
  Component: ReactlyComponentRadio, 
}
 

export default ReactlyRadio;


