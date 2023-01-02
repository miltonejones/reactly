import React from 'react';
import {  Stack, IconButton } from '@mui/material'; 
import { RecentActors, Gamepad, AutoStories, Close, Code } from "@mui/icons-material";
import { EditorStateContext } from '../../../../../hooks/AppStateContext';

const DrawerNavigation = ( { horizontal, selected, onClose } ) => {
  const { setDrawerState, setShowTrace } = React.useContext(EditorStateContext);
  const buttons = {
    connectOpen: <AutoStories />,
    scriptOpen: <Code />,
    stateOpen: <RecentActors />
  }
 

  return <Stack direction={horizontal ? "row" : "column"}>
     <IconButton 
     disabled={!selected && horizontal}
      color="inherit"
      sx={{ mt: horizontal ? 0 : 1 }}
      onClick={() => {
        setDrawerState( {});
        setShowTrace(true);
      }}
    >
      <Gamepad />
    </IconButton>

    {Object.keys(buttons).map(key =>   <IconButton
      key={key}
      color="inherit"
      sx={{ mt: horizontal ? 0 : 1 }}
      disabled={selected === key }
      onClick={() => {
        setShowTrace(false);
        setDrawerState((s) => ({ 
          ...s, 
          scriptOpen: false,
          connectOpen: false,
          stateOpen: false,
          [key]: !s[key]
        }));
      }}
    >
      {buttons[key]}
    </IconButton>)}

    {!!onClose && <IconButton  onClick={onClose}>
          <Close />
        </IconButton>}

  </Stack>
}

export default DrawerNavigation;