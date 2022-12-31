import React from 'react';
 import { styled, Box,  Stack, Tabs, Tab, Chip, Collapse,
  Typography, Divider, Alert, Switch } from '@mui/material'; 
import {  ComponentSettings, ComponentStyles, ComponentEvents, ThemePanel } from '..'; 
import { Palette, Settings, Bolt, Article, FormatColorFill } from "@mui/icons-material";
import { Spacer , QuickSelect , PopoverPrompt} from '..';
import { TextBtn, TextInput, TinyButton } from '..';
import { Flex, RotateButton, QuickMenu } from '..';
import { ExpandMore, Save, Close, ContentPaste, CopyAll, Input, Add, Delete } from "@mui/icons-material";
import { AppStateContext } from '../../hooks/AppStateContext'; 
import { Text } from '../Control/Control';
import { ApplicationForm } from '..';
import { useTextTransform } from '../../hooks/useTextTransform';
import { uniqueId } from '../library/util';
 
const Tiny = ({icon: Icon}) => <Icon sx={{m: 0, width: 16, height: 16}} />

export const TabButton = styled(Tab)(({ theme, uppercase }) => ({ 
  textTransform: uppercase ? 'uppercase' : 'capitalize',
  margin: 0,
  padding: theme.spacing(1),
  height: 24,
  minHeight: 24,
  fontSize: '0.85rem' 
}));

