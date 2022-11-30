import React from 'react';
import { Paper, styled } from '@mui/material'; 
import { getStyles, getSettings } from './util';
import { RepeaterContext } from '../../hooks/AppStateContext';


const ReactlyComponent = ({ 
  component: Component, 
  children,
  settings,
  styles, 
  extra,
  ...props 
}) => {

  const { row } = React.useContext(RepeaterContext);

  if (row) {
    Object.keys(row).map(item => {
      const binding = row[item];
      const setting = binding.SettingName;
      const value = binding.record[item];
      settings = settings?.map(f => f.SettingName === setting ? {...f, SettingValue: value} : f)
 
    }) 
  }

  const args = getSettings(settings); 
  const style = getStyles(styles) ; 

  const content = args.Label || children || args.children

 return <> 
{!!row && <>

{/* [<pre> {JSON.stringify(args,0,2)}</pre>] */}
</>}
 <Component {...args} {...props}  style={style} sx={{...props.sx, ...extra}}>
    {children || args.children}  
 </Component>
 </>
} 

export const Faux = styled(Paper)(( {open} ) => ({ 
  display: !open ? 'none' : 'block' ,
  margin: 16
}))
  
export default ReactlyComponent;