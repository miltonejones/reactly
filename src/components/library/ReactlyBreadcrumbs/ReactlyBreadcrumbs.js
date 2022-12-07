import React from 'react';
import { Breadcrumbs } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent, { ChildComponent } from '../reactly';
  
import { getSettings } from '../util';
import { AppStateContext } from "../../../hooks/AppStateContext";


const ReactlyComponentBreadcrumbs = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const { queryState = {} } = React.useContext(AppStateContext);
  const { page } = queryState;
  const offspring = page?.components?.filter(f => f.componentID === props.ID)
 return (
   <ReactlyComponent component={Breadcrumbs} {...props}>
    {offspring?.map(guy => <ChildComponent component={guy} key={guy.ID} />)}
   </ReactlyComponent>
 );
}

 

const ReactlyBreadcrumbs = {
  Icon: Add,
  Component: ReactlyComponentBreadcrumbs 
}
 

export default ReactlyBreadcrumbs;


