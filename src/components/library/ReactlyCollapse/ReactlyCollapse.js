import React from 'react';
import { Collapse } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { UnfoldLess } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { PageStateContext } from '../../../hooks/usePageContext';
import { AppStateContext } from "../../../hooks/AppStateContext";
import { recurse } from '../util';
  
const ReactlyComponentCollapse = ({ children, ...props }) => {
  const { pageModalState, setPageModalState } = React.useContext(PageStateContext);
  const { queryState = {} } = React.useContext(AppStateContext); 
  const { selectedComponent, page } = queryState;
  
  const { componentEditing, preview, ...rest } = props;

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
  <> 
  {/* {props.ID}[{open?.toString()}]
  {JSON.stringify(Object.keys(pageModalState))} */}
  <ReactlyComponent component={Collapse} {...props}
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


