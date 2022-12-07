import React from 'react';
import { AccordionDetails } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentAccordionDetails = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={AccordionDetails} {...props}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyAccordionDetails = {
  Icon: Add,
  Component: ReactlyComponentAccordionDetails 
}
 

export default ReactlyAccordionDetails;


