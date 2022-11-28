import React from 'react';
import { styled, Box, Alert } from '@mui/material';
import { AppStateContext } from '../../hooks/AppStateContext';
import { Helmet } from "react-helmet";
import { Json } from '../../colorize';
import Library from '../library';
import { objectReduce } from '../library/util'; 
import { PageStateContext, usePageContext } from '../../hooks/usePageContext';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: 0, 
}));

const Preview = ({ component: Component, on, children, sx, ...props}) => {
  return <Component {...props} componentEditing={on} sx={{...sx, outline: on ? 'dotted 2px gray' : 'none', outlineOffset: 4}}>
    {children}
  </Component>
}
 
const componentOrder = (a,b) => a.order - b.order;

const ComponentTree = ({ selectedPage, preview, appContext }) => {
  const componentTree = selectedPage?.components;
  const { queryState = {}, setQueryState, createBreadcrumbs  } = React.useContext(AppStateContext);
  const { selectedComponent = {}} = queryState;

  const stateProps = !selectedPage?.state ? null : objectReduce(selectedPage.state);
  const [pageClientState, setPageClientState] = React.useState(null);
  const [pageResourceState, setPageResourceState] = React.useState([]);
  const [pageModalState, setPageModalState] = React.useState({});
  const [pageRefState, setPageRefState] = React.useState({});

  React.useEffect(() => {
    if (!!pageClientState) return;
    setPageClientState(stateProps);
  }, [stateProps])
let path;
  if (selectedPage) {
     path = createBreadcrumbs(appContext.pages, selectedPage)
  }

  if (!componentTree) return <Alert sx={{m: 1}}>Select a page to see its components</Alert>

  // components with no parents 
  const components = componentTree.filter(f => !f.componentID);

 return (
   <PageStateContext.Provider value={{
      pageClientState, 
      setPageClientState,
      pageResourceState, 
      setPageResourceState,
      pageModalState, 
      setPageModalState,
      pageRefState, 
      setPageRefState,
      selectedPage,
      appContext
   }}>  
   <pre>
   {JSON.stringify(path)}
        {/* document title  */}
        {path && <Helmet> 
            <title>Reactly |{preview ? ' Editor | ' : ""} {path.join(' | ')}</title> 
        </Helmet>}

   </pre>
      {components.sort(componentOrder).map(c => <RenderComponent selectedComponent={selectedComponent} 
              preview={preview} key={c.ComponentName} component={c} trees={componentTree}/> )}
 
   </PageStateContext.Provider>
 );
} 

const RenderComponent = ({ component, trees = [], preview, selectedComponent }) => {

  const on = selectedComponent?.ID === component.ID;
  const kids = trees.filter(t => t.componentID === component.ID);
  const { Component } = Library[component.ComponentType];

  const { attachEventHandlers} = usePageContext()

  const eventMap = attachEventHandlers(component); 

  return <>   
    <Preview 
      on={on} 
      component={Component} 
      {...component}  
      {...eventMap}  
      preview={preview}
     >
      {!!kids.length && <>{kids.sort(componentOrder).map(c => <RenderComponent 
          selectedComponent={selectedComponent} 
          trees={trees} 
          key={c.ComponentName} 
          component={c} /> )}</>} 
    </Preview>
  </>
}


ComponentTree.defaultProps = {};
export default ComponentTree;
