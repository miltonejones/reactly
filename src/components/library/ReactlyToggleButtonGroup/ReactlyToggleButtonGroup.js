import React from 'react';
import { ToggleButtonGroup } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { EditAttributes } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { AppStateContext } from "../../../hooks/AppStateContext";

import Library from "..";
import { usePageContext } from "../../../hooks/usePageContext";
  

const ChildComponent = ({ component, children  }) => {
  const { Component } = Library[component.ComponentType];
  const { attachEventHandlers } = usePageContext();
  const eventMap = attachEventHandlers(component);

  return   <Component 
    {...component}
    {...eventMap}
    >
      {children}
  </Component> 
}


const ReactlyComponentToggleButtonGroup = ({ children, onButtonClick, ...props }) => {
  const { queryState = {} } = React.useContext(AppStateContext);
  const { page } = queryState;
  const offspring = page?.components?.filter(f => f.componentID === props.ID)
 return (
  
 
   <ReactlyComponent component={ToggleButtonGroup} {...props} onChange={(e, n )=> {
    alert (n)
    onButtonClick && onButtonClick(e, {
      value: n
    })
   }}>
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
          title: 'Value',
          label: 'value' ,
          bindable: 1
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [  
        {
          title: 'Color',
          label: 'color',
          types: ['standard'
          , 'primary'
          , 'secondary'
          , 'error'
          , 'info'
          , 'success'
          , 'warning']
        },
        {
          title: 'Orientation',
          label: 'orientation',
          types: ['horizontal'
          , 'vertical']
        },
      
        {
          title: 'Size',
          label: 'size',
          types: [ 'medium', 'small', 'large'], 
        } , 
      ]
    },
    {
      name: 'Behavior',
      settings: [  
        {
          title: 'Disabled',
          label: 'disabled',
          type: 'boolean'
        },
        {
          title: 'Exclusive',
          label: 'exclusive',
          type: 'boolean'
        },
        {
          title: 'Full Width',
          label: 'fullWidth',
          type: 'boolean'
        },
      ]
    },
  ]
}

export const Events =  [
  {
    name: 'onButtonClick',
    title: 'Button Group value changes',
    description: 'User clicks on a button in the group.'
  }, 
]



const ReactlyToggleButtonGroup = {
  Icon: EditAttributes,
  Component: ReactlyComponentToggleButtonGroup,
  Settings,
  Events,
  allowChildren: !0,
  allowedChildren: ['ToggleButton'],
  Styles: GenericStyles, 
  
  Defaults: { }
}
 

export default ReactlyToggleButtonGroup;


