import React from 'react';
import { Tabs } from '@mui/material';
import { TinyButton, TabButton, useClipboard } from '../../..';
import { Close, CopyAll } from "@mui/icons-material"; 

/** "ID": 1346,
      "Name": "¡Volaré! The Very Best of the Gipsy Kings",
      "Thumbnail": null,
      "artistFk": "936",
      "collectionId": null,
      "artistName": "Gipsy Kings",
      "TrackCount": 1 */
 
const CodeTabs = ({ openScripts, closeTab, setSelected, selectedID }) => {
    const {  copy } = useClipboard();
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
          icon={
         <>
          <TinyButton icon={Close}
          onClick={() => closeTab(key)} />
           <TinyButton icon={CopyAll}
          onClick={() => copy(openScripts[key].code)} /></>
        }
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
