import React from 'react';
import { Snackbar, Alert, IconButton } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Icecream } from '@mui/icons-material';
import ReactlyComponent from '../reactly'; 
import { getSettings } from '../util';
import { Flex, Spacer } from '../..';
import { AppStateContext } from '../../../hooks/AppStateContext';
import { useTextTransform } from '../../../hooks/useTextTransform';
import { Icons } from '../icons';
  
const ReactlyComponentSnackbar = ({ children, ...props }) => {
  const { pageModalState, setPageModalState } = React.useContext(AppStateContext);
  const { componentEditing, preview, ...rest } = props;
  const { interpolateText } = useTextTransform();
 
  const open = Object.keys(pageModalState)
    .find(state => state.toString() === props.ID.toString() && !!pageModalState[state])  ;

  const args = getSettings(props.settings);

  const { vertical, horizontal, color } = args;

  const handleClose = (event, reason) => {

  // alert (JSON.stringify({...args, reason}))
    
    const state = {
      ...pageModalState,
      [props.ID]: false
    } 
    setPageModalState(state)
   }

   const Icon = Icons[args.action]

   const action = !args.action && !!Icon
    ? <i />
    : <IconButton>
        <Icon  />
      </IconButton> 

 return (
  <>
   <ReactlyComponent component={Snackbar} {...props}
    anchorOrigin={{ vertical, horizontal }}
    onClose={handleClose}
    open={open || componentEditing}  
>

<Flex>
      <Alert severity={args.color}>
        {interpolateText(args.message)}
      </Alert> {action}
    </Flex>

</ReactlyComponent>
  
  </>
 );
}

const SnackbarContent = ({ color, children, action }) => {
  if (!color) {
    return <Flex>{children}<Spacer /> {action}</Flex>;
  }

  return <Flex>
      <Alert severity={color}>
        {children}
      </Alert> {action}
    </Flex>

}


const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Message',
          label: 'message' ,
          bindable: 1,
          type: 'chip'
        }, 
        {
          title: 'Vertical Origin',
          label: 'vertical' ,
          types: ['top', 'bottom']
        }, 
        {
          title: 'Horizontal Origin',
          label: 'horizontal' ,
          types: ['left', 'right'], 
        }, 
        {
          title: 'AutoHide Duration',
          label: 'autoHideDuration' , 
          helperText: 'Time in milliseconds'
        }, 
      ]
    }, 
  ]
}


const ReactlySnackbar = {
  Icon: Icecream,
  Component: ReactlyComponentSnackbar,
  Settings,
  Styles: GenericStyles, 
  allowChildren: !0,
  Defaults: {
  vertical: 'bottom',
  horizontal: 'left' }
}
 

export default ReactlySnackbar;


