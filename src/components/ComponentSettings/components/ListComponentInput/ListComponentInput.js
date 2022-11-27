import React from 'react';
import { styled, Box, Button, Typography,  Stack, Collapse } from '@mui/material';
import { Close, Add, Delete, Save, Settings } from "@mui/icons-material"; 
import { TextInput, Flex, Spacer, TextBtn, PopoverInput, QuickSelect, TinyButton } from '../../..';
import { getMax } from '../../../library/util';
import { IconComponentInput } from '..';

import { AppStateContext } from '../../../../hooks/AppStateContext';

  
 
const ListComponentInput = ({
  handleChange,
  value
}) => {
  
 
  const { Confirm  } = React.useContext(AppStateContext);

  const parsed = typeof value === 'string' 
    ? JSON.parse(value)
    : value;
    
  const [expanded, setExpanded] = React.useState([]);
  const [listItems, setListItems] = React.useState(parsed || []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleAliasOpen = event => {
    setAnchorEl(event.currentTarget)
  } 

  const handleAliasClose = event => {
    setAnchorEl(null)
  } 

  const expand = ID => {
    setExpanded(f => f.indexOf(ID) > -1 
      ? f.filter(e => e !== ID)
      : f.concat(ID))
  }

  const dropListItem = async (ID) => {
    const ok = await Confirm('Delete list item?');
    if (!ok) return;

    const msg = listItems.filter(f => f.ID !== ID);

    setListItems(msg);
    handleChange(msg)
  }

  const updateListItemText = (ID, value) => {
    const msg = listItems.map(f => f.ID === ID ? {...f, ...value} : f);
    setListItems(msg);
    handleChange(msg)
  }

  const addListItem = (text) => {
 
    const maxID = getMax(listItems.map(f => f.ID)); 
    const items = []
    const rows = text.split(',').map((word, e) => { 
      return items.push({
        ID: isNaN(maxID) ? 1 : (maxID + 1 + e),
        text: word, 
        startIcon: null,
        endIcon: null,
        subtext: null
      })
    })

    const msg = listItems.concat(items) 

    setListItems(msg);
    handleChange(msg)
  }




 return (
   <Box data-testid="test-for-ListComponentInput">
      <Flex>
        <Spacer />

      <TextBtn onClick={handleAliasOpen} endIcon={<Add />}>Add list item</TextBtn>

      </Flex>
      <PopoverInput label="Enter list item text:" 
    onChange={value => {
      if (!value) return handleAliasClose();  
      addListItem(value)
     handleAliasClose();
    }} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>

     <Stack sx={{borderBottom: 1, borderColor: 'divider'}}>
      {listItems.map(f => <ListOption {...f} 
      onExpand={expand}
      expanded={expanded.indexOf(f.ID) > -1}
      onDelete={dropListItem} 
      onUpdate={updateListItemText}
      key={f.text}/>)}
     </Stack>
   </Box>
 );
}

function ListOption ({ text, subtext, ID , 
      startIcon,
      endIcon,
    expanded, onUpdate, onExpand, onDelete}) {
  const [value, setValue] = React.useState({
    text,
    subtext,
    startIcon,
    endIcon,
  });

  const handleTextChange = f => e => {
    setValue(s => ({...s, [f]: e.target.value})) 
  } 
  const handlePropChange = f => e => {
    setValue(s => ({...s, [f]: e })) 
  } 
  return <>
  <Flex sx={{p: 1, borderBottom: 1, borderColor: 'divider'}} 
        >
          {expanded 
            ?   <TextInput onChange={handleTextChange('text')} size="small" placeholder="Text" value={value.text} />
          :  <Typography variant="caption"> {text}</Typography>}
      

        

         <Spacer />
        <TinyButton onClick={() => {
          if (expanded) {
            return onUpdate(ID, value);
          }
          onDelete(ID);
        }} icon={expanded ? Save : Delete} />
        <TinyButton onClick={() => onExpand(ID)} icon={Settings} />
        </Flex>

        <Collapse in={expanded}>
          <Stack sx={{pl: 1}}>
            <TextInput sx={{mb: 1}} onChange={handleTextChange('subtext')} value={value.subtext} size="small" placeholder="Subtext" />

            <IconComponentInput value={value.startIcon} sx={{mb: 1}} onChange={handlePropChange('startIcon')}  label="Start Icon"/>
            <IconComponentInput value={value.endIcon} sx={{mb: 1}} onChange={handlePropChange('endIcon')}  label="End Icon"/>
          </Stack>
        </Collapse> 
  </>
}


ListComponentInput.defaultProps = {};
export default ListComponentInput;
