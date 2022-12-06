import React from 'react';
import { styled, Box, Divider, Autocomplete, Typography, MenuItem } from '@mui/material';
import { AppStateContext } from '../../hooks/AppStateContext';
import { AU, TinyButton, TextInput, Flex, OptionSwitch } from '..';
import { ExpandMore } from "@mui/icons-material";
 



export const QuickSelect = ({ 
  label, 
  error, 
  disableClearable,
  value: selected, 
  options = [], 
  onChange ,
  helperText,
  small,
  free,
  limit = 20,
  ...props
}) => {

  const [filterText, setFilterText] = React.useState(null); 
  
 
  const handleChange = (event, value) => {
    onChange && onChange(value === '--None--' ? null : value);
    setFilterText('')
  };

  if (!(options && options.filter)) {
    return <>{ options}</>
  }

  const selections = options
  .filter(f => !filterText || f.toLowerCase().indexOf(filterText.toLowerCase()) > -1)

  return <>  
  {/* {props.getOptionLabel?.toString()} */} 
  <Autocomplete  
    disablePortal
    disableClearable={disableClearable}
    autoComplete
    autoHighlight
    size="small"
    value={selected} 
    options={['--None--'].concat(selections)}
    onChange={handleChange} 
    {...props}
     freeSolo={free}
    sx={{...props.sx, mr: 1, minWidth: small ? 120 : 'inherit'}}
    renderInput={(params) => <TextInput {...params} helperText={helperText} label={label} placeholder="Filter options" size="small" />}
 />
  </>

}




QuickSelect.defaultProps = {};
export default QuickSelect;
