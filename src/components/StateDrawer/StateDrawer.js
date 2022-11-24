import React from 'react';
import { styled, Box, IconButton, Drawer, TextField,
 Divider, Typography, Stack, Grid, Card } from '@mui/material';
import {  Flex, Spacer, TextBtn } from '..';
import { Close, Add, Delete } from "@mui/icons-material";
import { getStyles } from '../library/util';
import { PopoverInput } from '../Control/Control';
import { Json } from '../../colorize';
 
const Layout = styled(Box)(({ theme }) => ({
 padding: theme.spacing(2),
 minHeight: '40vh'
}));
 
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


  const props = getStyles(state)
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

          <Stack>
            <Typography>Key</Typography>
            <TextField {...args} value={item.Key} onChange={e => {
              handleChange && handleChange(item.ID, e.target.value, item.Value)
            }} />
          </Stack>  
          <Stack>
            <Typography>Value</Typography>
            <TextField {...args} value={item.Value} onChange={e => {
              handleChange && handleChange(item.ID, item.Key, e.target.value)
            }}  />
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
