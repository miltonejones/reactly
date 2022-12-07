import React from 'react';
import { AccordionActions } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentAccordionActions = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={AccordionActions} {...props}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyAccordionActions = {
  Icon: Add,
  Component: ReactlyComponentAccordionActions 
}
 

export default ReactlyAccordionActions;


