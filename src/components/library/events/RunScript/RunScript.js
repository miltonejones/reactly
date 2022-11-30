import React from 'react';
import { styled, Box, Typography } from '@mui/material'; 
import { QuickSelect, Flex, Spacer, TextBtn, Text } from '../../..';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(2, 0)
}));
 
const RunScript = ({ event = {}, page, handleSave }) => {
  const [state, setState ] = React.useState({ ...event.action, type: 'scriptRun' });
  const target = !event.action 
    ? null
    : page.scripts?.find(e => e.ID === event.action.target).name
 return (
   <Layout data-testid="test-for-RunScript">
    <Text small>Run client script:</Text> 
    <QuickSelect options={page.scripts?.map(d => d.name)} value={target}
      onChange={value => setState(s => ({...s, target: page.scripts?.find(d => d.name === value).ID}))}
    />


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
