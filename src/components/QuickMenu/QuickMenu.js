import React from 'react';
import { styled, Box, Divider, Typography, MenuItem } from '@mui/material';
import { AppStateContext } from '../../hooks/AppStateContext';
import { AU, TinyButton, Flex, OptionSwitch } from '..';
import { ExpandMore } from "@mui/icons-material";
 
 
const QuickMenu = ({ 
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
  onChange 
}) => {

const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl) || !!input;
const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = (value) => {  
  setAnchorEl(null);
  onChange && onChange(value)
}; 
const { MenuComponent, menuPos } = React.useContext(AppStateContext);

return <>


<AU style={{marginRight: 4}} small={small}
  active={open ? 1 : 0} error={error || open ? 1 : 0} onClick={handleClick}
  >
    {!!LabelIcon && <TinyButton icon={LabelIcon}  sx={{mr: 1}}/>}
    {label || 'Choose'}</AU> 
{!!caret && <TinyButton onClick={handleClick} icon={ExpandMore} deg={open ? 180 : 0} />}

<MenuComponent  
  anchorEl={anchorEl || input}
  anchor={menuPos}
  open={open}
  onClose={() => handleClose()} 
> 

{/* menu title  */}
  {!!title && <Flex sx={{m: t => t.spacing(1,0)}}><Divider sx={{width: '100%'}}><Typography variant="caption">{title}</Typography></Divider></Flex>}

{/* when only 2 options use a Switch  */}
  {/* {options?.length === 2 && <Box sx={{m: 2, minWidth: 300}}>
    <OptionSwitch
    options={options}
    value={selected}
    onChange={handleClose}
  />

    </Box>}
 */}


{/* otherwise make a menu item list  */}
  {options?.map ((option, index) => {
    const Icon = icons[index];
    return option === '-'  ? <Divider /> : <MenuItem key={option} onClick={() => handleClose(option)}
    sx={{fontWeight: selected === option ? 600 : 400, minWidth: 300}}
    >{!!Icon && <><Icon sx={{mr: 1}} /></>}{selected === option && <>&bull;{" "}</>}{option}</MenuItem>
  })} 


</MenuComponent>
</>

}


QuickMenu.defaultProps = {};
export default QuickMenu;
