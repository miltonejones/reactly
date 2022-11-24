import React from 'react';
 import { styled,Box, Stack, Tabs, Tab, Chip } from '@mui/material';
// import Library, { Settings } from '../library';
import {  ComponentSettings, ComponentStyles, ComponentEvents } from '..';
// import { getSettings } from '../library/util';
import { Palette, Settings, Bolt } from "@mui/icons-material";
 

const Btn = styled(Tab)(() => ({ 
  textTransform: 'capitalize',
  margin: 0,
  padding: 0,
  height: 24
}))

const ComponentPanel = ({ component, 
    onSettingsChange,
    onStyleChange 
 }) => {
 
  const [value, setValue] = React.useState(0);

  const panels = [ComponentSettings, ComponentStyles, ComponentEvents];
  const Panel = panels[value];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changes = [onSettingsChange, onStyleChange];
  const onChange = changes[value];
  
  return <Stack>
     <Box sx={{ m: 1}}>
      <Chip label={component.ComponentName} /> 
     </Box>
     <Box  sx={{ borderBottom: 1, borderColor: 'divider'  }}>
      <Tabs sx={{minHeight: 24, mt: 1, ml: 1 }} value={value} onChange={handleChange} >
        <Btn sx={{minHeight: 24}}  icon={<Settings sx={{m: 0, width: 16, height: 16}} />} iconPosition="start"  label="Settings"   />
        <Btn sx={{minHeight: 24}}  icon={<Palette sx={{m: 0, width: 16, height: 16}} />} iconPosition="start"  label="Styles"  />
        <Btn sx={{minHeight: 24}}  icon={<Bolt sx={{m: 0, width: 16, height: 16}} />} iconPosition="start"  label="Events"  />
      </Tabs>
    </Box>

    <Panel component={component} onChange={onChange} />

    </Stack>
 
}

ComponentPanel.defaultProps = {};
export default ComponentPanel;
