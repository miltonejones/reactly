import React from 'react';
import { Snackbar } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Icecream } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { PageStateContext } from '../../../hooks/usePageContext';
  
const ReactlyComponentSnackbar = ({ children, ...props }) => {
  const { pageModalState, setPageModalState } = React.useContext(PageStateContext);
  const { componentEditing, preview, ...rest } = props;
  const open = Object.keys(pageModalState)
    .find(state => state.toString() === props.ID.toString() && !!pageModalState[state])  ;


  const handleClose = () => {
    const state = {
      ...pageModalState,
      [props.ID]: false
    } 
    setPageModalState(state)
   }

 return (
   <ReactlyComponent component={Snackbar} {...props}
   
      onClose={handleClose}
     open={open || componentEditing} 
   >
      {children}
   </ReactlyComponent>
 );
}


const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Message',
          label: 'message' ,
          bindable: 1
        }, 
        {
          title: 'Vertical Origin',
          label: 'vertical' ,
          types: ['top', 'bottom']
        }, 
        {
          title: 'Horizontal Origin',
          label: 'horizontal' ,
          types: ['left', 'right'], 
        }, 
        {
          title: 'AutoHide Duration',
          label: 'autoHideDuration' , 
        }, 
      ]
    }, 
  ]
}


const ReactlySnackbar = {
  Icon: Icecream,
  Component: ReactlyComponentSnackbar,
  Settings,
  Styles: GenericStyles, 
  allowChildren: !0,
  Defaults: {
  vertical: 'bottom',
  horizontal: 'left' }
}
 

export default ReactlySnackbar;


