import React from 'react';
import { Checkbox } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Check } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getStyles, getSettings } from '../util';
  
const ReactlyComponentCheckbox = ({ children, ...props }) => {
  const args = getSettings(props.settings); 
  const style = getStyles(props.styles) ; 

 return (
 <>
 
 <ReactlyComponent component={Checkbox} {...props} {...args}>
      {children}
   </ReactlyComponent>
   {/* <pre>
   {JSON.stringify(args,0,2)}
   </pre> */}
   </> 
 );
}

 

const ReactlyCheckbox = {
  Icon: Check,
  Component: ReactlyComponentCheckbox, 
}
 

export default ReactlyCheckbox;


