import React from 'react';
import { styled, Box } from '@mui/material';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));
 
const ComponentEvents = () => {
 return (
   <Layout data-testid="test-for-ComponentEvents">
     ComponentEvents Component
   </Layout>
 );
}
ComponentEvents.defaultProps = {};
export default ComponentEvents;
