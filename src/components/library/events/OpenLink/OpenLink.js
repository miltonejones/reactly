import React from 'react';
import { styled, Box, Typography, Divider } from '@mui/material'; 
import { EditorStateContext } from '../../../../hooks/AppStateContext';
import { QuickSelect, Flex, Spacer, TextBtn } from '../../..';
import { getPropertyOptions } from '../../util';
import { JsonModal } from '../../../../colorize';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const OpenLink = ({ event , page, component, handleSave, selectedEvent, resources }) => {
  const { appData  } = React.useContext(EditorStateContext);
  const [state, setState ] = React.useState({ ...event.action, type: 'openLink' });

  const { pages } = appData;
  const target = !event.action 
    ? null
    : pages.find(e => e.ID === event.action.target).PageName


    const getOptionLabel =  (option ) => {
      const found = pages.find(f => f.ID === option)
      if (found) {
        return found.PageName;
      }
      return option;
    }
    
    
    const found = pages.find(f => f.ID === state.target)

    const options = getPropertyOptions(page, selectedEvent, component, resources);
    const parameters = found?.parameters;


 return (
   <Layout data-testid="test-for-OpenLink">



<Typography> <JsonModal json={state} sx={{mr: 1}}/>Open Link:</Typography>

    <QuickSelect options={pages.map(d => d.PageName)} value={found?.PageName} 
      onChange={value => setState(s => ({
        ...s, 
        target: pages.find(d => d.PageName === value).ID,
        params: {}
      }))}
    />

    {!!parameters && <>
    <Divider textAlign="left" sx={{mt: 1, mb: 1}}>Set page parameters</Divider>
    {Object.keys(parameters).map(param => <Box key={param} sx={{mt: 1}}>
      <QuickSelect options={options} value={state.params[param]} label={`Set value for ${param}`} 
        onChange={value => {
          setState(s => ({
            ...s,
            params: {
              ...s.params,
              [param]: value
            }
          }))
        }}
      />
    </Box>) }
    </> }

 

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
