import React from 'react';
import { DeleteConfirmMenu } from '../..';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentDeleteConfirmMenu = ({ children, onMenuDeleteClick, ...props }) => {
 return (
   <ReactlyComponent component={DeleteConfirmMenu} {...props} 
   onDelete={confirmed => onMenuDeleteClick && onMenuDeleteClick({}, { confirmed: !!confirmed })}>
      {children}
   </ReactlyComponent>
 );
}

 
 

const ReactlyDeleteConfirmMenu = {
  Icon: Add,
  Component: ReactlyComponentDeleteConfirmMenu 
}
 

export default ReactlyDeleteConfirmMenu;


