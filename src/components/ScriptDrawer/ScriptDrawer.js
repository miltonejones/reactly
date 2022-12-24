import React from 'react';
import Highlight from 'react-highlight'
import { styled, FormControlLabel, Box,  IconButton, Drawer, TextField, Collapse,
  Divider, Typography, Stack, Grid, Card, Tabs, Switch, Alert, Pagination } from '@mui/material';
import { CodePane, DeleteConfirmMenu, Flex,  Spacer, TextBtn , Tiny, TinyButton, 
    Text, TextInput, TextBox, TabButton, QuickMenu, SearchBox, PillMenu } from '..';
import { Close, Settings, Gamepad, Edit, CloseFullscreen, OpenInFull, Add, ExpandMore, NodeAdd,
  Remove, AutoStories, MoreVert, CreateNewFolder, Help, RecentActors, Code, Delete, Save } from "@mui/icons-material"; 
import { PopoverInput, PopoverPrompt } from '../Control/Control';
import { AppStateContext } from "../../hooks/AppStateContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ScriptLine, Bar } from './components';
import { CodeTabs } from './components';
import { ScriptTree } from './components';
import { useRunScript } from '../../hooks/subhook/useRunScript';
 
const Layout = styled(Box)(({ theme, big }) => ({
  padding: theme.spacing(2),
  minHeight: big ? '90vh' : '40vh',
  transition: 'all 0.2s linear'
}));

const SearchItem = styled(Box)(({ theme, active }) => ({
  cursor: 'pointer',
  padding: theme.spacing(1),
  color: active ? 'white' : '#222',
  backgroundColor: active ? theme.palette.primary.main : 'white',
  borderRadius: 5,
  marginRight: theme.spacing(1),
  '&:hover': {
    color: active ? 'cyan' : theme.palette.primary.main,
    '& .hover': {
      textDecoration: 'underline'
    }
  },
}))

