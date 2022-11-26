import React from 'react';
import { styled, Card, Grid, FormControlLabel, Collapse, 
    Switch, Box, Alert, TextField, Stack, Typography } from '@mui/material';
import Library from '../library';
import { QuickSelect, Flex, Spacer, TinyButton, PillMenu, Pill } from '..';
import { getSettings } from '../library/util';
import { ExpandMore, Delete, Add } from "@mui/icons-material";
import { getOptionColor } from '../library/styles';

import { 
  StateComponentInput, 
  PillComponentInput,
  BooleanComponentInput,
  ListComponentInput
} from './components' 
 





export const ComponentInput = (props) => {
  const { 
    label, 
    types, 
    title, 
    type,
    getOptionLabel, 
    image,  
    renderOption, 
    start, 
    args = {}, 
    when, 
    onChange ,
    trueProp,
    selectedPage,
    helperText
  } = props;

  const [value, setValue] = React.useState(args[label]);

  const handleChange = prop => {  
    
    const inputProp = type === 'boolean' && !!trueProp && prop 
      ? trueProp
      : prop;
 
    setValue(inputProp);
    onChange && onChange(label, typeof inputProp === 'object'
      ? JSON.stringify(inputProp)
      : inputProp)
  }

  if (when && !when(args)) {
    return <></>
  }

  const header = <Typography variant="caption">{title}</Typography>

  const inputProps = {
    ...props,
    header,
    handleChange,
    value
  }

  const customInputs = {
    state: StateComponentInput,
    pill: PillComponentInput,
    boolean: BooleanComponentInput,
    listbuilder: ListComponentInput,
  }

  const CustomInput = customInputs[type];
  if (CustomInput) {
    return <CustomInput {...inputProps} /> 
  } 

  if (types) {
    return <Stack>
      {header}
      <QuickSelect helperText={helperText} 
         getOptionLabel={getOptionLabel} 
         renderOption={renderOption} 
         options={types}  
         value={value} 
         onChange={handleChange} />
    </Stack>
  }

  return <Stack>
  {header}
  <TextField 
    helperText={helperText}  
    onChange={e => handleChange(e.target.value)} 
    size="small" 
    value={value} 
    placeholder={title}
  />
</Stack>

}
  

export const ComponentPanelSettings = ({ selectedPage, component, settings ,args,  onChange }) => { 
   

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
          <ComponentInput {...setting}  selectedPage={selectedPage} args={args} onChange={(label, value) => onChange && onChange(component.ID, label, value)}/>
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
    selectedPage,
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
      selectedPage={selectedPage}
      onChange={onChange}  />
  </Collapse>
  </Stack>
 
}

const ComponentSettings = ({ selectedPage, component, onChange }) => {
  if (!component?.settings) {
    return <Alert sx={{m: 1}}>This component has no configurable settings.</Alert>
  }
  const { categories } = Library [component.ComponentType].Settings ?? {}


  if (!categories) {
    return <Alert sx={{m: 1}}>This component has no configurable settings.</Alert>
  }
  const args = getSettings(component.settings);

  return <> 
  {categories.map(category => <ComponentCollapse
      component={component}
      onChange={onChange}
      selectedPage={selectedPage}
      {...category}
      args={args}
      key={category.name}
    />)}
 </>
}

ComponentSettings.defaultProps = {};
export default ComponentSettings;
