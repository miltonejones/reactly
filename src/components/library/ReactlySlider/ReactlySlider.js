import React from 'react';
import { Slider } from '@mui/material';  
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentSlider = ({ children, onSliderChange, ...props }) => {
  const args = getSettings(props.settings);
 return ( 
 <>
 
 <ReactlyComponent component={Slider} {...props}
    
    min={Number(args.min)}
    max={Number(args.max)}

    onChangeCommitted={(e, value) => { 
      onSliderChange && onSliderChange(e, {
        value 
      })
    }}
   />
  
 </>
 );
}
 
const ReactlySlider = { 
  Component: ReactlyComponentSlider, 
}
 

export default ReactlySlider;


