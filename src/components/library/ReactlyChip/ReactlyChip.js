import React from 'react';
import { Chip } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Crop169 } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons, renderIconOption } from '../icons';
import { getSettings } from '../util';
  
const ReactlyComponentChip = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[props.icon || args.icon];
  const DeleteIcon = Icons[args.deleteIcon];
  const icons = {};
  !!Icon && Object.assign(icons, { icon: <Icon /> });
  !!DeleteIcon && Object.assign(icons, { deleteIcon: <DeleteIcon /> });

 return (
  <>
 
   <ReactlyComponent component={Chip} {...props} {...icons} >
      {children}
   </ReactlyComponent>
  </>
 );
}


export const Events =  [
  {
    name: 'onClick',
    title: 'Component is clicked',
    description: 'User clicks on component or focuses and presses SPACE.'
  },
  {
    name: 'onDelete',
    title: 'Delete is clicked',
    description: 'Fires when on Delete icon is clicked.'
  }
]


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
        {
          title: 'Disabled',
          label: 'disabled',
          start: false,
          type: 'boolean'
        },
        {
          title: 'Clickable',
          label: 'clickable',
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
          types: ['filled', 'outlined' ], 
          type: 'pill'
        } ,
        {
          title: 'Size',
          label: 'size',
          types: ['small','medium' ],
          type: 'pill'
        },
        {
          title: 'Color',
          label: 'color',
          types: ['default', 'primary', 'secondary', 'warning', 'error', 'info', 'success']
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
          renderOption: renderIconOption, 
        }, 
    
        {
          title: 'Delete Icon',
          label: 'deleteIcon',
          types: Object.keys(Icons),
          renderOption: renderIconOption,
          helperText: 'Requires onDelete event to be handled.'
        },
      ]
    }
  ]
}


const ReactlyChip = {
  Icon: Crop169,
  Component: ReactlyComponentChip,
  Settings,
  Events,
  Styles: GenericStyles, 
  Defaults: {
    label: 'Chip'
   }
}
 

export default ReactlyChip;


