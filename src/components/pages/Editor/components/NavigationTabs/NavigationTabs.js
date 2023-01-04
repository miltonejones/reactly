import React from 'react';
import { Tabs } from '@mui/material';
import { Flex, Text, TabButton, TinyButton } from '../../../..';
import { AppStateContext, EditorStateContext } from '../../../../../context';
import { Close } from "@mui/icons-material";
  
const NavigationTabs = () => {
  
  const {pageTabs,selectedPage} = React.useContext(AppStateContext);
  const {handlePageNavigate} = React.useContext(EditorStateContext);
  if (!(pageTabs && Object.keys(pageTabs).length)) return <i />

 return (
  <Flex sx={{pl: 1}}>

    <Text small active>Pages</Text>

    <Tabs 
      onChange={(event, index) => {
        const name = Object.keys(pageTabs)[index];
        const tab = pageTabs[name];
        handlePageNavigate(name, tab.parameters); 
      }}
      value={
        Math.max(0,  Object.keys(pageTabs)
        .map(tab => pageTabs[tab].path)
        .indexOf(selectedPage?.PagePath))
        } 
      sx={{minHeight: 24, ml: 1, mb: 0 }}
    >

      {Object.keys(pageTabs)
        .map(tab => <TabButton 
          key={tab} 
          label={tab} 
          icon={<TinyButton 
          onClick={() => handlePageNavigate() } icon={Close} />} 
          iconPosition="end" />)}

    </Tabs> 
  </Flex>

 );
}

NavigationTabs.defaultProps = {};
export default NavigationTabs;
