import React from 'react';
import { styled, Box, Typography } from '@mui/material'; 
import { QuickSelect, Flex, Spacer, TextBtn, TinyButton, Text } from '../../..';
import { useRunScript } from '../../../../hooks/subhook/useRunScript';
import { AppStateContext } from "../../../../hooks/AppStateContext";
import { Edit } from "@mui/icons-material";  
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(2, 0)
}));
 

// const renderOption = (props, option) => {  
//   if (!option.page) {
//     return <Box {...props}><b>{option.label}</b></Box>
//   }
//   return <Box {...props} sx={{ml: 2}}>{option.label}</Box>
// }
 
 

const RunScript = ({ event = {}, page, application, handleSave }) => {
  const [state, setState ] = React.useState({ ...event.action, type: 'scriptRun' });

  const {  
    EditCode
  } = React.useContext(AppStateContext);

  const {
    getApplicationScripts,
    applicationScriptRenderOption,
    applicationScriptOptionLabel,
    scriptList
  } = useRunScript()

  const handleEdit = React.useCallback(ID => {
    const script = scriptList.find(s => s.ID === ID)
    if (script) {
      EditCode(script.code)
    }
  }, [scriptList])

  if (!application) {
    return <>Could not connect to application</>
  }

  
  // const getApplicationScripts = () => {
  //   return application.pages.reduce((out, pg) => {
  //     if (!pg.scripts?.length) {
  //       return out;
  //     }
  //     out.push({
  //       label: pg.PageName
  //     })
  //     out = out.concat((pg.scripts || []).map(s => ({
  //       ...s,
  //       label: s.name,
  //       page: pg.PageName,
  //       ID: s.ID
  //     })));
  //     return out;
  //   }, [])
  // }

  // const scriptList = getApplicationScripts()


  // const getOptionLabel =  (option ) => {
  //   const js = scriptList.find(s => s.ID === (option.ID || option));
  //   if (js?.page) {
  //     return `${js.page}.${js.label}`
  //   }
  //   return '--none--' + JSON.stringify(option)
  // }

 
 return (
   <Layout data-testid="test-for-RunScript">
    <Text small>Run client script:</Text> 
    <Flex>

    <QuickSelect 
    fullWidth
      options={scriptList} 
      getOptionLabel={applicationScriptOptionLabel} 
      renderOption={applicationScriptRenderOption} value={state.target}
      onChange={value => {  
        !!value.ID && setState(s => ({...s, target: value.ID}))
      }}
    /> 

<TinyButton icon={Edit} onClick={() => handleEdit(state.target)} />


    </Flex>
{/* [ {state.target}] */}

    <Flex sx={{mt: 2}}>
        <Spacer />
        <TextBtn onClick={() => handleSave()}>Cancel</TextBtn>
        <TextBtn variant="contained" onClick={() => handleSave({
          ...event,
          action: state
        })}>Save</TextBtn>
      </Flex>
    
    

    {/* {JSON.stringify(state)} */}
   </Layout>
 );
}
RunScript.defaultProps = {};
export default RunScript;
