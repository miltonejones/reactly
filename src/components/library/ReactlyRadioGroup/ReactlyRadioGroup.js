import React from 'react';
import { RadioGroup } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
import { getSettings } from '../util';
    

const ReactlyComponentRadioGroup = ({ children, ...props }) => {
  const args = getSettings(props.settings); 
 return (
 

   <ReactlyComponent component={RadioGroup} {...props} {...args} />
 
 );
}
 

const ReactlyRadioGroup = { 
  Component: ReactlyComponentRadioGroup, 
}
 

export default ReactlyRadioGroup;


