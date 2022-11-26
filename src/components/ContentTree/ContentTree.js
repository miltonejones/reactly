import React from "react";
import { styled, List, Link, ListItemButton, 
  ListItemIcon, ListItemText, ListItemSecondaryAction ,
  Typography, Box
  } from "@mui/material";

  import Library from '../library';
import { Article, Add, MoreVert } from "@mui/icons-material";
import QuickMenu from "../QuickMenu/QuickMenu";
import { AppStateContext } from '../../hooks/AppStateContext';

const componentOrder = (a,b) => a.order - b.order;

const Content = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 440px)',
  overflow: 'auto',
  padding: theme.spacing(0, 1),
  border: 'solid 1px #777', 
}))

const ContentTree = ({ tree, onCreate, onNameChange, onDrop }) => {
  const { queryState = {}, setQueryState  } = React.useContext(AppStateContext);
  const { selectedComponent = {}} = queryState;
  if (!tree) return <i />
  const components = tree.filter(f => !f.componentID);
  return (
    <Content>
      <List dense>
        {components
        .sort(componentOrder)
        .map(c => <Contents 
          onCreate={onCreate} 
          onNameChange={onNameChange}
          onSelect={(component, on) => {
            setQueryState(s => ({...s, selectedComponent:on ? null :  component}));
          }} selectedComponent={selectedComponent} onDrop={onDrop} trees={tree} key={c.ComponentType} tree={c} /> )} 
      </List>
    </Content>
  );
};

const Contents = ({ tree, parentID, onDrop, trees, label, indent = 0, onNameChange, onCreate, onSelect, selectedComponent }) => { 
  const kids = !!label ? [] : trees.filter(t => t.componentID === tree.ID);
  const on = !!label ? null : selectedComponent?.ID === tree.ID;
  const options = [
    {
      name: 'Rename',
      action: () => onNameChange(tree.ID, tree.ComponentName)
    },
    {
      name: 'Add Component before',
      action: () => onCreate(parentID, { before: !0, order: tree.order})
    },
    {
      name: 'Add Component After',
      action: () => onCreate(parentID, { after: !0, order: tree.order})
    },
    {
      name: '-', 
    },
    {
      name: <b style={{color: 'red'}}>Delete Component</b> ,
      action: () =>  onDrop (tree.ID)
    }
  ]

  const { Icon } = !tree ? {Icon: Add} : Library[tree.ComponentType];
  const nodeLabel = !tree 
    ? label 
    : `${tree.ComponentType}: ${tree.ComponentName}`
  return (
    <> 
      <ListItemButton sx={{ ml: indent, p: 0 }}>
       <ListItemIcon sx={{minWidth: 24}}>
           <Icon />
        </ListItemIcon>
        <ListItemText sx={{ml: 1, pl: 0}} primary={<Typography 
        onClick={() => onSelect && onSelect(tree, on)} sx={{fontWeight: on ? 600 : 400}}
         > {nodeLabel}</Typography>} />
        {!!tree && <ListItemSecondaryAction>
          <QuickMenu options={options.map(f => f.name)} 
          onChange={value => {
            const { action } = options.find(f => f.name === value);
            !!action && action()
          }}
          label={<MoreVert />}/>
        </ListItemSecondaryAction>}
      </ListItemButton>
      {tree?.children && <Contents label={<Link onClick={() => onCreate(tree.ID)}>Add component</Link>} indent={indent + 3.5} />} 
      {!!kids?.length && <>{kids
        .sort(componentOrder)
        .map(c => <Contents 
          onCreate={onCreate} 
          onDrop={onDrop} 
          parentID={tree.ID} 
          selectedComponent={selectedComponent} 
          onNameChange={onNameChange}
          onSelect={onSelect} trees={trees} indent={indent + 3.5} key={c.ComponentName} tree={c} /> )}</>}
    </>
  );
};

ContentTree.defaultProps = {};
export default ContentTree;
