import React from 'react';
import { Slider } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Tune } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
  
const ReactlyComponentSlider = ({ children, onSliderChange, ...props }) => {
 return (<>
 
 <ReactlyComponent component={Slider} {...props}
    onChange={(e, value) => {
      onSliderChange && onSliderChange(e, {
        value
      })
    }}
    >
      {children}
   </ReactlyComponent>
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
          title: 'Value',
          label: 'value' ,
          bindable: 1, 
        },
        {
          title: 'default Value',
          label: 'defaultValue' , 
        },
        {
          title: 'minimum value',
          label: 'min' ,
          xs:6
        }, 
        {
          title: 'maximum value',
          label: 'max'  ,
          xs:6
        }, 
        {
          title: 'step',
          label: 'step',  
        },
        {
          title: 'Disabled',
          label: 'disabled', 
          type: 'boolean'
        },
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'color',
          label: 'color',
          types: [
            'primary'
, 'secondary'
           ], 
        } ,
        {
          title: 'orientation',
          label: 'orientation', 
          type: 'pill',
          types: [
            'horizontal'
            , 'vertical'
           ], 
        },
        {
          title: 'track',
          label: 'track', 
          type: 'pill',
          types: [
            	'inverted'
, 'normal'
           ], 
        },
        {
          title: 'Right to left',
          label: 'isRtl', 
          type: 'boolean'
        },
        {
          title: 'Use marks',
          label: 'marks', 
          type: 'boolean'
        },
      ]
    },
  ]
}



const Events =  [
  {
    name: 'onSliderChange',
    title: 'Slider value changes',
    description: 'User clicks the slider.'
  },  
]

const ReactlySlider = {
  Icon: Tune,
  Component: ReactlyComponentSlider,
  Settings,
  Styles: GenericStyles, 
  Events,
  Defaults: { 
    min: 0,
    max: 100,
    value: 25
  }
}
 

export default ReactlySlider;


