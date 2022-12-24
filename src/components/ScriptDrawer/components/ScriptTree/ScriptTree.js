import React from 'react';
import { styled, Collapse, Box } from '@mui/material';
import { ScriptLine, Bar } from '..';
import { Flex, Text, Tiny, TinyButton, PopoverPrompt, Spacer } from '../../..';
import { ExpandMore, CreateNewFolder } from "@mui/icons-material"; 

const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));
 
const ScriptTree = (props) => {
  const {
    big,
    scripts,
    activeID,
    createScriptFolder
  } = props;
  const [hide, setHidden] = React.useState(true);
  const topLevelFolders = scripts.filter(f => !f.code && !f.parentID);

  const orphans = scripts.filter(f => !!f.code && !f.parentID)

  return (
  <>
  {/* all scripts label  */}
    <Bar big={big}
      onMouseEnter={() => setHidden(false)}
      onMouseLeave={() => setHidden(true)}
   >

      <Tiny icon={ExpandMore} />
      <Text small active>All scripts</Text>

      <Spacer />

      <PopoverPrompt 
          hidden={hide} 
        onChange={(value) => !!value && createScriptFolder(null, value)}
        label="Creata a folder named" 
        icon={CreateNewFolder} 
        component={Tiny}
      />

    </Bar>
    
    {/* folders with no parent  */}
    {topLevelFolders?.map(dir => (
      <ScriptNode 
        parentID={dir.ID} 
        indent={2}
          {...props}
      />
    ))}

    {/* scripts with no parent  */}

    {orphans.map(s => (
      <ScriptLine 
        key={s.ID}
        {...s} 
        active={s.ID === activeID}
        indent={2}

        {...props}
        /> 
      )
    )}
  </>
 );
}

const ScriptNode = (props) => {
  const { 
    scripts, 
    indent,
    parentID, 
    expanded,
    activeID,
    setExpanded,
    createScriptFolder,
    big
  } = props;

  const [hide, setHidden] = React.useState(true);

  const currentNode = scripts.find(script =>  script.ID === parentID);

  if (!currentNode) return <Box><b>No current node with ID {parentID}</b></Box>

  const folders = scripts?.filter(script => !script.code && script.parentID === parentID);
  const files = scripts?.filter(script => !!script.code && script.parentID === parentID);

  return (
    <> 
      {/* this folder with menu  */}
      <Bar indent={indent}  big={big}
          onMouseEnter={() => setHidden(false)}
          onMouseLeave={() => setHidden(true)}
      >
        <Flex onClick={() => {
            setExpanded(s =>  ({
              ...s,
              [currentNode.ID]: !s[currentNode.ID]
            }))
          }}>

            
          <TinyButton deg={expanded[currentNode.ID] ? 0 : 270} icon={ExpandMore} /> 
          <Text active={expanded[currentNode.ID]} small>{currentNode.name} </Text>
        </Flex>

        <Spacer />


        <PopoverPrompt 
          hidden={hide} 
          onChange={(value) => !!value && createScriptFolder(null, value, currentNode.ID)}
          label="Create a folder named" 
          icon={CreateNewFolder} 
          component={Tiny}/>

      </Bar>
      <Collapse in={!!expanded[currentNode.ID]}>
        {/* child folders  */}

        {folders.map(folder => (
          <ScriptNode 
            {...props}
            parentID={folder.ID}
            indent={indent + 2}
          />
        ))}

        {/* child files  */}
        {files?.map(child => ( 
          <ScriptLine 
            key={child.ID}
            {...child}
            {...props}
            active={child.ID === activeID}
            indent={indent + 2}

            />) )}
      </Collapse> 
    </>
  )

}





ScriptTree.defaultProps = {};
export default ScriptTree;
