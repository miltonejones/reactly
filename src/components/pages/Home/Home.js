import React from 'react';
import { styled, Box, Link } from '@mui/material';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));
 
const Home = ({ appData }) => {
 return (
   <Layout data-testid="test-for-Home">
     {appData.map(app => <Box sx={{p: 1}} key={app.Name}>
      <Link href={`/edit/${app.path}`}>{app.Name}</Link>
     </Box>)}
   </Layout>
 );
}
Home.defaultProps = {};
export default Home;
