import React from 'react';
import { styled, Box, TextField, InputAdornment } from '@mui/material';
import { Icons } from '../icons';
import { GenericStyles } from '../styles';
import { TextFields } from "@mui/icons-material";
import ReactlyComponent from '../reactly';
import { getSettings, getStyles } from '../util';
  
const ReactlyTextboxComponent = ({onEnterPress, styles = [], ...props}) => {
 


  const args = getSettings(props.settings);

  
  const css = getStyles(styles.filter(f => !f.selector));
  const sub = getStyles(styles.filter(f => !!f.selector));
   
  const Icon = Icons[args.icon];
  const End = Icons[args.end];

  const startAdornment = !Icon ? null : <InputAdornment position="start"><Icon /></InputAdornment>;
  const endAdornment = !End ? null : <InputAdornment position="start"><End /></InputAdornment>;

  const adornment = {
    startAdornment,
    endAdornment 
  };

  let err = 'ok'
  let user_sx = {};
  const json = `{${args.user_sx}}`;
  try {
    user_sx = !args.user_sx ? {} : JSON.parse(json);
  } catch (e) {
    err = e.message;
  } 

  // let subCss;
  const made = {}
  
  const subCss = styles.filter(f => !!f.selector).map(m => {
    Object.assign(made, { 
      [`& .${m.selector}`]: { 
        ...made [`& .${m.selector}`],
          [`${m.Key}`]: `${m.Value}`
        }  
    }) 
  })

 // Mui-focused fieldset
 return (
<>
{/* <pre>
{JSON.stringify(made,0,2)}

</pre> */}
{/* {JSON.stringify(styles.filter(f => !!f.selector))} */}
{/* 
{JSON.stringify(args.user_sx)} */}
{/* {JSON.stringify(user_sx)}
{JSON.stringify(err)} */}
<ReactlyComponent component={TextField} {...props} {...args} value={props.value}
   onKeyUp={e => {
    e.keyCode === 13 && onEnterPress && onEnterPress(e)
   }}
   InputProps={adornment} sx={made}>
      {args.Label}
   </ReactlyComponent>
</>
 );
}

const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
}

export const ReactlyTextboxEvents =  [
  {
    name: 'onEnterPress',
    title: 'User presses enter',
    description: 'User presses the enter key.'
  },
  {
    name: 'onChange',
    title: 'Input value changes',
    description: 'User types or pastes text into the input.'
  },
  {
    name: 'onFocus',
    title: 'Input action: focus',
    description: 'User focuses the cursor on the input.'
  },
  {
    name: 'onBlur',
    title: 'Input action: blur',
    description: 'Focused Input loses focus.'
  },
  {
    name: 'onKeyDown',
    title: 'Keyboard action: keydown',
    description: 'User presses a key on the keyboard.'
  },
  {
    name: 'onKeyUp',
    title: 'Keyboard action: keyup',
    description: 'User releases a key on the keyboard.'
  }
]


export const ReactlyTextboxSettings = {
  categories: [
    {
      name: 'General',
      always: true,

      settings:  [
        {
          title: 'Label',
          label: 'label',
          start: 'Textbox',  
          bindable: !0
        },

      

        {
          title: 'Placeholder Text',
          label: 'placeholder', 
        },
        {
          title: 'Value',
          label: 'value',
          start: 'Textbox',
          bindable: !0, 
          type: 'chip'
        }, 
    
      ]
    },
    {
      name: 'Apperance',
      settings: [

        {
          title: 'Variant',
          label: 'variant',
          types: ['filled', 'outlined', 'standard'],
          start: 'filled',
          type: 'pill',
        },
        {
          title: 'Size',
          label: 'size',
          types: ['small','medium'],
          type: 'pill',
        },
        {
          title: 'Color',
          label: 'color',
          types: ['primary', 'secondary', 'warning', 'error', 'success']
        },
      ]
    },
    {
      name: 'Icons',
      settings: [
        {
          title: 'Start Icon',
          label: 'icon',
          types: Object.keys(Icons),
          renderOption
        },
        {
          title: 'End Icon',
          label: 'end',
          types: Object.keys(Icons),
          renderOption
        },
      ]
    },
    {
      name: 'Behavior',
      settings: [

        {
          title: 'Auto-Complete',
          label: 'autoComplete',
          types: ['off','on'],
          type: 'pill',
        },
        {
          title: 'Full Width',
          label: 'fullWidth',
          start: false,
          type: 'boolean'
        },
        {
          title: 'Disabled',
          label: 'disabled',
          start: false,
          type: 'boolean'
        },

      ]
    },
    {
      name: 'Multi-line',
      settings: [

        {
          title: 'Multi-line',
          label: 'multiline',
          start: false,
          type: 'boolean'
        },
        {
          title: 'Rows',
          label: 'rows',
          when: p => !!p.multiline
        },
      ]
    },


  ]
}
 

const ReactlyTextbox = {
  Icon: TextFields,
  Component: ReactlyTextboxComponent,
  Settings: ReactlyTextboxSettings,
  Styles: GenericStyles,
  Events: ReactlyTextboxEvents,
  Defaults: {
    label: 'Enter some text',
    variant: 'outlined',
    value: 'Textbox component',
    size: 'small'
  }
}
 

ReactlyTextbox.defaultProps = {};
export default ReactlyTextbox;
