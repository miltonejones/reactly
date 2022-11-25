import React from 'react';
import { getStyles, getSettings } from './util';


const ReactlyComponent = ({ 
  component: Component, 
  children,
  settings,
  styles,
  events,
  ...props 
}) => {

  const args = getSettings(settings); 
  const css = getStyles(styles) ; 



 return (
   <Component {...props} {...args} style={css}>
      {children}  
   </Component>
 );
} 

export default ReactlyComponent;