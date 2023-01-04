import React from 'react';
import { Dialog } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { WebAsset } from '@mui/icons-material';
import ReactlyComponent, { Faux } from '../reactly';
import { PageStateContext } from '../../../hooks/usePageContext';
import { AppStateContext } from "../../../context";
import { getStyles } from '../util';
import { recurse } from '../util';
 
  
const ReactlyComponentDialog = ({ children, ...props }) => {
  const args = getStyles(props.styles);
  const { pageModalState, setPageModalState, selectedPage, appContext: app } = React.useContext(AppStateContext);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { componentEditing, preview, ...rest } = props;
  const { selectedComponent  } = queryState;

 
  const componentParent = selectedPage || app;
  const parentOpen = recurse(componentParent,  selectedComponent) ; 

  // const childOpen = recurse({
  //   selectedPage,
  //   app
  // }, selectedComponent, props) ; 
 



  const open = Object.keys(pageModalState)
    .find(state => state.toString() === props.ID.toString() && !!pageModalState[state])  ;

   const handleClose = () => {
    const state = {
      ...pageModalState,
      [props.ID]: false
    } 
    setPageModalState(state)
   }
   const extra = { 
     '& .MuiPaper-root': {
      ...args,
      width: 'fit-content'
   }};

 return (
  
  
   <ReactlyComponent 
   extra={extra}
      onClose={handleClose}
        component={open || !preview ? Dialog : Faux} 
        open={open || componentEditing || (parentOpen && preview )} 
        {...rest}
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
          title: 'Label',
          label: 'label' 
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Full Width',
          label: 'fullWidth',
          type: 'boolean', 
        } ,
        {
          title: 'Full Screen',
          label: 'fullScreen',
          type: 'boolean', 
        } ,
        {
          title: 'Max Width',
          label: 'maxWidth',
          types: ['xs'
          ,'sm'
          ,'md'
          ,'lg'
          ,'xl'],
          type: 'pill', 
        } ,
      ]
    },
  ]
}


const ReactlyDialog = {
  Icon: WebAsset,
  Component: ReactlyComponentDialog,
  Settings,
  allowChildren: !0,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyDialog;


