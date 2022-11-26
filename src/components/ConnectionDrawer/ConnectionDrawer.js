import React from 'react';
import { styled, Box, IconButton, Drawer, TextField,
  Divider, Typography, Stack, Grid, Card, Switch } from '@mui/material';
import {  Flex, Spacer, TextBtn ,QuickSelect, QuickMenu, TextBox, PillMenu} from '..';
import { Close, Add, AutoStories, Delete, Save, CheckCircleOutline, CheckCircle } from "@mui/icons-material";  
import { Json } from '../../colorize';
 
const Layout = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '40vh'
}));
 
 
const Bar = styled(Box)(({ theme, active }) => ({
  display: 'flex',
  gap: theme.spacing(1) ,
  alignItems: 'center',
  borderBottom: 'solid 1px gray',
  maxWidth: 400,
  padding: theme.spacing(0.5, 0),
  fontWeight: active? 600 : 400,
  cursor: 'pointer'
}));
 
const ConnectionDrawer = ({ open, resources = [], connections = [], handleDrop, handleClose, handleChange }) => {
  const [selected, setSelected] = React.useState({})
  const [terms, setTerms] = React.useState({});
  const [root, setRoot] = React.useState(null)
  const [answer, setAnswer] = React.useState(null)
  const [fields, setFields] = React.useState([])
  const { ID, connectionID, path, format, method, values, columns, node } = selected;

  
  const test = async () => {
    const connection = connections.find(f => f.ID === connectionID);
    const url = new URL(path, connection.root);
    const qs = Object.keys(terms).map(t => `${t}=${terms[t]}`).join('&');
    const endpoint = `${url}?${qs}`;


    const response = await fetch(endpoint); 
    const json = await response.json();
    setAnswer(json);
    
  }

  const addProp = name => {
    setFields (f => f.indexOf(name) > -1 
      ? f.filter(e => e !== name)
      : f.concat(name));
  }
 return (
  <Drawer open={open} anchor="bottom">
   <Layout data-testid="test-for-ConnectionDrawer">
   <Flex>
      <Typography variant="subtitle1">
        <b>Data Resources</b>
      </Typography>
      
      <QuickMenu options={['Add Connection', 'Add Resource']} label={<TextBtn endIcon={<Add />}>Add</TextBtn>}/>

      {/* <TextBtn endIcon={<Add />}>Add</TextBtn> */}
      <Spacer />
      <IconButton  onClick={handleClose}>
        <Close />
      </IconButton>
    </Flex>
    <Divider />
    

    <Grid container>
      
      <Grid item xs={3} sx={{pt: 3, pl: 2, borderRight: 1, borderColor: 'divider'}}>
        <Typography variant="caption"><b>Saved Resources</b></Typography>
        {resources.map(s => <Bar
        active={s.ID === ID}
         ><AutoStories /> <Typography
         sx={{fontWeight: s.ID === ID ? 600 : 400}}
         onClick={() => setSelected(s)}  >{s.name}</Typography>
         <Spacer />
         <Delete  onClick={() => handleDrop && handleDrop(s.ID)} /> 
         </Bar>)}
{/* 
         <pre>
      {JSON.stringify(connections,0,2)}
     </pre>
     <pre>
      {JSON.stringify(resources,0,2)}
     </pre> */}
      </Grid>

      {!!ID && <Grid item xs={3} sx={{pt: 3, pl: 1, pr: 1, borderRight: 1, borderColor: 'divider'}}> 
         <Stack>
            <Typography variant="h6">{selected.name}</Typography>
            <Divider  sx={{mb: 2}}/>
            <Typography variant="caption">Path</Typography>
            <TextField sx={{mb: 2}} value={path} size="small" />
            <Flex sx={{mb: 3}}>
              <Typography>Format</Typography> 
            <PillMenu options={['rest', 'querystring']} value={format} />
              {/* <Typography>Method</Typography>  */}
              <QuickSelect label="Method" options={['GET','POST','PUT','DELETE',]}
                value={method}/>  
            </Flex>

            <Grid spacing={2} container>

              <Grid item xs={12}>
                <Typography variant="caption"><b>Query String Values</b></Typography>
                <Divider  sx={{mb: 2}}/>
              </Grid>

              <Grid item xs={3}>
                <Typography variant="caption"><b>Key</b></Typography>
              </Grid>

              <Grid item xs={9}>
                <Typography variant="caption"><b>Value</b></Typography>
              </Grid>

              {values?.map(prop => <>
                <Grid item xs={3}>
                  {prop.key}
                </Grid>
                <Grid item xs={9}>
                  <TextField sx={{mb: 2}} value={terms[prop.key]} 
                  autoComplete="off"
                    onChange={e => {
                      setTerms(s => ({...s, [prop.key]: e.target.value}))
                    }}
                  size="small" />
                </Grid>
              </>)}
              <Grid item xs={12}>
                <TextBtn onClick={test} variant="contained" color="warning">Test</TextBtn>
                {/* {JSON.stringify(terms)} */}
              </Grid>
              <Grid item>
                {fields.join(', ')}
              </Grid>
            </Grid>
         </Stack>
      </Grid>}

      <Grid xs={!!root ? 2 : 6} item sx={{pl: 1}}>

        {!!answer && <>

          <Typography sx={{mt: 2, pt: 2, pl: 1}} variant="caption"><b>Choose response node:</b></Typography>
                <Divider  sx={{mb: 2}}/>


          {Object.keys(answer).map(key => <Bar 
          onClick={() => setRoot(key)}
          active={root === key} sx={{p:1}} key={key}> 
            {key}

            </Bar>)}
        </>}
{/* 
       <Box sx={{ maxHeight: 'calc(70vh - 100px)', overflow: 'auto'}}>


       {!!answer && <Json>
            {JSON.stringify(answer, 0, 2)}
          </Json>}

       </Box> */}
      </Grid>

      {!!root && answer[root] && typeof answer[root] === 'object' && <Grid
      
      sx={{ maxHeight: 'calc(70vh - 100px)', overflow: 'auto', pl: 2}}
      item xs={4}>
        
        <Typography sx={{mt: 2, pt: 2, pl: 1}} variant="caption"><b>Choose fields:</b></Typography>
                <Divider  sx={{mb: 2}}/>
          
          {Object.keys(answer[root][0]).map(key => <Bar key={key}
            onClick={() => addProp(key)}
            active={fields.indexOf(key) > -1}
            >
              {fields.indexOf(key) > -1 ? <CheckCircle /> : <CheckCircleOutline />}
            {key}
          </Bar>)}
        </Grid>}

    </Grid>



   </Layout>
   </Drawer>
 );
}
ConnectionDrawer.defaultProps = {};
export default ConnectionDrawer;
