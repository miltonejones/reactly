import React from 'react';
import { Box, Link, Collapse, Typography } from "@mui/material"; 
import { RadioButtonUnchecked } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
import { Tiny, Flex, Text } from '../..';
  
 
const Check = ({ on }) => <Tiny icon={on ? Icons.CheckCircle : Icons.CheckCircleOutline} />

const ReactlyComponentTreeview = ({ onNodeClick, children, ...props }) => {
  const [selected, setSelected] = React.useState(null)
  const args = getSettings(props.settings);
  const DefaultEndIcon = Icons[props.defaultEndIcon || args.defaultEndIcon]  

  const rootNodes = !props.items 
    ? []
    : props.items?.filter(item => item.parent === '')

 return (
   <ReactlyComponent component={Box}  {...args} >
    {rootNodes?.map((node, e) => <TreeNode key={e} index={e} 
    selected={selected}
    setSelected={setSelected}
    variant={args.variant} onNodeClick={onNodeClick} nodes={props.items} node={node} />)}
      {/* <pre>
      [{JSON.stringify(props.items,0,2)}]
      </pre> */}
   </ReactlyComponent>
 ); 
}

const TreeNode = ( props ) => {
  const { nodes, node, selected, setSelected, onNodeClick, index, variant, indent = 0 } = props;
  const [open, setOpen] = React.useState(false);
  const children = nodes.filter(f => f.parent === node.path);
  const icon = children.length 
    ? <Check on={open} />
    : <Tiny icon={ RadioButtonUnchecked }/> 

  const sliced = !children?.length ? [] : children.slice(0, 32)
  const more = children?.length - sliced.length
  return <>

  <Flex sx={{ ml: indent, cursor: 'pointer' }}
    onClick={(e) => {
      onNodeClick && onNodeClick(e, {
        index,
        ...node
      });
      setSelected(node.ID)
    }}>
    
    {icon}

    <Text 
      hover 
      active={selected === node.path}
      onClick={() => setOpen(!open)}
      >
      <Typography 
        sx={{fontWeight: selected === node.ID ? 600 : 400}}
        variant={variant}>{node.tagName}</Typography>  
    </Text>
  </Flex>
  
  <Collapse in={open}>
    {!!open && sliced?.map((child, i) => (
       <TreeNode 
        index={index + 1} 
        onNodeClick={onNodeClick} 
        nodes={nodes} 
        node={child} 
        selected={selected}
        setSelected={setSelected}
        variant={variant}
        indent={indent + 3} />
    ))}
    {!!more && <Flex sx={{ ml: indent + 3, cursor: 'pointer' }}
    >
         <Typography variant={variant}>{more} more items...</Typography>  
      </Flex>}
  </Collapse>

  </>
}

 

const ReactlyTreeview = { 
  Component: ReactlyComponentTreeview 
}
 

export default ReactlyTreeview;


