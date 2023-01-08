import React from 'react';
import { Link } from '@mui/material';   
import ReactlyComponent from '../reactly'; 
import { getStyles, getSettings } from "../util";
  
const ReactlyComponentLink = ({ children, ...props }) => {
  const args = getSettings(props.settings);
 return (
   <>
   {/* <pre>
   {JSON.stringify(props,0,2)}
   </pre> */}
   <ReactlyComponent component={Link} {...props}>
      {args.children || children}
   </ReactlyComponent>
   </>
 );
}

 
const ReactlyLink = { 
  Component: ReactlyComponentLink, 
}
 

export default ReactlyLink;


