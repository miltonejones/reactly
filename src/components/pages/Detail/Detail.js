import React from 'react';
import { styled, Box , Collapse, Tabs, Grid, Chip, IconButton, Typography, Divider} from '@mui/material';
import { useParams } from "react-router-dom";
import { Flex, Spacer, TextBtn, Tiny, ConnectionDrawer, QuickMenu } from "../..";
import { AppRegistration, MoreVert, Edit, Add } from "@mui/icons-material"; 
import { List, ListItemButton,ListSubheader,ListItemText, ListItemSecondaryAction, ListItemIcon } from '@mui/material'; 
import { useConnectionEdit } from '../Editor/Editor';
import { TabButton } from '../../ComponentPanel/ComponentPanel';



const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(0)
}));

const DetailList = ({ header, items = [], onConnect}) => {
  return <List sx={{ width: '90vw', m: 2, border: 1, borderColor: 'divider'}} subheader={<ListSubheader>{header}</ListSubheader>}>
    {items.map((item, i) => {
      return <ListItemButton sx={{ borderTop: 1, borderColor: 'divider'}} key={i}>
     
              <ListItemText  primary={item.text} secondary={item.subtext}/>

              <ListItemSecondaryAction  >
             <QuickMenu label={<MoreVert />} options={['Edit', 'Delete']} 
              onChange={onConnect}
              /> 
              </ListItemSecondaryAction>

      
          </ListItemButton> 

    })}
  </List>
}
 
const Detail = ({ applications, onConnect }) => {
  const { appname } = useParams();
  const application = applications.find(f => f.path === appname);

  const {
    handleResourceDelete,
    handleConnectionDelete,
    setConnection, 
    setResource 
  } = useConnectionEdit(applications);

  const [open, setOpen] = React.useState(false)
  const [index, setIndex] = React.useState(0)

  const connections = application.connections.map(f => ({
    text: f.name,
    subtext:  f.root
  }))
  
  const resources = application.resources.map(f => ({
    text: f.name,
    subtext:  f.method + ' - ' + f.path
  }))
  
  const pages = application.pages.map(f => ({
    text: f.PageName,
    subtext:  f.PagePath
  }))

  const tabs = [
    `Connections (${application.connections.length})`,
    `Resources (${application.resources.length})`,
    `Pages (${application.pages.length})`
  ]
  
  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };
 return (
   <Layout data-testid="test-for-Detail">
    <Grid container sx={{width: '100vw'}}>
        <Grid item xs={12} sx={{borderBottom: 1, borderColor: 'divider'}}>
           
          <Flex sx={{p: 1}}>

            <Flex sx={{borderRight: 1, borderColor: 'divider', pr: 2 , mr: 1}}>
              <AppRegistration />
              <b>Reactly</b>
            </Flex>

            <Chip label={application.Name} color="success" variant="outlined" />

            <Spacer />

            <TextBtn endIcon={ <Edit />} variant="contained" href={`/edit/${application.path}`}>
             Edit in MUI Builder
            </TextBtn>

          </Flex>
        </Grid>
<Grid item>


<Box  sx={{ borderBottom: 1, borderColor: 'divider'  }}>


      <Tabs onChange={handleChange} value={index} sx={{minHeight: 24, mt: 1, ml: 1, width: '90vw' }}   >
        <TabButton label="All"/>
       {tabs.map (tab =>  <TabButton label={tab} key={tab}  />) } 
      </Tabs>
    </Box>

 
</Grid>
        <Collapse in={!index || index === 1}>
          <Grid sx={{pt: 2}} item>
            <DetailList onConnect={() => setOpen(!open)} items={connections}  header={
              <>Connections <TextBtn onClick={() => setOpen(!open)} variant="outlined" endIcon={<Add />} sx={{ml: 1}} size="small">add</TextBtn></>
            }/>
          </Grid>
        </Collapse>
        <Collapse in={!index || index === 2}> 
          <Grid item>
            <DetailList onConnect={() => setOpen(!open)} items={resources}  header={
              <>Resources <TextBtn onClick={() => setOpen(!open)} variant="outlined" sx={{ml: 1}} size="small" endIcon={<Add />}>add</TextBtn></>
            }/>
          </Grid>
        </Collapse>
        <Collapse in={!index || index === 3}> 
          <Grid item>
            <DetailList items={pages} header={
              <>Pages <TextBtn sx={{ml: 1}} size="small" variant="outlined" endIcon={<Add />}>add</TextBtn></>
            }/>
          </Grid>
        </Collapse>
    </Grid>
  
      
    <ConnectionDrawer 
        appID={application.ID}

        dropResource={handleResourceDelete}
        dropConnection={handleConnectionDelete}
        setResource={setResource}
        setConnection={setConnection}

        connections={application.connections}
        resources={application.resources}
        open={open} 
        handleClose={() => {
          setOpen(false)
        }} 
      />
      
      
   </Layout>
 );
}
Detail.defaultProps = {};
export default Detail;
