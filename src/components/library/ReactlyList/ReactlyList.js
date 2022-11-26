import React from 'react';
import { List, ListItemButton,ListSubheader,ListItemText, ListItemSecondaryAction, ListItemIcon } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { FormatListBulleted } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { Icons } from '../icons';
import { PageStateContext } from '../../../hooks/usePageContext';
  
const ReactlyComponentList = ({ children, ...props }) => {
  const { pageResourceState } = React.useContext(PageStateContext);
  
  const {onItemClick, onSecondaryClick, settings} = props;
  const args = getSettings(settings);
  let parsed = !!args?.items && typeof args?.items === 'string' 
    ? JSON.parse(args?.items)
    : args?.items;

  const header = !args.heading ? null : <ListSubheader>{args.heading}</ListSubheader>

  if (args.bindings)  {
    const obj = JSON.parse(args.bindings);
    parsed = [];
    const id = obj.resourceID;
    const resource = pageResourceState.find(f => f.resourceID === obj.resourceID);
    if (resource) {
      parsed = resource.records.map(record => {
        return Object.keys(obj.bindings).reduce((items, res) => {
          items[res] = record[  obj.bindings[res] ]
          return items;
        }, {})
      })
    }
  }

 return (
   <>
 
   <ReactlyComponent component={List} {...props} subheader={header}> 
 {parsed?.map((item, i) => {
  const StartIcon = Icons[item.startIcon] ;
  const EndIcon = Icons[item.endIcon] ;
  return <ListItemButton key={i}>
          {!!StartIcon &&   <ListItemIcon >
                <StartIcon />
              </ListItemIcon>}
          <ListItemText  onClick={e => {
    onItemClick && onItemClick(e, {
      ...item
    })
  }} primary={item.text} secondary={item.subtext}/>
 {!!EndIcon && <ListItemSecondaryAction  onClick={e => {
    onSecondaryClick && onSecondaryClick(e, {
      ...item
    })
  }} >
  <EndIcon />
 </ListItemSecondaryAction>}
      </ListItemButton>
 }
 )}
 
   </ReactlyComponent>
   </>
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
    {
      name: 'Data',  
      settings: [  
        {
          title: 'Bind to data resource',
          label: 'bindings' ,
          type: 'listbinder'
        },  
      ]
    }, 
  ]
}

const Events =  [
  {
    name: 'onItemClick',
    title: 'List item is clicked',
    description: 'User clicks on an item in the list.'
  }, 
  {
    name: 'onSecondaryClick',
    title: 'List item is secondary icon is clicked',
    description: 'User clicks on the icon at the right of a list item.'
  }, 
]


const ReactlyList = {
  Icon: FormatListBulleted,
  Component: ReactlyComponentList,
  Settings,
  Events,
  Styles: GenericStyles, 
  bindableProps: ['text', 'subtext'],
  Defaults: { }
}
 

export default ReactlyList;


