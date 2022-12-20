import React from 'react';
import { Alert, Stack, IconButton } from '@mui/material';
import { QuickSelect, QuickMenu,  Flex, PillMenu } from '../../..';
import {
  AppStateContext, EditorStateContext
} from "../../../../hooks/AppStateContext";
import { useEditor } from "../../../../hooks/useEditor";
import { MoreVert } from "@mui/icons-material";
import { PageStateContext } from '../../../../hooks/usePageContext';
  
const NEW_STATE_TEXT = 'New state variable...'
 
const StateComponentInput = ({
  selectedPage,
  helperText,
  value,
  header,
  binding,
  handleChange,
  menu, 
}) => {

  const { 
    Prompt ,
    appData,
    queryState,
    appContext
  } = React.useContext(AppStateContext);
  const {  
    appData: application
  } = React.useContext(EditorStateContext);
  const { 
    setPageState, 
  } = useEditor(appData);
 

  const onChange = React.useCallback(async (value) => {  
    handleChange && handleChange(value, binding)
  }, [binding, handleChange])

  
  if (!selectedPage?.state && !selectedPage?.parameters && !appContext.state) {
    return <i>[{JSON.stringify(application.state) }]</i>
  }

  const Component = menu ? QuickMenu : QuickSelect;

  const options = !selectedPage?.state ? [] : selectedPage.state.map(d => d.Key);


  !!selectedPage?.parameters && Object.keys(selectedPage?.parameters).map(paramKey => {
    return options.push(`parameters.${paramKey}`);
  })

  !!appContext.state && appContext.state.map(s => {
    return options.push(`application.${s.Key}`);
  })
  return <Stack>
    {header}
    
    <Component helperText={helperText} 
        options={options}  
        value={value} 
        label={!menu ? '' : <IconButton>
          <MoreVert />
        </IconButton>}
        onChange={onChange}/>

        {!menu && <Flex fullWidth sx={{pt: 1}}>
          
          </Flex>}
  </Stack> 
}
StateComponentInput.defaultProps = {};
export default StateComponentInput;
