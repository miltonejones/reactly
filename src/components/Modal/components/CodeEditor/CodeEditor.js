import React from 'react';
import Highlight from 'react-highlight'
import { styled, Box , Switch, IconButton} from '@mui/material'; 
import { Flex, TextBox } from '../../..'
import { Edit } from "@mui/icons-material"; 
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const CodeEditor = ({ onChange, code }) => {
  const ref = React.useRef(null)
  const [editMode, setEditMode] = React.useState(false)
  const [js, setJS] = React.useState(code);

  const setCode = (data) => {
    setJS(data);
    onChange && onChange(data);
  }
  return (
    <Layout data-testid="test-for-CodeEditor">
     
     {!editMode  && <Box onClick={() => setEditMode(!editMode)} 
          sx={{ position: 'relative', maxHeight: 460 }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: 20,
              right: 20
            }}
            >
            <Edit />
          </IconButton>
          <SyntaxHighlighter language="javascript"  showLineNumbers  customStyle={{ fontSize:  '0.9rem', maxHeight: 400 }}> 
            {js}
          </SyntaxHighlighter>
          {/* <Highlight style={{fontSize:  '0.7rem'}} className="javascript"> 
            {js}
          </Highlight> */}
        </Box>}

        {!!editMode  && <TextBox 
          ref={ref}
          value={js}  
          multiline
          fullWidth
          rows={14}
          onChange={e => {
            setCode(e.target.value) 
            }} />}
 
       <Flex onClick={() => setEditMode(!editMode)}>
        <Switch checked={editMode} />
        Edit mode 
       </Flex>
    </Layout>
  );
}


CodeEditor.defaultProps = {};
export default CodeEditor;
