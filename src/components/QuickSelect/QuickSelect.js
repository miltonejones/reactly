import React from 'react';
import { styled, Box, Divider, Autocomplete, Select, Typography, MenuItem } from '@mui/material';
import { AppStateContext } from '../../hooks/AppStateContext';
import { AU, TinyButton, Text,  TextInput, Flex, OptionSwitch } from '..';
import { ExpandMore , Close} from "@mui/icons-material";
 



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

  const [isSelect, setIsSelect] = React.useState(false); 
  const [filterText, setFilterText] = React.useState(null); 
  
 
  const handleChange = (event) => { 
    const { value } = event.target; 
    onChange && onChange(value === '--None--' ? null : value);
    setFilterText('')
  };

  if (!(options && options.filter)) {
    return <>{ options}</>
  }

  const selections = options
  .filter(f => typeof f !== 'string' || (!filterText || f.toLowerCase().indexOf(filterText.toLowerCase()) > -1))
  .slice(0, 40)

  const renderOption = !props.renderOption 
    ? (props, opt) => opt
    : props.renderOption 

  const emptyProp =  "--none--";
  const getOptionLabel = !props.getOptionLabel 
    ? (opt) => opt || emptyProp
    : props.getOptionLabel 


  const selectedNode = getOptionLabel(selected);

  // if (!selectedNode) {
  //   return <>well I didn't break!</>
  // }
  
  return <>  
  {/* [{selected}] */}
  {/* {props.getOptionLabel?.toString()} */} 

  {/* [{getOptionLabel(selected)}] */}

  {/* {props.renderOption?.toString()} */}

  <TextInput select={isSelect} label={label}
      onFocus={() => setIsSelect(true)}
      onBlur={() => setIsSelect(!selected)}
      onChange={handleChange}
      buttons={
        !selected 
          ? null 
          : <TinyButton icon={Close} onClick={() => handleChange({ target: { value: '--None--'}})} />
      } 
      size="small"
      fullWidth={!small} 
      value={getOptionLabel(selected)}  
      {...props}>
      <MenuItem sx={{p: 1}} onKeyDown={(e) => e.stopPropagation()}>
      <TextInput  
        fullWidth 
        size="small" 
        value={filterText} 
        buttons={!filterText ? null : <TinyButton icon={Close} onClick={() => setFilterText('')} />}
        onChange={e => !!e.target && setFilterText(e.target.value)}
        placeholder="Filter options" 
        autoFocus 
        autoComplete="off"/>
      </MenuItem>
      <MenuItem value={emptyProp}>{emptyProp}</MenuItem>
 {selections.map((option, i) => <MenuItem key={i} value={option}>
  
  {renderOption({}, option)}
  
  </MenuItem>)}

  { !!options.length && !filterText && options?.length > selections?.length &&  <MenuItem value={emptyProp}>
 <Text small active> {options?.length - selections?.length} more...</Text>
</MenuItem>}

  </TextInput>

{/* 
  <Autocomplete  
    disablePortal
    disableClearable={disableClearable}
    autoComplete
    autoHighlight
    size="small"
    options={['--None--'].concat(selections)}
    onChange={handleChange} 
    {...props}
     freeSolo={!!free}
    sx={{mr: 1, minWidth: small ? 120 : 200, ...props.sx, }}
    renderInput={(params) => <TextInput {...params} helperText={helperText} label={label || ''}
       placeholder="Filter options" size="small" />}
 /> */}


  </>

}




QuickSelect.defaultProps = {};
export default QuickSelect;
