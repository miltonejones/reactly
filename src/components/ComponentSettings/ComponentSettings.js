import React from 'react';
import { styled, Card, Grid, FormControlLabel, Collapse, Slider,
    Switch, Box, Alert, IconButton, Stack, Typography, Popover } from '@mui/material'; 
import { AppStateContext } from '../../hooks/AppStateContext'; 
import { QuickSelect, QuickMenu, Tooltag, Flex, ChipBox, Text, TextInput, Spacer, RotateButton, TinyButton, PillMenu, Pill } from '..';
import { getSettings } from '../library/util';
import { ExpandMore, Remove, Add, MoreVert, AddLink, LinkOff } from "@mui/icons-material";
import { getOptionColor } from '../library/styles';
import { Icons, renderIconOption } from '../library/icons';
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
import ReferenceComponentInput from './components/ReferenceComponentInput/ReferenceComponentInput';
import { truth } from '../library/util';

const KeypressTextBox = ({ onChange, ...props }) => {
  const [dir, setDir] = React.useState(false);

  React.useEffect(() => {
    const { value } = props;
    if (!value || isNaN(value)) {
      return;
    }
    
    !!dir && onChange && onChange({ target: { value: value + dir}})
    !!dir && console.log ({value: value + dir})

  }, [dir, props])

  const trigger = (dir) => {
    const { value } = props;
    if (!value || isNaN(value)) {
      return;
    }
    
    !!dir && onChange && onChange({ target: { value: value + dir}})
    !!dir && console.log ({value: value + dir})

  }

  const handlePress = e => {
    switch(e.keyCode) {
      case 38:
        trigger(1)
        break;
      case 40:
        trigger(-1)
        break;
      default:
        // do nothing
    }
  }

  return <TextInput {...props} 
  onChange={onChange}
  onKeyDown={handlePress}
  onKeyUp={() => setDir(false)}
    
    />
}

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
  <Flex fullWidth>

    <TextInput 
    fullWidth
      autoComplete="off" 
      onChange={e => handleChange(e.target.value)} 
      size="small" 
      value={hue} 
      placeholder={title}
      buttons={

        <RotateButton onClick={handlePopoverClick}>
          <MoreVert />
        </RotateButton>

      }
    />

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
    const { bindable, label, when, component, title, onChange, value, args = {} } = props;

    const isBound = component.boundProps?.find(prop => prop.attribute === label);
      
      if (when &&  typeof when === 'function' && !when(args)) {
        return <></>
      }

      if (when &&  typeof when === 'string' ) {
        const ok = eval(when)(args);
        if (!ok) return <></>
      }


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
          bound: 1,
          bindingValue: isBound.boundTo,
          type: 'state' ,
          onChange: (attribute, boundTo) => {  
            onChange( 'boundTo', {boundTo, attribute} )
          }
        }
      : props; 
        const LinkIcon =isBound ? LinkOff : AddLink
    return <Flex fullWidth>
{/* [{inputProps.type}][{label}] */}
      <ComponentInputBody {...inputProps} 
        bindPropertyClicked={() => { 
          onChange( label, { attribute: isBound ? false : label } )
         }}
        /> 


      {/* <Spacer />
      {!!bindable && <Tooltag component={IconButton} 
      title={isBound ? `Remove data binding on "${label}"` : `Bind "${label}" to client state` }
      onClick={() => { 
       onChange( label, { attribute: isBound ? false : label } )
      }}  ><LinkIcon /></Tooltag>} */}


      {/* {!!bindable && <Box><ComponentInputBody {...bindProps} /></Box>} */}
    </Flex>
}