const ComponentPanel = ({ 
    component, 
    onSettingsChange,
    onStyleChange ,
    onPropChange,
    onThemeChange,
    onEventChange,
    setEditorState,
    editorState, 
    onMove,
    onCollapse,
    onEventDelete,
    collapsed,
    themes,
    onComponentImport,
    connections,
    resources,
    application,
    Confirm,
    onPageMove,
    onSettingsPaste
 }) => {
 
  const [ 
     
    setDisableLinks, 
    setShowSettings,  
 
  ] = [ 'disableLinks', 'showSettings', ]
    .map(name => (value) => setEditorState(key => ({ ...key, [name]: value })));

  const {   disableLinks, showSettings } = editorState;


  const { 
    queryState,
    setQueryState, 
    setMessages, 
    setOpenTraceLog,  
    setShowTrace,
    showTrace,        
    selectedPage = {},
    setDisableRequests,disableRequests,
    jsonLog, appData  } = React.useContext(AppStateContext);
  const { Library } = React.useContext(AppStateContext);
  const [value, setValue] = React.useState(0);



  const panels = [ComponentSettings, ComponentStyles, ComponentEvents, ThemePanel];
  const Panel = panels[value];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // if (!selectedPage) {
  //   return <>TBD</>
  // }

  const componentList = selectedPage?.components || application.components || [];

  const handleMove = (name) => {
    if (!name) return;
    const [type, title] = name.split(':')
    const target = componentList.find(f => f.ComponentName === title.trim());
 
    if (target) {
      return onMove && onMove(component.ID, target.ID) 
    } 
    return onMove && onMove(component.ID, null) 
  };

  const others = componentList.filter(f => !!f.children)

  const changes = [onSettingsChange, onStyleChange, onEventChange];
  const onChange = !component && !!selectedPage 
    ? onPropChange
    : changes[value];

  const selectedComponent = Library[component?.ComponentType];

  const panelProps = {
    onEventDelete:onEventDelete, 
    component:component,  
    selectedPage:selectedPage || application, 
    onChange:onChange, 
    onThemeChange:onThemeChange,
    connections:connections,
    resources:resources,
    themes:themes,
    showSettings,
    application
  }
  // setQueryState(s => ({...s, selectedComponent:on ? null :  component}))

  const onDelete = () => {
    if (!component) {
      return setQueryState(s => ({ ...s, page: null }))
    }
    setQueryState(s => ({ ...s, selectedComponent: null }))
  }

  const sx = { borderBottom: 1, borderColor: 'divider'}

  const showApp = !collapsed && !(!!component?.ComponentName || selectedPage?.PageName);


  const importable = application.pages
  .filter(f => f.ID !== selectedPage?.ID)
  .reduce((out, pg) => {
    pg.components?.filter(f => !f.componentID).map(c => {
      out.push ({
        label: `${pg.PageName}.${c.ComponentName}`,
        action: text => promptImport(pg.ID, selectedPage?.ID, c)
      });
    })
    return out;
  }, []);


  const promptImport = async (sourceID, destID, tag) => {  
    if (!tag) return;
    const ok = await Confirm(<Stack>
      <Text>Import component "{tag.ComponentName}" to this page? </Text>
      <Text small active error>Process does not clone event mappings.</Text>
    </Stack>)
    if (!ok) return; 
    onComponentImport(sourceID, destID, tag.ID);
  }

  const pasteTypes = ['settings', 'styles', 'events'];

  if (queryState.componentLoading) {
    return <Box sx={{p: 2}}>
      Loading component settings...
    </Box>
  }

  
  return <Stack>
     <Flex sx={{ m: 1}}>

      {showApp && <>
      
        <Chip label={application.Name} />

      <Spacer />

      </>} 


      {!collapsed && (!!component?.ComponentName || selectedPage?.PageName) && <>

        <Chip variant="outlined" size="small" icon={<Article />} label={!!component 
        ? `${component.ComponentType}: ${component.ComponentName}` : selectedPage?.PageName} 
        deleteIcon={ <Close />} onDelete={onDelete}/> 

      <Spacer />
        <RotateButton deg={showSettings ? 90 : 270}  onClick={
          () => setShowSettings(!showSettings)
        }>
             <Settings />
        </RotateButton>

   
       {!!component?.ComponentName && <RotateButton 
          disabled={!!queryState.clipboard}
          onClick={
          () => setQueryState(s => ({
            ...s,
            clipboard: {
              type: component?.ComponentType,
              name: component?.ComponentName,
              id: component?.ID,
              settings: component.settings,
              styles: component.styles,
              events: component.events?.map(e => ({...e, ID: uniqueId()}))
            }
          }))
        }>
             <CopyAll />
        </RotateButton>}

      </>}
       
        <RotateButton deg={collapsed ? 90 : 270}  onClick={onCollapse}>
             {collapsed ? <ExpandMore /> : <Close />}
        </RotateButton>
     </Flex>

      {!collapsed && (!!component || selectedPage) && <>
      
     <Box  sx={{ borderBottom: 1, borderColor: 'divider'  }}>
      <Tabs sx={{minHeight: 24, mt: 1, ml: 1 }} value={value} onChange={handleChange} >
        <TabButton disabled={!selectedPage && !selectedComponent?.Settings} icon={<Tiny icon={Settings}/>} iconPosition="start"  label="Settings"   />
        <TabButton disabled={!component || !selectedComponent?.Styles} 
          icon={<Tiny icon={Palette}/>} iconPosition="start"  label="Styles"  />
        <TabButton  icon={<Tiny icon={Bolt}/>} iconPosition="start"  label="Events"  />
        <TabButton icon={<Tiny icon={FormatColorFill}/>} iconPosition="start"  label="Theme"  />
      </Tabs>
    </Box>

      <Flex sx={{m: 1}}>

    {!!queryState.clipboard && 
      ((value < 3 && !!queryState.clipboard.styles)) &&
      <Chip variant="outlined"  icon={<ContentPaste />} 
        label={<>Paste <b>{queryState.clipboard.type}: {queryState.clipboard.name}</b> {pasteTypes[value]}</>}
        onClick={() => {
          const content = queryState.clipboard[pasteTypes[value]]
          onSettingsPaste(component.ID, pasteTypes[value], content); 
        }}
        deleteIcon={ <Close />} onDelete={() => { 
          setQueryState(s => ({
            ...s,
            clipboard: null
          })) 
        }}/> }

      </Flex>

    <Collapse in={showSettings} sx={{mb: 0, pb: 0}}>
        <Box sx={{p: 1}}>
          <Flex sx={{...sx, p: 1}}>
          <Text small active>Editor Settings</Text>
          </Flex>


        {!!others && !!component && <Flex sx={{...sx, p: 1}}>
          <Text small>Move component</Text>
          <Spacer />
          <QuickMenu small options={others.map(f => `${f.ComponentType}: ${f.ComponentName}`).concat(
            !component.componentID 
              ? []
              : ['-', 'Move to root level']
          )} 
          value={component?.ComponentName}
          onChange={handleMove}
           caret label="Move" icon={Input}/>
        </Flex>}
        , 

        <Flex onClick={() => setDisableRequests(!disableRequests)} sx={sx}>
          <Switch checked={disableRequests} /> 
          <Text small>disable Requests</Text> 
        </Flex> 

        <Flex onClick={() => setDisableLinks(!disableLinks)} sx={sx}>
          <Switch checked={disableLinks} /> 
          <Text small>Disable links</Text> 
        </Flex> 

        <Flex onClick={() => setShowTrace(!showTrace)} sx={sx}>
          <Switch checked={showTrace} /> 
          <Text small>Show stack trace</Text>
        </Flex>
        
        <Flex onClick={() => setShowTrace(!showTrace)} sx={sx}>
           <TextBtn onClick={() =>{
            setMessages([]);
            setOpenTraceLog({})
          }}>clear stack trace ({jsonLog?.length})</TextBtn>
        </Flex>
        
        </Box>
    </Collapse>

    {(!!component?.ComponentName || value === 3) && <Panel  {...panelProps} />}

    {!component?.ComponentName && !!selectedPage?.PageName &&  value === 0 && <PageSettings 
      onComponentImport={onComponentImport}
      Confirm={Confirm}
      importable={importable}
      promptImport={promptImport}
      onPageMove={onPageMove}
      application={application} themes={themes} 
      page={selectedPage} onChange={onChange} />}


    {!component?.ComponentName && value === 2 && <ComponentEvents  {...panelProps}  />}

      </>}

    {showApp && value !== 2 && <ApplicationForm applications={appData} 
      importable={importable}/> }
 

    </Stack>
 
}


