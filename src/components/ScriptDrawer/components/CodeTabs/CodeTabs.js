import React from 'react';
import { Tabs } from '@mui/material';
import { TinyButton, TabButton } from '../../..';
import { Close } from "@mui/icons-material"; 
  
 
const CodeTabs = ({ openScripts, closeTab, setSelected, selectedID }) => {
  
  const handleTabChange = (event, index) => {
    const key = Object.keys(openScripts)[index];
    setSelected(openScripts[key]);
  }

  return (
    <Tabs 
      sx={{minHeight: 24, mt: 1, ml: 1 }}
      onChange={handleTabChange}
      value={Object.keys(openScripts).indexOf(selectedID)}
      >

      {Object.keys(openScripts).map(key =>( 
        <TabButton 
          icon={<TinyButton icon={Close}
          onClick={() => closeTab(key)} />}
          iconPosition="end"
          key={key} 
          label={<>
          {key === selectedID ? <b>&bull; </b> : <i />}
          {openScripts[key].name}
          </>} />))}

    </Tabs>
 );
}
CodeTabs.defaultProps = {};
export default CodeTabs;
