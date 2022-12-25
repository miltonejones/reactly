import React from 'react';
import { Collapse } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { UnfoldLess } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { PageStateContext } from '../../../hooks/usePageContext';
import { AppStateContext } from "../../../hooks/AppStateContext";
import { recurse } from '../util';
import { getSettings } from '../util';
import { Faux } from '../reactly';
  
const ReactlyComponentCollapse = ({ children, ...props }) => {
  const { pageModalState, setPageModalState, selectedPage, appContext: app } = React.useContext(AppStateContext);
  const { queryState = {} } = React.useContext(AppStateContext); 
  const { selectedComponent } = queryState;
  
  const { componentEditing, preview, ...rest } = props;
  const args = getSettings(props.settings);

  const childOpen = recurse({
    selectedPage,
    app
  }, selectedComponent, props) ; 
 
  const open =  props.in || Object.keys(pageModalState)
    .find(state => state.toString() === props.ID.toString() && !!pageModalState[state])  ;

  const handleClose = () => {
    const state = {
      ...pageModalState,
      [props.ID]: false
    } 
    setPageModalState(state)
    }

  
 return (
  <> 
 {/* {props.ID}[{args.in?.toString()}][{props.in?.toString()}] */}
  {/*  {JSON.stringify(Object.keys(pageModalState))} */}
  <ReactlyComponent component={(componentEditing && preview) || childOpen ? Faux :Collapse} {...props}
   in={open || componentEditing || (childOpen && preview )} 
  >
      {children}
   </ReactlyComponent>
  </>
 );
}


const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Expanded',
          label: 'in' ,
          type: 'boolean',
          bindable: !0,  
        },  
        {
          title: 'orientation',
          label: 'orientation' ,
          types: ['horizontal', 'vertical'], 
          type: 'pill', 
        },  
      ]
    }, 
  ]
}


const ReactlyCollapse = {
  Icon: UnfoldLess,
  Component: ReactlyComponentCollapse,
  allowChildren: !0,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyCollapse;


