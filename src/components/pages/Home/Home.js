import React from 'react';
import { styled, Box, Card, CardMedia, Link, Typography } from '@mui/material';
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
  <Typography sx={{m:2}} variant="h4">Choose an application to edit or click Create Application</Typography>
  <Flex wrap baseline spacing={2} sx={{p: 2}}>

  {appData.map(app => <Card sx={{p:2,m:1, width: 300}}>
    {!!app.Photo && <CardMedia 
    
    component="img"
    height="194"
    image={app.Photo}
    alt={app.Name}
      />}
    <Flex sx={{p: 1}} key={app.Name}>
      <Link href={`/info/${app.path}`}>{app.Name}</Link>
     </Flex>
     
     </Card>)}
     <Flex sx={{p: 1}} onClick={create} >
     <Add /> 
       <Link >Create application...</Link>
     </Flex>
</Flex>
   </Layout>
 );
}
Home.defaultProps = {};
export default Home;
