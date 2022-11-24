import React from 'react';
import { styled, Alert, Box, Paper, FormControlLabel, Switch } from '@mui/material';
import { getStyles } from '../library/util';
import Library, { Styles } from '../library';
import { ComponentCollapse } from '..';
import { Json } from '../../colorize';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const ComponentStyles = ({ component, onChange }) => {
  const [checked, setChecked] = React.useState(false);
  if (!component?.styles) {
    return <Alert>This component has no configurable settings.</Alert>
  }
  const args = getStyles(component.styles);
  const { categories } = Styles [component.ComponentType] ?? []

  const handleChange = async (event) => {
    setChecked(event.target.checked);  
  };

  return <>
  
  {!checked && categories.map(category => <ComponentCollapse
    component={component}
    onChange={onChange}
    {...category}
    settings={category.styles}
    args={args}
    key={category.name}
  />)}
  
    {!!checked && <Paper sx={{m: 1, p: 2, height: 'calc(100vh - 300px)'}}><Json>
      {JSON.stringify(args,0,2)}
    </Json></Paper>}

  <FormControlLabel
    sx={{m: 1}}
          label="Show CSS"
          control={ <Switch 
            checked={checked}
            onChange={handleChange} 
          />}
        />

  </>


//  return (
//    <Layout data-testid="test-for-ComponentStyles">
//     {JSON.stringify(args)}
//    </Layout>
//  );
}
ComponentStyles.defaultProps = {};
export default ComponentStyles;
