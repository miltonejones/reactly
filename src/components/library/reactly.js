import React from 'react';
import {  useParams } from "react-router-dom"; 
import { Paper, styled } from '@mui/material'; 
import { getStyles, getSettings , fixText} from './util';
import { PageStateContext, RepeaterContext, AppStateContext } from '../../context';  
import { usePageContext } from "../../hooks/usePageContext";
import { getParams } from './util';
import { useTextTransform } from '../../hooks/useTextTransform';



export const ChildComponent = ({ component, children  }) => {
  const { Library } = React.useContext(AppStateContext);
  const { Component } = Library[component.ComponentType];
  const { attachEventHandlers } = usePageContext();
  const styles = getStyles(component.styles)
  const eventMap = attachEventHandlers(component);
//  return JSON.stringify(eventMap)
  return  <Component 
    style={styles}
    {...component}
    {...eventMap}
    >
      {eventMap.children || children} 
  </Component> 
}



const componentOrder = (a, b) => (a.order > b.order ? 1 : -1);


export const useTextBind = (settings, selectedPage) => {
 
  const { interpolateText } = useTextTransform();
  const { queryState = {},
  pageClientState,
  applicationClientState } = React.useContext(AppStateContext);


  const args = getSettings(settings); 
  const fixed = Object.keys(args)
    .map(arg => {
      const val = interpolateText(args[arg], pageClientState);
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
  styles = [], 
  extra,
  ...props 
}) => {

  const { queryState = {}, appContext , applicationClientState, Library} = React.useContext(AppStateContext);
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

  const { interpolateText } = useTextTransform();
 
  const childComponents = ((selectedPage?.components||[]).concat(appContext.components||[])).filter(f => f.componentID === props.ID);

  const routeParams = useParams()
  const routes = getParams(queryState,  selectedPage, routeParams)

  // console.log ({ routes })
  const args = getSettings(settings); 


  const style = getStyles(styles.filter(f => !f.selector));
 
    


  const made = {}
  
  const subCss = styles.filter(f => !!f.selector).map(m => {
    Object.assign(made, { 
      [`&.${m.selector}`]: { 
        ...made [`&.${m.selector}`],
          [`${m.Key}`]: `${m.Value}`
        }  
    }) 
  })

  const completed = {
    position: 'relative',
    ...style,
    ...made
  }

  const state = !props.pageID ? applicationClientState : pageClientState

  const fixed = Object.keys(args)
    .map(arg => {
      const val = interpolateText(args[arg], state);
      return {
        arg,
        val: val || 'arg'
      }
    })
    .reduce((items, prop) => {
      items[prop.arg] = prop.val 
      return items
    }, {})

 
  if (childComponents?.length && Library[props.ComponentType].allowedChildren) {
    return  <Component {...fixed} {...props}  style={completed} sx={{...props.sx, ...style, ...extra}}> 
            { childComponents.sort(componentOrder).map(guy => <>
        
              <ChildComponent component={guy} key={guy.ID}  />
            </>)}
          </Component>
  }

 return (  
  <>
{/* [  <pre>
    {JSON.stringify(props.pageID,0,2)}
  </pre>] */}
 <Component {...fixed} {...props}    sx={{...props.sx, ...style, ...extra}} > 
    {fixed.children || children}
 </Component></>
   )
} 

export const Faux = styled(Paper)(({ open, anchor }) => {
  const obj = { 
    display: !open ? 'none' : 'block' ,
    margin: 16,
    backgroundColor: 'white',
    maxWidth: '400px !important',
  }

  if (anchor) {
    Object.assign(obj, {
      position: 'fixed', 
      zIndex: 1000,
      // maxHeight: '90vh',
      boxShadow: `0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)`
    })

    if (anchor === 'bottom') {
      Object.assign(obj, {
        bottom: 0,
        left: 0,
        minHeight: '30vh',
        width: 'calc(100vw - 400px)'
      })
    } else {
      Object.assign(obj, {
        height: '100%',
        minHeight: '100vh',
        top: 0,
        left: 360,
        width: 400,
        maxWidth: '400px !important',
      })
    }
  }

  return obj;
})
  
export default ReactlyComponent;