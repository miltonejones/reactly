import React from 'react';
import { styled, Box, Button } from '@mui/material'; 
import { GenericStyles } from '../styles';
import { Icons } from '../icons';
import { SmartButton } from "@mui/icons-material";
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';

 
 
const ReactlyButtonComponent = (props) => {
  const args = getSettings(props.settings);

  const Icon = Icons[args.icon];
  const End = Icons[args.end];

  const icons = !Icon ? {} : {
    startIcon: <Icon />
  }

  !!End && Object.assign(icons, {endIcon: <End />})
 return (
   <ReactlyComponent component={Button} {...props} {...icons}>
      {args.Label}  
   </ReactlyComponent>
 );
} 


const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
}

export const ReactlyButtonStyles = {
  ...GenericStyles
}

export const ReactlyButtonEvents =  [
  {
    name: 'onClick',
    title: 'Button is clicked',
    description: 'User clicks on component or focuses and presses SPAACE.'
  }
]



export const ReactlyButtonSettings = {
  categories: [
    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Label',
          label: 'Label',
          start: 'Button'
        },
        {
          title: 'Disabled',
          label: 'disabled',
          start: false,
          type: 'boolean'
        },
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: ['contained', 'outlined', 'text'],
          start: 'outlined',
          type: 'pill'
        },
        {
          title: 'Size',
          label: 'size',
          types: ['small','medium','large'],
          type: 'pill'
        },
        {
          title: 'Color',
          label: 'color',
          types: ['primary', 'secondary', 'warning', 'error', 'success']
        },
      ]
    },
    {
      name: 'Icons',
      settings: [
        {
          title: 'Start Icon',
          label: 'icon',
          types: Object.keys(Icons),
          renderOption
        },
        {
          title: 'End Icon',
          label: 'end',
          types: Object.keys(Icons),
          renderOption
        },
      ]
    }
  ] 
}

const ReactlyButton = {
  Icon: SmartButton,
  Component: ReactlyButtonComponent,
  Settings: ReactlyButtonSettings,
  Styles: ReactlyButtonStyles,
  Events: ReactlyButtonEvents,
  Defaults: {
    Label: 'Button',
    variant: 'contained'
  }
}
 


ReactlyButton.defaultProps = {};
export default ReactlyButton;
