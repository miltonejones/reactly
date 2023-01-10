import React from 'react';
import { styled, Box, TextField, InputAdornment } from '@mui/material';
import { Icons } from '../icons';
import { GenericStyles } from '../styles';
import { TextFields } from "@mui/icons-material";
import ReactlyComponent from '../reactly'; 
import { getSettings, getStyles } from '../util';
  
const ReactlyTextboxComponent = ({onEnterPress, styles = [], ...props}) => {
 

 
  const args = getSettings(props.settings);

  
  const css = getStyles(styles.filter(f => !f.selector));
  const sub = getStyles(styles.filter(f => !!f.selector));
   
  const Icon = Icons[args.icon];
  const End = Icons[args.end];

  const startAdornment = !Icon ? null : <InputAdornment position="start"><Icon /></InputAdornment>;
  const endAdornment = !End ? null : <InputAdornment position="start"><End /></InputAdornment>;

  const adornment = {
    startAdornment,
    endAdornment 
  };

  let err = 'ok'
  let user_sx = {};
  const json = `{${args.user_sx}}`;
  try {
    user_sx = !args.user_sx ? {} : JSON.parse(json);
  } catch (e) {
    err = e.message;
  } 

  // let subCss;
  const made = {}
  
  const subCss = styles.filter(f => !!f.selector).map(m => {
    Object.assign(made, { 
      [`& .${m.selector}`]: { 
        ...made [`& .${m.selector}`],
          [`${m.Key}`]: `${m.Value}`
        }  
    }) 
  })

 // Mui-focused fieldset
 return (
<>
{/* [<pre>
{JSON.stringify(args,0,2)}

</pre>] */}
{/* {JSON.stringify(styles.filter(f => !!f.selector))} */}
{/* 
{JSON.stringify(args.user_sx)} */}
{/* {JSON.stringify(user_sx)}
{JSON.stringify(err)} */}
<ReactlyComponent component={TextField} {...props} {...args} value={props.value}
   onKeyUp={e => {
    e.keyCode === 13 && onEnterPress && onEnterPress(e)
   }} 
   InputProps={adornment} sx={made}>
      {args.Label}
   </ReactlyComponent>
</>
 );
}
 

const ReactlyTextbox = { 
  Component: ReactlyTextboxComponent, 
}
 

ReactlyTextbox.defaultProps = {};
export default ReactlyTextbox;
