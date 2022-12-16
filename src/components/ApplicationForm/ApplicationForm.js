import React from 'react';
import { styled, Box , Collapse, Tabs, Grid, Chip, IconButton, Typography, Divider,Stack} from '@mui/material'; 
import { Flex, Spacer, TextInput, TextBtn, Text, QuickSelect, QuickMenu } from "..";
import { AppStateContext } from "../../hooks/AppStateContext";
import { useEditor } from '../../hooks/useEditor';
import {  Save, Delete } from "@mui/icons-material"; 
  
 
const ApplicationForm = ({ applications, importable }) => {

  const [imported, setImported] = React.useState(''); 
  const editor = useEditor(applications);

  const {
    removeProgItem,
    queryState,
    appContext
  } = React.useContext(AppStateContext)
 
  const [settings, setSettings] = React.useState({
    Name: appContext.Name,
    Photo: appContext.Photo,
    HomePage: appContext.HomePage
  })

  const handleImport = text => {
    setImported('')
    if (!text) return;
    const { action } = importable.find(f => f.label === text);
    !!action && action()
  }

  const home = appContext.pages?.find(f => f.ID === settings.HomePage);

 return (

  <Stack  sx={{p: 2}}>
  <Text small>
    Application Name
  </Text>
  <TextInput 
    value={settings.Name} 
    size="small" onChange={e => setSettings({...settings, dirty: 1, Name: e.target.value})} 
  />
  <Text small>
    Home Page
  </Text>
  <TextInput 
    value={settings.Photo} 
    size="small" onChange={e => setSettings({...settings, dirty: 1, Photo: e.target.value})} 
  />

<Text small>
Home Page
  </Text>
  <QuickSelect 
    value={home?.PageName} 
    options={appContext.pages?.map(f => f.PageName)}
    size="small" 
    
    onChange={e => !!e && setSettings({
        ...settings, 
        dirty: 1, 
        HomePage:  appContext.pages?.find(f => f.PageName === e).ID
      })} 
  />
<Text small>
    Import Component
  </Text>
<QuickSelect value={imported} options={importable.map(f => f.label)} onChange={handleImport} />

  <Flex sx={{pt: 1}}>
    <TextBtn disabled onClick={async () => { 
      await removeProgItem(`app-${appContext.ID}`) ;
      window.location.replace('/')
    }} endIcon={<Delete />} variant="contained"
    color="error"
    >Delete</TextBtn>
    <Spacer />
    <TextBtn onClick={() => {
      const { dirty, ...props } = settings;
      editor.setProgProps(appContext.ID, props)
      setSettings({ ...settings, dirty: !dirty });
    }} endIcon={<Save />} variant="contained"
    disabled={!settings.dirty}>Save</TextBtn>
  </Flex>

  <pre>
    {JSON.stringify(settings,0,2)}
  </pre>
</Stack>

 );
}
ApplicationForm.defaultProps = {};
export default ApplicationForm;
