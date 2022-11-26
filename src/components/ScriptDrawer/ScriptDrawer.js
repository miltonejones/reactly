import React from 'react';
import { styled, Box, IconButton, Drawer, TextField,
  Divider, Typography, Stack, Grid, Card, Switch } from '@mui/material';
import {  Flex, Spacer, TextBtn , TextBox} from '..';
import { Close, Add, Code, Delete, Save } from "@mui/icons-material"; 
import { PopoverInput } from '../Control/Control';
 
const Layout = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '40vh'
}));
 
const Bar = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  gap: theme.spacing(1) ,
  alignItems: 'center',
  borderBottom: 'solid 1px gray',
  width: 400,
  padding: theme.spacing(0.5, 0),
  fontWeight: active? 600 : 400,
  cursor: 'pointer'
}));
 
const ScriptDrawer = ({ open, scripts = [], handleDrop, handleClose, handleChange }) => {

  const [selected, setSelected] = React.useState({})
  const [dirty, setDirty] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { ID, name, code } = selected;

  const handleAliasOpen = event => {
    setAnchorEl(event.currentTarget)
  } 

  const handleAliasClose = event => {
    setAnchorEl(null)
  } 

 return (

  <Drawer open={open} anchor="bottom">
   <Layout data-testid="test-for-ScriptDrawer">
    <Flex>
      <Typography variant="subtitle1">
        <b>Client scripts</b>
      </Typography>
      <TextBtn onClick={handleAliasOpen} endIcon={<Add />}>Add</TextBtn>
      <Spacer />
      <IconButton  onClick={handleClose}>
        <Close />
      </IconButton>
    </Flex>
    <Divider />
    

    <Grid container>
      <Grid item xs={6} sx={{pt: 3, pl: 2}}>
        <Typography variant="caption"><b>Available scripts</b></Typography>
        {scripts.map(s => <Bar
        active={s.ID === ID}
         ><Code /> <Typography
         sx={{fontWeight: s.ID === ID ? 600 : 400}}
         onClick={() => setSelected(s)}  >{s.name}</Typography>
         <Spacer />
         <Delete  onClick={() => handleDrop && handleDrop(s.ID)} /> 
         </Bar>)}

      </Grid>

      <Grid item xs={6}> 
        {<TextBox 
          value={code} 
          disabled={!name}
          multiline
          fullWidth
          rows={10}
          onChange={e => {
            setSelected(s => ({...s, code: e.target.value }))
            setDirty(true);
            }} />}

        <Flex>
          <Spacer />
          <TextBtn onClick={() => {
          setSelected( {code: ''} )
        }}  > 
          cancel
        </TextBtn>
          <TextBtn onClick={() => {
            setDirty(false);
          handleChange( ID, name, code)
        }} endIcon={<Save />} 
          variant="contained"
          disabled={!selected.code || !dirty}
          > 
          save script
        </TextBtn>
        </Flex>
      </Grid>

    </Grid>

    {/* {JSON.stringify(scripts)} */}
   </Layout>

   <PopoverInput label="Add a client script" 
    onChange={value => {
      if (!value) return handleAliasClose();  
      const scr = `// script "${value}"
function ${camelize(value)} (page, options) {
  const { state, setState } = options; 
  // add your code here
}
`
      handleChange && handleChange(null, value, scr)
      handleAliasClose();
    }} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>


  </Drawer>
 );
}
ScriptDrawer.defaultProps = {};
export default ScriptDrawer;


function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

