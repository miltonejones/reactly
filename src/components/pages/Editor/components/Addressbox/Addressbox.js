import React from 'react';
import { styled, InputAdornment, TextField } from '@mui/material';
import { useTextTransform } from '../../../../../hooks';
import { AppStateContext, EditorStateContext } from '../../../../../context';
import { ParameterPopover   } from '..';
import { Launch } from "@mui/icons-material";
import { Flex } from '../../../..';
import { Text } from '../../../..';
import { Spacer } from '../../../..';
 
const Addressbox = ( { value, onChange, ...props }) => {
  const { queryState, setQueryState, selectedPage } = React.useContext(AppStateContext); 
  const [parameters, setParameters] = React.useState(selectedPage?.parameters)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { getParametersInScope } = useTextTransform();
  const routeParams = getParametersInScope();

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

  const suffix = !(parameters && Object.values(parameters).length)
    ? ''
    : Object.keys(parameters)
      .map(key => routeParams[key])
      .join('/')

  return (
   <>

   <Flex
    spacing={0.1}
      sx={{ 
        width: t => `calc(100vw - 640px - ${t.spacing(4)})`,
        border: 1, 
        p: t => t.spacing(0.5,2),
        borderColor: 'divider',
        borderRadius: 8,
        backgroundColor: t => t.palette.grey[200]
        }}>
      <Text small active sx={{mr: 1}}>
        URL
      </Text>
     
      <Text muted={!!suffix} small> {value}</Text>
      {!!suffix && <>/<Text hover onClick={handleButtonClick} small active success>{suffix}</Text></>}
       
      <Spacer />
        <Launch />
        <Text hover onClick={handleButtonClick} small>Open</Text>
   </Flex>
 
   {/* <TextField
      disabled
      size="small" 
      {...props}
      value={value}
      autoComplete="off"
      onChange={onChange}
      InputProps={adornment}
      autoFocus
    /> */}
    
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
