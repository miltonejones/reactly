import React from 'react';
import { Tabs } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Tab } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
import Library from "..";
import { AppStateContext } from "../../../hooks/AppStateContext";
import { usePageContext } from "../../../hooks/usePageContext";
  

const ChildComponent = ({ component, children  }) => {
  const { Component } = Library[component.ComponentType];
  const { attachEventHandlers } = usePageContext();
  const eventMap = attachEventHandlers(component);

  return <> 
   <Component 
    {...component}
    {...eventMap}
    >
      {children}
  </Component>
  </>
}


const ReactlyComponentTabs = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { page } = queryState;
  const offspring = page?.components?.filter(f => f.componentID === props.ID)
  return (
    <ReactlyComponent component={Tabs} {...props} value={parseInt(args.value)}>
    {offspring?.map(guy => <ChildComponent component={guy} key={guy.ID} />)}
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
          title: 'value',
          label: 'value' ,
          bindable: 1
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'indicator Color',
          label: 'indicatorColor',
          type: 'pill',
          types: [ 'primary'
          , 'secondary'], 
        } ,
        {
          title: 'text Color',
          label: 'textColor',
          type: 'pill',
          types: [ 'inherit', 'primary'
          , 'secondary'], 
        } ,
        {
          title: 'orientation',
          label: 'orientation',
          type: 'pill',
          types: [ 'horizontal'
          , 'vertical'], 
        } ,
        {
          title: 'scroll Buttons',
          label: 'scrollButtons',
          type: 'pill',
          types: [ 'auto'
          , false
          , true], 
        } ,
        {
          title: 'Variant',
          label: 'variant',
          type: 'pill',
          types: [ 'fullWidth'
          , 'scrollable'
          , 'standard'], 
        } 
      ]
    },
    {
      name: 'Behavior',
      settings: [ 
        {
          title: 'allow Scroll Buttons on Mobile',
          label: 'allowScrollButtonsMobile',
          type: 'boolean'
        } ,
        {
          title: 'selection Follows Focus',
          label: 'selectionFollowsFocus',
          type: 'boolean'
        } ,
        {
          title: 'visible Scrollbar',
          label: 'visibleScrollbar',
          type: 'boolean'
        } ,
        {
          title: 'Centered',
          label: 'centered',
          type: 'boolean'
        } 
      ]
    },
  ]
}


const ReactlyTabs = {
  Icon: Tab,
  Component: ReactlyComponentTabs,
  Settings,
  Styles: GenericStyles, 
  allowChildren: !0,
  allowedChildren: ['Tab'],
  Defaults: { }
}
 

export default ReactlyTabs;


