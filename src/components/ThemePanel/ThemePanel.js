import React from 'react';
import { Stack, styled, useTheme, Collapse, Grid, Box } from '@mui/material';
import { JsonTree } from '../../colorize';
import { ExpandMore, Save } from "@mui/icons-material";
 
import {  Flex, Text, Spacer, TextBtn , QuickMenu, TinyButton  } from '..';
import { TextInput } from '..';

const Layout = styled(Box)(({ theme }) => ({
 margin: 0
}));
 
const ThemePanel = ({ onThemeChange, themes = [] }) => {
  const initial = useTheme()
  const [selectedTheme, setSelectedTheme] = React.useState('');
  const [theme, setTheme] = React.useState(initial);
  const [dirty, setDirty] = React.useState(false);
  const [on, setOn] = React.useState({
    palette: true
  });

  const chooseTheme = name => {
    if (!name) return;
    const selected = themes.find(f => f.name === name)
    setSelectedTheme(name);
    setTheme(selected ? selected : initial)
    setDirty(false)
  }
 
  const recurse = (path, color, root ) => {
    const args = path.split('.')
    setDirty(true)
    if (args.length === 1) {
      return  setTheme(t => ({
        ...t,
        [root]: {
          ...theme[root],
          [path]: color
        }
       }))
    }

    if (args.length === 2) {
      return  setTheme(t => ({
        ...t,
        [root]: {
          ...theme[root],
          [args[0]]: {
            ...theme[root][args[0]],
            [args[1]]: color
          }
        }
       }))
    }
  }

 return (
   <Layout data-testid="test-for-ThemePanel">

<Flex sx={{p: 1}}>
  <Text small>Theme:</Text>
  <QuickMenu caret small onChange={chooseTheme} value={selectedTheme} label={selectedTheme || 'Choose theme'} 
    options={themes.map(t => t.name).concat(['-', 'Default Theme'])} />
  <Spacer />  
  
   <TextBtn 
   endIcon={<Save />} variant="contained" 
   onClick={() => {
    onThemeChange(theme?.ID, theme?.name, theme);
    setDirty(false)
  }}
   disabled={!dirty}
   >save</TextBtn>
   
</Flex>

  <ThemeCollapse on={on.palette} label="Palette"
     closeCollapse={val => setOn(s => ({...s, palette: val}))}>
       <JsonTree onChange={(prop, val) => recurse(prop, val, 'palette')} edit json={theme.palette} />
   </ThemeCollapse>


   <ThemeCollapse on={on.typo} label="Typography"
      closeCollapse={val => setOn(s => ({...s, typo: val}))}>
      <JsonTree onChange={(prop, val) => recurse(prop, val, 'typography')}  edit json={theme.typography} />
    </ThemeCollapse>
 
    <ThemeCollapse on={on.transitions} label="Transitions"
      closeCollapse={val => setOn(s => ({...s, transitions: val}))}>
      <JsonTree onChange={(prop, val) => recurse(prop, val, 'transitions')}  edit json={theme.transitions} />
    </ThemeCollapse>

  <ThemeCollapse on={on.breakpoints} label="Breakpoints"
    closeCollapse={val => setOn(s => ({...s, breakpoints: val}))}>

    {theme.breakpoints?.keys?.map(key => <Flex key={key} spacing={1} sx={{mt: 1}}>
    
    <Box sx={{width: 40, textAlign:'right', pl: 2}}>
    <Text small>{key}</Text>
    </Box>
    <TextInput value={theme.breakpoints.values[key]} onChange={(e) => recurse('values.' + key, e.target.value, 'breakpoints')} size="small"/>
    </Flex>)}

  </ThemeCollapse>


    <ThemeCollapse on={on.shadows} label="Shadows"
      closeCollapse={val => setOn(s => ({...s, shadows: val}))}> 
      <Grid container spacing={2} sx={{m: 1 }}>
        {theme.shadows?.filter(f => f !== 'none').map((shadow, i) => <Grid 
           item xs={3}>

          <Flex sx={{width: 40 , height: 40, boxShadow: shadow, justifyContent: 'center'}}> {i + 1}</Flex>
         
        </Grid>)}
      </Grid>
    </ThemeCollapse>

    <Flex sx={{mt: 2}}> 
      <Spacer />
      <TextBtn endIcon={<Save />} variant="contained" 
        disabled={!dirty}
        onClick={() => {
         onThemeChange(theme?.ID, theme?.name, theme);
         setDirty(false)
       }}
        >save</TextBtn>
    </Flex>
 
     {/* <pre>
      {JSON.stringify(theme.shadows,0,2)}
      </pre> */}
   </Layout>
 );
}

function ThemeCollapse ({ children, label, on, closeCollapse}) {
  return <>
   <Stack>
    <Box sx={{p: 1, cursor: 'pointer', 
        borderBottom:  1, borderColor: 'divider' 
        }} onClick={() =>  closeCollapse && closeCollapse(!on)}>
      <Flex>
      <Text small variant="caption"><b>{label}</b></Text>
      <Spacer />
      <TinyButton 
        icon={ ExpandMore} deg={on   ? 180 : 0} />
      </Flex>
    </Box>

    <Collapse in={on}>
       {children}
    </Collapse>
  </Stack>
  </>
}
ThemePanel.defaultProps = {};
export default ThemePanel;
