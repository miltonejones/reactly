import React from 'react';
import { styled, Card, Grid, FormControlLabel, Collapse, 
    Switch, Box, Alert,  Stack, Typography, Popover } from '@mui/material';
import Library from '../library';
import { QuickSelect, Flex, ChipBox, Text, TextInput, Spacer, RotateButton, TinyButton, PillMenu, Pill } from '..';
import { getSettings } from '../library/util';
import { ExpandMore, Delete, Add, MoreVert } from "@mui/icons-material";
import { getOptionColor } from '../library/styles';
import { SketchPicker } from 'react-color';
import { 
  StateComponentInput, 
  PillComponentInput,
  BooleanComponentInput,
  ListComponentInput,
  ListBinderComponentInput,
  ListTableComponentInput
} from './components' 
import IconComponentInput from './components/IconComponentInput/IconComponentInput';
import ShadowComponentInput from './components/ShadowComponentInput/ShadowComponentInput';

const ColorInput = ({ title, color, onChange }) => {
  const [hue, setHue] = React.useState(color)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); 
  };

  const handleChange = e => {
    setHue(e);
    onChange(e);
  }

  return <>
  <Flex>

    <TextInput 
      autoComplete="off" 
      onChange={e => handleChange(e.target.value)} 
      size="small" 
      value={hue} 
      placeholder={title}
    />

    <RotateButton onClick={handlePopoverClick}>
      <MoreVert />
    </RotateButton>

  </Flex>
  
  <Popover 
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose} 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
     <SketchPicker
    onChange={e => handleChange(e.hex)} 
    color={ hue } 
     />

    </Popover>
  
  </>

}
 
const attempt = value => {
  try {
    const prop = typeof value === 'string' 
      ? JSON.parse(value)
      : value;
    if (!prop) return ''
    return prop.value || prop;
  } catch (ex) {
    return value;
  }
}

export const ComponentInput = props => {
    const { bindable, label, component, title, onChange, value, args = {} } = props;

    const isBound = component.boundProps?.find(prop => prop.attribute === label);
      
    const bindProps = {
      ...props,
      title: `Bind ${title} to client state`,
      label: 'bound',
      type: 'boolean',
      binding: label,
      bindingValue: isBound,
      trueProp: label,
      onChange: (ignore, value) => {   
        onChange( label, { attribute: value } )
      }
    }
 

    const inputProps = isBound
      ? {
          ...props,
          title: <>Bind <b>{component.ComponentName}.{label}</b> to client state variable:</>,
          label: 'target',
          binding: label,
          bindingValue: isBound.boundTo,
          type: 'state' ,
          onChange: (attribute, boundTo) => {  
            onChange( 'boundTo', {boundTo, attribute} )
          }
        }
      : props;
            

    return <>
<pre>
      {/* {JSON.stringify(value,0,2)} */}
      </pre>
      <ComponentInputBody {...inputProps} /> 
      {!!bindable && <Box sx={{mb: 2}}><ComponentInputBody {...bindProps} /></Box>}
    </>
}

const Flexible = ({ on, children, ...props}) => {
  if (on) {
    return <Flex {...props}>{children}</Flex>
  }
  return children;
}


export const ComponentInputBody = (props) => {
  const { 
    label, 
    types, 
    title, 
    type,
    binding,
    bindingValue,
    component,
    getOptionLabel, 
    image,  
    css,
    free,
    renderOption, 
    start, 
    args = {}, 
    when, 
    onChange ,
    trueProp,
    selectedPage,
    helperText,
    resources,
    multiline
  } = props;

  const node = css?.find(f => f.Key === label);
  const initialProp = !node?.Value ? args[label] : node.Value;
  const customProp = args[label + '-custom'];
  const colorProp = label.indexOf('color') > -1;
  const [value, setValue] = React.useState(!!binding ? bindingValue : initialProp);

  const handleChange = React.useCallback((prop, binding) => {   
      const inputProp = type === 'boolean' && !!trueProp && prop 
        ? trueProp
        : prop;

      setValue(inputProp);

      if (binding) { 
        return onChange(binding, inputProp)
      }

      onChange && onChange(label, typeof inputProp === 'object'
        ? JSON.stringify(inputProp)
        : inputProp)
    }
  , [type, trueProp, onChange, label]);


  if (when && !when(args)) {
    return <></>
  }


  const { bindableProps }  = Library [component.ComponentType]
  const header = <> 
  <Text small variant="caption">{title}</Text>
  </>

  const inputProps = {
    ...props,
    header,
    handleChange,
    resources,
    value,
    type,
    selectedPage,
    component,
    bindableProps
  }

  const customInputs = {
    state: StateComponentInput,
    pill: PillComponentInput,
    icon: IconComponentInput,
    boolean: BooleanComponentInput,
    valuelist: ListComponentInput,
    menulist: ListComponentInput,
    imagelist: ListComponentInput,
    listbuilder: ListComponentInput,
    listbinder: ListBinderComponentInput,
    listtable: ListTableComponentInput,
    tablecolumn: ListTableComponentInput,
    repeatertable: ListTableComponentInput,
    shadow: ShadowComponentInput
  }


  const CustomInput = customInputs[type];
  if (CustomInput) {
    return <>
    <CustomInput {...inputProps} /></> 
  } 

  if (types && !customProp ) {

    return <Stack>
      {header}
      <Flexible on={colorProp || free}>
 
        <QuickSelect helperText={helperText} 
          getOptionLabel={getOptionLabel} 
          renderOption={renderOption} 
          options={types}  
          value={value} 
          onChange={handleChange} />

        {!!colorProp && <Pill round backgroundColor={attempt(value)} />} 
     {!!free && <CustomSwitch args={args} label={label} onChange={onChange}/>} 

      </Flexible>

       
    </Stack>
  }

  if (customProp) {
    return  <Stack>
      {header}
      <Flexible on={colorProp}>
      <ColorInput
          onChange={handleChange} 
          color={ attempt(value) } 
          title={title}
  />
      {!!colorProp && <Pill round backgroundColor={attempt(value)} />} 
  </Flexible>
    </Stack>
  }

  const chip = type === 'chip' ;
  const Component = type === 'chip' 
    ? ChipBox
    : TextInput;

  return <Stack>
  {header} 
      <Flexible on={free || chip}>
  <Component 
  multiline={!!multiline}
  rows={4}
    autoComplete="off"
    helperText={helperText}  
    onChange={e => handleChange(e.target.value)} 
    size="small" 
    value={attempt(value)} 
    placeholder={title}
  />

  {!!chip && <StateComponentInput menu {...inputProps}
    handleChange={val => handleChange(`${attempt(value)} {${val}} `)}
    header={<i />}/>}


     {!!free && <CustomSwitch args={args} label={label} onChange={onChange}/>} 
      </Flexible>
</Stack>

}

