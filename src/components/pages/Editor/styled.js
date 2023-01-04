import { styled, Stack, Box, IconButton, Grid } from "@mui/material";
 
export const Layout = styled(Grid)(({ collapsed, showTabs }) => {

  const PANE_HEIGHT = 'calc(100vh - 64px)';
  const LEFT_PANE_WIDTH = collapsed.left ? 40 : 300;
  const RIGHT_PANE_WIDTH = collapsed.right ? 40 : 360;

  let centerOffset = 56;
  centerOffset += LEFT_PANE_WIDTH;
  centerOffset += RIGHT_PANE_WIDTH;

  
  const paneProps = {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    '--left-pane-height': PANE_HEIGHT,
    '--left-pane-width': LEFT_PANE_WIDTH + 'px',
    '--left-pane-overflow': collapsed.left ? 'hidden' : 'auto',
    '--top-pane-width': '100vw',
    '--top-pane-height': 'fit-content',
    '--center-pane-height': PANE_HEIGHT,
    '--right-pane-height': PANE_HEIGHT,
    '--right-pane-width': RIGHT_PANE_WIDTH + 'px',
    '--center-pane-width': `calc(100vw - ${centerOffset}px)`,
    '--center-pane-overflow': 'auto',
    '--right-pane-overflow': collapsed.right ? 'hidden' : 'auto',
    '--content-height-offset': showTabs ? '460px' : '420px'
  }

 
  return paneProps;
});
 
export const Sidebar = styled(Stack)(({theme}) => ({
  justifyContent: "space-between",
  alignItems: "center",
  height: "100vh",
  width: 48,
  color: "white",
  backgroundColor: theme.palette.primary.dark,
}))


export const SidePane = styled(Grid)(({ theme, side }) => {
  const args = {
    minWidth: `var(--${side}-pane-width)`,  
    maxWidth: `var(--${side}-pane-width)`  
  };
  const borders = {
    right: 'borderLeft',
    left: 'borderRight',
    top: 'borderBottom'
  }
  if (borders[side]) {
    Object.assign(args, {
      [borders[side]]: 'solid 1px',
      borderColor: theme.palette.divider,
      '&:hover': {
        borderColor: 'black'
      }
    })
  }
 
  return {
    // outline: "dotted 1px green",
    whiteSpace: 'nowrap',
    height: `var(--${side}-pane-height)`, 
    transition: "all .2s linear",
    ...args,
    overflow: `var(--${side}-pane-overflow)`, 
    backgroundColor: 'white'
  };
});
 
export const Treebox = styled(Box)(({ theme, hidden }) => ({
  display: hidden ? 'none' : 'block',
  border: "solid 1px " + theme.palette.divider, 
  height: 240,
  overflow: 'auto',
  padding: theme.spacing(1)
}));

export const Hide = ({ hidden, children }) => {
  if (hidden) return <i />
  return children;
}


export const BorderButton = styled(IconButton)(({ active , theme}) => ({
  // borderWidth: active ? 1  : 0,
  outline: !active ? '' : ('solid 2px ' + theme.palette.primary.main)
}))
 