import React from 'react';
 import { styled, Box,  Stack, Tabs, Tab, Chip, Collapse, LinearProgress,
   Divider, Paper, CircularProgress, Alert } from '@mui/material'; 
import {  ComponentSettings, ComponentStyles, ComponentEvents, ThemePanel } from '..'; 
import { Palette, Settings, Bolt, Home, Article, FormatColorFill } from "@mui/icons-material";
import { Spacer , QuickSelect , DeleteConfirmMenu, PopoverPrompt} from '..';
import {  TextBtn, TextInput, TinyButton } from '..';
import { Flex, RotateButton, QuickMenu } from '..';
import { ExpandMore, Save, Close, ContentPaste, 
      CopyAll, InfoOutlined, MoreVert, Input, Add, Delete } from "@mui/icons-material";
import { AppStateContext, EditorStateContext } from '../../context'; 
import { Text } from '../Control/Control';
import { ApplicationForm } from '..';
import { useTextTransform, useReactly } from '../../hooks';
import { uniqueId } from '../library/util'; 
import { Icons } from '../library/icons'; 
import { ContentPopover } from '../pages/Editor/components';
import { Hide } from '../pages/Editor/styled';
 
const Tiny = ({ icon: Icon }) => <Icon sx={{ m: 0, width: 16, height: 16 }} />

export const TabButton = styled(Tab)(({ theme, uppercase }) => ({ 
  textTransform: uppercase ? 'uppercase' : 'none',
  margin: 0,
  padding: theme.spacing(1),
  height: 24,
  minHeight: 24,
  fontSize: '0.85rem' 
}));

const TAB_INDEX_THEME = 3;
const TAB_INDEX_SETTINGS = 0;
const TAB_INDEX_EVENTS = 2;

