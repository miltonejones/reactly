import React from 'react';
import { Accordion } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent, { ChildComponent } from '../reactly';
import { getStyles, getSettings } from '../util';
import { AppStateContext } from "../../../hooks/AppStateContext";
  
const ReactlyComponentAccordion = ({ children, ...props }) => {
  const args = getSettings(props.settings);  
  const { queryState = {} } = React.useContext(AppStateContext);
  const { page } = queryState;
  const offspring = page?.components?.filter(f => f.componentID === props.ID)
 return (
 

<ReactlyComponent component={Accordion} {...props} {...args}>
    {offspring?.map(guy => <ChildComponent component={guy} key={guy.ID} />)}
</ReactlyComponent> 

 );
}

{/*<>
 {JSON.stringify(args)}
 </> */}

const ReactlyAccordion = {
  Icon: Add,
  Component: ReactlyComponentAccordion 
}
 

export default ReactlyAccordion;


