import React from 'react';
 import { styled, Box, TextField, Stack, Tabs, Tab, Chip,
  Typography } from '@mui/material';
// import Library, { Settings } from '../library';
import {  ComponentSettings, ComponentStyles, ComponentEvents } from '..';
// import { getSettings } from '../library/util';
import { Palette, Settings, Bolt, Article } from "@mui/icons-material";
import { Spacer } from '..';
import { TextBtn } from '..';
import { Flex, RotateButton } from '..';
import { ExpandMore } from "@mui/icons-material";
 
const Tiny = ({icon: Icon}) => <Icon sx={{m: 0, width: 16, height: 16}} />

const Btn = styled(Tab)(({theme}) => ({ 
  textTransform: 'capitalize',
  margin: 0,
  padding: theme.spacing(1, 2),
  height: 24,
  minHeight: 24
}))

const ComponentPanel = ({ 
    component, 
    selectedPage,
    onSettingsChange,
    onStyleChange ,
    onPropChange,
    onEventChange,
    onCollapse,
    collapsed
 }) => {
 
  const [value, setValue] = React.useState(0);

  const panels = [ComponentSettings, ComponentStyles, ComponentEvents];
  const Panel = panels[value];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const changes = [onSettingsChange, onStyleChange, onEventChange];
  const onChange = !component && !!selectedPage 
    ? onPropChange
    : changes[value];
  
  return <Stack>
     <Flex sx={{ m: 1}}>
      {!collapsed && <>
        <Chip variant="outlined" icon={<Article />} label={!!component 
        ? `${component.ComponentType}: ${component.ComponentName}` : selectedPage?.PageName} /> 
      <Spacer />
      </>}
        <RotateButton deg={collapsed ? 90 : 270}  onClick={onCollapse}>
          <ExpandMore />
        </RotateButton>
     </Flex>

      {!collapsed && <>
      
     <Box  sx={{ borderBottom: 1, borderColor: 'divider'  }}>
      <Tabs sx={{minHeight: 24, mt: 1, ml: 1 }} value={value} onChange={handleChange} >
        <Btn icon={<Tiny icon={Settings}/>} iconPosition="start"  label="Settings"   />
        <Btn icon={<Tiny icon={Palette}/>} iconPosition="start"  label="Styles"  />
        <Btn icon={<Tiny icon={Bolt}/>} iconPosition="start"  label="Events"  />
      </Tabs>
    </Box>

    {!!component && <Panel component={component} selectedPage={selectedPage} onChange={onChange} />}
    {!component && !!selectedPage && <PageSettings page={selectedPage} onChange={onChange} />}

      </>}


    </Stack>
 
}


function PageSettings({ page, onChange }) {
  const [state, setState] = React.useState(page);
  const { PageName, PagePath} = state
  return <Stack spacing={1} sx={{p: 1}}>
    <Typography>Page Name</Typography>
    <TextField value={PageName} label="Name" 
    onChange={e => setState(s => ({
      ...s, PageName: e.target.value, PagePath: e.target.value.toLowerCase().replace(/\s/g, '-')
    }))}
     helperText={`Path: ${PagePath}`} size="small"/>

      <Flex>
        <Spacer /> 
        <TextBtn variant="contained" onClick={() => onChange(state)}>Save</TextBtn>
      </Flex>
    
  </Stack>
}

ComponentPanel.defaultProps = {};
export default ComponentPanel;
