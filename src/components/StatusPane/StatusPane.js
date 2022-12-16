import React from 'react';
import { styled, Box, Tabs } from '@mui/material';
import { TabButton } from '..'; 
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(2),
 minWidth: 600,
 minHeight: 400,
 maxWidth: '600px !important',
 '& .MuiPaper-root': {
  minWidth: 600,
  maxWidth: '600px !important',
 }
}));
 
const StatusPane = () => {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


 return (
   <Layout data-testid="test-for-StatusPane">
    [{value}]
      <Tabs sx={{minHeight: 24, mt: 1, ml: 1 }}  value={value} onChange={handleChange}  >
        <TabButton   label="Application"   /> 
        <TabButton   label="Page"   /> 
        <TabButton   label="Resources"   /> 
      </Tabs>
   </Layout>
 );
}
StatusPane.defaultProps = {};
export default StatusPane;
