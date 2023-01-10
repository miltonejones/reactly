import React from "react"; 
import {
  createTheme,
  useTheme, 
  ThemeProvider, 
  Box,   
  Alert,
  Menu,  
  MenuItem, 
} from "@mui/material";

import { AppStateContext, EditorStateContext } from "../../context"; 
import { Helmet } from "react-helmet"; 
import { getSettings } from '../library/util';
import { PageStateContext, usePageContext } from "../../hooks/usePageContext"; 
import Observer from "../../util/Observer"; 
import { truth } from "../library/util";
import { usePageLoader } from "./usePageLoader";
import { ComponentContainer } from "./components";

export const propertiesLoadedEvent = new Observer("scroll");

  
const Preview = ({
  component: Component,
  selectedPage, 
  order,
  hilit,
  sx,
  ...props
}) => {
  return (  
    <ComponentContainer {...props}>
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
        {props.children}
      </Component> 
    </ComponentContainer>
);
};

const componentOrder = (a, b) => (a.order > b.order ? 1 : -1);





const ComponentTree = ( ) => {
  const {
    queryState = {},
    setQueryState,
    createBreadcrumbs, 
    pageClientState, 
    setPageClientState,
    pageResourceState,  
    setPageResourceState,
    selectedPage,
    appContext, 
    preview,
    Shout,
    shout, 
    loud, 
    pageRefState, 
    setPageRefState,  
    disableLinks,  
    appBusy, 
  } = React.useContext(AppStateContext); 


  const { themes = []} = appContext;
  const componentTree = selectedPage?.components;
  const { selectedComponent = {} } = queryState;
 
  
  const {  
    setMessage,
    message ,
    hilit
  } = React.useContext(EditorStateContext) 
      


  const [pageModalState, setPageModalState] = React.useState({});
   
  const [menuCommand, setMenuCommand] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
 
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
 
  const defaultTheme = useTheme();
  
  const { pageState } = usePageLoader();
   


  let path;
  if (selectedPage) {
    path = createBreadcrumbs(appContext.pages, selectedPage);
  } else {
    return <Alert severity="warning" sx={{m: 2}}>You are editing in Application Scope. Proceed with caution.</Alert>
  }
 

  if (!queryState.pageLoaded) {
    return <>{pageState}</>
  }
 

  // components with no parents
  const components = componentTree?.filter((f) => !f.componentID);

  // setting themes
  const selectedTheme = themes.find((f) => f.name === selectedPage?.ThemeName);
  const theme = !selectedPage?.ThemeName ? defaultTheme : selectedTheme;
  const pageTheme = createTheme(theme);
   
  const renderComponentProps = { 
    selectedPage,
    selectedComponent,
    preview, 
    setQueryState, 
    queryState,  
    hilit
  }

  return (
    <ThemeProvider theme={pageTheme}>
      <PageStateContext.Provider
        value={{


          disableLinks,

          // "persistent" state values
          
          handleClick, 
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
          setPageClientState, 
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
  selectedPage,
  setQueryState,
}) => { 

  const { Library, queryState } = React.useContext(AppStateContext);
  const { selectedComponent } = queryState;
  const on = selectedComponent?.ID === component.ID;
  const kids = componentList.filter((t) => t.componentID === component.ID);

  // const [eventMap, setEventMap] = React.useState({});

  const { attachEventHandlers } = usePageContext();
 
 
  // React.useEffect(() =>{
  //   setEventMap(attachEventHandlers(component))
  // }, [component, attachEventHandlers])


  if (! Library[component.ComponentType]) {
    return <Alert sx={{m: 2}}>Waiting for {component?.ComponentType} definition...</Alert>
  }

  const { Component } = Library[component.ComponentType];


  const eventMap = attachEventHandlers(component);
  const settings = getSettings(component.settings);
 
  if (eventMap.invisible) {
    return <i/>
  }

  if (eventMap.hasOwnProperty('visible') && !eventMap.visible) {
    return <i />
  }

  return (
    <>  
     {!truth(settings.debug) &&  <Preview
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

      {/* [[{JSON.stringify({eventMap, type: component.ComponentName})}]] */}


     {!!truth(settings.debug) && <> 
       
      [<pre>
      {JSON.stringify({eventMap},0,2)}
      </pre> ]
      [<pre>
      {JSON.stringify({settings},0,2)}
      </pre> ]
      [<pre>
      {JSON.stringify({component},0,2)}
      </pre> ]
     </>
     }


    </>
  );
};

ComponentTree.defaultProps = {};
export default ComponentTree;
