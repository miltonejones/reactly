import React from 'react';
import { Rating } from '@mui/material';  
import { Add } from '@mui/icons-material';
import { Icons } from '../icons';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentRating = ({ children, ...props }) => {
  const args = getSettings(props.settings);

  const Icon = Icons[args.icon]; 
  const EmptyIcon = Icons[args.emptyIcon]; 

 return (
<>
<ReactlyComponent component={Rating} {...props} {...args}
  icon={!Icon ? null : <Icon />}
  emptyIcon={!EmptyIcon ? null : <EmptyIcon />}
  />
   <pre>
   {JSON.stringify(args,0,2)}
   </pre>
</>
 );
}

 

const ReactlyRating = {
  Icon: Add,
  Component: ReactlyComponentRating 
}
 

export default ReactlyRating;


