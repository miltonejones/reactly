import React from 'react';
import { PopoverPrompt } from '../..';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { Icons } from '../icons';
  
const ReactlyComponentPopoverPrompt = ({ children, onCommit, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[args.startIcon];
  const End = Icons[args.endIcon];

  const icons = !Icon ? {startIcon: null} : {
    startIcon: <Icon />
  }

  !!End && Object.assign(icons, {endIcon: <End />})
 
 return (
   <ReactlyComponent component={PopoverPrompt} {...props} {...icons} 
    onChange={value => onCommit && onCommit( {}, {value})}>
    {args.Label || props.Label} 
   
   </ReactlyComponent>
 );
}

 

const ReactlyPopoverPrompt = { 
  Component: ReactlyComponentPopoverPrompt 
}
 

export default ReactlyPopoverPrompt;


