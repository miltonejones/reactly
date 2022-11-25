import React from 'react';
import { styled, Box } from '@mui/material';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));
 
const ReactlyAvatar = () => {
 return (
   <Layout data-testid="test-for-ReactlyAvatar">
     ReactlyAvatar Component
   </Layout>
 );
}
ReactlyAvatar.defaultProps = {};
export default ReactlyAvatar;
