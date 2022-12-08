import React from 'react';
import { Accordion } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent  from '../reactly';
import { getSettings } from '../util'; 
  
const ReactlyComponentAccordion = ({ children, ...props }) => {
  const args = getSettings(props.settings);   
 return (
 

<ReactlyComponent component={Accordion} {...props} {...args}/> 

 );
}

{/*<>
 {JSON.stringify(args)}
 </> */}

const ReactlyAccordion = {
  Icon: Add,
  Component: ReactlyComponentAccordion 
}
 

export default ReactlyAccordion;


