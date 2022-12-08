import React from 'react';
import { Breadcrumbs } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent  from '../reactly';
  
import { getSettings } from '../util'; 


const ReactlyComponentBreadcrumbs = ({ children, ...props }) => { 
  const args = getSettings(props.settings); 
 return (
   <ReactlyComponent component={Breadcrumbs} {...props} {...args} 
    sx={{'& .MuiBreadcrumbs-separator': {
      color: args.seperator_color
    }}}
     />
 );
}

 

const ReactlyBreadcrumbs = {
  Icon: Add,
  Component: ReactlyComponentBreadcrumbs 
}
 

export default ReactlyBreadcrumbs;


