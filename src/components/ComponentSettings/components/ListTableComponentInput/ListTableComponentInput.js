import React from 'react';
import { Typography, TextField, styled, Grid, Box, Stack } from '@mui/material';
import { Flex, Spacer, TextBtn, QuickSelect, Text, Tiny } from '../../..';
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material"; 

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

  const [fields, setFields] = React.useState([])
  const object = !!value && typeof(value) === 'string'
    ? JSON.parse(value)
    : value
  const [state, setState] = React.useState( object || {
    resourceID: null,
    bindings: {

    }
  });

  const addProp = name => {
    setFields (f => f.indexOf(name) > -1 
      ? f.filter(e => e !== name)
      : f.concat(name));

    const exists = state.bindings[name];
    
     setState(s => ({
      ...s,
      bindings: {
        ...s.bindings,
        [name]: exists ? '' : name
      }
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
        <Typography variant="caption">Available Fields</Typography>
        <Grid container sx={{mt: 0.5}} spacing={1}>

        <Grid item xs={5}>
            <Text small active>Name</Text>
          </Grid>
          
          <Grid item xs={7}>
            <Text small active>Label</Text> 
          </Grid>
          
        {resource?.columns.map(col => {
          const active = colnames.indexOf(col) > -1 || fields.indexOf(col) > -1 ;


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

            <TextField 
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
 

        <Flex sx={{mt: 2}}>
          <Spacer />

          <TextBtn variant="contained" onClick={() => handleChange(state) }>save</TextBtn>
        </Flex>
 {/* [   <pre>
      {JSON.stringify(resource,0,2)}
    </pre>] */}
   </Layout>
 );
}
ListTableComponentInput.defaultProps = {};
export default ListTableComponentInput;
