import React from "react";
import { styled, List, Link, ListItemButton, 
  ListItemIcon, ListItemText, ListItemSecondaryAction ,
  Typography, Box, Collapse, Popover
  } from "@mui/material";
 
import { Article, Add, MoreVert, Error, Close, Delete, RadioButtonUnchecked, Remove } from "@mui/icons-material";
import { QuickMenu, Tiny, Tooltag, DeleteConfirmMenu } from "..";
import { AppStateContext, EditorStateContext } from '../../context';
import { useReactly } from "../../hooks";
import { SearchLine } from "../ScriptDrawer/ScriptDrawer";
import { ComponentList } from "../pages/Editor/components/NavigationPane/NavigationPane";


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
  height: 'calc(100vh - var(--content-height-offset))',
  overflow: 'auto',
  padding: theme.spacing(0, 1),
  border: 'solid 1px ' + theme.palette.divider, 
}));

export const ComponentQuickMenu = ({ component, onClose, parentID, ...props }) => {
  const reactly = useReactly();
  const onCreate = (type, options) => reactly.createComponent(type, options)
  const componentID = parentID || component.componentID;

  const options = [
    {
      name: 'Rename',
      action: () => reactly.onNameChange(component.ID, component.ComponentName)
    },
    {
      name: 'Add Component before ' ,
      action: () => onCreate(componentID, { before: !0, order: component.order})
    },  
    {
      name: 'Add Component after',
      action: () => onCreate(componentID, { after: !0, order: component.order})
    },   
    {
      name: '-', 
    },
    {
      name: <b style={{color: 'red'}}>Delete Component</b> ,
      action: () =>  reactly.onDropComponent (component.ID)
    }
  ];

  return (
    <QuickMenu 
      hover="inherit"
      options={options.map(f => f.name)} 
      {...props}
      onChange={value => {
        onClose && onClose()
        const { action } = options.find(f => f.name === value);
        !!action && action()
      }}
      label={<Tiny sx={{color: 'inherit'}} icon={MoreVert} />}
      />
  )
}
 

const ContentTree = (props) => {
  const [anchor, setAnchor] = React.useState({
    element: null,
    elementID: null
  });
  const { element, elementID } = anchor;

  const handlePopoverClose = () => setAnchor({}); 
  const handlePopoverClick = (elementID) => (event) => { 
    setAnchor({
      element: event.currentTarget,
      elementID
    });
  };
  const { queryState = {}, appContext, selectedPage  } = React.useContext(AppStateContext);
  const { selectedComponent = {}} = queryState;
  const componentParent = selectedPage || appContext;
  const reactly = useReactly();
  const { selectComponent } = React.useContext(EditorStateContext);
  if (!componentParent) {
    return <i />
  }
  const tree = componentParent.components;
  const onCreate = (type, options) => reactly.createComponent(type, options)

  if (!tree) return <i />
  const components = tree.filter(f => !f.componentID);
  return (
   <>
    <Content> 
      <List dense>
        {components 
        .sort(componentOrder)
        .map(c => <Contents  
          onSelect={selectComponent}  
          onCustomName={reactly.onCustomName}
          quickComponent={reactly.quickComponent}
          onCreate={onCreate} 
          onNameChange={reactly.onNameChange} 
          onDrop={reactly.onDropComponent} 
          handlePopoverClick={handlePopoverClick}
          key={c.ID}
          {...props}
          selectedComponent={selectedComponent} 
          trees={tree} 
          key={c.ComponentName} 
          tree={c} /> )} 


        <Contents label={<Link onClick={handlePopoverClick()}>Add component</Link>} indent={0} />

      </List>

    </Content>
   <Popover
      open={!!anchor.element}
      anchorEl={anchor.element}
      onClose={handlePopoverClose} 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}>

   <Box sx={{p:2}}>
   <ComponentList componentID={anchor.elementID} />
   </Box>
   </Popover>
   </>
  );
};

const getChildNames = (node, nodes, out = []) => { 
  const children = nodes.filter(t => t.componentID === node.ID);
  out.push(node.ComponentName.toLowerCase());
  children.map(child => getChildNames(child, nodes, out));
  return out;
}

