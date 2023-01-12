import React from 'react';
import { Tabs } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Tab } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
    


const ReactlyComponentTabs = ({ children, onTabChange, ...props }) => {
  const args = getSettings(props.settings); 
  const handleChange = (event, newValue) => {
    onTabChange && onTabChange(event, {
      value: newValue
    });
  };
  return (
    <ReactlyComponent 
      component={Tabs} 
      {...props} 
      onChange={handleChange}
      value={parseInt(props.value || args.value)}
     />
  );
}

 

const ReactlyTabs = { 
  Component: ReactlyComponentTabs, 
}
 

export default ReactlyTabs;


