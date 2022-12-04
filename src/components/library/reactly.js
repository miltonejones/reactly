import React from 'react';
import { Paper, styled } from '@mui/material'; 
import { getStyles, getSettings , fixText} from './util';
import { RepeaterContext, AppStateContext } from '../../hooks/AppStateContext'; 
import { PageStateContext } from '../../hooks/usePageContext';


const ReactlyComponent = ({ 
  component: Component, 
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

  const args = getSettings(settings); 
  const style = getStyles(styles) ; 
  const fixed = Object.keys(args)
    .map(arg => {
      const val = fixText(args[arg], pageClientState, queryState.params || queryState.page?.parameters);
      return {
        arg,
        val: val || 'arg'
      }
    })
    .reduce((items, prop) => {
      items[prop.arg] = prop.val || 'what now??'
      return items
    }, {})
  
 return  <Component {...fixed} {...props}  style={style} sx={{...props.sx, ...extra}}>
    {children || fixed.children}  
 </Component>
} 

export const Faux = styled(Paper)(( {open} ) => ({ 
  display: !open ? 'none' : 'block' ,
  margin: 16
}))
  
export default ReactlyComponent;