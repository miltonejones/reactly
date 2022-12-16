import React from 'react';
import { IconButton } from '@mui/material'; 
import { GenericStyles, ColorStyles } from '../styles'; 
import { Mood } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons, renderIconOption } from '../icons';
import { getSettings, css } from '../util';
import ReactlyButton from '../ReactlyButton/ReactlyButton';
  
function spin(object) {
  const style = {}
  if (object.spin === 'yes') {
    const direction = object.direction === 'left' ? 'left' : 'spin';
    Object.assign(style, {
      animation: `App-logo-${direction} infinite ${object.speed || 2}s linear`
    }) 
  }
  return style;
}


const ReactlyComponentIconButton = ({ children, ...props }) => {
  const args = getSettings(props.settings);
  const Icon = Icons[props.icon || args.icon] || Mood;
  const style =  css(args || {});
 return (
  <> 
  {/* [<pre>
    {JSON.stringify(args,0,2)}
  </pre>]
  [<pre>
    {JSON.stringify(spin(args),0,2)}
  </pre>] */}
   <ReactlyComponent component={IconButton} {...props} style={spin(args)} >
      <Icon />
   </ReactlyComponent>
   
   </>
 );
}

 

const ReactlyIconButton = { 
  Component: ReactlyComponentIconButton, 
}
 

export default ReactlyIconButton;


