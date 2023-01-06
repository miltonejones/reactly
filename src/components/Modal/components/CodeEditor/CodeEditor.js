import React from 'react'; 
import { styled, Box , Switch, IconButton} from '@mui/material'; 
import { Flex, TextBox, CodePane } from '../../..'
import { Edit } from "@mui/icons-material";   

const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));

const CodeEditor = ({ onChange, code, allowEdit }) => {
 
  const ref = React.useRef(null)
  const syntaxRef = React.useRef(null)
  const [editMode, setEditMode] = React.useState(false)
  const [js, setJS] = React.useState(code);  
 
  const setCode = (data) => {
    // alert (data)
    setJS(data);
    onChange && onChange(data);
  }
  return (
    <Layout data-testid="test-for-CodeEditor">
     
{/* 
     {!js && <Flex sx={{ justifyContent: 'center', border: 1, borderColor: 'divider', height: syntaxRef.current?.offsetHeight}}>
      Loading...
     </Flex>} */}

     {!editMode  && <Box  ref={syntaxRef}
          sx={{ position: 'relative', maxHeight: 460 }}>
        {!!allowEdit &&  <IconButton
            sx={{
              position: 'absolute',
              top: 20,
              right: 20
            }} 
            >
            <Edit />
          </IconButton>}

          <CodePane 
            style={{maxHeight: 400, overflow: 'auto'}}
            code={js}
            onCodeChange={setCode}
          />
 
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
 
       {allowEdit && <Flex onClick={() => setEditMode(!editMode)}>
        <Switch checked={editMode} />
        Edit mode 
       </Flex>}
    </Layout>
  );
}


CodeEditor.defaultProps = {};
export default CodeEditor;
