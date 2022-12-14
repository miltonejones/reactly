import React from 'react';
import { Drawer } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Inventory } from '@mui/icons-material';
import ReactlyComponent, { Faux }  from '../reactly';
import { PageStateContext } from '../../../hooks/usePageContext';
import { AppStateContext } from "../../../hooks/AppStateContext";
import { recurse } from '../util';
import { getSettings } from '../util';
  
const ReactlyComponentDrawer = ({ children, onModalClose, ...props }) => {
  const args = getSettings(props.settings);
  const { pageModalState, setPageModalState, selectedPage, appContext: app } = React.useContext(AppStateContext);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { componentEditing, preview, ...rest } = props;
  const { selectedComponent } = queryState;


  const childOpen = recurse({
    selectedPage,
    app
  }, selectedComponent, props) ; 
 
  const open = Object.keys(pageModalState)
    .find(state => state.toString() === props.ID.toString() && !!pageModalState[state])  || props.open || args.open ;

    const handleClose = () => {
      onModalClose && onModalClose (1)
      const state = {
        ...pageModalState,
        [props.ID]: false
      } 
      setPageModalState(state)
     }
  
  const drawerOpen = open || componentEditing || (childOpen && preview );

 return (
 <>
 
  <ReactlyComponent 
    onClose={handleClose}
    open={drawerOpen} 
    {...rest}
    hideBackdrop={!!args.hideBackdrop || componentEditing || (childOpen && preview )} 
    component={componentEditing||childOpen ? Faux : Drawer} 
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


