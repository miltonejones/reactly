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
import {
 Close,
 Edit,  
} from "@mui/icons-material"; 
import { AppStateContext, EditorStateContext } from "../../context"; 
import { Helmet } from "react-helmet";
import { TinyButton } from "..";   
import { getSettings } from '../library/util';
import { PageStateContext, usePageContext } from "../../hooks/usePageContext"; 
import Observer from "../../util/Observer"; 
import { truth } from "../library/util";
import { usePageLoader } from "./usePageLoader";
import { ComponentContainer } from "./components";

export const propertiesLoadedEvent = new Observer("scroll");

 

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
        {children}
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
    return <>No page is loaded to render.</>
  }
 

  if (!queryState.pageLoaded || appBusy) {
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
  selectedComponent,
  selectedPage,
  setQueryState,
}) => { 

  const on = selectedComponent?.ID === component.ID;
  const kids = componentList.filter((t) => t.componentID === component.ID);
  const { Library } = React.useContext(AppStateContext);

  const [eventMap, setEventMap] = React.useState({});

  const { attachEventHandlers } = usePageContext();
 
 
  React.useEffect(() =>{
    setEventMap(attachEventHandlers(component))
  }, [component, attachEventHandlers])


  if (! Library[component.ComponentType]) {
    return <Alert sx={{m: 2}}>Waiting for {component?.ComponentType} definition...</Alert>
  }

  const { Component } = Library[component.ComponentType];


  // const eventMap = attachEventHandlers(component);
  const settings = getSettings(component.settings);
 
 

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
