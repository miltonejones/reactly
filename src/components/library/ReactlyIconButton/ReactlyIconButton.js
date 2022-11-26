import React from 'react';
import { IconButton } from '@mui/material'; 
import { GenericStyles, ColorStyles } from '../styles'; 
import { Mood } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons, renderIconOption } from '../icons';
import { getSettings } from '../util';
  
const ReactlyComponentIconButton = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[args.icon] || Mood;
 return (
   <ReactlyComponent component={IconButton} {...props}>
      <Icon />
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
          title: 'Icon',
          label: 'icon' ,
          types: Object.keys(Icons),
          renderOption: renderIconOption
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
          title: 'Size',
          types: ['small', 'medium', 'large'],
          label: 'size', 
        } ,
        {
          title: 'Color',
          label: 'color',
          types: [
            'inherit'
              , 'default'
              , 'primary'
              , 'secondary'
              , 'error'
              , 'info'
              , 'success'
              , 'warning' 
          ]
        }
      ]
    },
  ]
}


const ReactlyIconButton = {
  Icon: Mood,
  Component: ReactlyComponentIconButton,
  Settings,
  Styles: {
    categories: [

    ...GenericStyles.categories,
    ...ColorStyles.categories
    ]
  }, 
  Defaults: { }
}
 

export default ReactlyIconButton;


