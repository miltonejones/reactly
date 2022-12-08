import React from 'react';
import { SpeedDial, SpeedDialIcon,  Box } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentSpeedDial = ({ children, ...props }) => {
  const args = getSettings(props.settings);
 
 return (
  <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
   <ReactlyComponent component={SpeedDial} {...props}  {...args} ariaLabel="SpeedDial openIcon example"
   icon={<SpeedDialIcon openIcon={<Add />} />}
  />
  </Box>
 );
}

 

const ReactlySpeedDial = {
  Icon: Add,
  Component: ReactlyComponentSpeedDial 
}
 

export default ReactlySpeedDial;


