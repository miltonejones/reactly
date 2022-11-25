import React from 'react';
import { styled, Box, IconButton, Drawer, TextField,
 Divider, Typography, Stack, Grid, Card, Switch } from '@mui/material';
import {  Flex, Spacer, TextBtn, QuickSelect } from '..';
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
  return <TextField {...props} value={Value} onChange={e => {
    handleChange && handleChange(ID, Key, e.target.value, Type)
  }}  />
}
 
const StateDrawer = ({open, state = [], handleClose, handleChange, handleDrop }) => {
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


  const props = objectReduce(state)
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

    <Grid container>

    <Grid item xs={6}>
        
        {state.map(item => <Flex sx={{mb: 1}}>

          {/* state property name  */}
          <Stack>
            <Typography>Key</Typography>
            <TextField {...args} value={item.Key} onChange={e => {
              handleChange && handleChange(item.ID, e.target.value, item.Value, item.Type)
            }} />
          </Stack>  

          <Stack>
            <Typography>Type</Typography>
            <QuickSelect options={['string', 'object', 'array', 'boolean']}
                value={item.Type || 'string'} onChange={value => {
                  handleChange && handleChange(item.ID, item.Key, item.Value, value)
                }} />
          </Stack>

          {/* state property value  */}
          <Stack>
            <Typography>Value</Typography>
            <StateValue {...args} {...item} handleChange={handleChange}  />
          </Stack>

          <Box>
            <IconButton sx={{mt: 3}} onClick={() => handleDrop && handleDrop(item.ID)}>
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
