import React from 'react';
import { styled, Avatar, Box } from '@mui/material';
 
const Layout = styled(Box)(({ theme }) => ({ 
  display: 'flex',
 width: '100vw',
 height: '100vh',
 alignItems: 'center',
 justifyContent: 'center', 
 gap: 4
}));
 
const LoadingScreen = () => {
 return (
   <Layout data-testid="test-for-LoadingScreen">
   
    <Avatar className="App-logo" src="/logo192.png" alt="loader" >A</Avatar>
    Loading application components...
    
   </Layout>
 );
}
LoadingScreen.defaultProps = {};
export default LoadingScreen;
