import React from 'react';
import { styled, Box, Typography, FormControlLabel, Switch} from '@mui/material'; 
import { QuickSelect, Flex, Spacer, Text, TextBtn, Pill } from '../../..';
import { AppStateContext } from '../../../../context'; 
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const ModalOpen = ({ event = {}, page, handleSave, application }) => {
  const { Library } = React.useContext(AppStateContext);
  const [state, setState ] = React.useState({ ...event.action, type: 'modalOpen' });


 

  const modals = Object.keys(Library)
    .filter(f => !!Library[f].modal)
    .reduce((items, key) => {
        const appModals = application.components?.filter(f => f.ComponentType === key);
        const pageModals = !!page.PageName ? page.components.filter(f => f.ComponentType === key) : [];
        const appDialogs = !appModals ? [] : appModals.map(app => ({...app, prefix: 'application.'}));
        items = items.concat(pageModals).concat(appDialogs)
        return items;
      }, []);   
 

  const renderOption = (props, option) => {
    if (!option?.ComponentName) {
      return <Box {...props}>- none -</Box>
    }
     
    return <Box {...props}>{option.prefix}{option.ComponentName}</Box>
  }
       
 const getOptionLabel =  (option ) => {
  if (typeof option === 'string') {
    const found = modals?.find(f => f.ID === (option.ID || option))
    if (found) {
      return (found.prefix||'') +  found.ComponentName;
    }
  }
  
  return option?.pageID 
    ? option?.ComponentName
    : ('application.'+option?.ComponentName); // + (typeof option); 
}

  const pills = [
  {
    name: 'open',
    value: true
  },
  {
    name: 'close',
    value: false
  },
  {
    name: 'toggle',
    value: 'toggle'
  },
]

const drawer = modals?.find(f => f.ID === state.target);

 return (
   <Layout data-testid="test-for-ModalOpen">
    
   <Text small>Select component:</Text>  

   <QuickSelect 

      getOptionLabel={getOptionLabel} 
      options={modals} 
      value={state.target}
      renderOption={renderOption}
      onChange={value => setState(s => ({...s, target: value?.ID || null}))}
    />
<Flex sx={{mt: 2}}>
  {pills.map(p => <Pill 
      onClick={() =>  setState(s => ({...s, open: p.value }))  }
      selected={p.value === state.open} key={p.name}>
        <Text small sx={{fontWeight: p.value === state.open ? 600 : 400}} >{p.name}</Text>
        
        </Pill>)}

</Flex>

    {/* <FormControlLabel
      sx={{m: 1}}
            label="Open Modal"
            control={ <Switch 
              checked={state.open}
              onChange={e => {
                setState(s => ({...s, open: e.target.checked}))
              }} 
            />}
          /> */}
 

   <Flex sx={{mt: 2}}>
        <Spacer />
        <TextBtn onClick={() => handleSave()}>Cancel</TextBtn>
        <TextBtn variant="contained" onClick={() => handleSave({
          ...event,
          action: state
        })}>Save</TextBtn>
      </Flex>
    
   {/* [ <pre>
    {JSON.stringify(state,0,2)}
    </pre>] */}

   </Layout>
 );
}
ModalOpen.defaultProps = {};
export default ModalOpen;
