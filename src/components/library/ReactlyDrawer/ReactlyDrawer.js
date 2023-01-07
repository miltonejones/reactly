import React from 'react';
import { Drawer } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Inventory } from '@mui/icons-material';
import ReactlyComponent, { Faux }  from '../reactly';
import { PageStateContext } from '../../../hooks/usePageContext';
import { AppStateContext } from "../../../context";
import { recurse } from '../util';
import { getSettings } from '../util';
import { OpenDrawer } from '../..';
import { useModalComponent } from '../../../hooks';
  
const ReactlyComponentDrawer = ({ children, onModalClose, ...props }) => { 
  const args = getSettings(props.settings)
  const modal = useModalComponent(props);   

 return (
 <>
 
  <ReactlyComponent 
    onClose={modal.handleClose}
    open={modal.open  || props.open || args.open } 
    {...props} 
    debug
    component={modal.componentEditing || modal.childOpen ? Faux : Drawer} 
    >
      {children}
   </ReactlyComponent> 
 </>
  
 );
}

 

const ReactlyDrawer = { 
  Component: ReactlyComponentDrawer, 
}
 

export default ReactlyDrawer;


