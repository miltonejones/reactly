import React from 'react';
import { styled, Box, IconButton, Drawer,  
 Divider, Typography, Stack, Grid, Card, Switch, Pagination } from '@mui/material';
import {  Flex, Spacer, TextBtn, QuickSelect, QuickMenu, SearchBox, DeleteConfirmMenu, Text, TextInput } from '..';
import { Close, Gamepad, Add, Delete, Code, RecentActors, AutoStories } from "@mui/icons-material"; 
import { PopoverInput } from '../Control/Control';
import { Json } from '../../colorize';
import { objectReduce } from '../library/util';
import { AppStateContext } from "../../hooks/AppStateContext";
 
const Layout = styled(Box)(({ theme }) => ({
 padding: theme.spacing(2),
 minHeight: '40vh'
}));

export const StateValue = ({ ID, Key, tab, Value, Type, handleChange, ...props }) => {
  if (Type === 'boolean') {
    return <Switch  size="small"
      checked={!!Value}
      onChange={e => {
        handleChange && handleChange(ID, Key, e.target.checked, Type);
      }} 
    />
  }
  return <TextInput prompt tabIndex={tab} {...props} label={
    <Text small><em>Set value for "{Key}"</em></Text>
  } value={Value} onChange={e => {
    handleChange && handleChange(ID, Key, Type ===  'number' ? parseInt(e.target.value) : e.target.value, Type)
  }}  />
}
 
const StateDrawer = ({
  open, 
  state = [], 
  handleClose, 
  handleSwitch, 
  handleChange, 
  handleDrop 
}) => {

  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState('');
  const args = {
    size: 'small',
    autoComplete: 'off',
    sx: { mr: 1 }
  };

  const {  
    setShowTrace
  } = React.useContext(AppStateContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleAliasOpen = event => {
    setAnchorEl(event.currentTarget)
  } 

  const handleAliasClose = event => {
    setAnchorEl(null)
  } 


  const props = objectReduce(state);

  const filtered = state
    .filter(f => !filter || f.Key.toLowerCase().indexOf(filter.toLowerCase()) > -1)
  const pageCount = Math.ceil(filtered?.length / 5);
  const startSlice = (page - 1) * 5;
  const visible = filtered.slice(startSlice, startSlice + 5)


 return (
   <Drawer open={open} anchor="bottom"
 
   data-testid="test-for-StateDrawer">
   <Layout> 
    <Flex>
      <Typography variant="subtitle1">
        <b>Client state settings</b>
      </Typography>
      <TextBtn onClick={handleAliasOpen} endIcon={<Add />}>Add</TextBtn>
      <Spacer />

      <IconButton  
          color="inherit" 
          onClick={() => { 
            handleSwitch({  stateOpen: false});
            setShowTrace(true);
          }}
      >
        <Gamepad />
      </IconButton>


          <IconButton
              color="inherit" 
              onClick={() => {
                handleSwitch({ connectOpen: 1, stateOpen: false})
              }}
            >
              <AutoStories />
            </IconButton>
            <IconButton
              color="inherit" 
              onClick={() => { 
                handleSwitch({ scriptOpen: 1, stateOpen: false})
              }}
            >
              <Code />
            </IconButton>

      <IconButton disabled>
        <RecentActors />
      </IconButton>
      <IconButton  onClick={handleClose}>
        <Close />
      </IconButton>
    </Flex>
    <Divider />

    <Grid container sx={{mt: 2}}>

    <Grid item xs={6}>
      <Flex sx={{ mb: 1 }}>
        {pageCount > 1 && <Pagination count={pageCount} color="primary" variant="rounded" 
          sx={{mb: 2}} page={page} onChange={(e, p) => setPage(p)}/>}
        <Spacer />
        <SearchBox 
          onChange={e => setFilter(e.target.value)}
          onClose={() => setFilter('')} size="small" label="Filter" sx={{mr: 10}}/>
      </Flex>

              <Flex>

                <Flex sx={{width: 140}}>
                  <Text small active>Variable</Text>
                </Flex>
                  
                <Flex sx={{width: 140}}>
                  <Text small active>Type</Text>
                </Flex>
                  
                <Flex>
                  <Text small active>Default value</Text>
                </Flex>
        
              </Flex>
        {visible.map((item, k) => <Flex key={k} sx={{mb: 0}}>

          {/* state property name  */}
          <Stack sx={{width: 140}}>
            {/* <Typography>Key</Typography> */}
            <TextInput prompt {...args} value={item.Key}  label="Set key name" onChange={e => {
              handleChange && handleChange(item.ID, e.target.value, item.Value, item.Type)
            }} />
          </Stack>  

          <Flex nowrap sx={{width: 140}}>
            {/* <Typography>Type</Typography> */}
            <QuickMenu options={['string', 'object', 'array', 'number', 'boolean']}
            title="Set data type"
            label={item.Type || 'choose type'} caret
                value={item.Type || 'string'} onChange={value => {
                  handleChange && handleChange(item.ID, item.Key, item.Value, value)
                }} />
          </Flex>

          {/* state property value  */}
          <Stack sx={{width: 200}}>
            {/* <Typography>Value</Typography> */}
            <StateValue {...args} tab={k} {...item} handleChange={handleChange}  />
          </Stack>

          <Box>
          <DeleteConfirmMenu message={`Delete key "${item.Key}"?`}    
              onDelete={e =>  !!e && handleDrop(item.ID) } /> 

            {/* <IconButton onClick={() => handleDrop && handleDrop(item.ID)}>
              <Delete />
            </IconButton> */}
          </Box>
    
        </Flex>)}

      </Grid>


      <Grid item xs={6}>
        <Card sx={{p: 2, m: 1, minHeight: '25vh', maxHeight: '300px', overflow: 'auto'}}>
            <Json>
              {JSON.stringify(props, 0, 2)}
            </Json>
        </Card>
      </Grid>
    </Grid>

   </Layout>

   <PopoverInput label="Add a state variable" 
    onChange={value => {
      if (!value) return handleAliasClose();  
       handleChange && handleChange(null, value)
     handleAliasClose();
    }} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>


   </Drawer>
 );
}
StateDrawer.defaultProps = {};
export default StateDrawer;
