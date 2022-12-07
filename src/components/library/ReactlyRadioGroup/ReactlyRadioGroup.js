import React from 'react';
import { RadioGroup } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
import { getSettings } from '../util';
   
import { AppStateContext } from "../../../hooks/AppStateContext";
import { usePageContext } from "../../../hooks/usePageContext";
  

const ChildComponent = ({ component, children  }) => {
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


const ReactlyComponentRadioGroup = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { page } = queryState;
  const offspring = page?.components?.filter(f => f.componentID === props.ID)
 return (
 

   <ReactlyComponent component={RadioGroup} {...props} {...args}>
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
          title: 'Label',
          label: 'label' 
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [ ], 
        } 
      ]
    },
  ]
}


const ReactlyRadioGroup = {
  Icon: Add,
  Component: ReactlyComponentRadioGroup,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyRadioGroup;


