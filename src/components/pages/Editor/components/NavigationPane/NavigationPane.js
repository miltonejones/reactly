import React from 'react';
import { Popover, Box, Divider, Typography, Stack } from '@mui/material';
import { SidePane } from '../../styled';
import { Hide } from '../../styled';
import { Icons } from "../../../../library/icons";
import {
  Flex, 
  Text,  
  Spacer,
  QuickMenu,
  TextInput,
  PopoverPrompt,
  ContentTree,
  PageTree,
  TextBtn,
  TinyButton
} from "../../../..";

import { ControlButton } from '..';
import { Add, Article, Newspaper, Search, Close, ExpandMore } from "@mui/icons-material";
import { EditorStateContext, AppStateContext } from '../../../../../context';
import { useReactly } from '../../../../../hooks';
import { Treebox, LibraryItem } from '../../styled';
import { ContentPopover } from '..';


const ComponentItem = ({ item, icon: Icon, onChange }) => { 
  return <LibraryItem onClick={() => onChange(item)}>
    <Icon />
    <Text tiny>{item.substr(0,12).replace(/([A-Z])/g, " $1")}</Text>
  </LibraryItem>

}

const ComponentList = () => {
  const reactly = useReactly();
  const [filter, setFilter] = React.useState('');
  const {  
    Library, 
  } = React.useContext(AppStateContext);
  const libraryKeys = Object.keys(Library)
    .filter(f => !Library[f].hidden)
    .sort((a,b) => a > b ? 1 : -1);
 
  return <Stack spacing={1}>
    <TextInput
      value={filter}
      onChange={e => setFilter(e.target.value)}
      buttons={
        <TinyButton icon={!!filter ? Close : Search} onClick={() => setFilter('')} />
      }
      label="Filter"
      size="small"
      fullWidth
      autoFocus
      autoComplete="off"
    />
    <Box sx={{height: 400, pr: 1, overflowX: 'hidden', overflowY: 'auto'}}>
      <Box sx={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
      pt: 1, 
    }}>
      {libraryKeys
      .filter(f => !filter || f.toLowerCase().indexOf(filter.toLowerCase()) > -1)
      .map(key => <ComponentItem icon={Icons[Library[key].Icon]} onChange={reactly.quickComponent} item={key} key={key}/>)}
    </Box>
    </Box>
  </Stack>
}
  
 
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
  const [filtertext, setFilterText] =React.useState('');
  
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
      persist: true,
      allowFind: true,
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
      value: selectedPage?.PageName,
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
            <Box sx={{p: 1}}>
            <TextInput 
              label="Search"
              fullWidth
              size="small"
              value={filtertext}
              onChange={e => setFilterText(e.target.value)}
              buttons={
                <TinyButton icon={!!filtertext ? Close : Search} 
                  onClick={() => setFilterText('')}
                  />
              }
            />
            </Box>
        <Divider />

        <Stack sx={{ p: 1, height: "calc(100vh - 464px)" }}>
          <Flex spacing={1}>
            <Flex fullWidth>
              <Text small>
                <b>Content</b>
              </Text>

              <Spacer />
           
              <ContentPopover control={TextBtn} endIcon={<Add />} title="Add Component" label="Add" width={700} >
                  <ComponentList />
                </ContentPopover>

              {/* <QuickMenu {...menuProps.component} /> */}
            
            </Flex>
          </Flex>

          <ContentTree  filterText={filtertext} />

        </Stack>
      </Hide>
    
    </SidePane>
 );
}
NavigationPane.defaultProps = {};
export default NavigationPane;
