import React from 'react';
import Highlight from 'react-highlight'
import { styled, FormControlLabel, Box,  IconButton, Drawer, TextField,
  Divider, Typography, Stack, Grid, Card, Switch, Alert, Pagination } from '@mui/material';
import { CodePane, DeleteConfirmMenu, Flex, Spacer, TextBtn , Tiny, TinyButton, Text, TextBox, QuickMenu, SearchBox } from '..';
import { Close, Gamepad, Edit, CloseFullscreen, OpenInFull, Add, AutoStories, MoreVert, Help, RecentActors, Code, Delete, Save } from "@mui/icons-material"; 
import { PopoverInput } from '../Control/Control';
import { AppStateContext } from "../../hooks/AppStateContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
 
const Layout = styled(Box)(({ theme, big }) => ({
  padding: theme.spacing(2),
  minHeight: big ? '90vh' : '40vh',
  transition: 'all 0.2s linear'
}));
 
const Bar = styled(Box)(({ theme, active, big }) => ({
  display: 'flex',
  gap: theme.spacing(1) ,
  alignItems: 'center',
  borderBottom: 'solid 1px ' +  theme.palette.divider,
  width: big ? 360 : '90%',
  padding: theme.spacing(0.5, 0),
  fontWeight: active? 600 : 400,
  cursor: 'pointer',
  transition: 'all 0.2s linear'
}));
 
