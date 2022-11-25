import React from 'react';
import { styled, Box , Stack, Card, TextField} from '@mui/material';
import Library from '../../../library'
import { Flex } from '../../..'
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1),
 display: 'flex',
 minWidth: 580
}));
 
const ComponentModal = ({ onChange }) => {
  const [state, setState] = React.useState({
    selected: null,
    name: null
  });
  const { selected, name } = state;
  
  const select = key => {
    const datum = {...state , selected: key}
    setState(datum);
    onChange(datum)
  }
  const rename = e => {
    const datum = {...state , name: e.target.value}
    setState(datum);
    onChange(datum)
  }
 return (
   <Layout data-testid="test-for-ComponentModal">
    <Stack>

    <Flex wrap>

    {Object.keys(Library).map(icon => {
      const Icon = Library[icon].Icon;
      return <Card 
        onClick={() => select(icon)} sx={{cursor: 'pointer', p: 2, mr: 1,  mb: 1, 
            minWidth: 80, outline: selected === icon ? 'solid 2px red' : ''}} key={icon}>
     <Flex>
     <Icon /> {icon}
     </Flex>
    </Card>
    })}

    </Flex>
    <TextField size="small" value={name} label="Component Name" onChange={rename}/>
    </Stack>
   </Layout>
 );
}
ComponentModal.defaultProps = {};
export default ComponentModal;
