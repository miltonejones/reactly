import React from 'react';
import { styled, Box } from '@mui/material';
import { getStyles } from '../util';
import { LayoutStyles } from '../styles';
import { syntaxHighlight } from '../../../colorize';
import { Json } from '../../../colorize';
 
const Layout = styled(Box)(({ theme }) => ({
 margin:0
}));

const gridTransform = (value) => {
  const fr = [];
  for (let e = 0; e < value; e++) {
    fr.push('1fr');
  }
  return fr.join(' ')
};
 
const paddingTransform = (prop) => {
  if (!prop?.split || prop === null || prop === 'null') return null;
  const [key, value] = prop.split('/');
  if (!value) return prop;
  return `${value}rem`;
};
 
const colorTransform = (prop) => {
  const arg = typeof prop === 'string'
    ? JSON.parse(prop)
    : prop;

  return arg?.value;

};
 
const ReactlyBox = ( { styles = [], children, ...props } ) => {
 const args = getStyles(styles) ;

 

 return (
  <>
  
   <Layout {...props} style={args} data-testid="test-for-ReactlyBox"> 

     {children}
   </Layout>

   {/* <Json>
     {JSON.stringify(args,0,2)} 
   </Json>
   */}
  </>
 );
}

export const ReactlyBoxStyles = {
  ...LayoutStyles
}
ReactlyBox.defaultProps = {};
export default ReactlyBox;
