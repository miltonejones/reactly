import React from 'react';
import { Fieldset } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getStyles, getSettings } from '../util';
  
const ReactlyComponentFieldset = ({ children, ...props }) => {
  const args = getSettings(props.settings); 
  const style = getStyles(props.styles) ; 

 return (
   <fieldset {...props}>
      <legend>{props.Label || args.Label}</legend>
      {children}
   </fieldset>
 );
}
 

const ReactlyFieldset = {
  Icon: Add,
  Component: ReactlyComponentFieldset 
}
 

export default ReactlyFieldset;


