import React from 'react';
import { AccordionSummary } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
  
const ReactlyComponentAccordionSummary = ({ children, ...props }) => {
  const args = getSettings(props.settings);

  const Icon = Icons[args.expandIcon];
 return (
   <ReactlyComponent component={AccordionSummary} {...props} expandIcon={!Icon ? null : <Icon />}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyAccordionSummary = {
  Icon: Add,
  Component: ReactlyComponentAccordionSummary 
}
 

export default ReactlyAccordionSummary;


