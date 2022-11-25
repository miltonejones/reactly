import React from 'react';
import { styled, Box, Button } from '@mui/material';
import { getStyles } from '../util';
import { GenericStyles } from '../styles';
import { Icons } from '../icons';


 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));
 
const ReactlyButton = ({ styles = [], settings = [], ...props }) => {
  const args = settings.reduce((items, res) => {
    items[res.SettingName] = res.SettingValue;
    return items;
  }, {})


  const css = getStyles(styles) ;

  const Icon = Icons[args.icon];
  const End = Icons[args.end];

  const more = !Icon ? {} : {
    startIcon: <Icon />
  }

  !!End && Object.assign(more, {endIcon: <End />})
 return (
   <Button {...props} {...args} {...more}  style={css}>
      {args.Label}  
   </Button>
 );
} 


const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
}

export const ReactlyButtonStyles = {
  ...GenericStyles
}

export const ReactlyButtonEvents =  [
  {
    name: 'onClick',
    title: 'Button is clicked',
    description: 'User clicks on component or focuses and presses SPAACE.'
  }
]



export const ReactlyButtonSettings = {
  categories: [
    {
      name: 'General',
      open: true,
      settings: [  
        {
          title: 'Label',
          label: 'Label',
          start: 'Button'
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
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: ['contained', 'outlined', 'text'],
          start: 'outlined'
        },
        {
          title: 'Size',
          label: 'size',
          types: ['small','medium','large']
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
    }
  ] 
}
 
ReactlyButton.defaultProps = {};
export default ReactlyButton;
