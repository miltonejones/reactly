import React from 'react';
import { styled, Box, IconButton , Popover} from '@mui/material';
 
const Layout = styled(Box)(({ theme }) => ({
 padding: theme.spacing(2),
 width: 400,
}));
 
const ContentPopover = ({ icon: Icon, children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);;

  const handlePopoverClose = () => setAnchorEl(null);

  const handlePopoverClick = (event) => { 
    setAnchorEl(event.currentTarget);
  };
 

 return (
   <>
  <IconButton onClick={handlePopoverClick}>
    <Icon />
  </IconButton>
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
      {children}
    </Layout>

  </Popover>

   </>
 );
}
ContentPopover.defaultProps = {};
export default ContentPopover;
