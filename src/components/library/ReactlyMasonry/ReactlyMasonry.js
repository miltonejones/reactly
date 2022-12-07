import React from 'react';
import { Masonry } from '@mui/lab';  
import { Add } from '@mui/icons-material';
import ReactlyComponent, { ChildComponent } from '../reactly';
  
import { getSettings } from '../util';
import { AppStateContext } from "../../../hooks/AppStateContext";
  
const ReactlyComponentMasonry = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { page } = queryState;
  const offspring = page?.components?.filter(f => f.componentID === props.ID)
 return (
   <ReactlyComponent component={Masonry} {...props} {...args}>
   {children}
   </ReactlyComponent>
 );
}

 

const ReactlyMasonry = {
  Icon: Add,
  Component: ReactlyComponentMasonry 
}
 

export default ReactlyMasonry;


