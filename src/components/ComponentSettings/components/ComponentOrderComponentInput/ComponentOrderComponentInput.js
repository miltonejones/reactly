import React from 'react';
import { styled, Box } from '@mui/material';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));
 
const ComponentOrderComponentInput = () => {
 return (
   <Layout data-testid="test-for-ComponentOrderComponentInput">
     ComponentOrderComponentInput Component
   </Layout>
 );
}
ComponentOrderComponentInput.defaultProps = {};
export default ComponentOrderComponentInput;
