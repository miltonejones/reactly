import React from "react";
import {
  createTheme,
  useTheme,
  Tooltip,
  ThemeProvider,
  styled,
  Box,
  Alert,Avatar
} from "@mui/material";
import { AppStateContext } from "../../hooks/AppStateContext";
import { Helmet } from "react-helmet";
import { Json } from "../../colorize";
import Library from "../library";
import { objectReduce } from "../library/util";
import { PageStateContext, usePageContext } from "../../hooks/usePageContext";

const Layout = styled(Box)(({ theme }) => ({
  margin: 0,
}));

const Preview = ({
  component: Component,
  on,
  order,
  children,
  sx,
  ...props
}) => {
  return (
    <>
      <Component
        {...props}
        componentEditing={on}
        sx={{
          ...sx,
          outline: on ? "dotted 2px gray" : "none",
          outlineOffset: 4,
        }}
      >
        {children}
      </Component>
      {/* {order} */}
    </>
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
  // const [pageClientState, setPageClientState] = React.useState(stateProps);
  // const [pageResourceState, setPageResourceState] = React.useState([]);

  const [pageModalState, setPageModalState] = React.useState({});
  const [pageRefState, setPageRefState] = React.useState({});


  const [pageLoaded, setPageLoaded] = React.useState(0);

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
    return <Avatar onLoad={loadPage} src="/logo192.png" alt="loader" >A</Avatar>
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
          </Helmet>
        )}


        {components.sort(componentOrder).map((c) => (
            <RenderComponent
              selectedComponent={selectedComponent}
              preview={preview}
              key={c.ComponentName}
              component={c}
              trees={componentTree}
            />
          ))}
      </PageStateContext.Provider>
    </ThemeProvider>
  );
};

const RenderComponent = ({
  component,
  trees = [],
  preview,
  selectedComponent,
}) => {
  const on = selectedComponent?.ID === component.ID;
  const kids = trees.filter((t) => t.componentID === component.ID);
  const { Component } = Library[component.ComponentType];

  const { attachEventHandlers } = usePageContext();

  const eventMap = attachEventHandlers(component);

  return (
    <>
      <Preview
        on={on}
        component={Component}
        preview={preview}
        {...component}
        {...eventMap}
      >
        {!!kids.length && (
          <>
            {kids.sort(componentOrder).map((c) => (
              <>
                <RenderComponent
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
    </>
  );
};

ComponentTree.defaultProps = {};
export default ComponentTree;
