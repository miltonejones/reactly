import React from 'react';
import { Drawer } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Inventory } from '@mui/icons-material';
import ReactlyComponent, { Faux }  from '../reactly';
import { PageStateContext } from '../../../hooks/usePageContext';
import { AppStateContext } from "../../../hooks/AppStateContext";
import { recurse } from '../util';
  
const ReactlyComponentDrawer = ({ children, ...props }) => {
  const { pageModalState, setPageModalState } = React.useContext(PageStateContext);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { componentEditing, preview, ...rest } = props;
  const { selectedComponent, page } = queryState;


  const childOpen = recurse(page, selectedComponent, props) ; 
 
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
   <ReactlyComponent 
   
   onClose={handleClose}
   open={open || componentEditing || (childOpen && preview )} 
   {...rest}
   component={open || !preview ? Drawer : Faux} 
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
          title: 'Anchor',
          label: 'anchor' ,
          types: ['bottom'
          , 'left'
          , 'right'
          , 'top']
        }, 
        {
          title: 'Elevation',
          label: 'elevation'
        },
        {
          title: 'Hide Backdrop',
          label: 'hideBackdrop',
          type: 'boolean'
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: ['permanent'
          , 'persistent'
          , 'temporary' ], 
        } 
      ]
    },
  ]
}


const ReactlyDrawer = {
  Icon: Inventory,
  Component: ReactlyComponentDrawer,
  Settings,
  allowChildren: !0,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyDrawer;


