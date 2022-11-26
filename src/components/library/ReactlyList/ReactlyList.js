import React from 'react';
import { List, ListItemButton,ListSubheader,ListItemText, ListItemSecondaryAction, ListItemIcon } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { FormatListBulleted } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { Icons } from '../icons';
  
const ReactlyComponentList = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const parsed = !!args?.items && typeof args?.items === 'string' 
    ? JSON.parse(args?.items)
    : args?.items;

  const header = !args.heading ? null : <ListSubheader>{args.heading}</ListSubheader>

  
 return (
   <ReactlyComponent component={List} {...props} subheader={header}> 
 {parsed?.map((item, i) => {
  const StartIcon = Icons[item.startIcon] ;
  const EndIcon = Icons[item.endIcon] ;
  return <ListItemButton key={i}>
          {!!StartIcon &&   <ListItemIcon>
                <StartIcon />
              </ListItemIcon>}
          <ListItemText primary={item.text} secondary={item.subtext}/>
 {!!EndIcon && <ListItemSecondaryAction>
  <EndIcon />
 </ListItemSecondaryAction>}
      </ListItemButton>
 }
 )}
 
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
          title: 'Heading',
          label: 'heading' 
        }, 
        {
          title: 'Dense',
          label: 'dense' ,
          type: 'boolean'
        }, 
        {
          title: 'Disable Padding',
          label: 'disablePadding' ,
          type: 'boolean'
        }, 
      ]
    }, 
    {
      name: 'Items', 
      always: true,
      settings: [  
        {
          title: 'Add items to list',
          label: 'items' ,
          type: 'listbuilder'
        },  
      ]
    }, 
  ]
}


const ReactlyList = {
  Icon: FormatListBulleted,
  Component: ReactlyComponentList,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyList;