const Flexible = ({ on, children, ...props}) => {
  if (on) {
    return <Flex fullWidth {...props}>{children}</Flex>
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
    bindable,
    bindingValue,
    component,
    getOptionLabel, 
    bindPropertyClicked,
    image,  
    css,
    free,
    bound,
    renderOption, 
    start, 
    args = {}, 
    when, 
    onChange ,
    trueProp,
    selectedPage,
    selector,
    helperText,
    resources,
    multiline
  } = props;

  const { Library } = React.useContext(AppStateContext);
  
  const node = css?.find(f => f.Key === label && (!f.selector || f.selector  === selector));
  
  const initialProp = !node?.Value   ? args[label] : node.Value;
  
  const customProp = args[label + '-custom'];
  const colorProp = type === 'color' || ['background-color', 'border-color'].find(f => f === label);


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


  if (when &&  typeof when === 'function' && !when(args)) {
    return <></>
  }

  if (when &&  typeof when === 'string' ) {
    const ok = eval(when)(args);
    if (!ok) return <></>
  }


  const { bindableProps }  = Library [component.ComponentType] ?? {}
  const header = <>   
 
  <Typography sx={{whiteSpace: 'nowrap', fontSize: '0.85rem', textTransform: 'capitalize'}} small>{title}</Typography>
  </>

  const inputProps = {
    ...props,
    header,
    handleChange,
    resources,
    value: value || args[label],
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
    ref: ReferenceComponentInput,
    shadow: ShadowComponentInput
  }

  const isTypeMenu = types?.length && !customProp && !colorProp ;
  const iconSX = isTypeMenu ? {mr:  3} : {}

  const buttons = !!bindable
    ? { buttons: <IconButton sx={iconSX} onClick={bindPropertyClicked}>
          <AddLink />
        </IconButton>  } 
    : {}


  const CustomInput = customInputs[type];
  if (CustomInput) {
    return <Flex fullWidth fullHeight>
     
    <CustomInput {...inputProps} bindPropertyClicked={bindPropertyClicked}/>
 

      {!!bindable && !binding && <> 
        <Tooltag component={IconButton} 
      title={   `Bind "${label}" to client state` }
      onClick={bindPropertyClicked}  ><AddLink /></Tooltag>
      </>}

    </Flex> 
  } 

  if (isTypeMenu) {

    const typeList = types?.indexOf('ICON_TYPES') > -1
      ? Object.keys(Icons)
      : types;

    const isMenu = typeList?.length < 32 ;

    const MenuComponent = !isMenu
        ? QuickSelect
        : QuickMenu  

    const icoProps = types?.indexOf('ICON_TYPES') > -1
      ? { renderOption: renderIconOption }
      : { renderOption }

    const Host = !isMenu ? Stack : Flex;
    return <Host fullWidth sx={{width: "100%"}}>
      {header}  
      {isMenu && <Spacer />}

      <Flexible  nowrap on={ 
        free || 
        typeList?.length < 32  }>
 
        <MenuComponent helperText={helperText} 
         {...buttons}
           caret
          getOptionLabel={getOptionLabel} 
          {...icoProps}
          options={typeList}  
          value={value} 
          label={value || <Text small>set {title} value</Text>}
          onChange={handleChange} />
 
          {!!free && <CustomSwitch args={args} label={label} onChange={onChange}/>} 

      </Flexible>

       
    </Host>
  }

  if (colorProp) {
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

  const usePrompt = ['width','top','left','bottom', 'height', 'right'].some(f => !!title && title.toLowerCase().indexOf(f) > -1)
    || type == 'prompt';
  

  return <Stack sx={{width: '100%'}}>
  {header} 
      <Flexible on={free || chip}>
        
  <TextInput 
    multiline={!!multiline}
    {...buttons}
    rows={4}
    fullWidth
    autoComplete="off"
    helperText={helperText}  
    onChange={e => handleChange(e.target.value)} 
    size="small" 
    value={attempt(value)} 
    label={usePrompt ? <Text small>Set {title}</Text> : ''}
    placeholder={title}
  />
 



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

  

export const ComponentPanelSettings = ({ selectedPage, resources, component, css, settings , args, selector, onChange }) => { 
   

 return (
   <Grid container data-testid="test-for-ComponentSettings" spacing={1} sx={{p: 1}}>
 
    {settings.map(setting => {

      if (setting.when && typeof setting.when === 'function' && !setting.when(args)) {
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
            selector={selector}
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
    selector,
    name, 
    settings, 
    args,  
    css, 
    selectors,
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
      <Text small><b>{name}</b></Text>
      <Spacer />
      {!always && <TinyButton icon={!active ? Icon : Remove } deg={on || active  ? 180 : 0} />}
      </Flex>
    </Box> 

    <Collapse in={on || active}>
      <ComponentPanelSettings 
        resources={resources}
        args={args}
        css={css}
        selector={selector}
        settings={settings}
        component={component}
        selectedPage={selectedPage}
        onChange={onChange}  />
    </Collapse>
  </Stack>
 
}

const sortByOrder = (a,b) => a.order > b.order ? 1 : -1;

const OrderSlider = ({ ticks, value, onChange }) => { 

  const handleSliderChange = (event, newValue) => {
    onChange && onChange(newValue);
  }

  if (!ticks.length) {
    return <i />
  }

  const marks = ticks.sort((a,b) => a.value > b.value ? 1 : -1)

  function valuetext(value, name) {
    const Ico = Icons[value]
    return <Tooltag component={Ico} sx={{width: 16, height: 16}} title={name} />;
  }

  return   <Stack sx={{p: 1}}> 
    <Text small>Order: {value}</Text>
    <Slider  
        step={1}
        onChange={handleSliderChange}
        min={marks[0].value - 5}
        max={marks[marks.length - 1].value + 5}
        value={value}
        marks={marks.map(f => ({
          ...f,
          label: valuetext(f.label, f.name)
        }))}
        valueLabelDisplay="auto"
      />
  </Stack>
}

const ComponentSettings = ({ selectedPage, component, onChange, showSettings, resources }) => {
  const [tick, setTick] = React.useState(1)
  const { Library } = React.useContext(AppStateContext);
  if (!component?.settings) {
    return <Alert sx={{m: 1}}>This component has no configurable settings!!.</Alert>
  }

  const args = getSettings(component.settings);

  const sibs = component.componentID 
    ? selectedPage.components?.filter(f => f.componentID === component.componentID)
    : selectedPage.components?.filter(f => !f.componentID)

  const ticks = sibs?.map(d => ({ 
    label: Library[d.ComponentType].Icon,
    value: d.order ,
    name: d.ComponentName
  }));

  const debug =  <>
  <Flex sx={{ borderBottom: 1, borderColor: 'divider', pl: 1}}
    onClick={() => {
      alert (truth(args.debug).toString())
      onChange(component.ID, 'debug', !truth(args.debug) )
    }}
    >
   <Switch checked={truth(args.debug)} /> 
   <Text active={truth(args.debug)} small>Debug mode</Text>
  </Flex>  
  </>

  const orderer = !ticks ? null : <Box>
  <Flex onClick={() => setTick(!tick)} sx={{ borderBottom: 1, borderColor: 'divider', p: 1}}>
   <Text small active> Change component order</Text>
   <Spacer />
   <TinyButton icon={ExpandMore} deg={tick ? 180 : 0} />
  </Flex>

  <Collapse in={tick}>
  
 <OrderSlider 
    onChange={(val) => {
      //  alert (val);
      onChange(component.ID, 'order', val )
    }}
    value={component.order} 
    ticks={ticks}
    />
  </Collapse>
  </Box>

  const componentType = Library [component.ComponentType];

  const { categories } = componentType?.Settings ?? {}


  if (!categories) {
    return <><Alert sx={{m: 1}}>"{component.ComponentType}" has no configurable settings.</Alert>{orderer}{debug}</>
  }
  return <>  
{showSettings && <>

  {orderer}
  {debug}
</>}

  {categories
    .sort(sortByOrder)
    .map(category => <ComponentCollapse
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
