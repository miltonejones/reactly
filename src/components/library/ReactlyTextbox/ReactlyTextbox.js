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
  <TextField {...props} {...args} InputProps={adornment} >
     {args.Label}
  </TextField>
 );
}

const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
}


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
          title: 'Value',
          label: 'value',
          start: 'Textbox'
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
          start: 'filled'
        },
        {
          title: 'Color',
          label: 'color',
          types: ['primary', 'secondary', 'warning', 'error', 'success']
        },
        {
          title: 'Size',
          label: 'size',
          types: ['small','medium']
        },
      ]
    },
    {
      name: 'Behavior',
      settings: [

        {
          title: 'Auto-Complete',
          label: 'autoComplete',
          types: ['off','on']
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
    }

  ]
}
 


ReactlyTextbox.defaultProps = {};
export default ReactlyTextbox;
