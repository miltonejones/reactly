import React from 'react'; 
import { Avatar } from '@mui/material';  
import { AccountCircle } from "@mui/icons-material";
import ReactlyComponent from '../reactly';
import { GenericStyles } from '../styles';
  
 
const ReactlyAvatarComponent = ({ children, ...props}) => {
  return (
   <ReactlyComponent component={Avatar} {...props}> 
     {children}
   </ReactlyComponent> 
  );
}

export const ReactlyAvatarSettings = {
  categories: [
    {
      name: 'General',
      always: true,

      settings:  [
        {
          title: 'Label',
          label: 'children',
          start: 'A'
        },
        {
          title: 'Image Source',
          label: 'src', 
        },
        {
          title: 'Image Title',
          label: 'alt', 
        }, 
    
      ]
    },
    {
      name: 'Apperance',
      settings: [
 
        {
          title: 'Variant',
          label: 'variant',
          types: ['circular', 'rounded', 'square'],
          start: 'circular',
          type: 'pill',
        },  
      ]
    },

   
  ]
}
 

const ReactlyAvatar = {
  Icon: AccountCircle,
  Component: ReactlyAvatarComponent ,
  Settings: ReactlyAvatarSettings,
  Styles: GenericStyles,
  Defaults: {
    children: 'MJ'
  }
}
 


ReactlyAvatar.defaultProps = {};
export default ReactlyAvatar;
