import React from 'react';
import { styled, Box, Link } from '@mui/material';
import { AppRegistration, MoreVert, Edit, Add } from "@mui/icons-material"; 
import { useEditor } from '../../../hooks/useEditor';
import { Flex  } from "../..";
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(0)
}));
 
const Home = ({ appData }) => {
  const { createProg } = useEditor(appData);
  const create = () => {
    const name = window.prompt('Name?')
    if (!name) return;
    createProg(name)
  }
 return (
   <Layout data-testid="test-for-Home">

  <Flex sx={{borderBottom: 1, borderColor: 'divider', p: 2 , mr: 1}}>
    <AppRegistration />
    <b>Reactly</b>
  </Flex>

  <Box sx={{p: 2}}>

  {appData.map(app => <Box sx={{p: 1}} key={app.Name}>
      <Link href={`/info/${app.path}`}>{app.Name}</Link>
     </Box>)}
     <Flex sx={{p: 1}} onClick={create} >
     <Add /> 
       <Link >Create application...</Link>
     </Flex>
</Box>
   </Layout>
 );
}
Home.defaultProps = {};
export default Home;
