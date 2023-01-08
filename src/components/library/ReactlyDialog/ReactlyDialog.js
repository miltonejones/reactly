import React from 'react';
import { Dialog } from '@mui/material';  
import ReactlyComponent, { Faux } from '../reactly'; 
import { getStyles } from '../util'; 
import { useModalComponent } from '../../../hooks';
 
  
const ReactlyComponentDialog = ({ children, ...props }) => {
  const args = getStyles(props.styles);   
  const modal = useModalComponent(props);  

  const extra = { 
    '& .MuiPaper-root': {
    ...args,
    width: 'fit-content'
  }};

 return (
  
  <>
  {/* <pre>
    {JSON.stringify(modal,0,2)}
  </pre> */}
  <ReactlyComponent  
    onClose={modal.handleClose}
    component={modal.componentEditing || modal.childOpen ? Faux : Dialog} 
    open={modal.open  || props.open } 
    {...props}
    >
      {children} 
   </ReactlyComponent>
  
  </>  
 );
}

 
const ReactlyDialog = { 
  Component: ReactlyComponentDialog, 
}
 

export default ReactlyDialog;