const CustomSwitch = ({ args, label, onChange, type = 'free'}) => 
<FormControlLabel 
    label="Custom"
    control={   <Switch  size="small"
      checked={args[label + '-' + type]}
      onChange={e => { 
        onChange(label + '-' + type, e.target.checked); 
      }} 
    /> }
  />

  

export const ComponentPanelSettings = ({ selectedPage, resources, component, css, settings ,args,  onChange }) => { 
   

 return (
   <Grid container data-testid="test-for-ComponentSettings" spacing={1} sx={{p: 1}}>
 
    {settings.map(setting => {

      if (setting.when && !setting.when(args)) {
        return <></>
      }

      const hue = getOptionColor(args[setting.label], 'value');
      const color = setting.label.indexOf('color') > 1 && hue;
      const xs =   12; 

      const loop = !args[setting.label + '-edges'] ? [setting] : ['top', 'right', 'bottom', 'left']
         .map(f => ({
          ...setting,
          label: setting.label + '-' + f,
          title: (setting.title || setting.label) + ' ' + f
         }));

      return (
        <>
 
          {setting.edges && <Grid sx={{p: 0}} xs={12}>
          {/* <pre>{JSON.stringify(args,0,2)}</pre> */}
          {/* <pre>{JSON.stringify(loop,0,2)}</pre> */}
          <Flex sx={{pl: 1, pt: 1}}>
              <Text
                onClick={() => {
                  onChange(component.ID, setting.label + '-edges', !args[setting.label + '-edges']); 
                }} small>Set {setting.title || setting.label} edges/corners</Text>
            <Spacer />
              <Box>
                
                <Switch  size="small"
                  checked={args[setting.label + '-edges']}
                  onChange={e => {
                    onChange(component.ID, setting.label + '-edges', e.target.checked); 
                  }} 
                />

              </Box>
          </Flex>
          </Grid>}

          {setting.color && <Grid sx={{p: 0}} xs={12}>
          {/* <pre>{JSON.stringify(args,0,2)}</pre> */}
          {/* <pre>{JSON.stringify(loop,0,2)}</pre> */}
          <Flex sx={{pl: 1, pt: 1}}>
              <Text 
                onClick={() => {
                  onChange(component.ID, setting.label + '-custom', !args[setting.label + '-custom']); 
                }}
                small>Use custom color for {setting.label}</Text>
            <Spacer />
              <Box>
                
              <Switch  size="small"
                checked={args[setting.label + '-custom']}
                onChange={e => {
                  onChange(component.ID, setting.label + '-custom', e.target.checked); 
                }} 
              />

              </Box>
          </Flex>
          </Grid>}

        {loop.map(item =>  <Grid sx={{alignItems: 'center'}} item xs={item.xs || xs}  key={item.label}> 
        
        <ComponentInput {...item}   
            resources={resources}
            selectedPage={selectedPage} 
            args={args} 
            css={css}
            component={component}
            onChange={(label, value) => onChange && onChange(component.ID, label, value)} 
            />  


        </Grid>)}

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
    css, 
    resources,
    open =  false ,
    always = false
  }) => {

  const [on, setOn] = React.useState(open || always);

  const active = settings.find(setting => {
    return (!!args[setting.label] && args[setting.label] !== 'null') || 
    ['top','bottom','right','left'].some(dir => !!args[`${setting.label}-${dir}`] && args[`${setting.label}-${dir}`] !== 'null');
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
    <Box sx={{p: 1, cursor: 'pointer', 
        borderBottom: always ? 0 :  1, borderColor: 'divider' 
        }} onClick={() =>  closeCollapse(!on)}>
      <Flex>
      <Text small variant="caption"><b>{name}</b></Text>
      <Spacer />
      {!always && <TinyButton icon={!active ? Icon : Delete } deg={on || active  ? 180 : 0} />}
      </Flex>
    </Box>

    <Collapse in={on || active}>
      <ComponentPanelSettings 
        resources={resources}
        args={args}
        css={css}
        settings={settings}
        component={component}
        selectedPage={selectedPage}
        onChange={onChange}  />
    </Collapse>
  </Stack>
 
}

const ComponentSettings = ({ selectedPage, component, onChange, resources }) => {
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
      resources={resources}
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
