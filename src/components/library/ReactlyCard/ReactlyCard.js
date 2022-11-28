import React from 'react';
import { Card } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { CreditCard } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import ReactlyPaper from '../ReactlyPaper/ReactlyPaper';
  
const ReactlyComponentCard = ({ children, ...props }) => {
 return (
   <ReactlyComponent component={Card} {...props}>
      {children}
   </ReactlyComponent>
 );
}


const Settings = {
  categories: [

    ...ReactlyPaper.Settings.categories,
    {
      name: 'Paper', 
      settings: [  
        {
          title: 'Raised',
          label: 'raised' ,
          type: 'boolean'
        }, 
      ]
    } 
  ]
}


const ReactlyCard = {
  Icon: CreditCard,
  Component: ReactlyComponentCard,
  Settings,
  allowChildren: !0,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyCard;


