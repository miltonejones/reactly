import React from 'react';
 import { styled, Box,  Stack, Tabs, Tab, Chip, Collapse,
   Divider, Alert } from '@mui/material'; 
import {  ComponentSettings, ComponentStyles, ComponentEvents, ThemePanel } from '..'; 
import { Palette, Settings, Bolt, Article, FormatColorFill } from "@mui/icons-material";
import { Spacer , QuickSelect , PopoverPrompt} from '..';
import { TextBtn, TextInput, TinyButton } from '..';
import { Flex, RotateButton, QuickMenu } from '..';
import { ExpandMore, Save, Close, ContentPaste, CopyAll, Input, Add, Delete } from "@mui/icons-material";
import { AppStateContext, EditorStateContext } from '../../context'; 
import { Text } from '../Control/Control';
import { ApplicationForm } from '..';
import { useTextTransform, useReactly } from '../../hooks';
import { uniqueId } from '../library/util'; 
import { ContentPopover } from '../pages/Editor/components';
 
const Tiny = ({icon: Icon}) => <Icon sx={{m: 0, width: 16, height: 16}} />

export const TabButton = styled(Tab)(({ theme, uppercase }) => ({ 
  textTransform: uppercase ? 'uppercase' : 'capitalize',
  margin: 0,
  padding: theme.spacing(1),
  height: 24,
  minHeight: 24,
  fontSize: '0.85rem' 
}));