const SearchLine = ({ children, filter}) => {

  if (!(children && typeof children === 'string')) {
    return <i />
  }
    const [first, last] = children.split(filter);
    const prefix = first?.substr(first.length - 40);
    const suffix = last?.substr(0, 40);

    return <code style={{letterSpacing: 0.2, fontSize: '0.9rem'}}>
    ...{prefix}<b>{filter}</b>{suffix}...
    </code>

}
  
 
const ScriptDrawer = ({ open, scripts = [], application, handleSwitch, 
  handleScriptPromote, handleDrop, handleClose, handleChange: handleScriptChange }) => {

  
  const handleChange = ( 
    scriptID, name, code, 
    fn, existingName, pageID) => {
      handleScriptChange(
        scriptID, name, code, 
        { fn, existingName, pageID } 
      ); 
  }

  const createScriptFolder = (
    scriptID, name, parentID
  ) => {
    handleScriptChange(scriptID, name, null, { parentID });
  }
  
  const saveScriptToFolder = (
    scriptID, name, code, parentID, pageID
  ) => {

    handleScriptChange(scriptID, name, code, { pageID, parentID });

    // save updated code to tabs array
    setSelected({
      ID: scriptID,
      name,
      code,
      parentID
    })
  }
  
    

  const ref = React.useRef(null)
  const [css, setCss] = React.useState(localStorage.getItem('js-theme'));
  const [font, setFont] = React.useState(localStorage.getItem('js-font') || 'med');
  const [showSettings, setShowSettings] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [assist, setAssist] = React.useState('')
  const [expanded, setExpanded] = React.useState({})
  const [selected, commitSelected] = React.useState({})
  const [editMode, setEditMode] = React.useState(false)
  const [dirty, setDirty] = React.useState(false)
  const [big, setBig] = React.useState(false)
  const [error, setError] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { ID, name, code, parentID } = selected;
  const [ openScripts, setOpenScripts ] = React.useState({});
  const { getApplicationScripts } = useRunScript()

  const onSelected = object => {
    if (typeof object === 'function') {
      return commitSelected(object);
    }
    if (object.ID) { 
      setOpenScripts(scripts => ({
        ...scripts,
        [object.ID]: object
      }))
    }
    commitSelected(object);
  }

  const setSelected = object => {
    commitSelected({ code: ''});
    setTimeout(() => {
      onSelected(object)
    }, 9)
  }

  const closeTab = tabID => {
    setOpenScripts(scripts => {
      delete scripts[tabID];
      const keys = Object.keys(scripts);
      if (!!keys.length) {
        selected.ID === tabID && commitSelected(scripts[ keys[0]]); 
      } else {
        commitSelected({ code: '' });
      }
      return scripts
    })
  }


  const { 
    appBusy,
    queryState,
    appContext,
    EditCode,
    setShowTrace,
    selectedPage: targetPage
  } = React.useContext(AppStateContext);
 

  const setCode = text => {
     try {
       eval(text);
       setError('') 
     } catch (ex) {
       setError(ex.message)
     }
     setSelected({...selected, code: text })
  }

  const handleAliasOpen = event => {
    setAnchorEl(event.currentTarget)
  } 

  const handleAliasClose = event => {
    setAnchorEl(null)
  } 

  const handleDrawerClose = event => { 
    setSelected({code: ''})
    setDirty(false)
    handleClose(event)
  }

  const scriptInsert = data => {
    const target = ref.current;
    setAssist('')
    if (!target) return alert ('Nope!');
    setTimeout(() => {

      if (target.setRangeText) {
          //if setRangeText function is supported by current browser
          target.setRangeText(data) 
      } else {
          target.focus()
          document.execCommand('insertText', false /*no UI*/, data); 
      }
    }, 1299)
  }

  const editJS = async (js, pageID) =>  {
    const script = await EditCode(js.code,  js.name, true);
    if (!script) return;
    if (script === -1) {
      return  setSelected(js)
    }

      return handleChange (js.ID, js.name, script, res => alert(js.name + ' was saved!'), js.name, pageID)
   
  }

  const spaces = s => s.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
  
  const scriptList = getApplicationScripts();

  const appScripts = targetPage?.PageName ? [{
    name: <b>Application</b>
  }].concat(scriptList.filter(script => script.page === 'application')
    .map(script => ({
      ...script,
      action: () => editJS(script),
    }))) : []

  const scriptMenu = appScripts.concat(application.pages?.filter(f => f.ID !== targetPage?.ID)
    .reduce ((items, page) => {
    !!page.scripts?.length && items.push({
      name: <b>{page.PageName}</b>
    })
    page.scripts?.map(js => {
      items.push({
        ...js,
        action: () => editJS(js, page.ID), // handleChange (null, null, js.code, res => setSelected(res), js.name)
      })
    })
    return items;
  }, []))

  const api = [
    'getRef', 
    'getRefByName', 
    'openLink', 
    'openPath',
    'getPageResourceState',
    'pageResourceState',
    'Alert',
    'getResourceByName' ,
    'execResourceByName',
    'executeScriptByName',
    'execRefByName',
    'moment'
  ]
 
  const folderList = scripts.filter(f => !f.code);
  const filtered = scriptList
    .filter(f => !!f.code)
    .filter(f => f.code.toLowerCase().indexOf(filter.toLowerCase()) > -1 || 
    f.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
 

  const toptLevel = scripts.filter(f => !f.code && !f.parentID)

 

 return (

  <Drawer open={open} anchor="bottom">
   <Layout big={big}>
    <Flex>
      <Typography variant="subtitle1">
        <b>{targetPage?.PageName || 'Application'} scripts</b>
      </Typography>


      <TextBtn onClick={handleAliasOpen} endIcon={<Add />}>Add</TextBtn>

      <QuickMenu 
        title="Open script"
        options={scriptMenu.map(m => m.name)}
        label={<TextBtn endIcon={<MoreVert />}>Open</TextBtn>}
        onChange={(val) => {
          const { action } = scriptMenu.find(f => f.name === val);
          !!action && action()
        }}
        />

          <TextField 
            size="small"
            label="Search"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            sx={{mb: 1}}
            />

        {!!selected.ID && !!targetPage?.PageName && <TextBtn 
            sx={{mb: 1}}
         variant="contained" 
          color="warning"
          onClick={async () => {
            const ok = await handleScriptPromote(ID);
            // if (!ok) return;
            setSelected({ code: '' })
            setDirty(false);
            
          }}>promote "{name}"</TextBtn>}  

      <Spacer />

      <IconButton  
          color="inherit" 
          onClick={() => { 
            handleSwitch({  scriptOpen: false});
            setShowTrace(true);
          }}
      >
        <Gamepad />
      </IconButton>


      <IconButton
        color="inherit" 
        onClick={() => {
          handleSwitch({ connectOpen: 1, scriptOpen: false})
        }}
      >
        <AutoStories />
      </IconButton>

      <IconButton disabled>
        <Code />
      </IconButton>

      <IconButton
        color="inherit" 
        onClick={() => {
          handleSwitch({ scriptOpen: false, stateOpen: 1})
        }}
      >
        <RecentActors />
      </IconButton>

      <IconButton  onClick={handleDrawerClose}>
        <Close />
      </IconButton>

    </Flex>
    <Divider />
     
    <Grid container>
    {!filter && <Grid item xs={big ? 3 : 6} sx={{pt: 0, pl: 0, pr: 1}}>
        <Typography variant="caption"><b>Available scripts</b></Typography>
        
        <Divider sx={{mb: 1}} />

        <ScriptTree 
          expanded={expanded}
          setExpanded={setExpanded}
          scripts={scripts} 
          createScriptFolder={createScriptFolder}
          big={big}  
          activeID={ID}
          dirty={dirty}
          onFolderMove={saveScriptToFolder}
          setDirty={setDirty}
          folderList={folderList}
          setSelected={setSelected}
          handleChange={handleChange}
          handleDrop={handleDrop}
        />

      </Grid>}

      {!!filter && <Grid item xs={big ? 3 : 6}>


        <Typography variant="caption"><b>{filtered.length} Scripts matching "{filter}"</b></Typography>
        
        <Divider sx={{mb: 1}} />

        <Box sx={{height: big ? 'calc(100% - 130px)' : 400, 
          mr: 1, 
          overflow: 'auto'}}>
          {filtered.map(item => (
            <SearchItem active={item.ID === ID}
              onClick={() => setSelected(item)} >
              <Text className="hover" small><b>{item.page}</b>.{item.name}</Text>
              <SearchLine filter={filter}>{item.code}</SearchLine>
            </SearchItem>))}
        </Box>
          
        
        </Grid>}

      <Grid item xs={big ? 9 : 6}>  

        <CodeTabs 
          openScripts={openScripts}
          closeTab={closeTab}
          setSelected={setSelected}
          selectedID={selected.ID}
          />
 

        <Box sx={{ position: 'relative' }}>  
          <CodePane  
            onMouseDown={e => { 
              !!assist && scriptInsert(assist)
            }}
            font={font}
            css={css}
            externalRef={ref}
            onCodeChange={value => { 
              setCode(value)
              setDirty(true);
            }}
            className={
              ['javascript', big ? 'big' : ''].join(' ')
            }
            code={code}> 
          </CodePane> 
        </Box>

     

        <Flex nowrap>


        

          {!!error && <Alert severity="error">{error}</Alert>}

          <QuickMenu 
            options={api} 
            onChange={scriptInsert} 
            value={assist} 
            label={<TextBtn endIcon={<Help />}>{assist || 'methods'}</TextBtn>}
          />

          <TinyButton 
            icon={Settings} 
            deg={showSettings ? 0 : 360}
            onClick={()=>setShowSettings(!showSettings)}/>
        
          <Collapse in={showSettings} orientation="horizontal">

              <Flex nowrap>
                <Text active small>Theme</Text> 
                {/* theme menu  */}
                <QuickMenu 
                caret
              options={styleNames} small 
              label={<u>{spaces(css? `${css}` : "Choose")}</u>} 
              value={css} 
              onChange={e => !!e && (() => {
                setCss(e)
                localStorage.setItem('js-theme', e)
              })()} 
            />

            {/* font size menu  */}
            <Text active small>Font size</Text>
            <PillMenu options={['sm','med','lg']} value={font} onChange={e => {
              setFont(e);
              localStorage.setItem('js-font', e)
            }} />
              </Flex>

          </Collapse>

          <Spacer />


          <TextBtn onClick={() => {
            setSelected( {code: ''} )
          }}  > 
            cancel
          </TextBtn>
           

          <TextBtn onClick={() => { 
              setDirty(false);
              saveScriptToFolder(ID, name, code, parentID, selected.pageID)
          }} endIcon={<Save />}  
            variant="contained"
            disabled={!selected.code || !dirty || error}
            > 
            save script
          </TextBtn>
          <IconButton onClick={() => {
            setBig(!big); 
          }}>
            {big ? <CloseFullscreen /> : <OpenInFull />}
          </IconButton>
        </Flex>
      </Grid>

    </Grid>

    {/* {JSON.stringify(scripts)} */}
   </Layout>

   <PopoverInput label="Add a client script" 
    onChange={scriptName => {
      if (!scriptName) return handleAliasClose();  
      const scr = `function ${camelize(scriptName)} (page, options) {
  const { state, setState } = options; 
  // add your code here
}
`
      handleChange && handleChange(null, scriptName, scr)
      handleAliasClose();
    }} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>


  </Drawer>
 );
}

ScriptDrawer.defaultProps = {};
export default ScriptDrawer;

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

const styleNames = [   'a11yDark',
'atomDark',
'base16Ateliersulphurpoollight',
'cb',
'coldarkCold',
'coldarkDark',
'coyWithoutShadows',
'coy',
'darcula',
'dark',
'dracula',
'duotoneDark',
'duotoneEarth',
'duotoneForest',
'duotoneLight',
'duotoneSea',
'duotoneSpace',
'funky',
'ghcolors',
'gruvboxDark',
'gruvboxLight',
'holiTheme',
'hopscotch',
'lucario',
'materialDark',
'materialLight',
'materialOceanic',
'nightOwl',
'nord',
'okaidia',
'oneDark',
'oneLight',
'pojoaque',
'prism',
'shadesOfPurple',
'solarizedDarkAtom',
'solarizedlight',
'synthwave84',
'tomorrow',
'twilight',
'vs',
'vscDarkPlus',
'xonokai',
'zTouch'
]

