import { styled, Stack, Box, Grid } from "@mui/material";

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
      borderColor: theme.palette.divider
    })
  }
 
  return {
    // outline: "dotted 1px green",
    whiteSpace: 'nowrap',
    height: `var(--${side}-pane-height)`, 
    transition: "all .2s linear",
    ...args,
    overflow: `var(--${side}-pane-overflow)`,
    zIndex: 2000,
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