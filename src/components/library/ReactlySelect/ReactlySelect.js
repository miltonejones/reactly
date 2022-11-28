import React from 'react';
import { Select, FormControl, InputLabel, MenuItem, Box, TextField } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Grading } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentSelect = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const initialProp = props.value || args.value;
  const [filter, setFilter] = React.useState('')
  const [selectValue, setSelectValue] = React.useState(args.multiple ? [initialProp] : initialProp)
  
  const parsed = !!args?.items && typeof args?.items === 'string' 
      ? JSON.parse(args?.items)
      : args?.items;

 return (<>
  <FormControl >
  {!!args.label && <InputLabel id="demo-select-small">{args.label}</InputLabel>}
 <ReactlyComponent component={Select} {...props} value={selectValue}
    onChange={e => {
      setSelectValue (e.target.value);
      props.onChange && props.onChange(e) 
    }}>
      {args.filterOptions && <Box sx={{p: 1}}>
      <TextField size="small" value={filter} onChange={e => setFilter(e.target.value)}
        placeholder="Filter options" autoComplete="off"/>
      </Box>}
      {parsed?.filter(e => !filter || e.text.toLowerCase().indexOf(filter.toLowerCase()) > -1).map((item, i) => <MenuItem key={i} value={item.value}>{item.text}</MenuItem>)}
   </ReactlyComponent></FormControl>
{/* <pre>
{JSON.stringify(props,0,2)}
 {JSON.stringify(args,0,2)}
</pre> */}
 </>
 );
}


const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Label',
          label: 'label' 
        }, 
        {
          title: 'Value',
          label: 'value' ,
          bindable: !0
        }, 
        {
          title: 'Multiple',
          label: 'multiple' ,
          type: 'boolean'
        }, 
        {
          title: 'Filter options',
          label: 'filterOptions' ,
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
          types: ['filled'
          , 'outlined'
          , 'standard'],
          type: 'pill'
        },
        {
          title: 'Size',
          label: 'size',
          types: [ 'small','medium'  ],
          type: 'pill' 
        } 
      ]
    },
    {
      name: 'Items', 
      always: true,
      settings: [  
        {
          title: 'Add items to select',
          label: 'items' ,
          type: 'valuelist'
        },  
      ]
    }, 
  ]
}


const ReactlySelect = {
  Icon: Grading,
  Component: ReactlyComponentSelect,
  Settings,
  Styles: GenericStyles, 
  Defaults: { 
    size: 'small'
  }
}
 

export default ReactlySelect;


