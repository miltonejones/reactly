import React from 'react';
import { styled, Box, Divider, TextField, Autocomplete, Typography, MenuItem } from '@mui/material';
import { AppStateContext } from '../../hooks/AppStateContext';
import { AU, TinyButton, Flex, OptionSwitch } from '..';
import { ExpandMore } from "@mui/icons-material";
 



export const QuickSelect = ({ 
  label, 
  error, 
  disableClearable,
  value: selected, 
  options = [], 
  onChange ,
  small,
  limit = 20,
  ...props
}) => {

  const [filterText, setFilterText] = React.useState(null); 
  
 
  const handleChange = (event, value) => {
    onChange && onChange(value === '--None--' ? null : value);
    setFilterText('')
  };

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
    sx={{...props.sx, mr: 1, minWidth: small ? 120 : 220}}
    renderInput={(params) => <TextField {...params} label={label} placeholder="Filter options" size="small" />}
 />
  </>

}




QuickSelect.defaultProps = {};
export default QuickSelect;
