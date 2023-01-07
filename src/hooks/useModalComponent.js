
import React from 'react';
import { AppStateContext } from '../context';
import { PageStateContext } from './usePageContext';


const recurse = (ID, page, out = []) => { 
  const children = page.components?.filter(f => f.componentID === ID);
  out.push(ID)
  children.map(child => recurse(child.ID, page, out));
  return out;
}

export const useModalComponent = (props) => {
  const { pageModalState, setPageModalState } = React.useContext(AppStateContext);
  const { preview, queryState = {}, selectedPage, appContext } = React.useContext(AppStateContext);
 
  const { selectedComponent } = queryState;

  const componentParent = selectedPage || appContext;
  const componentChildren = recurse(props.ID, componentParent);
  const componentEditing = selectedComponent?.ID === props.ID;

  const childOpen = componentChildren.some(f => f === selectedComponent?.ID) && preview ;
 

  const open = Object.keys(pageModalState)
    .find(state => state.toString() === props.ID.toString() && !!pageModalState[state])  ;

  const handleClose = () => {
    const state = {
      ...pageModalState,
      [props.ID]: false
    } 
    setPageModalState(state)
    }

  return { 
    selectedComponentID: selectedComponent?.ID,
    componentChildren,
    componentEditing, 
    preview,
    handleClose,
    open: open || componentEditing || childOpen, 
    childOpen 
  }
  
}