const ComponentPanel = () => {
  
  const { 
    appContext,
    queryState,
    setQueryState,  
    selectedPage = {},   
    Confirm ,
    Alert
  } = React.useContext(AppStateContext);
  const { Library } = React.useContext(AppStateContext);
  const { 
    setCollapsed,
    collapsed: collapse,
    setShowSettings,
    showSettings 
  } = React.useContext(EditorStateContext)
  const [ value, setValue ] = React.useState(0);
  const { selectedComponent } = queryState;
  const { themes, connections, resources } = appContext;
 
  const reactly = useReactly();

  const panels = [ComponentSettings, ComponentStyles, ComponentEvents, ThemePanel];
  const buttons = [Settings, Palette, Bolt, FormatColorFill];
  const Panel = panels[value];

  const componentParent = selectedPage || appContext;
  const component = componentParent.components.find(c => c.ID === selectedComponent?.ID);

  const collapsed = collapse.right;
  const onCollapse = () => setCollapsed(state => ({
    ...state,
    right: !collapse.right
  }))

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // if (!component) {
  //   return <>TBD</>
  // }

  const componentList = selectedPage?.components || appContext.components || [];

  const handleMove = (name) => {
    if (!name) return;
    const [type, title] = name.split(':')
    const target = componentList.find(f => f.ComponentName === title.trim());
    Alert (`Moved ${type} component`);
    if (target) {
      return reactly.onMove(component.ID, target.ID) 
    } 
    return reactly.onMove(component.ID, null) 
  };

  const others = componentList.filter(f => !!Library[f.ComponentType] &&  Library[f.ComponentType].allowChildren)

  const changes = [
    reactly.onSettingsChange, 
    reactly.onStyleChange, 
    reactly.onEventChange
  ];

  const onChange = !component && !!selectedPage 
    ? reactly.onPropChange
    : changes[value];

  // const selectedComponent = Library[component?.ComponentType];

  const panelProps = {
    onEventDelete: reactly.onEventDelete, 
    onScriptChange: ( scriptID, name, code, attribute ) => reactly.onComponentScript( scriptID, name, code, component?.ID,
        answer => {
          onChange( component?.ID, 'boundTo', {  boundTo: `scripts.${answer.ID}`, attribute } )
          alert(JSON.stringify({attribute, answer},0,2)) 
        }
        
        ),
    component:component,  
    selectedPage:selectedPage || appContext, 
    onChange:onChange, 
    onThemeChange:reactly.onThemeChange,
    connections:connections,
    resources:resources,
    themes:themes,
    showSettings,
    application: appContext
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
 

  const importable = appContext.pages
  .filter(f => f.ID !== selectedPage?.ID)
  .reduce((out, pg) => {
    pg.components?.filter(f => !f.componentID).map(c => {
      return out.push ({
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
    reactly.onComponentImport(sourceID, destID, tag.ID);
  }

  const pasteTypes = ['settings', 'styles', 'events'];

  if (queryState.componentLoading) {
    return <Box sx={{p: 2}}>
      Loading component settings...
    </Box>
  }

  const tabNames = {
    Settings: Settings,
    Styles: Palette,
    Events: Bolt,
    Theme: FormatColorFill
  }

  const componentLabel = !!component 
  ? `${component.ComponentType}: ${component.ComponentName}` : (selectedPage?.PageName || appContext.Name)
  
  return <Stack sx={{mb: 10}}>
     <Flex sx={{ m: 1}} direction={collapsed ? 'column' : 'row'}>

      {showApp && <>
      
        <Chip label={appContext.Name} />

      <Spacer />

      </>} 


      {!collapsed && (!!component?.ComponentName || selectedPage?.PageName) && <>

        <Chip variant="outlined" size="small" icon={<Article />} label={componentLabel} 
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


        {collapsed && <Stack>
          {buttons.map((Btn, i)=> {
          const Content = panels[i];
          return <ContentPopover title={<>
          <Btn />
          {componentLabel + " " + Object.keys(tabNames)[i]}
          </>}  icon={Btn} key={i}>
            <Content  {...panelProps}/>
          </ContentPopover>})}
          </Stack>}

     </Flex>

      {!collapsed && (!!component || selectedPage) && <>
        
     <Box  sx={{ borderBottom: 1, borderColor: 'divider'  }}>
      <Tabs sx={{minHeight: 24, mt: 1, ml: 1 }} value={value} onChange={handleChange} >
        {Object.keys(tabNames).map(tab => (
           <TabButton icon={<Tiny icon={tabNames[tab]}/>} iconPosition="start"  label={tab} key={tab}   />
        ))}  
      </Tabs>
    </Box>

      <Flex sx={{m: 1}}>

    {!!queryState.clipboard && 
      ((value < 3 && !!queryState.clipboard.styles)) &&
      <Chip variant="outlined"  icon={<ContentPaste />} 
        label={<>Paste <b>{queryState.clipboard.type}: {queryState.clipboard.name}</b> {pasteTypes[value]}</>}
        onClick={() => {
          const content = queryState.clipboard[pasteTypes[value]]
          reactly.onSettingsPaste(component.ID, pasteTypes[value], content); 
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
 

       
        
        </Box>
    </Collapse>

    {(!!component?.ComponentName || value === 3) && <Panel  {...panelProps} />}

    {!component?.ComponentName && !!selectedPage?.PageName &&  value === 0 && <PageSettings 
      onComponentImport={reactly.onComponentImport}
      Confirm={Confirm}
      importable={importable}
      promptImport={promptImport}
      onPageMove={reactly.onPageMove}
      application={appContext} themes={themes} 
      page={selectedPage} onChange={onChange} />}


    {!component?.ComponentName && value === 2 && <ComponentEvents  {...panelProps}  />}

      </>}

    {showApp && value !== 2 && <ApplicationForm 
      applications={appContext} 
      importable={importable}
      /> }
 

    </Stack>
 
}


function PageSettings({ page, application, themes = [], onChange, importable, onPageMove, onComponentImport }) {
  // const { queryState } = React.useContext(AppStateContext);
  // const [imported, setImported] = React.useState(''); 
  // const [param, setParam] = React.useState('');  
  const [state, setState] = React.useState(page); 
  const { PageName, PagePath} = state;

  const { getParametersInScope } = useTextTransform();
  const pageParams = getParametersInScope();
  const parentPage = application.pages?.find(p => p.ID === page.pageID)
 

  // const handleImport = text => {
  //   setImported('')
  //   if (!text) return;
  //   const { action } = importable.find(f => f.label === text);
  //   !!action && action()
  // }

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
            // setParam('')
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
