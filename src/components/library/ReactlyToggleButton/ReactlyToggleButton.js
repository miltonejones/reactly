import React from 'react';
import { Box } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { SmartButton } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
import ToggleButton from '@mui/material/ToggleButton'; 


const ReactlyComponentToggleButton = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[args.icon];


 return (
 
   <ReactlyComponent component={ToggleButton} {...props}>
      {!!Icon && <Icon />}
   </ReactlyComponent> 
 );
}

const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
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
        }, 
        {
          title: 'Label',
          label: 'label' ,
          when: p => !p.use_icon
        }, 
        {
          title: 'Icon',
          label: 'icon',
          types: Object.keys(Icons),
          renderOption,
          when: p => p.use_icon
        },

        {
          title: 'Use icons',
          label: 'use_icon',
          type: 'boolean'
        },
        {
          title: 'Disabled',
          label: 'disabled', 
          type: 'boolean'
        },
        {
          title: 'Selected',
          label: 'selected', 
          type: 'boolean'
        },
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Size',
          label: 'size',
          types: ['small','medium','large'],
          type: 'pill'
        },
        {
          title: 'Color',
          label: 'color',
          types: ['standard', 'primary', 'secondary', 'warning', 'error', 'info', 'success']
        },
      ]
    },
  ]
}


const ReactlyToggleButton = {
  Icon: SmartButton,
  Component: ReactlyComponentToggleButton,
  Settings,
  hidden: 1,
  Styles: GenericStyles, 
  Defaults: { }
}
  

export default ReactlyToggleButton;


