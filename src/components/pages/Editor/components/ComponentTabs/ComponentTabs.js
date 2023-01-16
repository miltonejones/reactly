import React from 'react';
import { Tabs, Box } from '@mui/material'; 
import { TabButton, TinyButton } from '../../../..';
import { AppStateContext, EditorStateContext } from '../../../../../context';
import { Close } from "@mui/icons-material";
 
const ComponentTabs = () => {
  const { selectedPage, queryState } = React.useContext(AppStateContext);
  const { selectComponentByID, showTabs } = React.useContext(EditorStateContext);
  const componentTabs = queryState.tabs?.[selectedPage?.PageName];
  if (!(!!componentTabs && 
    Object.keys(componentTabs).length &&  
    showTabs)) return <i />

  return (
    <Box sx={{mb: 1, borderBottom: 1, borderColor: 'divider'}}>
      <Tabs  
        sx={{minHeight: 24, ml: 1, mb: 0 }} 
        onChange={(e, index) => selectComponentByID(Object.keys(componentTabs)[index])}
        value={Object.keys(componentTabs).indexOf(queryState.selectedComponent?.ID)}
      >
        {Object.keys(componentTabs).map((tab) => <TabButton 
          icon={<TinyButton onClick={() => selectComponentByID(tab, 1) } icon={Close} />} 
          iconPosition="end"
          key={tab} label={componentTabs[tab]} />)}
      </Tabs>
    </Box>
 );
}
ComponentTabs.defaultProps = {};
export default ComponentTabs;
