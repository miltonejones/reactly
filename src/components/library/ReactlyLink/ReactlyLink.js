import React from 'react';
import { Link } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { InsertLink } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import ReactlyButton from '../ReactlyButton/ReactlyButton';
  
const ReactlyComponentLink = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={Link} {...props}>
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
          label: 'children' 
        }, 
        {
          title: 'Href',
          label: 'href' 
        }, 
        {
          title: 'Open in new window',
          label: 'window' ,
          type: 'boolean',
          when: p => !!p.href
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [	'body1'
          , 'body2'
          , 'button'
          , 'caption'
          , 'h1'
          , 'h2'
          , 'h3'
          , 'h4'
          , 'h5'
          , 'h6'
          , 'inherit'
          , 'overline'
          , 'subtitle1'
          , 'subtitle2' ], 
        } ,
        {
          title: 'underline',
          label: 'underline',
          types: [
            'always', 'hover', 'none'
          ]
        }
      ]
    },
  ]
}


const ReactlyLink = {
  Icon: InsertLink,
  Component: ReactlyComponentLink,
  Settings,
  Events: ReactlyButton.Events,
  Styles: GenericStyles, 
  Defaults: {
    Label: 'Link',
    underline: 'hover'
   }
}
 

export default ReactlyLink;


