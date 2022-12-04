import React from 'react';
import { styled, Box, IconButton, Drawer,  
 Divider, Typography, Stack, Grid, Card, Switch, Pagination } from '@mui/material';
import {  Flex, Spacer, TextBtn, QuickSelect, SearchBox, TextInput } from '..';
import { Close, Add, Delete } from "@mui/icons-material"; 
import { PopoverInput } from '../Control/Control';
import { Json } from '../../colorize';
import { objectReduce } from '../library/util';
 
const Layout = styled(Box)(({ theme }) => ({
 padding: theme.spacing(2),
 minHeight: '40vh'
}));

export const StateValue = ({ ID, Key, Value, Type, handleChange, ...props }) => {
  if (Type === 'boolean') {
    return <Switch  size="small"
      checked={!!Value}
      onChange={e => {
        handleChange && handleChange(ID, Key, e.target.checked, Type);
      }} 
    />
  }
  return <TextInput {...props} value={Value} onChange={e => {
    handleChange && handleChange(ID, Key, Type ===  'number' ? parseInt(e.target.value) : e.target.value, Type)
  }}  />
}
 
const StateDrawer = ({open, state = [], handleClose, handleChange, handleDrop }) => {
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState('');
  const args = {
    size: 'small',
    autoComplete: 'off',
    sx: { mr: 1 }
  };

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
        
        {visible.map(item => <Flex sx={{mb: 1}}>

          {/* state property name  */}
          <Stack>
            {/* <Typography>Key</Typography> */}
            <TextInput {...args} value={item.Key}  label="Key" onChange={e => {
              handleChange && handleChange(item.ID, e.target.value, item.Value, item.Type)
            }} />
          </Stack>  

          <Stack>
            {/* <Typography>Type</Typography> */}
            <QuickSelect options={['string', 'object', 'array', 'number', 'boolean']}
            label="Type"
                value={item.Type || 'string'} onChange={value => {
                  handleChange && handleChange(item.ID, item.Key, item.Value, value)
                }} />
          </Stack>

          {/* state property value  */}
          <Stack>
            {/* <Typography>Value</Typography> */}
            <StateValue {...args} {...item} handleChange={handleChange}  />
          </Stack>

          <Box>
            <IconButton onClick={() => handleDrop && handleDrop(item.ID)}>
              <Delete />
            </IconButton>
          </Box>
    
        </Flex>)}

      </Grid>


      <Grid item xs={6}>
        <Card sx={{p: 2, m: 1, minHeight: '25vh'}}>
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
