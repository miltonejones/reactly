import React from 'react';
import { Box } from '@mui/material';
import { getStyles } from '../util';
import { LayoutStyles } from '../styles'; 
  
 
const ReactlyBox = ( { styles = [], children, ...props } ) => {
 const style = getStyles(styles) ;

 return (
  <Box {...props} style={style}> 
    {children}
  </Box> 
 );
}

export const ReactlyBoxStyles = {
  ...LayoutStyles
}


ReactlyBox.defaultProps = {};
export default ReactlyBox;
