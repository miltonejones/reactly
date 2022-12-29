import React from 'react';
import { styled, Box, Stack } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useClipboard, Text, Flex } from '../../..';
 
const Layout = styled(Stack)(({ theme }) => ({
  margin: theme.spacing(1),
 }));
 
const Copiee = styled(Box)(({ theme }) => ({
  position: 'relative'
}));

const Copier = styled(Box)(({ theme }) => ({
  cursor: 'pointer',
  top: 10,
  fontSize: '0.9rem',
  padding: theme.spacing(1, 2),
  right: 0,
  backgroundColor: theme.palette.grey[300],
  position: 'absolute',
  opacity: 0.2,
  '&:hover': {
    opacity: 1
  },
  '&:active': {
    fontWeight: 600
  }
 }));
   
const ScriptAssist = ({ label, description, async, snippet }) => {
  const { copy } = useClipboard()
 return (
   <Layout data-testid="test-for-ScriptAssist">
    <Flex spacing={1}>

    {!!async &&  <Text active small error>ASYNC</Text>}
      <Text active>{label}</Text>
    </Flex>
    <Text small>{description}</Text>
   <Copiee>
    <Copier onClick={() => copy(snippet)}>copy</Copier>
   <SyntaxHighlighter 
          language="javascript"  >{snippet}</SyntaxHighlighter>
   </Copiee>
   </Layout>
 );
}
ScriptAssist.defaultProps = {};
export default ScriptAssist;
