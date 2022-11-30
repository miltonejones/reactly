import React from 'react';
import { styled, Box, Typography, FormControlLabel, Switch} from '@mui/material'; 
import { QuickSelect, Flex, Spacer, Text, TextBtn, Pill } from '../../..';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const ModalOpen = ({ event = {}, page, handleSave }) => {
  const [state, setState ] = React.useState({ ...event.action, type: 'modalOpen' });

  const modals = ['Dialog', 'Menu', 'Drawer', 'Collapse'].reduce((output, key) => {
    output = output.concat (page.components.filter(f => f.ComponentType === key));
    return output;
  }, [])

  const modal = page.components.filter(f => f.ComponentType === 'Dialog')
  const menus = page.components.filter(f => f.ComponentType === 'Menu')
  const drawers = page.components.filter(f => f.ComponentType === 'Drawer')

  // const modals = modal.concat (menus).concat(drawers)

 const getOptionLabel =  (option ) => {
  const found = page.components.find(f => f.ID === option)
  if (found) {
    return found.ComponentName;
  }
  return option;
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

 return (
   <Layout data-testid="test-for-ModalOpen">
   <Text small>Select component:</Text>  

   <QuickSelect getOptionLabel={getOptionLabel} options={modals.map(d => d.ComponentName)} value={state.target}
      onChange={value => setState(s => ({...s, target: modals.find(d => d.ComponentName === value).ID}))}
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


{/* {JSON.stringify(modals)} */}

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
ModalOpen.defaultProps = {};
export default ModalOpen;
