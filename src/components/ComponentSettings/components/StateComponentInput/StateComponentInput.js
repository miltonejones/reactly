import React from 'react';
import {  Stack, IconButton } from '@mui/material';
import { TextInput, QuickMenu  } from '../../..';
import { AppStateContext } from "../../../../context";
import { useEditor } from "../../../../hooks/useEditor";
import { MoreVert, LinkOff } from "@mui/icons-material"; 
   
 
const StateComponentInput = ({
  selectedPage,
  helperText,
  value,
  header,
  binding,
  handleChange,
  bindPropertyClicked,
  menu = true, 
}) => {

  const {  
    appContext
  } = React.useContext(AppStateContext);  
 

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
  return <Stack sx={{ width: '100%' }}>
    {header} 
    <TextInput 
        fullWidth
        value={value} 
        size="small"
      buttons={
           [ <QuickMenu helperText={helperText} 
        options={options}  
        value={value} 
        label={ <IconButton>
          <MoreVert />
        </IconButton>}
        onChange={value => !!value && onChange(value)}/>,
      <IconButton onClick={bindPropertyClicked}>
        <LinkOff />
      </IconButton>
      ]
      }
    />



     
  </Stack> 
}
StateComponentInput.defaultProps = {};
export default StateComponentInput;
