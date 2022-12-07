import React from 'react';
import {  useParams } from "react-router-dom"; 
import { Paper, styled } from '@mui/material'; 
import { getStyles, getSettings , fixText} from './util';
import { RepeaterContext, AppStateContext } from '../../hooks/AppStateContext'; 
import { PageStateContext } from '../../hooks/usePageContext';
import { usePageContext } from "../../hooks/usePageContext";
import { getParams } from './util';



export const ChildComponent = ({ component, children  }) => {
  const { Library } = React.useContext(AppStateContext);
  const { Component } = Library[component.ComponentType];
  const { attachEventHandlers } = usePageContext();
  const eventMap = attachEventHandlers(component);

  return  <Component 
    {...component}
    {...eventMap}
    >
      {children}
  </Component> 
}




export const useTextBind = (settings, selectedPage) => {
  const { 
    pageClientState,  
  } = React.useContext(PageStateContext);
  const { queryState = {} } = React.useContext(AppStateContext);


  const args = getSettings(settings); 
  const fixed = Object.keys(args)
    .map(arg => {
      const val = fixText(args[arg], pageClientState, queryState.params || selectedPage?.parameters);
      return {
        arg,
        val: val || 'arg'
      }
    })
    .reduce((items, prop) => {
      items[prop.arg] = prop.val 
      return items
    }, {})

    return { fixed }
}

const ReactlyComponent = ({ 
  component: Component, 
  selectedPage,
  children,
  settings,
  styles, 
  extra,
  ...props 
}) => {

  const { queryState = {} } = React.useContext(AppStateContext);
  const { row } = React.useContext(RepeaterContext);
  const { 
    pageClientState,  
  } = React.useContext(PageStateContext);

  if (row) {
    Object.keys(row).map(item => {
      const binding = row[item];
      const setting = binding.SettingName;
      const value = binding.record[item];
      settings = settings?.map(f => f.SettingName === setting ? {...f, SettingValue: value} : f)
    }) 
  }

  const routeParams = useParams()
  const routes = getParams(queryState,  selectedPage, routeParams)

  // console.log ({ routes })
  const args = getSettings(settings); 
  const style = getStyles(styles) ; 
  const fixed = Object.keys(args)
    .map(arg => {
      const val = fixText(args[arg], pageClientState, routes);
      return {
        arg,
        val: val || 'arg'
      }
    })
    .reduce((items, prop) => {
      items[prop.arg] = prop.val 
      return items
    }, {})
  
 return ( <Component {...fixed} {...props}  style={style} sx={{...props.sx, ...extra}}>
    {children || fixed.children}  
 </Component>  )
} 

export const Faux = styled(Paper)(( {open} ) => ({ 
  display: !open ? 'none' : 'block' ,
  margin: 16
}))
  
export default ReactlyComponent;