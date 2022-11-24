import React from "react";
import { styled, List, Link, ListItemButton, 
  ListItemIcon, ListItemText, ListItemSecondaryAction ,
  Typography
  } from "@mui/material";

import { Article, Add, MoreVert } from "@mui/icons-material";
import QuickMenu from "../QuickMenu/QuickMenu";
import { AppStateContext } from '../../hooks/AppStateContext';


const ContentTree = ({ tree }) => {
  const { queryState = {}, setQueryState  } = React.useContext(AppStateContext);
  const { selectedComponent = {}} = queryState;
  if (!tree) return <>no content!</>
  const components = tree.filter(f => !f.componentID);
  return (
    <List dense>
      {components.map(c => <Contents onSelect={(component, on) => {
        setQueryState(s => ({...s, selectedComponent:on ? null :  component}));
      }} selectedComponent={selectedComponent} trees={tree} key={c.ComponentType} tree={c} /> )} 
    </List>
  );
};

const Contents = ({ tree, trees, label, indent = 0, onSelect, selectedComponent }) => { 
  const kids = !!label ? [] : trees.filter(t => t.componentID === tree.ID);
  const on = !!label ? null : selectedComponent?.ID === tree.ID;
  return (
    <> 
      <ListItemButton sx={{ ml: indent, p: 0 }}>
       <ListItemIcon sx={{minWidth: 24}}>
          {!!tree ? <Article /> : <Add />}
        </ListItemIcon>
        <ListItemText sx={{ml: 0, pl: 0}} primary={<Typography onClick={() => onSelect && onSelect(tree, on)} sx={{fontWeight: on ? 600 : 400}}>{label || tree.ComponentName}</Typography>} />
        {!!tree && <ListItemSecondaryAction>
          <QuickMenu options={['Configure...', 'Add component before', 'Add Component After', '-', 'Delete Component']} label={<MoreVert />}/>
        </ListItemSecondaryAction>}
      </ListItemButton>
      {tree?.children && <Contents label={<Link>Add component</Link>} indent={indent + 3.5} />} 
      {!!kids?.length && <>{kids.map(c => <Contents selectedComponent={selectedComponent} onSelect={onSelect} trees={trees} indent={indent + 3.5} key={c.ComponentName} tree={c} /> )}</>}
    </>
  );
};

ContentTree.defaultProps = {};
export default ContentTree;
