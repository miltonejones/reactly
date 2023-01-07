import React from 'react';
import { Link } from '@mui/material';   
import ReactlyComponent from '../reactly'; 
  
const ReactlyComponentLink = ({ children, ...props }) => {
 return (
   <>
   {/* <pre>
   {JSON.stringify(props,0,2)}
   </pre> */}
   <ReactlyComponent component={Link} {...props}>
      {children || props.children}
   </ReactlyComponent>
   </>
 );
}

 
const ReactlyLink = { 
  Component: ReactlyComponentLink, 
}
 

export default ReactlyLink;


