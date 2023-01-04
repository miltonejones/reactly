import React from 'react';
import { styled, Box, IconButton , Divider, Popover} from '@mui/material';
import { Text } from '../../../..';
import { BorderButton } from '../../styled';
 
const Layout = styled(Box)(({ theme }) => ({
 padding: theme.spacing(2),
 width: 400,
}));
 
const ContentPopover = ({ icon: Icon, title, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);;

  const handlePopoverClose = () => setAnchorEl(null);

  const handlePopoverClick = (event) => { 
    setAnchorEl(event.currentTarget);
  };
 

 return (
   <>
  <BorderButton active={!!anchorEl} onClick={handlePopoverClick}>
    <Icon />
  </BorderButton>
  <Popover 
    open={!!anchorEl}
    anchorEl={anchorEl}
    onClose={handlePopoverClose} 
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
  >
    <Layout>
      {!!title && <>
        <Text small active>{title}</Text>
        <Divider />
      </>}
      {children}
    </Layout>

  </Popover>

   </>
 );
}
ContentPopover.defaultProps = {};
export default ContentPopover;
