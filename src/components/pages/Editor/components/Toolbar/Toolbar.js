import React from 'react';
import { SidePane, Hide, BorderButton } from '../../styled';
import { styled, Chip, IconButton, Box } from '@mui/material';
import { ArrowBack, AppRegistration, Construction, 
  Close, Code, Save, Gamepad, ExpandMore } from "@mui/icons-material";
import {
  Flex,  
  Text,  
  Spacer,
  QuickMenu,
  PopoverPrompt,
  ContentTree,
  PageTree,
  TextBtn
} from "../../../..";
import { MainMenu } from '..';
import { Addressbox } from '..';
 
import { EditorStateContext, AppStateContext } from '../../../../../context';

const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));
 
const Toolbar = () => {
  const { 
    collapsed,  
    popoverContent,  
    anchorEl,
    setAnchorEl,
    handlePageNavigate, 
    setPopoverContent,
    setCollapsed,
    json,
    showLib, 
    setJson,
    closeLib
  } = React.useContext(EditorStateContext);
  const { 
    appContext, 
    Library,
    dirty,
    setDirty,
    queryState,
    selectedPage,
    uploadApplicationConfig
  } = React.useContext(AppStateContext);

  const componentParent = selectedPage || appContext;
  const isInApplicationScope = !!componentParent?.Name 
  const { pageLoaded } = queryState;
 
 

  const currentPagePath = ["apps", appContext?.path].concat(
    !selectedPage?.PagePath ? [] : selectedPage.PagePath
  );

  if (!appContext) {
    return <>No application</>
  }
 

 return (
  <SidePane item xs={12} side="top" >
    <Flex sx={{ p: 1 }}>
      <Flex
        sx={{ borderRight: 1, borderColor: "divider", pr: 2, mr: 1 }}
      >
        <AppRegistration />
        <b>Reactly</b>
      </Flex>

      <Chip color="primary" 
        onClick={() => handlePageNavigate('/')}
        variant={isInApplicationScope ? "outlined" : "filled" } 
        label={<b>{appContext.Name}</b>} 
        />

      <Flex nowrap>
        <MainMenu />
      </Flex>
          
      <IconButton onClick={() => window.history.back()}>
        <ArrowBack />
      </IconButton>

      <Hide hidden={!pageLoaded}>
        <Addressbox value={`/${currentPagePath.join("/")}`}   />
      </Hide>
    


      <BorderButton active={showLib} disabled={!!json} onClick={() => closeLib()}>
        <Construction />
      </BorderButton>
 
      <BorderButton active={json} disabled={showLib} onClick={() => setJson(!json)}>
        <Code />
      </BorderButton>

      <IconButton 
        size="small"
        onClick={() => window.open(`/${currentPagePath.join("/")}`.replace('apps',  'debug'))} 
      >
      
        <Gamepad  />
      </IconButton>
  
  
      <TextBtn
        variant="contained"
        endIcon={<Save />}
        disabled={!dirty} 
        onClick={() => { 
          uploadApplicationConfig(appContext);
          setDirty(false);
        }}
      >
        Save
      </TextBtn>
    </Flex>
  </SidePane>
 );
}
Toolbar.defaultProps = {};
export default Toolbar;
