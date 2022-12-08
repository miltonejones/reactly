import React from 'react';
import { Tabs } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Tab } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
    


const ReactlyComponentTabs = ({ children, ...props }) => {
  const args = getSettings(props.settings); 
  return (
    <ReactlyComponent component={Tabs} {...props} value={parseInt(args.value)} />
  );
}

 

const ReactlyTabs = { 
  Component: ReactlyComponentTabs, 
}
 

export default ReactlyTabs;


