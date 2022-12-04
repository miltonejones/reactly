import React from 'react';
 import { styled, Box,  Stack, Tabs, Tab, Chip,
  Typography, Divider } from '@mui/material';
import Library from '../library';
import {  ComponentSettings, ComponentStyles, ComponentEvents, ThemePanel } from '..';
// import { getSettings } from '../library/util';
import { Palette, Settings, Bolt, Article, FormatColorFill } from "@mui/icons-material";
import { Spacer , QuickSelect } from '..';
import { TextBtn, TextInput, TinyButton } from '..';
import { Flex, RotateButton, QuickMenu } from '..';
import { ExpandMore, Save, Close, Input, Add, Delete } from "@mui/icons-material";
import { Text } from '../Control/Control';
 
const Tiny = ({icon: Icon}) => <Icon sx={{m: 0, width: 16, height: 16}} />

export const TabButton = styled(Tab)(({theme}) => ({ 
  textTransform: 'capitalize',
  margin: 0,
  padding: theme.spacing(1),
  height: 24,
  minHeight: 24,
  fontSize: '0.85rem', 
}));

const ComponentPanel = ({ 
    component, 
    selectedPage,
    onSettingsChange,
    onStyleChange ,
    onPropChange,
    onThemeChange,
    onEventChange,
    onMove,
    onCollapse,
    onEventDelete,
    collapsed,
    themes,
    connections,
    resources,
 }) => {
 
  const [value, setValue] = React.useState(0);

  const panels = [ComponentSettings, ComponentStyles, ComponentEvents, ThemePanel];
  const Panel = panels[value];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMove = (name) => {
    if (!name) return;
    const [type, title] = name.split(':')
    const target = selectedPage.components.find(f => f.ComponentName === title.trim());
    // return alert (target.ID)
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

  const selectedComponent = Library[component?.ComponentType];

  const panelProps = {
    onEventDelete:onEventDelete, 
    component:component, 
    selectedPage:selectedPage, 
    onChange:onChange, 
    onThemeChange:onThemeChange,
    connections:connections,
    resources:resources,
    themes:themes,
  }
  
  return <Stack>
     <Flex sx={{ m: 1}}>
      {!collapsed && <>
        <Chip variant="outlined" icon={<Article />} label={!!component 
        ? `${component.ComponentType}: ${component.ComponentName}` : selectedPage?.PageName} /> 


        {!!others && !!component && <Box sx={{ml: 2}}>
          <QuickMenu small options={others.map(f => `${f.ComponentType}: ${f.ComponentName}`).concat(
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
        <TabButton disabled={!selectedPage && !selectedComponent?.Settings} icon={<Tiny icon={Settings}/>} iconPosition="start"  label="Settings"   />
        <TabButton disabled={!component || !selectedComponent?.Styles} 
          icon={<Tiny icon={Palette}/>} iconPosition="start"  label="Styles"  />
        <TabButton  icon={<Tiny icon={Bolt}/>} iconPosition="start"  label="Events"  />
        <TabButton icon={<Tiny icon={FormatColorFill}/>} iconPosition="start"  label="Theme"  />
      </Tabs>
    </Box>

    {(!!component || value === 3) && <Panel  {...panelProps} />}
    {!component && !!selectedPage &&  value === 0 && <PageSettings themes={themes} page={selectedPage} onChange={onChange} />}
    {!component && !!selectedPage &&  value === 2 && <ComponentEvents  {...panelProps}  />}

      </>}


    </Stack>
 
}


function PageSettings({ page, themes = [], onChange }) {
  const [param, setParam] = React.useState(''); 
  const [state, setState] = React.useState(page); 
  const { PageName, PagePath} = state
  return <Stack spacing={1} sx={{p: 1}}>
    <Text small>Page Name</Text>
    <TextInput value={PageName} label="Name" 
    onChange={e => setState(s => ({
      ...s, PageName: e.target.value, PagePath: e.target.value.toLowerCase().replace(/\s/g, '-')
    }))}
     helperText={`Path: ${PagePath}`} size="small"/>

      <Text small>Theme</Text>
      <QuickSelect options={themes.map(f => f.name)} 
         value={state.ThemeName} 
         onChange={value => {
          setState(s => ({
            ...s, ThemeName: value
          }))
         }}
         />

      <Text small>Add page parameters</Text>
       <Flex>
        <TextInput size="small" 
        placeholder="Type parameter name"
          value={param}
          onChange={e => setParam(e.target.value)}
        />
        <TextBtn endIcon={<Add />}  
         onClick={() => {
          const added ={
            [param]: ''
          }
          setState(s => {
            const updated = {
              ...s, 
              parameters: !s.parameters 
                ? added
                : {
                  ...s.parameters,
                  ...added
                }
            }; 
            return updated
          });
          setParam('')
         }} >Add</TextBtn>
       </Flex>
<Divider textAlign="left">Page parameters</Divider>
         {!!state.parameters && Object.keys(state.parameters).map(paramKey => <Flex key={paramKey}>

          <Text sx={{width: 80}} small>{paramKey}</Text>

          <TextInput 
            size="small"
            value={state.parameters[paramKey]}
            onChange={e => {
              setState(s => ({
                ...s,
                parameters: {
                  ...s.parameters,
                  [paramKey]: e.target.value
                }
              }))
            }}
            />

            <TinyButton icon={Delete}
                onClick={e => {
                  setState(s => {
                    const obj = {...s};
                    delete obj.parameters[paramKey] 
                    alert (JSON.stringify(obj.parameters))
                    return obj;
                  })
                }}
            />

         </Flex>)}


      <Flex sx={{pt: 4}}>
        <Spacer /> 
        <TextBtn endIcon={<Save />} variant="contained" onClick={() => onChange(state)}>Save</TextBtn>
      </Flex>
    
  </Stack>
}

ComponentPanel.defaultProps = {};
export default ComponentPanel;
