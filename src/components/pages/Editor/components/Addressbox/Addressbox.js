import React from 'react';
import { styled, InputAdornment, TextField } from '@mui/material';
import { AppStateContext, EditorStateContext } from '../../../../../context';
import { ParameterPopover} from '..';
import { Launch } from "@mui/icons-material";
 
const Addressbox = ( { value, onChange, ...props }) => {
  const { queryState, setQueryState, selectedPage } = React.useContext(AppStateContext); 
  const [parameters, setParameters] = React.useState(selectedPage?.parameters)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handlePopoverClick =  (event) => {  
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => { 
    setAnchorEl(null); 
  };

  const handleButtonClick = (event) => { 
    if (parameters && 
        Object.keys(parameters).length) {
      return handlePopoverClick(event);
    } 
    window.open(value)
  }

  const openPage = () => {
    const path = [value, Object.values(parameters).join('/')].join('/');  
    window.open(path)
    handlePopoverClose ()
  }


  const handleParameterChange = param => event => {
    setParameters(params => ({
      ...params,
      [param]: event.target.value 
    }))
  }

 

  const startAdornment = <InputAdornment position="start">URL</InputAdornment>;

  const adornment = {
    startAdornment,
    endAdornment: (
      <InputAdornment
        sx={{ cursor: "pointer" }} 
        position="end"   onClick={handleButtonClick}
      > 
        <Launch />
        Open

      </InputAdornment>
    ),
  };

  return (
   <>
 
   <TextField
      disabled
      size="small" 
      {...props}
      sx={{ width: "calc(100vw - 640px)" }}
      value={value}
      autoComplete="off"
      onChange={onChange}
      InputProps={adornment}
      autoFocus
    />
    
  {!!parameters && <ParameterPopover 
      anchorEl={anchorEl}
      onClose={handlePopoverClose}
      handleParameterChange={handleParameterChange}
      openPage={openPage}
      parameters={parameters}
  />}

    
    </> 
  );
};

Addressbox.defaultProps = {};
export default Addressbox;
