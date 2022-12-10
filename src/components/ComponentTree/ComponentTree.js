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
  Menu,v
} from "@mui/material";
import { AppStateContext } from "../../hooks/AppStateContext";
import { Helmet } from "react-helmet";
import { Flex } from ".."; 
import { Json } from "../../colorize"; 
import { objectReduce } from "../library/util";
import { getSettings } from '../library/util';
import { PageStateContext, usePageContext } from "../../hooks/usePageContext";

const Layout = styled(Box)(({ theme }) => ({
  margin: 0,
}));

const Preview = ({
  component: Component,
  selectedPage,
  on,
  order,
  children,
  name,
  sx,
  ...props
}) => {
  return (  
      <Component
      {...props}
      selectedPage={selectedPage}
      componentEditing={on}
      sx={{
        ...sx,
        outline: on ? "dotted 2px gray" : "none",
        outlineOffset: 4,
      }}
    >
      {children}
    </Component> 
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


  pageClientState, 
  setPageClientState,
  
  pageResourceState, 
  getPageResourceState,
  setPageResourceState,

   

}) => {
  const componentTree = selectedPage?.components;
  const {
    queryState = {},
    setQueryState,
    createBreadcrumbs, 

  } = React.useContext(AppStateContext);
  const { selectedComponent = {} } = queryState;

  const stateProps = !selectedPage?.state
    ? null
    : objectReduce(selectedPage.state); 

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
  if (!!pageClientState && Object.keys(pageClientState).length) return; 
    !!stateProps && setPageClientState(s => ({...s, ...stateProps})); 
  }, [stateProps, loaded, pageClientState]);

   const getPageClientState = React.useCallback(() => pageClientState, [pageClientState]);

  // const getPageResourceState = () => pageResourceState

  const loadPage = () => { 
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
  
  return (
    <ThemeProvider theme={pageTheme}>
      <PageStateContext.Provider
        value={{

          // "persistent" state values
          pageModalState,
          setPageModalState,

          pageRefState,
          setPageRefState,
          handleClick,
          pageClientState,
          getPageClientState,
          setPageClientState,

          getPageResourceState,
          pageResourceState, 
          setPageResourceState,


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


        {components.sort(componentOrder).map((c) => (
            <RenderComponent
              selectedPage={selectedPage}
              selectedComponent={selectedComponent}
              preview={preview}
              key={c.ComponentName}
              component={c}
              trees={componentTree}
            />
          ))}


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
  selectedComponent,
  selectedPage,
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

  // console.log ({ Library, name: component.ComponentType })

  return (
    <>
      <Preview
        on={on}
        selectedPage={selectedPage}
        component={Component}
        name={component.ComponentName}
        preview={preview}
        {...component}
        {...eventMap}
      >
        {!!kids.length && (
          <>
            {kids.sort(componentOrder).map((c) => (
              <>
                <RenderComponent
                  selectedPage={selectedPage}
                  selectedComponent={selectedComponent}
                  trees={trees}
                  key={c.ComponentName}
                  component={c}
                />
              </>
            ))}
          </>
        )}
      </Preview>
     {!!settings.debug && <pre>
 {JSON.stringify(component,0,2)}
 </pre>
     }
    </>
  );
};

ComponentTree.defaultProps = {};
export default ComponentTree;
