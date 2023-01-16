import React from 'react';
import { CircularProgress } from '@mui/material';  
import ReactlyComponent from '../reactly';
  
const ReactlyComponentCircularProgress = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={CircularProgress} {...props}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyCircularProgress = { 
  Component: ReactlyComponentCircularProgress, 
}
 

export default ReactlyCircularProgress;


