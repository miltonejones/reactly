import React from 'react';
import { Stack, Box } from '@mui/material';
import { LibraryItem } from '../../styled';
import { useReactly } from '../../../../../hooks';
import { AppStateContext } from '../../../../../context'; 
import { Search, Close } from "@mui/icons-material";
import { Icons } from "../../../../library/icons";


import { 
  Text,    
  TextInput, 
  TinyButton
} from "../../../..";
  
 
const ComponentItem = ({ item, icon: Icon, onChange }) => { 
  return <LibraryItem onClick={() => onChange(item)}>
    <Icon />
    <Text tiny>{item.substr(0,12).replace(/([A-Z])/g, " $1")}</Text>
  </LibraryItem>
}

const ComponentList = ({ componentID }) => {
  const reactly = useReactly();
  const [filter, setFilter] = React.useState('');
  const {  
    Library, 
  } = React.useContext(AppStateContext);
  const libraryKeys = Object.keys(Library)
    .filter(f => !Library[f].hidden)
    .sort((a,b) => a > b ? 1 : -1);
 
  return <Stack spacing={1}>
    <TextInput
      value={filter}
      onChange={e => setFilter(e.target.value)}
      buttons={
        <TinyButton icon={!!filter ? Close : Search} onClick={() => setFilter('')} />
      }
      label="Filter"
      size="small"
      fullWidth
      autoFocus
      autoComplete="off"
    />
    <Box sx={{height: 400, pr: 1, overflowX: 'hidden', overflowY: 'auto'}}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
        pt: 1, 
      }}>
        {libraryKeys
        .filter(f => !filter || f.toLowerCase().indexOf(filter.toLowerCase()) > -1)
        .map(key => <ComponentItem icon={Icons[Library[key].Icon]} onChange={(item) => reactly.quickComponent(item, componentID)} item={key} key={key}/>)}
      </Box>
    </Box>
  </Stack>
}
ComponentList.defaultProps = {};
export default ComponentList;
