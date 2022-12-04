import React from 'react';
import { Fab } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Lens } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons, renderIconOption } from '../icons';
import { getSettings } from '../util';
import ReactlyButton from '../ReactlyButton/ReactlyButton';
  
const ReactlyComponentFab = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[props.icon || args.icon] || Lens;
 return (
   <ReactlyComponent component={Fab} {...props}>
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
          renderOption: renderIconOption,
          bindable: 1
        }, 
        {
          title: 'Href',
          label: 'href' 
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Color',
          label: 'color',
          types: [
            'default'
              , 'error'
              , 'info'
              , 'inherit'
              , 'primary'
              , 'secondary'
              , 'success'
              , 'warning'
          ]
        },
        {
          title: 'size',
          label: 'size',
          types: ['small'
          , 'medium'
          , 'large'], 
        } ,
        {
          title: 'Variant',
          label: 'variant',
          types: [ 'circular'
                , 'extended'], 
        } ,
      ]
    },
  ]
}


const ReactlyFab = {
  Icon: Lens,
  Component: ReactlyComponentFab,
  Settings,
  Events: ReactlyButton.Events,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyFab;


