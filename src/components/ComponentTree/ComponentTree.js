import React from "react";
import { useLocation } from 'react-router-dom';
import {
  createTheme,
  useTheme,
  Tooltip,
  Button,
  ThemeProvider,
  styled,
  Box, 
  Avatar,
  MenuItem,
  Alert,
  Menu,
  Stack,
  Collapse,
  Switch
} from "@mui/material";
import {
 Close,
 Edit,
 ExpandMore,
 Settings
} from "@mui/icons-material";
import { AppStateContext } from "../../hooks/AppStateContext"; 
import { Helmet } from "react-helmet";
import { Flex, Text, Spacer, DeleteConfirmMenu, TextBtn, TextInput, TinyButton } from ".."; 
import { Json } from "../../colorize"; 
import { objectReduce } from "../library/util";
import { getSettings } from '../library/util';
import { PageStateContext, usePageContext } from "../../hooks/usePageContext";
import { uniqueId } from "../library/util";
import Observer from "../../util/Observer";
import { Icons } from '../library/icons';

export const propertiesLoadedEvent = new Observer("scroll");


const Layout = styled(Box)(({ theme }) => ({
  margin: 0,
}));


const PreviewPane = (props) => {
  const [hover, setHover] = React.useState(false)
  const { children, setQueryState, on, ...selectedComponent } = props;
  if (props.preview) {
    return <Box sx={{ position: 'relative' }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
      
      >
      <TinyButton 
        icon={on ? Close : Edit}
        onClick={() => { 
          setQueryState(s => ({...s, selectedComponent: on ? null : selectedComponent}));
        }}
        sx={{
          position: 'absolute',
          right: 40,
          top: 0,
          backgroundColor: '#e0e0e0',
          opacity: hover ? 0.25 : (on ? 1 : 0),
          borderRadius: '50%',
          transition: 'opacity 0.2s linear',
          p: 1,
          fontSize: '0.85rem',
          cursor: 'pointer',
          zIndex: 100,
          '&:hover': {
            opacity: 1,
          }
        }}
            />
      {children}
    </Box>
  }
  return children;
}


const Preview = ({
  component: Component,
  selectedPage, 
  children, 
  name,
  order,
  hilit,
  sx,
  ...props
}) => {
  return (  
    <PreviewPane {...props}>
        <Component
        {...props}
        selectedPage={selectedPage} 
        componentEditing={props.on}
        sx={{
          ...sx,
          outline: props.on || hilit ? "dotted 4px red" : "none",
          outlineOffset: 4,
        }}
      >
        {children}
      </Component> 
    </PreviewPane>
);
};

const componentOrder = (a, b) => (a.order > b.order ? 1 : -1);





const ComponentTree = ({
  selectedPage,
  preview,
  loaded,
  setLoaded,
  appContext,
  themes = [],
  hilit,
  pageClientState, 
  setPageClientState,
  setEditorState,
  editorState, 
  pageResourceState, 
  getPageResourceState,
  setPageResourceState,
  onEventDelete,
  observer

}) => {
  const componentTree = selectedPage?.components;
  const {
    queryState = {},
    setQueryState,
    createBreadcrumbs, 
    Shout,
    shout,
    jsonLog, 
    loud,
    setLoud,
    pageRefState, 
    setPageRefState,
    sessionID,
    openTraceLog, 
    setMessages, 
    setOpenTraceLog,
    setPageError, 
    pageError ,
    setDisableLinks,
    disableLinks,
    appBusy
  } = React.useContext(AppStateContext);
  const { selectedComponent = {} } = queryState;
 
  

  const stateProps = !selectedPage?.state
    ? null
    : objectReduce(selectedPage.state); 
     
  const [   
    setShowSettings, 
    setShowTrace ,  
    setMessage, 
  ] = !setEditorState ? [] : [
     'showSettings', 
      'showTrace', 'message']
    .map(name => (value) => setEditorState(key => ({ ...key, [name]: value })));

  const { showSettings,  message, showTrace} = editorState ?? {};


  const location = useLocation()


  const [pageModalState, setPageModalState] = React.useState({});
  // const [pageRefState, setPageRefState] = React.useState({});
  const [pageLoaded, setPageLoaded] = React.useState(0);
  const [menuCommand, setMenuCommand] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [loadState, setLoadState] = React.useState({
    editorID: null,
    editorChanges: 0,
    applicationID: null,
    applicationChanges: 0,
  })

  const { editorID, editorChanges ,
    applicationID,
    applicationChanges
  } = loadState;


  const open = Boolean(anchorEl) ;

  const handleClick = (event, data) => {
    setMessage(data.label);
    setMenuCommand(data.action)
    setAnchorEl(event.currentTarget); 
  };
  const handleCommand = () => {  
    menuCommand && menuCommand()
    setAnchorEl(null); 
  }; 

  const handleClose = (value) => {  
    setAnchorEl(null); 
  }; 

  const { handleComponentEvent } = usePageContext(); 

  const defaultTheme = useTheme();
  

  React.useEffect(() => {
    // runs on location, i.e. route, change
    console.log('handle route change here', location)
    setQueryState(qs => ({...qs,  pageLoaded: false}))  ;
  }, [location]);

 
  
  React.useEffect(() => {   
     

    if (queryState.pageLoaded) return 
 
    setPageClientState(state => {     
      if ( !!stateProps && !!Object.keys(stateProps).length ) {  
        return stateProps;
      } 
      return state;
    });

    setQueryState(qs => ({...qs, appContext, pageLoaded: true}))  ;
    console.log ('page loaded')
  }, [
    stateProps, 
    appContext,
    propertiesLoadedEvent,
    queryState.pageLoaded,    
    pageClientState
  ]);

   const getPageClientState = React.useCallback(() => pageClientState, [pageClientState]);

  // const getPageResourceState = () => pageResourceState

  const loadPage = React.useCallback(() => { 

    console.log ({ 
      pageRefState
    })
    // alert (JSON.stringify(stateProps))
    setPageError && setPageError(null);
    // setMessages([]) 
    !!stateProps && setPageClientState(s => stateProps);   
    
    setQueryState(qs => ({...qs, selectedComponent: null, pageLoaded: true})) 
  }, [pageLoaded, setPageError, stateProps,  setPageClientState])


  let path;
  if (selectedPage) {
    path = createBreadcrumbs(appContext.pages, selectedPage);
  }

  // if (appBusy) {
  //   return <>Updating component set...</>
  // }

  if (!queryState.pageLoaded || appBusy) {
    return <>Loading...</>
  }

  // if (!componentTree)
  //   return <Alert sx={{ m: 1 }}>Select a page to see its components</Alert>;

  // components with no parents
  const components = componentTree?.filter((f) => !f.componentID);

  // setting themes
  const selectedTheme = themes.find((f) => f.name === selectedPage?.ThemeName);
  const theme = !selectedPage?.ThemeName ? defaultTheme : selectedTheme;
  const pageTheme = createTheme(theme);
  
  if (pageError) {
    return <>
    <Alert severity="error">
      <Flex baseline fullWidth>

        {pageError.message}
        <Spacer />
        <Close onClick={() => setPageError && setPageError(null)} />
  

      </Flex>
    </Alert> 

{pageError.fields.map(field => <Flex sx={{m: 1}}>

  <Text small>{field.key}</Text>

  <TextInput size="small" label={field.key} value={field.value}/>

</Flex>)}

<TextBtn variant="contained"
  onClick={() => pageError.execute({
    ['term.param']: 'zaz',
    param: null
  })}
  >Retry</TextBtn>

      {/* <hr />
    {jsonLog.map((msg, i) => <Box key={i}>
      <Flex>
      <Text small active>{msg.message}</Text>
      <Spacer />

      </Flex>
      <hr />
      <pre>{JSON.stringify(msg.json, 0, 2)}</pre>
      <hr />

      
    </Box>)} */}
    </>
  }

  const renderComponentProps = { 
    selectedPage,
    selectedComponent,
    preview,
    queryState,
    setQueryState, 
    queryState, 
    loadPage,
    hilit
  }

  return (
    <ThemeProvider theme={pageTheme}>
      <PageStateContext.Provider
        value={{


          disableLinks,

          // "persistent" state values
          
          handleClick,
          setPageError,
          loud,
          shout,


          Alert: Shout,
          selectedPage,
          appContext,


          pageModalState,
          setPageModalState,
          pageRefState,
          setPageRefState,
          pageClientState,
          getPageClientState,
          setPageClientState,
          getPageResourceState,
          pageResourceState, 
          setPageResourceState,
          setQueryState,
          queryState,
          preview

        }}
      >
        {/* document title  */}
        {path && (
          <Helmet>
            <title>
              Reactly |{preview ? " Editor | " : ""} {path.join(" | ")}
            </title>
            <link rel="apple-touch-icon" href={appContext.Photo}/>
          </Helmet>
        )}
  
        <Box sx={{position: 'relative'}}>

            {components?.sort(componentOrder).map((c) => (
              <RenderComponent
                key={c.ComponentName}

                {...renderComponentProps}


                componentList={componentTree}
                component={c}

              />
            ))}

  

        </Box>

        <Menu 
          anchorEl={anchorEl}
          anchor="bottom"
          open={open}
          onClose={() => handleClose()} 
        >

        <MenuItem onClick={handleCommand}>{message}</MenuItem>
        <MenuItem>Edit component</MenuItem>

        </Menu>
      </PageStateContext.Provider>
    </ThemeProvider>
  );
}; 

 

export const RenderComponent = ({
  component,
  componentList = [],
  preview,
  hilit,
  selectedComponent,
  selectedPage,
  setQueryState,
}) => { 

  const on = selectedComponent?.ID === component.ID;
  const kids = componentList.filter((t) => t.componentID === component.ID);
  const { Library } = React.useContext(AppStateContext);

  const { attachEventHandlers } = usePageContext();
 
 

  if (! Library[component.ComponentType]) {
    return <Alert sx={{m: 2}}>Waiting for {component?.ComponentType} definition...</Alert>
  }

  const { Component } = Library[component.ComponentType];


  const eventMap = attachEventHandlers(component);
  const settings = getSettings(component.settings);
 



  return (
    <> 
     {!settings.debug &&  <Preview
        on={on}
        selectedPage={selectedPage}
        component={Component}
        name={component.ComponentName}
        setQueryState={setQueryState}
        preview={preview}
        hilit={hilit}
        {...component}
        {...eventMap}
      >

        {!!kids.length && (
          <>
            {kids.sort(componentOrder).map((c) => (
              <>
                <RenderComponent
                hilit={hilit}
                  selectedPage={selectedPage}
                  setQueryState={setQueryState}
                  selectedComponent={selectedComponent}
                  componentList={componentList}
                  key={c.ComponentName}
                  component={c}
                />
              </>
            ))}
          </>
        )}
      </Preview>}

     {!!settings.debug && <> 
       
      [<pre>
      {JSON.stringify(settings,0,2)}
      </pre> ]
      [<pre>
      {JSON.stringify(component,0,2)}
      </pre> ]
     </>
     }


    </>
  );
};

ComponentTree.defaultProps = {};
export default ComponentTree;
