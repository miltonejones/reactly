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
  const style = getStyles(styles) ; 

 return (
   <Component {...args} {...props} style={style}>
      {children || args.children}  
   </Component>
 );
} 

export default ReactlyComponent;