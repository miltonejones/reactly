import React from 'react';
import { styled, Box, Divider, Typography , Collapse, Switch, Stack} from '@mui/material'; 
import { QuickSelect, Flex, Text, Spacer, TextBtn } from '../../..';
import {
  AppStateContext 
} from "../../../../hooks/AppStateContext";
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const DataExec = ({ event, resources, page, handleSave, selectedType, selectedEvent }) => {
  const [state, setState ] = React.useState({ ...event.action, type: selectedType });
  
  
  const {  
    appContext
  } = React.useContext(AppStateContext);

  
  const actionReset = selectedType === 'dataReset';
  const actionDesc = actionReset
    ? 'Reset'
    : 'Execute' 

  const target = !event.action 
    ? null
    : resources.find(e => e.ID === state.target).name

  const resource = resources.find(e => e.ID === state.target);

  const options = !page.state ? [] : page.state.map(d => d.Key);
  !!page.parameters && Object.keys(page.parameters).map(paramKey => {
    return options.push(`parameters.${paramKey}`);
  })
  !!selectedEvent?.emits && selectedEvent.emits.map(paramKey => {
    return options.push(`event.${paramKey}`);
  })

  !!appContext.state && appContext.state.map(s => {
    return options.push(`application.${s.Key}`);
  })
  const triggerName = resources?.find(f => f.ID === state.triggers)

 return (
   <Layout data-testid="test-for-DataExec">


<Text small>{actionDesc} Resource:</Text> 
    <QuickSelect  options={resources.map(d => d.name)} value={resource?.name}
      onChange={value => setState(s => ({...s, target: resources.find(d => d.name === value).ID}))}
    />

    <Divider sx={{mt:2, mb:1}}/>
    <Stack>

    <Text sx={{  ml: 1 }} small active>Set request values</Text>
    <Flex>
    <Typography sx={{ mb: 2, ml: 1 }}  variant="caption">Use options.<i>property</i> to use value from the component.</Typography>
    </Flex>
    </Stack>

 
      {!actionReset && !! resource?.values && resource.values.map(val => <Box sx={{mt: 1}} key={val.key}>
        <QuickSelect 
        free
        options={options} 
        label={`Set value for ${val.key}`}
        value={state.terms?.[val.key]}
        onChange={value => { 
          setState(s => ({...s, terms: {
            ...s.terms,
            [val.key]: value
          }}))
        }}
      />
      </Box>)}

      {/* <Flex onClick={() => setState(s => ({
        ...s,
        triggers: !!s.triggers ? null : 'null'
      }))}>
        <Text small>Refresh</Text>
        <Spacer checked={!!state.triggers} />
        <Switch  />
      </Flex> */}

      <Collapse in={!!state.triggers}>

    {!!state.triggers && <QuickSelect  options={resources.map(d => d.name)} value={triggerName?.name}
      onChange={value => setState(s => ({...s, triggers: resources.find(d => d.name === value).ID}))}
    />}


      </Collapse>

{/* <pre>
{JSON.stringify(state, 0, 2)}
</pre> */}

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
DataExec.defaultProps = {};
export default DataExec;
