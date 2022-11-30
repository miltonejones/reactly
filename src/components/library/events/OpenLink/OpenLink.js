import React from 'react';
import { styled, Box, Typography } from '@mui/material'; 
import { EditorStateContext } from '../../../../hooks/AppStateContext';
import { QuickSelect, Flex, Spacer, TextBtn } from '../../..';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const OpenLink = ({ event , page, handleSave }) => {
  const { appData  } = React.useContext(EditorStateContext);
  const [state, setState ] = React.useState({ ...event.action, type: 'openLink' });

  const { pages } = appData;
  const target = !event.action 
    ? null
    : pages.find(e => e.ID === event.action.target).PageName

 return (
   <Layout data-testid="test-for-OpenLink">



<Typography>Open Link:</Typography> 

    <QuickSelect options={pages.map(d => d.PageName)} value={target}
      onChange={value => setState(s => ({...s, target: pages.find(d => d.PageName === value).ID}))}
    />


    <Flex sx={{mt: 2}}>
        <Spacer />
        <TextBtn onClick={() => handleSave()}>Cancel</TextBtn>
        <TextBtn variant="contained" onClick={() => handleSave({
          ...event,
          action: state
        })}>Save</TextBtn>
      </Flex>
    


 
   </Layout>
 );
}
OpenLink.defaultProps = {};
export default OpenLink;
