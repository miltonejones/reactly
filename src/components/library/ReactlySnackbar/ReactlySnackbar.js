import React from 'react';
import { Snackbar, Alert, IconButton, AlertTitle } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Icecream } from '@mui/icons-material';
import ReactlyComponent from '../reactly'; 
import { getSettings } from '../util';
import { Flex, Spacer } from '../..';
import { AppStateContext } from '../../../context';
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
    ? null
    : <IconButton>
        <Icon  />
      </IconButton> 

      
if (!args.message) {
  return <>Waiting for settings</>
}


 if (!args.color) {

  return (  
    <ReactlyComponent component={Snackbar} {...props}
      anchorOrigin={{ vertical, horizontal }}
      onClose={handleClose}
      open={open || componentEditing}  
      >

    {!!args.message &&  <Flex>  {interpolateText(args.message)} </Flex>}
    </ReactlyComponent>
     
  );

 }

 return (
  <>
  {/* <>This would be the color version [{args.color}]</> */}
   <ReactlyComponent component={Snackbar} {...props}
    anchorOrigin={{ vertical, horizontal }}
    onClose={handleClose}
    open={open || componentEditing}  
    >
 
      <Alert action={action} severity={args.color}>
      {!!args.title && <AlertTitle>{interpolateText(args.title)}</AlertTitle>}
        {interpolateText(args.message)}
      </Alert>  

   </ReactlyComponent>
  
  </>
 );
}
 

 


const ReactlySnackbar = { 
  Component: ReactlyComponentSnackbar, 
}
 

export default ReactlySnackbar;


