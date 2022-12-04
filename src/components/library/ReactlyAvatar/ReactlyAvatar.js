import React from 'react'; 
import { Avatar } from '@mui/material';  
import { AccountCircle } from "@mui/icons-material";
import ReactlyComponent from '../reactly';
import { GenericStyles } from '../styles';
import ReactlyButton from '../ReactlyButton/ReactlyButton';
  
 
const ReactlyAvatarComponent = ({ children, ...props}) => {
  const { onImageLoad } = props;
  return (
   <ReactlyComponent component={Avatar} {...props} onLoad={() => onImageLoad && onImageLoad({
    ...props
   })}> 
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
          bindable: 1
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
 
const Events =  [
  {
    name: 'onImageLoad',
    title: 'Avatar image loads',
    description: 'Image, when present finishes loading.'
  },  
  ...ReactlyButton.Events
]


const ReactlyAvatar = {
  Icon: AccountCircle,
  Component: ReactlyAvatarComponent ,
  Settings: ReactlyAvatarSettings,
  Styles: GenericStyles,
  Events,
  Defaults: {
    children: 'MJ'
  }
}
 


ReactlyAvatar.defaultProps = {};
export default ReactlyAvatar;
