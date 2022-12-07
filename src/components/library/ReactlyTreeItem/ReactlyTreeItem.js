import React from 'react';
import { TreeItem } from '@mui/lab';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
import { Icons } from '../icons';
import { getSettings } from '../util';


const ReactlyComponentTreeItem = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const CollapseIcon = Icons[props.collapseIcon || args.collapseIcon]  
  const EndIcon = Icons[props.endIcon || args.endIcon]  
  const ExpandIcon = Icons[props.expandIcon || args.expandIcon]  
 return (
   <ReactlyComponent component={TreeItem} {...props} 
   
   collapseIcon={!CollapseIcon ? null : <CollapseIcon />} 
   endIcon={!EndIcon ? null : <EndIcon />} 
   expandIcon={!ExpandIcon ? null : <ExpandIcon />} 
      
      >
      {children}
   </ReactlyComponent>
 );
}

 

const ReactlyTreeItem = {
  Icon: Add,
  Component: ReactlyComponentTreeItem 
}
 

export default ReactlyTreeItem;


