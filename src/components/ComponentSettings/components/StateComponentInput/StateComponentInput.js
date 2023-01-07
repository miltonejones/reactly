import React from 'react';
import {  Stack, IconButton } from '@mui/material';
import { TextInput, QuickMenu  } from '../../..';
import { AppStateContext } from "../../../../context";
import { useEditor } from "../../../../hooks/useEditor";
import { MoreVert, LinkOff, Code } from "@mui/icons-material"; 
   
 
const StateComponentInput = ({
  selectedPage,
  helperText,
  value,
  header,
  binding,
  scripts,
  handleChange,
  bindPropertyClicked,
  bindingValue,
  menu = true, 
}) => {

  const {  
    appContext
  } = React.useContext(AppStateContext);  

  let code = '', isScript = false;
  if (typeof bindingValue === 'string') {
    const [ scope, scriptID ] = bindingValue?.split('.');
     isScript = scope === 'scripts';
    code = !(isScript && scripts && scriptID) ? '' : scripts.find(f =>  f.ID === scriptID).code;
  }
 

  const onChange = React.useCallback(async (value) => {  
    handleChange && handleChange(value, binding)
  }, [binding, handleChange])

  
  if (!selectedPage?.state && !selectedPage?.parameters && !appContext.state) {
    return <i>[{JSON.stringify(appContext.state) }]</i>
  }
 

  const options = !selectedPage?.state ? [] : selectedPage.state.map(d => d.Key);


  !!selectedPage?.parameters && Object.keys(selectedPage?.parameters).map(paramKey => {
    return options.push(`parameters.${paramKey}`);
  })

  !!appContext.state && appContext.state.map(s => {
    return options.push(`application.${s.Key}`);
  })

  const buttons = isScript ? [ <IconButton>
    <Code />
  </IconButton>] :  [ 
           
    <QuickMenu helperText={helperText} 
 options={options}  
 value={value} 
 label={ 

 <IconButton>
   <MoreVert />
 </IconButton>
 
}
 onChange={value => !!value && onChange(value)}/>,


<IconButton onClick={bindPropertyClicked}>
 <LinkOff />
</IconButton>
]


  return <Stack sx={{ width: '100%' }}>
  {header} 
    <TextInput 
        disabled={isScript}
        fullWidth
        value={isScript ? code : value} 
        size="small"
      buttons={ buttons }
    />



     
  </Stack> 
}
StateComponentInput.defaultProps = {};
export default StateComponentInput;
