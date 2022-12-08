import React from 'react';
import { SpeedDialAction } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
  
const ReactlyComponentSpeedDialAction = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[args.icon];
 return (
   <ReactlyComponent component={SpeedDialAction} {...props} {...args}  icon={!Icon ? null : <Icon />}/>
 );
}

 

const ReactlySpeedDialAction = {
  Icon: Add,
  Component: ReactlyComponentSpeedDialAction 
}
 

export default ReactlySpeedDialAction;


