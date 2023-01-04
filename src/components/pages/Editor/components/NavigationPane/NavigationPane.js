import React from 'react';
import {  Popover, Box, Divider, Stack } from '@mui/material';
import { SidePane } from '../../styled';
import { Hide } from '../../styled';
import { Icons } from "../../../../library/icons";
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

import { ControlButton } from '..';
import { Add, Article, Newspaper, Close, ExpandMore } from "@mui/icons-material";
import { EditorStateContext, AppStateContext } from '../../../../../context';
import { useReactly } from '../../../../../hooks';
import { Treebox } from '../../styled';
import { ContentPopover } from '..';
  
 
const NavigationPane = ( ) => {
  const { 
    collapsed,  
    popoverContent,  
    anchorEl,
    setAnchorEl,
    handlePageNavigate, 
    setPopoverContent,
    setCollapsed
  } = React.useContext(EditorStateContext);
  const { 
    appContext, 
    Library,
    selectedPage
  } = React.useContext(AppStateContext);
  const reactly = useReactly();
  const handlePopoverClose = () => setAnchorEl(null);

  const handlePopoverClick = (content) => (event) => {
    setPopoverContent(content)
    setAnchorEl(event.currentTarget);
  };
 
  const open = Boolean(anchorEl);
  const componentParent = selectedPage || appContext;

  const libraryKeys = Object.keys(Library)
    .filter(f => !Library[f].hidden)
    .sort((a,b) => a > b ? 1 : -1);
 

  const menuProps = {
    component: {
      onChange: reactly.quickComponent,
      options: libraryKeys,
      icons: libraryKeys.map(
          (e) => Icons[Library[e].Icon]
        ),
      label: <TextBtn endIcon={<Add />}>Add</TextBtn>
    },
    page: {
      onChange: handlePageNavigate,
      options: appContext.pages?.map((f) => f.PageName),
      small: true,
      caret: true,
      label: selectedPage?.PageName || <b>{ appContext.Name}</b>,
      title: "Choose Page"
    }, 
  }

  const navigationButtons = [
    {
      deg: !collapsed.left ? 90 : 270,
      onClick: () => setCollapsed((s) => ({ ...s, left: !collapsed.left })),
      icon: collapsed.left ? <ExpandMore /> : <Close />
    }, 
  ]


 return (
  <SidePane item side="left" sx={{pr: 1}}>
 
      <Stack sx={{ p: collapsed.left ? 0 : 1, height: 300 }}>

        <Flex nowrap spacing={1}>
          <Hide hidden={collapsed.left}>
            {!!selectedPage?.PageName && <Text small>
              <b>Page</b>
            </Text>}

            <QuickMenu {...menuProps.page}  />

            <Spacer /> 

            <PopoverPrompt 
              onChange={(value) => !!value && reactly.createPage(null, value)}
              label="Enter a name for your page" 
              endIcon={<Add />} 
              >Create</PopoverPrompt> 
          </Hide>
          
            <Stack>
              {navigationButtons
              .map((button, i) => <ControlButton key={i} {...button} />)} 
              <Hide hidden={!collapsed.left}>
                <ContentPopover icon={Article} title="Pages">
                  <PageTree />
                </ContentPopover>
                <ContentPopover title="Page contents" icon={Newspaper}>
                  <ContentTree />
                </ContentPopover>
              </Hide>
            </Stack>
        </Flex>


          <Popover 
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose} 
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box sx={{width: 300, p: 2}}>
              {popoverContent}
            </Box>

          </Popover>


        <Treebox hidden={collapsed.left}>
          <PageTree />
          </Treebox>
      </Stack>

      <Hide hidden={collapsed.left || !componentParent }> 
        <Divider />

        <Stack sx={{ p: 1, height: "calc(100vh - 404px)" }}>
          <Flex spacing={1}>
            <Flex fullWidth>
              <Text small>
                <b>Content</b>
              </Text>

              <Spacer />
              <QuickMenu {...menuProps.component} />
            
            </Flex>
          </Flex>

          <ContentTree   />

        </Stack>
      </Hide>
    
    </SidePane>
 );
}
NavigationPane.defaultProps = {};
export default NavigationPane;
