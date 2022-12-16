
import React from 'react';
import { AppStateContext } from './AppStateContext';
import { PageStateContext } from './usePageContext';

export const useModalComponent = (props) => {
  const { pageModalState, setPageModalState } = React.useContext(AppStateContext);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { componentEditing, preview, ...rest } = props;
  const { selectedComponent } = queryState;

  const childOpen = selectedComponent?.componentID === props.ID  && preview;

  const open = Object.keys(pageModalState)
    .find(state => state.toString() === props.ID.toString() && (preview || !!pageModalState[state]))  ;

  const handleClose = () => {
    const state = {
      ...pageModalState,
      [props.ID]: false
    } 
    setPageModalState(state)
    }

  return {
    componentEditing, 
    preview,
    handleClose,
    open, 
    childOpen,
    pageModalState
  }
  
}