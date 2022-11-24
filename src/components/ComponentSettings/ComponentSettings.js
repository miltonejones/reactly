import React from 'react';
import { styled, Card, Grid, FormControlLabel, Collapse, Switch, Box, Alert, TextField, Stack, Typography } from '@mui/material';
import Library, { Settings } from '../library';
import { QuickSelect, Flex, Spacer, TinyButton, PillMenu, Pill } from '..';
import { getSettings } from '../library/util';
import { ExpandMore, Delete, Add } from "@mui/icons-material";
import { getOptionColor } from '../library/styles';

const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));





export const ComponentInput = ({ label, types, title, type,getOptionLabel, image,  renderOption, start, args = {}, when, onChange }) => {
  const [value, setValue] = React.useState(args[label]);

  const handleChange = prop => {  
    setValue(prop);
    onChange && onChange(label, typeof prop === 'object'
      ? JSON.stringify(prop)
      : prop)
  }

  if (when && !when(args)) {
    return <></>
  }

  const header = <Typography variant="caption">{title}</Typography>

  if (type === 'pill') {
    return <Flex>
      {header}
      <Spacer />
      <PillMenu image={image} options={types} value={value} onChange={handleChange} />
    </Flex>
  }

  if (type === 'boolean') {
    return <Flex>
      {header}
    <Spacer />
      <Box>
        
      <Switch  size="small"
        checked={value}
        onChange={e => {
          handleChange(e.target.checked); 
        }} 
      />

      </Box>
    </Flex>
  }



  if (types) {
    return <Stack>
      {header}
      <QuickSelect getOptionLabel={getOptionLabel} renderOption={renderOption} options={types}  value={value} onChange={handleChange}/>
    </Stack>
  }

  return <Stack>
  {header}
  <TextField onChange={e => handleChange(e.target.value)} size="small" value={value} placeholder={title}/>
</Stack>

}
 
const attempt = str => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return false;
  }
}

export const ComponentPanelSettings = ({ component, settings ,args,  onChange }) => { 
   

 return (
   <Grid container data-testid="test-for-ComponentSettings" spacing={2} sx={{p: 1}}>
    {settings.map(setting => {

      if (setting.when && !setting.when(args)) {
        return <></>
      }

      const hue = getOptionColor(args[setting.label], 'value');
      const color = setting.label.indexOf('color') > 1 && hue;
      const xs = color ? 10 : 12;

      return (
        <>
         <Grid item xs={setting.xs || xs}  key={setting.label}>
          <ComponentInput {...setting}  args={args} onChange={(label, value) => onChange && onChange(component.ID, label, value)}/>
          {/* {JSON.stringify(hue)} */}
        </Grid>
        {color && <Grid item xs={2}>
          <Pill round sx={{mt: 3}} backgroundColor={hue} />
          </Grid>}
        </> 
      )
    }  )} 
   </Grid>
 );
}


export const ComponentCollapse = ({ 
    component, 
    onChange, 
    name, 
    settings, 
    args,  
    open =  false ,
    always = false
  }) => {

  const [on, setOn] = React.useState(open || always);

  const active = settings.find(setting => {
    return !!args[setting.label] && args[setting.label] !== 'null';
  })

  const closeCollapse = isOn => {
    if (!isOn && active) {
      settings.map(setting => { 
        onChange(component.ID, setting.label, null)
      })
    }
    setOn(isOn)
  }
  
  const Icon = !active ? ExpandMore : Add;

  return <Stack>
    <Box sx={{p: 1, cursor: 'pointer', borderBottom: always ? 0 :  1, borderColor: 'divider' }} onClick={() =>  closeCollapse(!on)}>
      <Flex>
      <Typography variant="caption"><b>{name}</b></Typography>
      <Spacer />
      {!always && <TinyButton icon={!active ? Icon : Delete } deg={on || active  ? 180 : 0} />}
      </Flex>
    </Box>
    <Collapse in={on || active}>
    <ComponentPanelSettings 
      args={args}
      settings={settings}
      component={component}
      onChange={onChange}  />
  </Collapse>
  </Stack>
 
}

const ComponentSettings = ({ component, onChange }) => {
  if (!component?.settings) {
    return <Alert>This component has no configurable settings.</Alert>
  }
  const { categories } = Settings [component.ComponentType] ?? {}
  const args = getSettings(component.settings);

  return categories.map(category => <ComponentCollapse
      component={component}
      onChange={onChange}
      {...category}
      args={args}
      key={category.name}
    />)
 
}

ComponentSettings.defaultProps = {};
export default ComponentSettings;
