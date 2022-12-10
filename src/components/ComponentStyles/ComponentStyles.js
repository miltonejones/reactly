import React from 'react';
import { styled, Alert, Box, Paper, FormControlLabel, Collapse, Stack, Switch } from '@mui/material';
import { getStyles } from '../library/util'; 
import { ComponentCollapse, QuickSelect , Text} from '..';
import { Json } from '../../colorize';
import {  AppStateContext } from '../../hooks/AppStateContext'; 
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const ComponentStyles = ({ component, onChange }) => {
  const [busy, setBusy] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [css, setCss] = React.useState('');
  const { Library } = React.useContext(AppStateContext);
  const { selectors } = Library[component.ComponentType];
  const { categories } =  Library[component.ComponentType].Styles  ?? {}
  if (!(categories && component?.styles)) {
    return <Alert sx={{ m: 1 }}>This component has no configurable styles.</Alert>
  }


  const componentList = !css ? component.styles?.filter(s => !s.selector) : component.styles?.filter(s => s.selector === css)
  const args = getStyles(componentList);

  const handleChange = async (event) => {
    setChecked(event.target.checked);  
  };
 
  const handleCssChange = async (ID, label, value) => {
    if (css?.length) { //white
      return onChange(ID, label, value, css);  
    }
    onChange(ID, label, value);  
  };

  if (!(categories && categories.map)) {
    return <Alert>could not render categories</Alert>
  }

  if (busy) {
    return <>loading</>
  }

  const changeCss = style => {
    setBusy(true);
    setTimeout(() => {
      setCss(style)
      setBusy(false);
    }, 99)
  }

 
  return <> 
 
 <Collapse in={!!selectors}>
     <Stack sx={{p: 1}}>
      <Text small>Component sub-classes</Text>
     {!!selectors && <QuickSelect
      
      options={Object.keys(selectors)}
      value={css}
      onChange={changeCss}
    />}

     </Stack>
    </Collapse>

{/* {JSON.stringify(componentList)}

{JSON.stringify(css)} */}

  {!checked && categories.map(category => <ComponentCollapse
    component={component}
    onChange={handleCssChange}
    {...category}
    selectors={selectors}
    selector={css}
    settings={category.styles}
    css={componentList}
    args={args}
    key={category.name}
  />)}
  
    {!!checked && <Paper sx={{m: 1, p: 2, height: 'calc(100vh - 300px)'}}><Json css>
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
