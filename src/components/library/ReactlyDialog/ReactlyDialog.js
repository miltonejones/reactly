import React from 'react';
import { Dialog } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { WebAsset } from '@mui/icons-material';
import ReactlyComponent, { Faux } from '../reactly';
import { PageStateContext } from '../../../hooks/usePageContext';
import { AppStateContext } from "../../../hooks/AppStateContext";
import { getStyles } from '../util';
 
  
const ReactlyComponentDialog = ({ children, ...props }) => {
  const args = getStyles(props.styles);
  const { pageModalState, setPageModalState } = React.useContext(PageStateContext);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { componentEditing, preview, ...rest } = props;
  const { selectedComponent, page } = queryState;


  const recurse = (tag, open = false) => {
    
    const kids = page?.components.filter(f => f.componentID === tag.ID);
    if (kids?.length) {
      const out = kids.map(kid => recurse(kid, open || selectedComponent?.ID === kid.ID )) 
      const ok = out.some(f => !!f);

      console.log ({ out, ok })
      return ok
    }
 
    console.log ({ returning: open })
    return open;
  }

  const childOpen = recurse(props) ;// selectedComponent?.componentID === props.ID && preview;
 



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
        open={open || componentEditing || (childOpen && preview )} 
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


