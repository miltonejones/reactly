import React from 'react';
import { Menu, MenuItem, MenuList, ListItemIcon, ListItemText, Typography, styled } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { MenuOpen } from '@mui/icons-material';
import { PageStateContext } from '../../../hooks/usePageContext';
import { getSettings } from '../util';
import { Icons } from '../icons';
import ReactlyComponent, { Faux } from '../reactly';

const FauxMenu = styled(MenuList)(({ open }) => ({
  maxWidth: 300,
  display: !open ? 'none' : 'block'
}))
  
const ReactlyComponentMenu = ({ children, ...props }) => {
  const { pageModalState, setPageModalState } = React.useContext(PageStateContext);

  const open = Object.keys(pageModalState)
    .find(state => state.toString() === props.ID.toString() && !!pageModalState[state])  ;

  const args = getSettings(props.settings);
  
  const parsed = !!args?.items && typeof args?.items === 'string' 
      ? JSON.parse(args?.items)
      : args?.items;

  const { componentEditing, preview, ...rest } = props;


  const handleClose = () => {
    const state = {
      ...pageModalState,
      [props.ID]: false
    } 
    !!preview && setPageModalState(state)
   }


 return (
   <ReactlyComponent 
     anchorEl={pageModalState.anchorEl}
      onClose={handleClose}
     open={open || componentEditing} 
     {...rest}
     component={open || !preview ? Menu : FauxMenu} 
     {...props}>

    {parsed?.map((item, i) => {
      const StartIcon = Icons[item.startIcon] ;
      const EndIcon = Icons[item.endIcon] ;
      return <MenuItem key={i}>
      {!!StartIcon && <ListItemIcon>
        <StartIcon fontSize="small" />
      </ListItemIcon>}
      <ListItemText>{item.text}</ListItemText>
      {!!EndIcon && <Typography variant="body2" color="text.secondary">
       <EndIcon />
      </Typography>}
    </MenuItem>
    })}
     
     {/* {JSON.stringify(parsed)} */}

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
          label: 'label' 
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [ ], 
        } 
      ]
    },
    {
      name: 'Items', 
      always: true,
      settings: [  
        {
          title: 'Add items to menu',
          label: 'items' ,
          type: 'menulist'
        },  
      ]
    }, 
  ]
}


const ReactlyMenu = {
  Icon: MenuOpen,
  Component: ReactlyComponentMenu,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyMenu;


