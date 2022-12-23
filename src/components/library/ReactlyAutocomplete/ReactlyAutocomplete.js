import React from 'react';
import { Autocomplete, Box, Avatar, TextField } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
import throttle from 'lodash/throttle';

  
const ReactlyComponentAutocomplete = ({ children, onValueSelected, onValueChanged, ...props }) => {
  const args = getSettings(props.settings);

  const dataRows = !!args?.options && typeof args?.options === 'string' 
      ? JSON.parse(args?.options)
      : args?.options;
  

  const [value, setValue] = React.useState(props.value);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState(dataRows || []);
  
  const renderOption = (props, option) => {
    const Icon = Icons[option.startIcon];
    if (option.image) return <Box {...props}
      ><Avatar sx={{mr: 1}} src={option.image} alt={option.text}/>{option.text}</Box>
    if (!Icon) return <Box {...props}>{option.text}</Box>
    return <Box {...props}><Icon /> {option.text}</Box>
  }


  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        onValueChanged && onValueChanged(null, request);
      }, args.throttle_speed),
    [],
  );
 
  React.useEffect(() => {
    let active = true;
 
 
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ value: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

 return (
  <>
 
   <ReactlyComponent component={Autocomplete} {...props}
    renderOption={renderOption}
    getOptionLabel={option => option.text || option} 
    options={props.options || options}
    value={props.value}
    onChange={(event, newValue) => {
      onValueSelected && onValueSelected(event, newValue);
      // setValue(newValue);
    }}
    onInputChange={(event, newInputValue) => {
      setInputValue(newInputValue);
    }}
    renderInput={(params) => <TextField {...params} helperText={args.helperText} label={args.label || ''} 
      placeholder={args.placeholder} size={args.size || 'small'} />
    }
    >
      {children}
   </ReactlyComponent>
 {/* <pre>
 {JSON.stringify(props.options,0,2)} 
 </pre> */}
   {/* <hr />
  */}
  </>
 );
}

 

const ReactlyAutocomplete = {
  Icon: Add,
  Component: ReactlyComponentAutocomplete 
}
 

export default ReactlyAutocomplete;


