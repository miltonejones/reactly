import React from 'react';
import { styled, Box } from '@mui/material';
import {  QuickSelect } from '../../..';
import { Icons } from '../../../library/icons'; 
 

const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
}
 
 
const IconComponentInput = ({ label, value, onChange, ...props}) => {
  // return <>[{JSON.stringify(label)}]</>
 return (
   <Box {...props}> 
    <QuickSelect 
      value={JSON.stringify(value)} options={Object.keys(Icons)} 
        onChange={onChange} label={label} renderOption={renderOption}/>
   </Box>
 );
}


IconComponentInput.defaultProps = {};
export default IconComponentInput;
