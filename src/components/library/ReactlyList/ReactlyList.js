import React from 'react';
import { styled, List, ListItemButton,ListSubheader,ListItemText, ListItemSecondaryAction, ListItemIcon } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { FormatListBulleted } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { Icons } from '../icons';
import { PageStateContext } from '../../../hooks/usePageContext';

const ListItem = styled(ListItemButton)(( {active, theme, selectedColor = 'primary' } ) => ({
  fontWeight: active ? 500 : 400,
  color: active ? 'white' :'#222',
  backgroundColor: !active ? 'white' : (theme.palette[selectedColor]||theme.palette.primary).main
}))
  
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

  const index = props.selectedIndex || args.selectedIndex;

  const selectedIndex = !index
    ? -1
    : index - 1;

 return (
   <> 
   <ReactlyComponent component={List} {...props} subheader={header}> 
 {parsed?.map((item, i) => {
  const StartIcon = Icons[item.startIcon] ;
  const EndIcon = Icons[item.endIcon] ;
  return <ListItem key={i} active={i === selectedIndex} 
          selectedColor={args.selectedColor}
          >
          {!!StartIcon &&   <ListItemIcon >
                <StartIcon />
              </ListItemIcon>}
          <ListItemText  onClick={e => {
    onItemClick && onItemClick(e, {
      ...item,
      row: i
    })
  }} primary={item.text} secondary={item.subtext}/>
 {!!EndIcon && <ListItemSecondaryAction  onClick={e => {
    onSecondaryClick && onSecondaryClick(e, {
      ...item,
      row: i
    })
  }} >
  <EndIcon />
 </ListItemSecondaryAction>}
      </ListItem>
 }
 )}
 
   </ReactlyComponent>
   </>
 );
}

 
const ReactlyList = {  
  Component: ReactlyComponentList,
  bindableProps: ['text', 'subtext'], 
}
 

export default ReactlyList;


