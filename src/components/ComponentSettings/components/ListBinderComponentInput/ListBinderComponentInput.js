import React from 'react';
import { styled, Box } from '@mui/material';
import {  Flex, Spacer, TextBtn, QuickSelect } from '../../..';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const ListBinderComponentInput = ({ 
  header,
  value,
  handleChange,
  resources, 
  bindableProps 
}) => {
  const object = !!value && typeof(value) === 'string'
    ? JSON.parse(value)
    : value
  const [state, setState] = React.useState( object || {
    resourceID: null,
    bindings: {

    }
  })

  const resource = resources.find(f => f.ID === state.resourceID);
 return (
   <Layout data-testid="test-for-ListBinderComponentInput">

     {header}

    <QuickSelect value={resource?.name} options={resources.map(f => f.name)} onChange={value => {
      const res = resources.find(f => f.name === value);
      if (!res) return;
      setState(s => ({...s, resourceID: res.ID}))
    }}/>
 

     {!!resource && bindableProps?.map(prop => <Box sx={{mt: 1}} key={prop} >
      <QuickSelect
        value={state.bindings[prop]}
        onChange={value => {
          setState(s => ({
            ...s,
            bindings: {
              ...s.bindings,
              [prop]: value
            }
          }))
        }}
        options={resource.columns} 
        label={`Set binding for ${prop}`}/>
     </Box>)}

     <TextBtn  onClick={() => handleChange(state) }>save</TextBtn>
        
   </Layout>
 );
}
ListBinderComponentInput.defaultProps = {};
export default ListBinderComponentInput;
