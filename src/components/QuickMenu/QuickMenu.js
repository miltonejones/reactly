import React from 'react';
import { styled, Box, Divider, Typography, Stack, Menu, MenuItem } from '@mui/material';
import { AppStateContext } from '../../context';
import { AU, TinyButton, TextInput, Tiny, Flex, OptionSwitch, Text } from '..';
import { ExpandMore, Close, Delete } from "@mui/icons-material";
 
 
export const DeleteConfirmMenu = ({message, hidden, small,
  title="Confirm Delete",
  subtitle="This action cannot be undone.",
  onDelete, ...props}) => <QuickMenu  small
  { ...props}
  title={title}
  options={[<Stack sx={small ? {} : { lineHeight: 1 }}>
    <Text>{message}</Text>
    <Text error active small>{subtitle}</Text>
  </Stack>]} 
  label={ <Tiny icon={Delete} hidden={hidden} />}
  onChange={onDelete} /> 

const QuickMenu = (props) => {
const { 
  label, 
  error, 
  title,
  small,
  value: selected = '', 
  caret, 
  icons = [], 
  options, 
  input,
  icon: LabelIcon,
  onChange ,
  onOpen,
  allowFind,
  maxItems,
  hover,
  emptyMsg = '[Empty menu]',
  persist
} = props;
const [filter, setFilter] = React.useState(null);
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl) || !!input;
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
  onOpen && onOpen(event)
};
const handleClose = (value, open) => {  
  !open && setAnchorEl(null);
  onChange && onChange(value)
};  

const equals = (source, dest) => {
  if (typeof source === 'object') {
    try {
      return source.indexOf(dest) > -1
    } catch (e) {
      return false
    }
  }
  if (['string', 'number'].some(f => typeof(source) === f)) {
    return  !!source && source === dest;
  }
  return false;
}
const rows = options?.filter(f => !filter || f.toLowerCase().indexOf(filter.toLowerCase()) > -1)
const visible = !maxItems ? rows : rows.slice(0, maxItems)


return <>


<AU {...props} small={small}  hover={hover}
  active={open ? 1 : 0} error={error || open ? 1 : 0} onClick={handleClick}
  >
    {!!LabelIcon && <TinyButton icon={LabelIcon}  sx={{mr: 1}}/>}
    {label || 'Choose'}</AU> 
{!!caret && <TinyButton onClick={handleClick} icon={ExpandMore} deg={open ? 180 : 0} />}

<Menu  
dense
  anchorEl={anchorEl || input} 
  open={open}
  onClose={() => handleClose()} 
> 

{/* menu title  */}
  {!!title && typeof title === 'string' && <Flex sx={{m: t => t.spacing(1,0)}}
    ><Divider textAlign="left" sx={{width: '100%'}}><Typography variant="caption">{title}</Typography></Divider></Flex>}
 

{!options.length && <MenuItem>{emptyMsg}</MenuItem>}

{!!allowFind && <MenuItem onKeyDown={(e) => e.stopPropagation()}>
        <TextInput
         onKeyDown={(e) => e.stopPropagation()}
        size="small"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          buttons={
            filter?.length ? <TinyButton icon={Close} onClick={() => setFilter('')}/> : null
          }
            label={"Filter Options"}
        />
    </MenuItem>}

{/* otherwise make a menu item list  */}
  {visible?.map ((option, index) => {
    const Icon = icons[index];
    return option === '-'  ? <Divider /> : <MenuItem key={option} onClick={() => handleClose(option, persist)}
    sx={{fontWeight: equals(selected, option) ? 600 : 400, minWidth: 300}}
    >{!!Icon && <><Icon sx={{mr: 1}} /></>}{equals(selected, option)   && <>&bull;{" "}</>}{
      option
    }</MenuItem>
  })} 
 
{ !!options.length && !!allowFind && !filter && <MenuItem>
 <Text small active> {options?.length - visible?.length} more...</Text>
</MenuItem>}


</Menu>
</>


}


QuickMenu.defaultProps = {};
export default QuickMenu;
