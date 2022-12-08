import React from 'react';
import { Masonry } from '@mui/lab';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
import { getSettings } from '../util'; 
  
const ReactlyComponentMasonry = ({ children, ...props }) => {
  const args = getSettings(props.settings); 
 return (
   <ReactlyComponent component={Masonry} {...props} {...args} />
 );
}

 

const ReactlyMasonry = {
  Icon: Add,
  Component: ReactlyComponentMasonry 
}
 

export default ReactlyMasonry;


