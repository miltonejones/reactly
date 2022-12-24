import React from 'react';
import { styled, Box } from '@mui/material';
import { Flex, Tiny, Text, PopoverPrompt, QuickMenu, TinyButton, DeleteConfirmMenu, Spacer } from '../../..';
 import { Code, Close, Info, Save, DriveFileMove, Error, Add } from "@mui/icons-material"; 
import { useScriptReferences } from '../../../../hooks/useScriptReferences';


const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(0)
}));
 
export const RefsMenu = ({ ID, hidden, title, setHidden, onSelect }) => {

  const {  getScriptReferences } = useScriptReferences()
  if (!ID) {
    return <i />
  }

  const eventList = getScriptReferences(ID)

  const handleMenuClick = value => { 
    setHidden && setHidden(true)
    if (!onSelect) return;
    const node = eventList.find(f => f.label === value);
    if (node?.script) {
      onSelect(node.script);
    }
  }

  return <QuickMenu
    emptyMsg={<Text error active><Error /> This function is not used</Text>}
     title={title} 
     options={eventList.map(f => f.label)} 
     onChange={handleMenuClick}
     label={<Tiny icon={Info} hidden={hidden}  />}/>

  
}
  

export const Bar = styled(Box)(({ theme, active, big, indent = 0 }) => ({
  display: 'flex',
  gap: theme.spacing(1) ,
  marginLeft: theme.spacing(indent),
  alignItems: 'center', 
  width: big ? `calc(440px - ${theme.spacing(indent)})` : `calc(95% - ${theme.spacing(indent)})`,
  // padding: theme.spacing(0.5, 0),
  fontWeight: active? 600 : 400,
  cursor: 'pointer',
  transition: 'all 0.2s linear',

  // outline: 'dotted 1px gray'
}));


const ScriptLine = ({
  big,
  active,
  indent,
  dirty,

  onScriptComment,
  onFolderMove,
  folderList,
  setSelected,
  handleChange,
  handleDrop,
  setDirty,

  ...props
}) => {
  const [hide, setHidden] = React.useState(true);
  const { name, ID, code, comment, parentID } = props;
  const script = { name, ID, code, comment, parentID } 
  const hidden =  hide && !active;

  const {  getScriptReferences } = useScriptReferences() 
  const eventList = getScriptReferences(ID)

 return (
   <Layout data-testid="test-for-ScriptLine"
   onMouseEnter={() => setHidden(false)}
   onMouseLeave={() => setHidden(true)}
    >
 
      <Bar big={big}
        active={active} 
        indent={indent}
        >
          <Text small active>JS</Text>
          {/* <Tiny icon={Code} />  */}

          <Text small
            error={eventList.length === 0}
            sx={{fontWeight: active ? 600 : 400}}
            onClick={() => setSelected(props)}
            >{name}
          </Text>

          <Spacer />

          {active && dirty && <Tiny hidden={hidden}
              onClick={() => {
              handleChange( ID, name, code, comment )
              setDirty(false);
            }}  
            icon={Save}  
            onClick={() =>  setSelected( {code: ''} ) } 
            /> }

          {active && <Tiny hidden={hidden} icon={Close}  onClick={() =>  {
            setSelected( {code: ''} ) ;
            setDirty(false)
          }} /> }

        <RefsMenu ID={ID} hidden={hidden} title={name} setHidden={setHidden}/>

       {!!folderList.length && <QuickMenu  options={folderList.map(f => f.name)}
          title={`Move ${name} to`}
          onChange={e => {
            if (!e) return;
            const dir = folderList.find(f => f.name === e);
            onFolderMove(ID, name, code, dir.ID)

          }}
          label={<Tiny hidden={hidden} icon={DriveFileMove} />}/>}
      
        <DeleteConfirmMenu hidden={hidden} small message={`Delete script "${name}"?`}    
          onDelete={e =>  !!e && handleDrop(ID, true) } /> 

      </Bar>

      <Bar big={big} 
        indent={indent  + 3}
        >
          <PopoverPrompt  
            component={Text} 
            muted
            small
            value={comment}
            onChange={value => !!value && onScriptComment(script, value)}
            label={`Add comment to "${name}"`}  
            > 
            {comment || "Add comment..."}
          </PopoverPrompt>  

        </Bar>
      
   </Layout>
 );
}
ScriptLine.defaultProps = {};
export default ScriptLine;
