import React from 'react';
import { ToggleButtonGroup } from '@mui/material';   
import ReactlyComponent from '../reactly'; 

const ReactlyComponentToggleButtonGroup = ({ children, onButtonClick, ...props }) => { 
 return (
  
 
   <ReactlyComponent component={ToggleButtonGroup} {...props} onChange={(e, n )=> {
    alert (n)
    onButtonClick && onButtonClick(e, {
      value: n
    })
   }} />
 
 );
}

 



const ReactlyToggleButtonGroup = { 
  Component: ReactlyComponentToggleButtonGroup,  
}
 

export default ReactlyToggleButtonGroup;


