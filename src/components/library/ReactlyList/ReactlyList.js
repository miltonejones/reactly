import React from 'react';
import { styled, Box, Avatar, List, ListItemButton ,ListSubheader,ListItemText,
  Stack,
  ListItemSecondaryAction, ListItemIcon } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { FormatListBulleted } from '@mui/icons-material';
import ReactlyComponent from '../reactly'; 
import { getSettings } from '../util';
import { Icons } from '../icons';
import { PageStateContext } from '../../../hooks/usePageContext';
import { useTextTransform } from '../../../hooks/useTextTransform';

const ListItem = styled(ListItemButton)(( {active, theme, selectedColor = 'primary' } ) => ({
  fontWeight: active ? 500 : 400,
  color: active ? 'white' :'#222',
  backgroundColor: !active ? 'white' : (theme.palette[selectedColor]||theme.palette.primary).main
}))
  
const ReactlyComponentList = ({ children, ...props }) => {
  const { pageResourceState } = React.useContext(PageStateContext);
  
  const {onItemClick, onSecondaryClick, settings} = props;
  const args = getSettings(settings);
  const { interpolateText } = useTextTransform();
 


  const listItems = props.items || args?.items;
  const autoSort = props.autosort || args?.autosort;
 


  let dataRows = !!listItems && typeof listItems === 'string' 
    ? JSON.parse(listItems)
    : listItems;

  const header = !args.heading ? null : <ListSubheader>{args.heading}</ListSubheader>

  if (args.bindings)  {
    const obj = JSON.parse(args.bindings);
    dataRows = [];
    const id = obj.resourceID;
    const resource = pageResourceState.find(f => f.resourceID === obj.resourceID);
    if (resource) {
      dataRows = resource.records.map(record => {
        return Object.keys(obj.bindings).reduce((items, res) => {
          items[res] = record[  obj.bindings[res] ]
          return items;
        }, {})
      })
    }
  }

  const index = props.selectedIndex || args.selectedIndex;

  const selectedIndex = props.selectedIndex === undefined 
    ? args.selectedIndex 
    : props.selectedIndex;


 if (!dataRows?.length) {
  return <Box sx={{m: 2}}>
    {args.empty_message}
  </Box>
 }  


 const sortRows = !autoSort ? dataRows : dataRows.sort((a,b) => a.text.toLowerCase() > b.text.toLowerCase() ? 1 : -1);
 const headerText = interpolateText(header);

 return (
   <> 
 
  {/* [ {index}/{props.selectedIndex}/{args.selectedIndex}] */}
    <ReactlyComponent component={List} {...props} > 
      {sortRows?.map((item, i) => {
        const StartIcon = Icons[item.startIcon] ;
        const EndIcon = Icons[item.endIcon] ;
        return <ListItem key={i} active={i === Number(selectedIndex)} 
          selectedColor={args.selectedColor}
          >
          
          {!!(item.avatar||args.default_image) && <Avatar sx={{mr: 1}} src={item.avatar || args.default_image} alt={item.text} />}

          {!!StartIcon &&   <ListItemIcon >
                <StartIcon />
              </ListItemIcon>}


          <ListItemText  onClick={e => {
            onItemClick && onItemClick(e, {
              ...item,
              row: i
            })
          }} 
          primary={item.text} 
          secondary={!item.tertiary ? <>{item.subtext}</> : <Stack>
            <Box>{item.subtext}</Box>
            <Box>{item.tertiary}</Box>
          </Stack>}
          />
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


