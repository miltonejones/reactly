import React from 'react';
import { Collapse } from '@mui/material';  
import ReactlyComponent from '../reactly'; 
import { useModalComponent } from '../../../hooks';
  
const ReactlyComponentCollapse = ({ children, ...props }) => { 
  const modal = useModalComponent(props);  
 

 return (
  <> 
 {/* <pre>
 {JSON.stringify(modal,0,2)}
 </pre> */}
  <ReactlyComponent 
  component={Collapse} 
  {...props}
   in={props.in  || modal.open} 
  >
      {children}
   </ReactlyComponent>
  </>
 );
}

 

const ReactlyCollapse = { 
  Component: ReactlyComponentCollapse, 
}
 

export default ReactlyCollapse;