const Contents = ({  tree, parentID, onDrop, trees,  handlePopoverClick,
  onCustomName, quickComponent, label, indent = 0, onNameChange, 
  onCreate, onSelect, selectedComponent, ...props  }) => { 
  const { Library } = React.useContext(AppStateContext);
  const kids = !!label ? [] : trees.filter(t => t.componentID === tree.ID);
  const on = !!label ? null : selectedComponent?.ID === tree.ID;
  const [over, setOver] = React.useState(false);

  

  const { expandedNodes, setExpandedNodes } = React.useContext(EditorStateContext);
  let expanded = !!tree && !!expandedNodes[tree.ID]

 
  const { filterText } = props; 

  if (filterText?.length && tree) {
    const kidNames= getChildNames(tree, trees);
    expanded = expanded || kidNames.find(kid => kid.indexOf(filterText.toLowerCase()) > -1); // .indexOf(tree.ComponentName?.toLowerCase()) > -1
  }

  
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
   
  let allowedChildren;
  let allowChildren;
  try {

    allowedChildren = !tree ? null : Library[tree.ComponentType].allowedChildren;
    allowChildren = !tree ? null : Library[tree.ComponentType].allowChildren;
  } catch (ex) {
    // console.log ({ ex })
  }

  const baseIcon = expanded ? Remove : Add;
  const ExpandIcon = (!!kids.length || allowChildren) ? baseIcon : RadioButtonUnchecked;

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
          {(!!kids.length || allowChildren) && !!tree && <Tiny sx={{mr: 1}} onClick={()  => expand(tree.ID)} icon={ExpandIcon} />}
          {!kids.length && <Tiny sx={{mr: 1}} icon={RadioButtonUnchecked} />}
           <Tiny sx={{mr: 1}} icon={Icon} /> 
        </ListItemIcon>


        <ListItemText sx={{pl: 0}} primary={<NodeText 
            indent={indent}
            onClick={() => onSelect && onSelect(tree, on)} 
            sx={{
              fontWeight: on ? 600 : 400,  
              fontSize: '0.85rem'
            }}
         > <SearchLine text filter={filterText}>{nodeLabel}</SearchLine></NodeText>} />
        {!!tree && <ListItemSecondaryAction> 
          {on && <Tiny onClick={() => onSelect && onSelect(tree, on)}  icon={Close}  sx={{mr: 1}} />}

          {/* <TinyonClick={() => onDrop && onDrop(tree.ID)}  icon={Delete}  /> */}
          
          <DeleteConfirmMenu hidden={!(on || over)}  sx={{mr: 1}} message={`Delete component ${nodeLabel}?`} 
              onDelete={(e) => !!e && onDrop(tree.ID, true)}/>

          <ComponentQuickMenu parentID={parentID} component={tree} />
 
        </ListItemSecondaryAction>}
      </Tooltag>  
      
      <Collapse in={expanded}>
        
        {!!kids?.length && <>{kids 
          .sort(componentOrder)
          .map(c => <Contents 
            {...props}
            handlePopoverClick={handlePopoverClick}
            quickComponent={quickComponent} 
            onCreate={onCreate} 
            onDrop={onDrop} 
            onCustomName={onCustomName}
            parentID={tree.ID} 
            selectedComponent={selectedComponent} 
            onNameChange={onNameChange}
            onSelect={onSelect} trees={trees} indent={indent + 3} key={c.ID} tree={c} /> )}</>}
  
        {allowChildren && !allowedChildren && <Contents   handlePopoverClick={handlePopoverClick}
          label={<Link onClick={handlePopoverClick(tree.ID)}>Add component</Link>} indent={indent + 3} />} 

        {!!allowedChildren && allowedChildren.map(allowed => <Contents 
          label={<Link onClick={() => quickComponent(allowed, tree.ID)}>Add {allowed}</Link>} indent={indent + 3} />)} 

      </Collapse>

       </>
  );
};

ContentTree.defaultProps = {};
export default ContentTree;
