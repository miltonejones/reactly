import React from 'react';
import { styled, Box, TextField, InputAdornment } from '@mui/material';
import { Icons } from '../icons';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));
 
const ReactlyTextbox = ({ settings, ...props }) => {
  const args = settings.reduce((items, res) => {
    items[res.SettingName] = res.SettingValue;
    return items;
  }, {})


  const Icon = Icons[args.icon];
  const End = Icons[args.end];


  const startAdornment = !Icon ? null : <InputAdornment position="start"><Icon /></InputAdornment>;
  const endAdornment = !End ? null : <InputAdornment position="start"><End /></InputAdornment>;

  const adornment = {
    startAdornment,
    endAdornment 
  };


 return (
  <TextField {...args} {...props} InputProps={adornment} >
     {args.Label}
  </TextField>
 );
}

const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
}

export const ReactlyTextboxEvents =  [
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
      open: true,

      settings:  [
        {
          title: 'Label',
          label: 'label',
          start: 'Textbox'
        },
        {
          title: 'Placeholder Text',
          label: 'placeholder', 
        },
        {
          title: 'Value',
          label: 'value',
          start: 'Textbox',
          when: e => !e.bound
        },
        {
          title: 'State Variable',
          label: 'target',
          type: 'state', 
          when: e => e.bound
        },
        {
          title: 'Bind value to client state',
          label: 'bound',
          type: 'boolean'
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
 


ReactlyTextbox.defaultProps = {};
export default ReactlyTextbox;
