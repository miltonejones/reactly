import React from 'react';
 import { styled, Box,  Stack, Tabs, Tab, Chip,
  Typography } from '@mui/material';
// import Library, { Settings } from '../library';
import {  ComponentSettings, ComponentStyles, ComponentEvents } from '..';
// import { getSettings } from '../library/util';
import { Palette, Settings, Bolt, Article } from "@mui/icons-material";
import { Spacer } from '..';
import { TextBtn, TextInput } from '..';
import { Flex, RotateButton, QuickMenu } from '..';
import { ExpandMore, Close, Input } from "@mui/icons-material";
import { Text } from '../Control/Control';
 
const Tiny = ({icon: Icon}) => <Icon sx={{m: 0, width: 16, height: 16}} />

export const TabButton = styled(Tab)(({theme}) => ({ 
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
    onMove,
    onCollapse,
    onEventDelete,
    collapsed,
    connections,
    resources,
 }) => {
 
  const [value, setValue] = React.useState(0);

  const panels = [ComponentSettings, ComponentStyles, ComponentEvents];
  const Panel = panels[value];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMove = (name) => {
    if (!name) return;
    const target = selectedPage.components.find(f => f.ComponentName === name);
    if (target) {
      return onMove && onMove(component.ID, target.ID) 
    } 
    return onMove && onMove(component.ID, null) 
  };

  const others = selectedPage.components.filter(f => !!f.children)

  const changes = [onSettingsChange, onStyleChange, onEventChange];
  const onChange = !component && !!selectedPage 
    ? onPropChange
    : changes[value];
  
  return <Stack>
     <Flex sx={{ m: 1}}>
      {!collapsed && <>
        <Chip variant="outlined" icon={<Article />} label={!!component 
        ? `${component.ComponentType}: ${component.ComponentName}` : selectedPage?.PageName} /> 


        {!!others && !!component && <Box sx={{ml: 2}}>
          <QuickMenu options={others.map(f => `${f.ComponentType}: ${f.ComponentName}`).concat(
            !component.componentID 
              ? []
              : ['-', 'Move to root level']
          )} 
          value={component?.ComponentName}
          onChange={handleMove}
           caret label="Move" icon={Input}/>
        </Box>}
      <Spacer />
      </>}
        <RotateButton deg={collapsed ? 90 : 270}  onClick={onCollapse}>
             {collapsed ? <ExpandMore /> : <Close />}
        </RotateButton>
     </Flex>

      {!collapsed && <>
      
     <Box  sx={{ borderBottom: 1, borderColor: 'divider'  }}>
      <Tabs sx={{minHeight: 24, mt: 1, ml: 1 }} value={value} onChange={handleChange} >
        <TabButton icon={<Tiny icon={Settings}/>} iconPosition="start"  label="Settings"   />
        <TabButton icon={<Tiny icon={Palette}/>} iconPosition="start"  label="Styles"  />
        <TabButton icon={<Tiny icon={Bolt}/>} iconPosition="start"  label="Events"  />
      </Tabs>
    </Box>

    {!!component && <Panel 
    onEventDelete={onEventDelete} component={component} selectedPage={selectedPage} onChange={onChange} 
        connections={connections}
        resources={resources}
    />}
    {!component && !!selectedPage && <PageSettings page={selectedPage} onChange={onChange} />}

      </>}


    </Stack>
 
}


function PageSettings({ page, onChange }) {
  const [state, setState] = React.useState(page);
  const { PageName, PagePath} = state
  return <Stack spacing={1} sx={{p: 1}}>
    <Text small>Page Name</Text>
    <TextInput value={PageName} label="Name" 
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
