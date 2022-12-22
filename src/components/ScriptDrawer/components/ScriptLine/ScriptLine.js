import React from 'react';
import { styled, Box } from '@mui/material';
import { Flex, Tiny, Text, QuickMenu, TinyButton, DeleteConfirmMenu, Spacer } from '../../..';
 import { Code, Close, Save, DriveFileMove, Add } from "@mui/icons-material"; 


const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(0)
}));
 

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

  onFolderMove,
  folderList,
  setSelected,
  handleChange,
  handleDrop,
  setDirty,

  ...props
}) => {
  const [hide, setHidden] = React.useState(true);
  const { name, ID, code, parentID  } = props;
  const hidden =  hide && !active
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
            sx={{fontWeight: active ? 600 : 400}}
            onClick={() => setSelected(props)}
            >{name}
          </Text>

          <Spacer />

          {active && dirty && <Tiny hidden={hidden}
              onClick={() => {
              handleChange( ID, name, code )
              setDirty(false);
            }}  
            icon={Save}  
            onClick={() =>  setSelected( {code: ''} ) } 
            /> }

          {active && <Tiny hidden={hidden} icon={Close}  onClick={() =>  {
            setSelected( {code: ''} ) ;
            setDirty(false)
          }} /> }

        <QuickMenu  options={folderList.map(f => f.name)}
          onChange={e => {
            if (!e) return;
            const dir = folderList.find(f => f.name === e);
            onFolderMove(ID, name, code, dir.ID)

          }}
          label={<Tiny hidden={hidden} icon={DriveFileMove} />}/>
      
        <DeleteConfirmMenu hidden={hidden} small message={`Delete script "${name}"?`}    
          onDelete={e =>  !!e && handleDrop(ID, true) } /> 

      </Bar>
      
   </Layout>
 );
}
ScriptLine.defaultProps = {};
export default ScriptLine;
