import React from 'react';
import { Box, Link, Collapse, Typography } from "@mui/material"; 
import { RadioButtonUnchecked } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
import { Tiny, Flex, Text } from '../..';
  
 
const Check = ({ on }) => <Tiny icon={on ? Icons.CheckCircle : Icons.CheckCircleOutline} />

const ReactlyComponentTreeview = ({ onNodeClick, children, ...props }) => {
  const args = getSettings(props.settings);
  const DefaultEndIcon = Icons[props.defaultEndIcon || args.defaultEndIcon]  

  const rootNodes = !props.items 
    ? []
    : props.items?.filter(item => item.parent === 'BODY')

 return (
   <ReactlyComponent component={Box}  {...args} >
    {rootNodes?.map((node, e) => <TreeNode key={e} index={e} variant={args.variant} onNodeClick={onNodeClick} nodes={props.items} node={node} />)}
      {/* <pre>
      [{JSON.stringify(props.items,0,2)}]
      </pre> */}
   </ReactlyComponent>
 ); 
}

const TreeNode = ( props ) => {
  const { nodes, node, onNodeClick, index, variant, indent = 0 } = props;
  const [open, setOpen] = React.useState(false);
  const children = nodes.filter(f => f.parent === node.path);
  const icon = children.length 
    ? <Check on={open} />
    : <Tiny icon={ RadioButtonUnchecked }/> 
  return <>

  <Flex sx={{ ml: indent, cursor: 'pointer' }}
    onClick={(e) => onNodeClick && onNodeClick(e, {
      index,
      ...node
    })}>
    
    {icon}

    <Text 
      hover 
      onClick={() => setOpen(!open)}
      >
      <Typography variant={variant}>{node.tagName}</Typography>  
    </Text>
  </Flex>
  
  <Collapse in={open}>
    {children?.map((child, i) => (
       <TreeNode 
        index={index} 
        onNodeClick={onNodeClick} 
        nodes={nodes} 
        node={child} 
        variant={variant}
        indent={indent + 3} />
    ))}
  </Collapse>

  </>
}

 

const ReactlyTreeview = { 
  Component: ReactlyComponentTreeview 
}
 

export default ReactlyTreeview;