const ComponentPanel = () => {
   
  const { 
    appContext,
    queryState,
    setQueryState,  
    selectedPage = {},   
    Library,
    Confirm ,
    Alert
  } = React.useContext(AppStateContext);
 
  const { 
    setCollapsed,
    selectComponent,
    collapsed: collapse,
    setShowSettings,
    showSettings ,
    navigate
  } = React.useContext(EditorStateContext)

  const [ value, setValue ] = React.useState(0);
  const { selectedComponent } = queryState;
  const { themes, connections, resources } = appContext;

  const componentParent = selectedPage || appContext;
  const component = componentParent.components?.find(c => c.ID === selectedComponent?.ID);

  const scope = {
    component: !!component,
    page: !component && !!selectedPage,
    application: !component && !selectedPage
  }
 
  const reactly = useReactly();

  const panels = [
    ComponentSettings, 
    scope.page ? ThemePanel : ComponentStyles, 
    ComponentEvents, 
    ThemePanel
  ];

  const Panel = panels[value];

  const collapsed = collapse.right;
  const onCollapse = () => setCollapsed(state => ({
    ...state,
    right: !collapse.right
  }))

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }; 

  const componentList = selectedPage?.components || appContext.components || [];

  // changes the componentID of a component
  const handleMove = (name) => {
    if (!name) return;
    const [type, title] = name.split(':');
    const target = componentList.find(f => f.ComponentName === title.trim());
    Alert (`Moved "${component.ComponentName}" to ${type} "${title}"`);
    if (target) {
      return reactly.onMove(component.ID, target.ID) 
    } 
    // if no target is found, remove the components componntID
    return reactly.onMove(component.ID, null) 
  };

  const sx = { borderBottom: 1, borderColor: 'divider'}

  const others = componentList.filter(f => !!Library[f.ComponentType] &&  Library[f.ComponentType].allowChildren)
 
  const tabNames = scope.page 
    ?  {
      Settings: Settings,
      Theme: FormatColorFill,
      Events: Bolt, 
    }
  :  {
    Settings: Settings,
    Styles: Palette,
    Events: Bolt, 
  } 

  const changeMethods = [
    reactly.onSettingsChange, 
    reactly.onStyleChange, 
    reactly.onEventChange
  ];

  const onChange = !component && !!selectedPage 
  // if a page is selected but a component is not, 
  // change a property of the selected page
    ? reactly.onPropChange
  // otherwise use one of the changeMethods
    : changeMethods[value];


  // library ref to the selected component, if present
  const currentComponent = Library[component?.ComponentType];

  /**
   * // creates or updates a component script
   * @param {*} scriptID ID of the script, if present
   * @param {*} name name of the script
   * @param {*} code script code content
   * @param {*} attribute component attribute that the script output is bound to 
   */
  const onScriptChange = ( scriptID, name, code, attribute ) => 
    reactly.onComponentScript( scriptID, name, code, component?.ID,
        answer => {
          // responding script ID is added as a boundTo prop
          onChange( component?.ID, 'boundTo', {  boundTo: `scripts.${answer.ID}`, attribute } ) 
        } );


  // properties applied to all child panels
  const panelProps = {
    onEventDelete: reactly.onEventDelete,
    selectedPage: selectedPage || appContext,  
    onThemeChange:reactly.onThemeChange,
    onScriptChange ,
    onChange,
    showSettings,
    application: appContext,

    // TODO: these props can be found in appContext, do they need to be passed?
    component,
    connections,
    resources,
    themes,
  };

  // const onDelete = () => {
  //   if (!component) {
  //     return setQueryState(s => ({ ...s, page: null }))
  //   }
  //   setQueryState(s => ({ ...s, selectedComponent: null }))
  // }

  // application mode when 
  const showApp = 
  // panel is not collapsed and   
  !collapsed && 
    // there is no component name or page name
        !(!!component?.ComponentName || selectedPage?.PageName);
 


  // list of components that can be imported from other pages
  const importable = appContext.pages
  // only top-level components are importable (for now)
  .filter(f => f.ID !== selectedPage?.ID)
  .reduce((out, page) => {
    !!page.components && 
      page.components
      // exclude components from the current page
        .filter(component => !component.componentID)
        .map(component => out.push ({

            // create menu  item
            label: `${page.PageName}.${component.ComponentName}`,

            // include menu action method in the menu  item
            action: text => promptImport(page.ID, selectedPage?.ID, component)
          })
        )
    return out;
  }, []);


  /**
   * move a component from another page to this one
   * @param {*} sourceID ID of the component being moved 
   * @param {*} destID ID of the page the  component is being moved to
   * @param {*} target - target component 
   */
  const promptImport = async (sourceID, destID, target) => {  
    if (!target) return;
    const ok = await Confirm(<Stack>
      <Text>Import component "{target.ComponentName}" to this page? </Text>
      <Text small active error>Process does not clone event mappings.</Text>
    </Stack>)
    if (!ok) return; 
    reactly.onComponentImport(sourceID, destID, target.ID);
  }

  // destroy the component while new object is loading
  // to force a fresh render
  if (queryState.componentLoading) {
    const Progress = collapsed ? CircularProgress : LinearProgress;
    return <Box sx={{p: 1}}>
      <Progress variant="indeterminate" />
      {!collapsed && <>Loading component settings...</>}
    </Box>
  }

  const componentLabel = !!component 
  ? `${component.ComponentType}: ${component.ComponentName}` 
  : (!!selectedPage 
      ? <><Tiny icon={Article} /> {selectedPage.PageName} 
        <TinyButton icon={Close} onClick={() => navigate(`/edit/${appContext.path}`)} />
        </> // `Page: $`
      : <><Tiny icon={Home} /> <b>{appContext.Name}</b></>
    )

  // library icon of the selected component
  const ComponentIcon = !currentComponent ? null : Icons[currentComponent.Icon];

  const pasteTypes = ['settings', 'styles', 'events'];

  /**
   * copies settings and styles from the current component into memory 
   */
  const handleSettingsCopy = () => 
    setQueryState(state => ({
      ...state,
      clipboard: {
        type: component?.ComponentType,
        name: component?.ComponentName,
        id: component?.ID,
        settings: component.settings,
        styles: component.styles,
        events: component.events?.map(event => ({...event, ID: uniqueId()}))
      }
    }));

  /**
   * respond to title card menu events
   * @param {*} value value of the menu item clicked 
   * @returns 
   */
  const handleOptionsClick = value => { 
    if (!value) return;
    const { action } = menuOptions.find(f => f.label === value);
    !!action && action();
  }

  // list of menu items in the title card
  const menuOptions = [
    {
      label: 'Copy settings',
      icon: CopyAll,
      action: handleSettingsCopy
      
    },
    {
      label: `${showSettings ? 'Hide' : 'Show'} advanced`,
      icon: Settings,
      action: () => setShowSettings(!showSettings)
    },
    {
      label: '-',
    },
    {
      label: 'Close',
      icon: Close,
      action: () => selectComponent(component, !0)
    }
  ]

  return (
    <Stack sx={{mb: 10}}>

      {/* title cards  */}
      <Flex sx={{ m: 0 }} direction={collapsed ? 'column' : 'row'}>

        {/* application title card  */}
        {/* <Hide hidden={!scope.application}>
          <Chip label={appContext.Name} />
          <Spacer />
        </Hide> */}

        {/* component title card */}
        <Hide hidden={collapsed}>
          <Paper sx={{ ml: 1 }}>
            
          <Flex sx={{
                backgroundColor: t => t.palette.grey[200],
                p: t => t.spacing(0.25, 0.5),
                borderRadius: 1,
                '--menu-width': '0px',
                '&:hover': {
                  '--menu-width': '72px',
                }
              }}
            >
           
            <Hide hidden={scope.component}>
              <Text small>{componentLabel}</Text>
            </Hide>

            <Hide hidden={!scope.component}>

              {!!ComponentIcon && <Tiny icon={ComponentIcon} />}

              {/* <Text muted small>{component?.ComponentType}</Text> */}
            
              <PopoverPrompt  
                onChange={value => !!value && reactly.onNameChange(component?.ID, component?.ComponentName, value)} 
                value={component?.ComponentName}
                label={`Enter a new name for "${component?.ComponentName}"`}
                component={Text}
                hover
                small
              >{component?.ComponentName}</PopoverPrompt>

              <Flex sx={{
                width: 'var(--menu-width)',
                overflow: 'hidden',
                transition: 'width 0.2s ease-in'
              }}>

              
                <TinyButton icon={CopyAll} onClick={handleSettingsCopy} />

                <DeleteConfirmMenu    
                  message={`Delete component "${component?.ComponentName}"?`} 
                  onDelete={(value) => { 
                    !!value && reactly.onDropComponent(component?.ID, 1)
                  }}
                />

                {!!others && !!component && (
                <QuickMenu small options={others.map(f => `${f.ComponentType}: ${f.ComponentName}`).concat(
                    !component.componentID 
                      ? []
                      : ['-', 'Move to root level']
                  )} 
                  value={component?.ComponentName} 
                  title="Move component"
                  onChange={handleMove}
                    icon={Input}/>
                )} 
          
              </Flex>

              <TinyButton icon={Close} onClick={() => selectComponent(component, !0)} />

            </Hide>
          
          </Flex>

          </Paper>
        </Hide>
    
        <Spacer />
  
        {/* exit button */}
        <RotateButton deg={collapsed ? 90 : 270}  onClick={onCollapse}>
          <ExpandMore /> 
        </RotateButton>

        {/* collapsed tab icons */}
        <Hide hidden={!collapsed}>
          <Stack>
            {Object.keys(tabNames).map((tab, i)=> {
            const Btn = tabNames[tab];
            const Content = panels[i];
            return <ContentPopover title={<>
            <Btn />
            {componentLabel + " " + Object.keys(tabNames)[i]}
            </>}  icon={Btn} key={i}>
              <Content  {...panelProps}/>
            </ContentPopover>})}
          </Stack>
        </Hide>   
        
      </Flex>

      {!collapsed && (!!component || selectedPage) && (
      <>
        
        {/* panel seletion tabs */}
        <Box sx={{ borderBottom: 1, borderColor: ' '  }}>
          <Tabs sx={{minHeight: 24, mt: 1, ml: 1 }} value={value} onChange={handleChange} >
            {Object.keys(tabNames).map(tab => (
              <TabButton icon={<Tiny icon={tabNames[tab]}/>} iconPosition="start"  label={tab} key={tab}   />
            ))}  
          </Tabs>
        </Box>

        {/* settings paste Chip */}
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
 
        {/* render selected panel when there is a component of the theme panel is selected */}
        {(scope.component || scope.page) && <Panel  {...panelProps} />}

        {/* if no component is present but a page is selected, render the pages panel */}
        {!component?.ComponentName && 
          !!selectedPage?.PageName &&  
          value === TAB_INDEX_SETTINGS && 
          <PageSettings 
            onComponentImport={reactly.onComponentImport}
            Confirm={Confirm}
            importable={importable}
            promptImport={promptImport}
            onPageMove={reactly.onPageMove}
            application={appContext} 
            themes={themes} 
            page={selectedPage} 
            onChange={onChange} 
          />}


        {!component?.ComponentName && 
          value === TAB_INDEX_EVENTS && 
          <ComponentEvents  {...panelProps}  />}

      </>)
      }

      {scope.application && value !== 2 && <ApplicationForm 
        applications={appContext} 
        importable={importable}
        /> }
 

    </Stack>)
 
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
