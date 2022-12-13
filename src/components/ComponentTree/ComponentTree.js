import React from "react";
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
 ExpandMore
} from "@mui/icons-material";
import { AppStateContext } from "../../hooks/AppStateContext";
import { Helmet } from "react-helmet";
import { Flex, Text, Spacer, TinyButton } from ".."; 
import { Json } from "../../colorize"; 
import { objectReduce } from "../library/util";
import { getSettings } from '../library/util';
import { PageStateContext, usePageContext } from "../../hooks/usePageContext";

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
      <Box 

        onClick={() => { 
          setQueryState(s => ({...s, selectedComponent: on ? null : selectedComponent}));
        }}
        sx={{
          position: 'absolute',
          right: 0,
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
      >{on ? <Close /> : <Edit />}</Box>
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
          outline: props.on || hilit ? "dotted 2px gray" : "none",
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
  loud,
  pageClientState, 
  setPageClientState,
  setLoud,
  pageResourceState, 
  getPageResourceState,
  setPageResourceState,

   

}) => {
  const componentTree = selectedPage?.components;
  const {
    queryState = {},
    setQueryState,
    createBreadcrumbs, 
    Shout
  } = React.useContext(AppStateContext);
  const { selectedComponent = {} } = queryState;

  const stateProps = !selectedPage?.state
    ? null
    : objectReduce(selectedPage.state); 

  const [messages, setMessages] = React.useState([]);
  const [showTrace, setShowTrace] = React.useState(false);
  const [pageError, setPageError] = React.useState(null);
  const [pageModalState, setPageModalState] = React.useState({});
  const [pageRefState, setPageRefState] = React.useState({});
  const [pageLoaded, setPageLoaded] = React.useState(0);
  const [message, setMessage] = React.useState('Unknown action');
  const [menuCommand, setMenuCommand] = React.useState(null);


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl) 
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
  // if (!!pageClientState && Object.keys(pageClientState).length) return; 
  //   if (pageLoaded) return;
    // !!stateProps && setPageClientState(s => ({...s, ...stateProps})); 
  }, [stateProps, pageLoaded, pageClientState]);

   const getPageClientState = React.useCallback(() => pageClientState, [pageClientState]);

  // const getPageResourceState = () => pageResourceState

  const loadPage = () => { 
    // alert (JSON.stringify(stateProps))
    setPageError(null);
    // setMessages([])
    !!stateProps && setPageClientState(s => stateProps); 
    setQueryState(qs => ({...qs, pageLoaded: true})) 
  }


  let path;
  if (selectedPage) {
    path = createBreadcrumbs(appContext.pages, selectedPage);
  }

  if (!componentTree)
    return <Alert sx={{ m: 1 }}>Select a page to see its components</Alert>;

  // components with no parents
  const components = componentTree.filter((f) => !f.componentID);

  // setting themes
  const selectedTheme = themes.find((f) => f.name === selectedPage?.ThemeName);
  const theme = !selectedPage?.ThemeName ? defaultTheme : selectedTheme;
  const pageTheme = createTheme(theme);
 
  if (!queryState.pageLoaded) {
    return <Flex sx={{ width: '100vw', height: '100vh', justifyContent: 'center'}}>
    <Avatar className="App-logo" onLoad={loadPage} src="/logo192.png" alt="loader" >A</Avatar>
    Loading....
    </Flex>
  }
  
  const shout =  async(j, m = 'message') => {
    setMessages(s => s.concat({
      json: j,
      message: m
    }))
    if (loud) {
      if (!window.confirm (m + '\n---\n'+JSON.stringify(j,0,2))) {
        setLoud(false)
      }
      //   await Shout (<Stack>
      //     {/* <Text>{m}</Text> */}
      //     <pre>
      //     {JSON.stringify(j,0,2)}
      //     </pre>
      // </Stack>, m)
    }
    console.log(m + '\n---\n'+JSON.stringify(j,0,2))
  } 

  if (pageError) {
    return <>
    <Alert severity="error">{pageError}</Alert> 
      <hr />
    {messages.map((msg, i) => <Box key={i}>
      <Text small active>{msg.message}</Text>
      <hr />
      <pre>{JSON.stringify(msg.json, 0, 2)}</pre>
      <hr />
    </Box>)}
    </>
  }


  return (
    <ThemeProvider theme={pageTheme}>
      <PageStateContext.Provider
        value={{

          // "persistent" state values
          pageModalState,
          setPageModalState,
          shout,
          pageRefState,
          setPageRefState,
          handleClick,
          pageClientState,
          getPageClientState,
          setPageClientState,
          setPageError,
          getPageResourceState,
          pageResourceState, 
          setPageResourceState,
          loud,
          Alert: Shout,
          selectedPage,
          appContext,
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

        {components.sort(componentOrder).map((c) => (
            <RenderComponent
              selectedPage={selectedPage}
              selectedComponent={selectedComponent}
              preview={preview}
              setQueryState={setQueryState}
              key={c.ComponentName}
              component={c}
              hilit={hilit}
              trees={componentTree}
            />
          ))}


{!preview && <Flex onClick={() => setShowTrace(!showTrace)}>
   <Switch checked={showTrace} />
  
  <Text small>Show stack trace</Text>
</Flex>}

<Collapse in={showTrace}>
  <Button onClick={() => setMessages([])}>clear stack trace</Button>
  {messages.map((msg, i) => <Box key={i}>
        <Text small active>{msg.message}</Text>
        <hr />
        <pre>{JSON.stringify(msg.json, 0, 2)}</pre>
        <hr />
      </Box>)} 
</Collapse>

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

const RenderComponent = ({
  component,
  trees = [],
  preview,
  hilit,
  selectedComponent,
  selectedPage,
  setQueryState,
}) => {
  const on = selectedComponent?.ID === component.ID;
  const kids = trees.filter((t) => t.componentID === component.ID);
  const { Library } = React.useContext(AppStateContext);

  const { attachEventHandlers } = usePageContext();
  if (! Library[component.ComponentType]) {
    return <Alert sx={{m: 2}}>Waiting for {component?.ComponentType} definition...</Alert>
  }

  const { Component } = Library[component.ComponentType];


  const eventMap = attachEventHandlers(component);
  const settings = getSettings(component.settings);

  function findMatches(tag,  matches = []) {  
    const res = selectedPage?.components.filter(f => f.componentID === tag.ID);
    matches.push(tag)
    if (res.length) {
     res.map(t => {
        findMatches(t, matches)
      })
    } 
    return matches
  }

  const desc = findMatches(component)

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
                  trees={trees}
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
      {JSON.stringify(component,0,2)}
      </pre> ]
     </>
     }


    </>
  );
};

ComponentTree.defaultProps = {};
export default ComponentTree;
