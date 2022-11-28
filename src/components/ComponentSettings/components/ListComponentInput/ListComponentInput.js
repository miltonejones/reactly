import React from 'react';
import { styled, Box, Button, Typography,  Stack, Collapse } from '@mui/material';
import { Close, Add, Delete, Save, Settings } from "@mui/icons-material"; 
import { TextInput, Text, Flex, Spacer, TextBtn, PopoverInput, QuickSelect, TinyButton } from '../../..';
import { getMax } from '../../../library/util';
import { IconComponentInput } from '..';

import { AppStateContext } from '../../../../hooks/AppStateContext';

  
 
const ListComponentInput = ({
  handleChange,
  value,
  type
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
        value: word,
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
      type={type}
      key={f.text}/>)}
     </Stack>
   </Box>
 );
}

function ListOption ({ 
  type,
  text, subtext, ID , 
  startIcon,
      endIcon,
      value,
    expanded, onUpdate, onExpand, onDelete}) {
  const [optionValue, setValue] = React.useState({
    text,
    subtext,
    startIcon,
    endIcon,
    value
  });

  const handleTextChange = f => e => {
    setValue(s => ({...s, [f]: e.target.value})) 
  } 
  const handlePropChange = f => e => {
    setValue(s => ({...s, [f]: e })) 
  } 
  return <>
  <Flex sx={{p: 1, borderBottom: type == 'valuelist' ? 0 : 1, borderColor: 'divider'}} 
        >
          <Stack>

          {expanded && type == 'valuelist' && <Text small>Option label</Text>}
          {expanded 
            ?   <TextInput onChange={handleTextChange('text')} size="small" placeholder="Text" value={optionValue.text} />
          :  <Typography variant="caption"> {text}</Typography>}
      

            
          </Stack>
        

         <Spacer />
        <TinyButton onClick={() => {
          if (expanded) {
            return onUpdate(ID, optionValue);
          }
          onDelete(ID);
        }} icon={expanded ? Save : Delete} />
        <TinyButton onClick={() => onExpand(ID)} icon={Settings} />
        </Flex>

        <Collapse in={expanded && type !== 'valuelist'}>
          <Stack sx={{pl: 1}}>

            {type !== 'menulist' && <TextInput sx={{mb: 1}} onChange={handleTextChange('subtext')} 
                value={optionValue.subtext} size="small" placeholder="Subtext" />}

            <IconComponentInput value={optionValue.startIcon} sx={{mb: 1}} onChange={handlePropChange('startIcon')}  label="Start Icon"/>

            {type !== 'menulist' && <IconComponentInput value={optionValue.endIcon} sx={{mb: 1}} onChange={handlePropChange('endIcon')}  label="End Icon"/>}
          </Stack>
        </Collapse> 
        <Collapse in={expanded && type === 'valuelist'}>
          <Stack sx={{pl: 1}}>
           {/* <pre>
           {JSON.stringify(optionValue,0,2)}
           </pre> */}
           <Text small>Option value</Text>
            <TextInput sx={{mb: 1}} onChange={handleTextChange('value')} 
                value={optionValue.value} size="small" placeholder="value" />

           </Stack>
        </Collapse> 
  </>
}


ListComponentInput.defaultProps = {};
export default ListComponentInput;
