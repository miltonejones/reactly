import React from 'react';
import { Tab } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Close } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { iconSettings } from '../settings';
import { Icons } from '../icons';
import { getSettings } from '../util';
  
const ReactlyComponentTab = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[props.icon || args.icon];
 return (
   <ReactlyComponent component={Tab} {...props}
    icon={!Icon ? null : <Icon />}
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
          label: 'label' ,
          bindable: 1,
          type: 'chip'
        }, 
        {
          title: 'Value',
          label: 'value' ,
          bindable: 1,
          type: 'chip'
        }, 
        {
          title: 'Disabled',
          label: 'disabled', 
          type: 'boolean'
        },
      ]
    }, 
    {
      name: 'Icon',
      settings: [ 
        {
          title: 'Icon',
          label: 'icon',
          ...iconSettings
        } ,
        {
          title: 'icon Position',
          label: 'iconPosition',
          type: 'pill',
          types: [
            'bottom'
            , 'end'
            , 'start'
            , 'top'
          ]
        }
      ]
    },
    {
      name: 'Behavior',
      settings: [ 
        {
          title: 'disable Focus Ripple',
          label: 'disableFocusRipple', 
          type: 'boolean'
        } ,
        {
          title: 'disable Ripple',
          label: 'disableRipple', 
          type: 'boolean'
        } ,
      ]
    },
  ]
}


const ReactlyTab = {
  Icon: Close,
  Component: ReactlyComponentTab,
  Settings,
  hidden: 1,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyTab;