function PageSettings({ page, application, themes = [], onChange, importable, onPageMove, onComponentImport }) {
  const { queryState } = React.useContext(AppStateContext);
  const [imported, setImported] = React.useState(''); 
  const [param, setParam] = React.useState('');  
  const [state, setState] = React.useState(page); 
  const { PageName, PagePath} = state;

  const { getParametersInScope } = useTextTransform();
  const pageParams = getParametersInScope();
  const parentPage = application.pages?.find(p => p.ID === page.pageID)
 

  const handleImport = text => {
    setImported('')
    if (!text) return;
    const { action } = importable.find(f => f.label === text);
    !!action && action()
  }

  const handlePageMove = text => {
    const targetPage = application.pages?.find(p => p.PageName === text);
    onPageMove(targetPage.ID) 
  }

  return <Stack spacing={1} sx={{p: 1}}>
    <Text small>Page Name</Text>
    <TextInput value={PageName} label="Name" 
    onChange={e => setState(s => ({
      ...s, 
      PageName: e.target.value, 
      PagePath: e.target.value.toLowerCase().replace(/\s/g, '-'),
      dirty: 1
    }))}
     helperText={`Path: ${PagePath}`} size="small"/>

      <Text small>Theme</Text>
      <QuickSelect options={themes.map(f => f.name)} 
         value={state.ThemeName} 
         onChange={value => {
          setState(s => ({
            ...s, 
            ThemeName: value,
            dirty: 1
          }))
         }}
         />

      <Box sx={{ pt: 2}}>
        <Text small>Parent page</Text> 
        <QuickSelect 
          value={parentPage?.PageName}
          options={application.pages?.filter(f => f.ID !== page.ID)
              .map(f => f.PageName)}
          onChange={handlePageMove}
          />
      </Box>

      {/* <Box sx={{ pt: 2}}>
        <Divider textAlign="left"><Text small>Import component</Text></Divider> 
        <QuickSelect value={imported} options={importable.map(f => f.label)} onChange={handleImport} />
      </Box> */}


      <Box sx={{pt: 2}}>
        <Divider textAlign="left"><Text small>Path parameters</Text></Divider>
        {/* <Text small>Add page parameters</Text> */}
        <Flex sx={{pt: 1}}>
          {/* <TextInput size="small" 
          placeholder="Type parameter name"
            value={param}
            onChange={e => setParam(e.target.value)}
          /> */}
          <Spacer />
          <PopoverPrompt endIcon={<Add />}  
          label="Add page parameter"
          onChange={(p) => {
            const added ={
              [p]: ''
            }
            setState(s => {
              const updated = {
                ...s, 
                dirty: 1,
                parameters: !s.parameters 
                  ? added
                  : {
                    ...s.parameters,
                    ...added
                  }
              }; 
              return updated
            });
            setParam('')
          }} >Add</PopoverPrompt>
        </Flex>

        {!state.parameters && <Alert>
          Click Add to include path parameters.
          </Alert>}

          {!!state.parameters && Object.keys(state.parameters).map(paramKey => <Flex sx={{pt: 1}} key={paramKey}>

            <Text sx={{width: 80, fontWeight: 600}} small>{paramKey}</Text>

            <TextInput 
              size="small"
              value={state.parameters[paramKey]}
              helperText={!(pageParams && pageParams[paramKey]) ? '' : `Set by caller to "${pageParams[paramKey]}"`}
              onChange={e => {
                setState(s => ({
                  ...s,
                  dirty: 1,
                  parameters: {
                    ...s.parameters,
                    [paramKey]: e.target.value
                  }
                }))
              }}
              />

              <TinyButton icon={Delete}
                  onClick={e => {
                    setState(s => {
                      const obj = {
                        dirty: 1, ...s};
                      delete obj.parameters[paramKey] 
                      // alert (JSON.stringify(obj.parameters))
                      return obj;
                    })
                  }}
              />

          </Flex>)}


      </Box>


      <Flex sx={{pt: 4}}>
        <Spacer /> 
        <TextBtn disabled={!state.dirty} endIcon={<Save />} variant="contained" onClick={() => {
          onChange(state);
          setState(s => ({...s, dirty: false}))
        }}>Save</TextBtn>
      </Flex>
    
  </Stack>
}

ComponentPanel.defaultProps = {};
export default ComponentPanel;
