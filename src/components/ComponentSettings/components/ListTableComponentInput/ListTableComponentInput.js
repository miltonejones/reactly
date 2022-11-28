import React from 'react';
import { Typography, Collapse, styled, Grid, Box, Stack } from '@mui/material';
import { Flex, Spacer, TextBtn, TextInput, QuickSelect, Text, Tiny } from '../../..';
import { CheckCircle, Save, CheckCircleOutline } from "@mui/icons-material";  

const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const Check = ({ on }) => <Tiny icon={on ? CheckCircle : CheckCircleOutline} />

const ListTableComponentInput = ({ 
  header,
  value,
  handleChange,
  resources 
}) => {  
  const [terms, setTerms] = React.useState({});
  const [fields, setFields] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const object = !!value && typeof(value) === 'string'
    ? JSON.parse(value)
    : value
  const [state, setState] = React.useState( object || {
    resourceID: null,
    bindings: {

    }
  });

  const previewConnectionRequest = async () => { 
    const qs = Object.keys(terms).map(t => `${t}=${terms[t]}`).join('&');  
    // handleComponentRequest (qs, resource) 
  }

  const addProp = name => { 
    setFields (f => f.indexOf(name) > -1 
      ? f.filter(e => e !== name)
      : f.concat(name));

    const exists = state.bindings[name];

    const bindings = state.bindings;
    
    if (exists) {
      delete bindings[name]
    } else {
      Object.assign(bindings, {[name]: name})
    }
    
     setState(s => ({
      ...s,
      bindings 
    }))
       
  }


  const resource = resources.find(f => f.ID === state.resourceID);

  const colnames = Object.keys(state.bindings);


 return (
   <Layout data-testid="test-for-ListTableComponentInput">

      {header}

      <QuickSelect value={resource?.name} options={resources.map(f => f.name)} onChange={value => {
        const res = resources.find(f => f.name === value);
        if (!res) return;
        setState(s => ({...s, resourceID: res.ID}))
      }}/>

      <Box sx={{mt: 2}}>
        <Text small variant="caption">Available Fields</Text>
        <Grid container sx={{mt: 0.5}} spacing={1}>

        <Grid item xs={5}>
            <Text small active>Name</Text>
          </Grid>
          
          <Grid item xs={7}>
            <Text small active>Label</Text> 
          </Grid>
          
        {resource?.columns.map(col => {
          const active = colnames.indexOf(col) > -1  ;


          return <>
          
          
          <Grid item xs={5} key={col} >
              <Flex >
                <Check on={active} />
                <Text small onClick={() => addProp(col)}
                  sx={{fontWeight: active ? 600 : 400 }}>

                {col}
                </Text>
              </Flex>
        
          </Grid>
            <Grid item xs={7}>

            <TextInput 
            disabled={!active}
              value={state.bindings[col]}
             onChange={e => {
              setState(s => ({
                ...s,
                bindings: {
                  ...s.bindings,
                  [col]: e.target.value
                }
              }))
            }}

            size="small" placeholder={`Label for ${col}`}/>

            </Grid>
                </> 
        })}

      </Grid>

      </Box>
 

      {/*  */}
        <Flex sx={{mt: 2}}>
          {/* <TextBtn color="warning" variant="contained" onClick={() => setOpen(!open) }>test</TextBtn> */}
          <Spacer />

          <TextBtn endIcon={<Save />} variant="contained" onClick={() => handleChange(state) }>save</TextBtn>
        </Flex>
        <Collapse sx={{mt: 2}} in={open}>
          <Text small>Set values</Text>
          <Grid container>
             
          {resource?.values.map(b => <>
            <Grid item xs={5}>
            <Text sx={{pt:1, textAlign: 'right'}} small>{b.key}</Text>
            </Grid>
            <Grid item xs={7}>
            <TextInput size="small" placeholder={`value for ${b.key}`} 
               value={terms[b.key]} 
              onChange={e => {
                setTerms(s => ({...s, [b.key]: e.target.value}))
              }}
              />
            </Grid>
          </>)}
          </Grid>
          <Flex sx={{mt: 1}}>
            <Spacer />

          <TextBtn variant="contained" onClick={() => previewConnectionRequest() }>send request</TextBtn>
          </Flex>
        </Collapse>
 {/* [   <pre>
      {JSON.stringify(resource,0,2)}
    </pre>] */}
   </Layout>
 );
}
ListTableComponentInput.defaultProps = {};
export default ListTableComponentInput;
