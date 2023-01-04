import React from 'react';
import { Popover } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { SystemSecurityUpdateGood } from '@mui/icons-material';
import ReactlyComponent from '../reactly'; 
import { getSettings } from '../util';
import { AppStateContext } from '../../../context';
import { Faux } from '../reactly';
  
const ReactlyComponentPopover = ({ children, ...props }) => {
  const { pageModalState, setPageModalState } = React.useContext(AppStateContext);
  
  const { componentEditing, preview, ...rest } = props;
  const args = getSettings(props.settings);

  const { vertical, horizontal } = args;

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
   <ReactlyComponent component={componentEditing && preview ? Faux : Popover} {...props} 
      anchorEl={pageModalState.anchorEl}
      open={open || componentEditing} 
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}
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
          title: 'Elevation',
          label: 'elevation' 
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
      ]
    }, 
  ]
}


const ReactlyPopover = {
  Icon: SystemSecurityUpdateGood,
  Component: ReactlyComponentPopover,
  Settings,
  allowChildren: 1,
  Styles: GenericStyles, 
  Defaults: {
    
    vertical: 'bottom',
    horizontal: 'left'

  }
}
 

export default ReactlyPopover;


