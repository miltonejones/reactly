import React from 'react';
import { Skeleton } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentSkeleton = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={Skeleton} {...props}>
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlySkeleton = {
  Icon: Add,
  Component: ReactlyComponentSkeleton 
}
 

export default ReactlySkeleton;