const ScriptDrawer = ({ open, scripts = [], application, handleSwitch, 
  handleScriptPromote, handleDrop, handleClose, handleChange }) => {

  
    

  const ref = React.useRef(null)
  const [css, setCss] = React.useState(localStorage.getItem('js-theme'));
  const [page, setPage] = React.useState(1);
  const [filter, setFilter] = React.useState('');
  const [assist, setAssist] = React.useState('')
  const [selected, setSelected] = React.useState({})
  const [editMode, setEditMode] = React.useState(false)
  const [dirty, setDirty] = React.useState(false)
  const [big, setBig] = React.useState(false)
  const [error, setError] = React.useState('')
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { ID, name, code } = selected;

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
     setSelected(s => ({...s, code: text }))
  }

  const handleAliasOpen = event => {
    setAnchorEl(event.currentTarget)
  } 

  const handleAliasClose = event => {
    setAnchorEl(null)
  } 

  const handleDrawerClose = event => {
    setPage(1)
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
    const script = await EditCode(js.code,  js.name);
    if (!script) return;
    if (script === -1) {
      return handleChange (null, null, js.code, res => setSelected(res), js.name)
    }

    
    return handleChange (js.ID, js.name, script, res => alert(js.name + ' was saved!'), js.name, pageID)
   
  }

  const spaces = s => s.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1")
 
  const scriptMenu = application.pages?.filter(f => f.ID !== targetPage?.ID)
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
  }, [])

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

  const page_size = big ? 18 : 8;
  const filtered = scripts
    .filter(f => !filter || f.name.toLowerCase().indexOf(filter.toLowerCase()) > -1)
  const pageCount = Math.ceil(filtered?.length / page_size);
  const startPage = Math.min(page, pageCount)
  const startSlice = (startPage - 1) * page_size;
  const visible = filtered.slice(startSlice, startSlice + page_size)

  if (appBusy) {
    return <>loading...</>
  }

 return (

  <Drawer open={open} anchor="bottom">
   <Layout big={big}>
    <Flex>
      <Typography variant="subtitle1">
        <b>{targetPage?.PageName || 'Application'} scripts</b>
      </Typography>


      <TextBtn onClick={handleAliasOpen} endIcon={<Add />}>Add</TextBtn>

      <QuickMenu 
        title="Import script"
        options={scriptMenu.map(m => m.name)}
        label={<TextBtn endIcon={<MoreVert />}>Import</TextBtn>}
        onChange={(val) => {
          const { action } = scriptMenu.find(f => f.name === val);
          !!action && action()
        }}
        />

        {!!selected.ID && !!targetPage?.PageName && <TextBtn variant="contained" 
          color="warning"
          onClick={async () => {
            const ok = await handleScriptPromote(ID);
            // if (!ok) return;
            setSelected(c => ({ code: '' }))
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
      <Grid item xs={big ? 3 : 6} sx={{pt: 0, pl: 0}}>
        <Typography variant="caption"><b>Available scripts</b></Typography>
        
        <Divider sx={{mb: 1}} />

        {/* pagination  */}
        <Flex sx={{ mb: 1, mr: 10 }}>
        {pageCount > 1 && <Pagination count={pageCount} color="primary" variant="rounded" 
          sx={{mb: 2}} page={Math.min(page, pageCount)} onChange={(e, p) => setPage(p)}/>}
        <Spacer />

        {/* search box  */}
        {!big && <SearchBox 
         placeholder="Filter script name"
          onChange={e => setFilter(e.target.value)}
          onClose={() => setFilter('')} size="small" label="Filter" sx={{mr: 10}}/>}
        </Flex>

        {/* big view search box  */}
        {!!big && <Box sx={{mr: 2}}>
          <SearchBox 
         placeholder="Filter script name"
        
          onChange={e => setFilter(e.target.value)}
          onClose={() => setFilter('')} size="small" label="Filter"/>
          </Box>}

        {/* script list  */}
        {visible.map(s => <Bar big={big}
            active={s.ID === ID}
          ><Tiny icon={Code} /> <Text small
          sx={{fontWeight: s.ID === ID ? 600 : 400}}
          onClick={() => setSelected(s)}>{s.name}</Text>
          <Spacer />
          {s.ID === ID && dirty && <TinyButton onClick={() => {
              setDirty(false);
            handleChange( ID, name, code)
          }}  icon={Save}  onClick={() =>  setSelected( {code: ''} ) } /> }
          {s.ID === ID && <TinyButton icon={Close}  onClick={() =>  {
            setSelected( {code: ''} ) ;
            setDirty(false)
          }} /> }
                <DeleteConfirmMenu message={`Delete script "${s.name}"?`}    
        onDelete={e =>  !!e && handleDrop(s.ID, true) } /> 
           
         </Bar>)}

      </Grid>

      <Grid item xs={big ? 9 : 6}> 

      {!editMode  && <Box sx={{ position: 'relative' }}>
          {/* <IconButton
            sx={{
              position: 'absolute',
              top: 20,
              right: 20
            }}
            >
            <Edit />
          </IconButton> */}
 
            <CodePane  
              onMouseDown={e => { 
                !!assist && scriptInsert(assist)
              }}
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
{/* 
          <SyntaxHighlighter language="javascript" 
       
          showLineNumbers  customStyle={{ fontSize:  '0.95rem' }}> 
            {code}
          </SyntaxHighlighter> */}

          {/* <Highlight style={{fontSize:  '0.7rem'}} className={
            ['javascript', big ? 'big' : ''].join(' ')
          }> 
            {code}
          </Highlight> */}
        </Box>}

        {!!editMode  && <TextBox 
        
          onKeyUp={e => {
            console.log ({ e });
            if (!e) return;
            const pos = getCursorPos(e);
            console.log ({ pos })
          }}
          value={code} 
          disabled={!name}
          multiline
          fullWidth
          rows={big ? 32 : 14}
          onChange={e => {
            setCode(e.target.value)
            setDirty(true);
            }} />}

        <Flex>
       
        {/* <FormControlLabel 
          label="Edit Mode"
          control={   <Switch  size="small"
            checked={editMode}
            onChange={e => { 
               setEditMode( e.target.checked)
            }} 
          /> }
        /> */}

        <QuickMenu options={styleNames} small label={<TextBtn endIcon={<MoreVert />}>
          {spaces(css? `Theme: ${css}` : "Theme")}
        </TextBtn>} value={css} onChange={e => !!e && (() => {
          setCss(e)
          localStorage.setItem('js-theme', e)
        })()} />

        {!!error && <Alert severity="error">{error}</Alert>}
       <QuickMenu options={api} onChange={scriptInsert} 
          value={assist} label={<TextBtn endIcon={<Help />}>{assist || 'methods'}</TextBtn>}/>
      
          <Spacer />
          <TextBtn onClick={() => {
          setSelected( {code: ''} )
        }}  > 
          cancel
        </TextBtn>
          <TextBtn onClick={() => { 
            setDirty(false);
          handleChange( ID, name, code)
        }} endIcon={<Save />}  
          variant="contained"
          disabled={!selected.code || !dirty || error}
          > 
          save script
        </TextBtn>
        <IconButton onClick={() => {
           setBig(!big);
           setPage(1)
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

function getCursorPos(input) {
  if ("selectionStart" in input && document.activeElement == input) {
      return {
          start: input.selectionStart,
          end: input.selectionEnd
      };
  }
  else if (input.createTextRange) {
      var sel = document.selection.createRange();
      if (sel.parentElement() === input) {
          var rng = input.createTextRange();
          rng.moveToBookmark(sel.getBookmark());
          for (var len = 0;
                   rng.compareEndPoints("EndToStart", rng) > 0;
                   rng.moveEnd("character", -1)) {
              len++;
          }
          rng.setEndPoint("StartToStart", input.createTextRange());
          for (var pos = { start: 0, end: len };
                   rng.compareEndPoints("EndToStart", rng) > 0;
                   rng.moveEnd("character", -1)) {
              pos.start++;
              pos.end++;
          }
          return pos;
      }
  }
  return -1;
}