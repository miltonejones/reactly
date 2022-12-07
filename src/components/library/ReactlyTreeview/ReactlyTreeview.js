import React from 'react';
import { TreeView } from '@mui/lab';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
  
const ReactlyComponentTreeview = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const DefaultEndIcon = Icons[props.defaultEndIcon || args.defaultEndIcon]  
 return (
   <ReactlyComponent component={TreeView} {...props} 
    {...args}
        defaultEndIcon={!DefaultEndIcon ? null : <DefaultEndIcon />} >
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyTreeview = {
  Icon: Add,
  Component: ReactlyComponentTreeview 
}
 

export default ReactlyTreeview;


