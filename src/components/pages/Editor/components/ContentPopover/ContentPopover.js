import React from 'react';
import { styled, Box, IconButton , Divider, Popover} from '@mui/material';
import { Text } from '../../../..';
import { BorderButton } from '../../styled';
 
const Layout = styled(Box)(({ theme, width = 400 }) => ({
 padding: theme.spacing(2),
 minHeight: 400,
 maxHeight: 500,
 width,
}));
 
const ContentPopover = ({
  icon: Icon, 
  title, 
  label,
  width = 400, 
  control: Control = BorderButton , 
  children, 
  ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);;

  const handlePopoverClose = () => setAnchorEl(null);

  const handlePopoverClick = (event) => { 
    setAnchorEl(event.currentTarget);
  };
 

 return (
   <> 
  <Control { ...props} active={!!anchorEl} onClick={handlePopoverClick}>
    {!!Icon && <Icon />}
    {label}
  </Control>
  <Popover 
    open={!!anchorEl}
    anchorEl={anchorEl}
    onClose={handlePopoverClose} 
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
  >
    <Layout width={width}>
      {!!title && <>
        <Text small active>{title}</Text>
        <Divider sx={{mb:1}} />
      </>}
      {children}
    </Layout>

  </Popover>

   </>
 );
}
ContentPopover.defaultProps = {};
export default ContentPopover;
