import React from 'react';
import { BottomNavigation } from '@mui/material';  
import { Add } from '@mui/icons-material'; 
import { Icons } from '../icons';
import { getSettings } from '../util';
import ReactlyComponent, { ChildComponent } from '../reactly';
import { AppStateContext } from "../../../hooks/AppStateContext";
  
const ReactlyComponentBottomNavigation = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { page } = queryState;
  const offspring = page?.components?.filter(f => f.componentID === props.ID) 
  const Icon = Icons[props.icon || args.icon];
 return (
   <ReactlyComponent component={BottomNavigation} {...props} {...args}>
   {offspring?.map(guy => <ChildComponent component={guy} key={guy.ID} />)}
   </ReactlyComponent> 
 );
}

 

const ReactlyBottomNavigation = {
  Icon: Add,
  Component: ReactlyComponentBottomNavigation 
}
 

export default ReactlyBottomNavigation;


