import React from 'react';
import { Paper, styled } from '@mui/material'; 
import { getStyles, getSettings } from './util';


const ReactlyComponent = ({ 
  component: Component, 
  children,
  settings,
  styles, 
  extra,
  ...props 
}) => {

  const args = getSettings(settings); 
  const style = getStyles(styles) ; 

    

 return <Component {...args} {...props} style={style} sx={{...props.sx, ...extra}}>
    {children || args.children}  
 </Component>
} 

export const Faux = styled(Paper)(( {open} ) => ({ 
  display: !open ? 'none' : 'block' ,
  margin: 16
}))
  
export default ReactlyComponent;