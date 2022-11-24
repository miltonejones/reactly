import React from 'react';
import { styled, List, Link, ListItemButton, Typography,
  ListItemIcon, ListItemText, ListItemSecondaryAction 
  } from "@mui/material";
  
 
const PageTree = ({tree = [], selected, onClick}) => {
 return (
   <List dense>
   {tree.filter(f => !f.pageID).map(c => <Pages selected={selected} onClick={onClick} key={c.PageName} tree={c} trees={tree}/> )}
   </List>
 );
}

const Pages = ({tree, trees, onClick, selected, indent = []}) => {
  const kids = trees.filter(t => t.pageID === tree.ID);
  return (
    <>
      <ListItemButton sx={{  p: 0 }}>
        <ListItemText 
          onClick={() => onClick && onClick(tree.PageName)} primary={<><Typography 
          sx={{ fontWeight: selected === tree.PageName ? 600 : 400 }}
            variant="body1">{indent}{tree.PageName}</Typography></>}/>
      </ListItemButton>
      {!!kids && <>{kids.map(c => <Pages selected={selected}  onClick={onClick} indent={indent.concat(<>&bull;&bull;&bull;</>)} key={c.PageName} trees={trees} tree={c} /> )}</>}
    </>
  )
}
PageTree.defaultProps = {};
export default PageTree;
