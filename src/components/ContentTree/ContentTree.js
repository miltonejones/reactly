import React from "react";
import { styled, List, Link, ListItemButton, 
  ListItemIcon, ListItemText, ListItemSecondaryAction ,
  Typography, Box, Collapse
  } from "@mui/material";
 
import { Article, Add, MoreVert, Error, Close, Delete, RadioButtonUnchecked, Remove } from "@mui/icons-material";
import { QuickMenu, Tiny, Tooltag, DeleteConfirmMenu } from "..";
import { AppStateContext } from '../../hooks/AppStateContext';


const NodeText = styled(Typography)(({ theme, on, indent }) => ({
  fontWeight: on ? 600 : 400, 
  fontSize: '0.8rem',
  maxWidth: `calc(216px - ${theme.spacing(indent)})`,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden'
}))

const componentOrder = (a,b) => a.order - b.order;

const Content = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 440px)',
  overflow: 'auto',
  padding: theme.spacing(0, 1),
  border: 'solid 1px #777', 
}))

const filterProp = filter => f =>  !filter || 
  f.ComponentName.toLowerCase().indexOf(filter.toLowerCase()) > -1 || 
  f.ComponentType.toLowerCase().indexOf(filter.toLowerCase()) > -1

const ContentTree = ({ tree, onCreate, onNameChange, selectComponent, 
    onDrop, filter, onCustomName, quickComponent, ...props }) => {
  const { queryState = {}, setQueryState, selectedPage  } = React.useContext(AppStateContext);
  const { selectedComponent = {}} = queryState;
  if (!tree) return <i />
  const components = tree.filter(f => !f.componentID);
  return (
    <Content> 
      <List dense>
        {components
        .filter(filterProp(filter))
        .sort(componentOrder)
        .map(c => <Contents 
          filter={filter}
          onCustomName={onCustomName}
          quickComponent={quickComponent}
          onCreate={onCreate} 
          key={c.ID}
          {...props}
          onNameChange={onNameChange}
          onSelect={selectComponent} selectedComponent={selectedComponent} onDrop={onDrop} trees={tree} key={c.ComponentName} tree={c} /> )} 
      </List>
    </Content>
  );
};

const Contents = ({ filter, tree, parentID, onDrop, trees, 
  onCustomName, quickComponent, label, indent = 0, onNameChange, 
  onCreate, onSelect, selectedComponent, ...props  }) => { 
  const { Library } = React.useContext(AppStateContext);
  const kids = !!label ? [] : trees.filter(t => t.componentID === tree.ID);
  const on = !!label ? null : selectedComponent?.ID === tree.ID;
  const [over, setOver] = React.useState(false);
  // const [expanded, setExpanded] = React.useState(true)

  const { expandedNodes,setExpandedNodes } = props;
  const expanded = !!tree && !!expandedNodes[tree.ID]


  
  // const expand = node => {
  //   setExpanded(nodes => nodes.indexOf(node) > -1 
  //     ? nodes.filter(item => node !== item)
  //     : nodes.concat(node));

  // }

  
  const expand = node => {
    setExpandedNodes(nodes => ({
      ...nodes,
      [node]: !nodes[node]
    }));

  }

  if (!Library) {
    return <>Loading...</>
  }
  
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
      name: 'Add Component after',
      action: () => onCreate(parentID, { after: !0, order: tree.order})
    },  
    {
      name: 'Save as Custom Component...',
      action: () => onCustomName(tree.ID)
    },  
    {
      name: '-', 
    },
    {
      name: <b style={{color: 'red'}}>Delete Component</b> ,
      action: () =>  onDrop (tree.ID)
    }
  ]
  let allowedChildren;
  let allowChildren;
  try {

    allowedChildren = !tree ? null : Library[tree.ComponentType].allowedChildren;
    allowChildren = !tree ? null : Library[tree.ComponentType].allowChildren;
  } catch (ex) {
    // console.log ({ ex })
  }

  const baseIcon = expanded ? Remove : Add;
  const ExpandIcon = !!kids.length ? baseIcon : RadioButtonUnchecked;

  const iconOwner = !tree ? null : Library[tree.ComponentType];

  

  const { Icon } = !tree ? {Icon: Add} : { Icon: iconOwner?.Icon || Error }
  
//  !!Library[tree.ComponentType] && console.log (typeof Library[tree.ComponentType].Icon)
//   !Library[tree.ComponentType] && console.log ('Could not find "%s"', tree.ComponentType)

// console.log ({ type: tree?.ComponentType, icon: iconOwner?.Icon, Library })
  const nodeLabel = !tree 
    ? label 
    : `${tree.ComponentType}: ${tree.ComponentName}`
  return (
    <> 
      <Tooltag component={ListItemButton} title={nodeLabel} sx={{ ml:indent , p: 0 }}
        onMouseEnter={() => setOver(true)}
        onMouseLeave={() => setOver(false)}
        >
       <ListItemIcon sx={{minWidth: 24}}>
          {!!kids.length && <Tiny sx={{mr: 1}} onClick={()  => expand(tree.ID)} icon={ExpandIcon} />}
           <Tiny sx={{mr: 1}} icon={Icon} />
        </ListItemIcon>


        <ListItemText sx={{pl: 0}} primary={<NodeText 
            indent={indent}
            onClick={() => onSelect && onSelect(tree, on)} 
            sx={{fontWeight: on ? 600 : 400, fontSize: '0.85rem'}}
         > {nodeLabel}</NodeText>} />
        {!!tree && <ListItemSecondaryAction> 
          {on && <Tiny onClick={() => onSelect && onSelect(tree, on)}  icon={Close}  sx={{mr: 1}} />}

          {/* <TinyonClick={() => onDrop && onDrop(tree.ID)}  icon={Delete}  /> */}
          
          <DeleteConfirmMenu hidden={!(on || over)}  sx={{mr: 1}} message={`Delete component ${nodeLabel}?`} 
              onDelete={(e) => !!e && onDrop(tree.ID, true)}/>

          <QuickMenu options={options.map(f => f.name)} 
          onChange={value => {
            const { action } = options.find(f => f.name === value);
            !!action && action()
          }}
          label={<Tiny icon={MoreVert} />}/>
        </ListItemSecondaryAction>}
      </Tooltag>  
      
      <Collapse in={expanded}>
        
        {!!kids?.length && <>{kids
          .filter(filterProp(filter))
          .sort(componentOrder)
          .map(c => <Contents 
            {...props}
            quickComponent={quickComponent}
            filter={filter}
            onCreate={onCreate} 
            onDrop={onDrop} 
            onCustomName={onCustomName}
            parentID={tree.ID} 
            selectedComponent={selectedComponent} 
            onNameChange={onNameChange}
            onSelect={onSelect} trees={trees} indent={indent + 3} key={c.ID} tree={c} /> )}</>}
  
        {allowChildren && !allowedChildren && <Contents 
          label={<Link onClick={() => onCreate(tree.ID)}>Add component</Link>} indent={indent + 3} />} 

        {!!allowedChildren && allowedChildren.map(allowed => <Contents 
          label={<Link onClick={() => quickComponent(allowed, tree.ID)}>Add {allowed}</Link>} indent={indent + 3} />)} 

      </Collapse>

       </>
  );
};

ContentTree.defaultProps = {};
export default ContentTree;
