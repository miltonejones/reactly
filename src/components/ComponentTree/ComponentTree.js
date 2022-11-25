import React from 'react';
import { styled, Box } from '@mui/material';
import { AppStateContext } from '../../hooks/AppStateContext';
import { Json } from '../../colorize';
import Library from '../library';
import { objectReduce } from '../library/util'; 
import { PageStateContext, usePageContext } from '../../hooks/usePageContext';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: 0, 
}));

const Preview = ({ component: Component, on, children, sx, ...props}) => {
  return <Component {...props} sx={{...sx, outline: on ? 'dotted 2px gray' : 'none', outlineOffset: 2}}>
    {children}
  </Component>
}
 
const ComponentTree = ({ selectedPage, preview }) => {
  const componentTree = selectedPage?.components;
  const { queryState = {}, setQueryState  } = React.useContext(AppStateContext);
  const { selectedComponent = {}} = queryState;

  const stateProps = !selectedPage?.state ? null : objectReduce(selectedPage.state);
  const [pageClientState, setPageClientState] = React.useState(null);

  React.useEffect(() => {
    if (!!pageClientState) return;
    setPageClientState(stateProps);
  }, [stateProps])

  if (!componentTree) return <>no content</>

  // components with no parents 
  const components = componentTree.filter(f => !f.componentID);

 return (
   <PageStateContext.Provider value={{
      pageClientState, 
      setPageClientState
   }}> 
      {components.map(c => <RenderComponent selectedComponent={selectedComponent} 
              preview={preview} key={c.ComponentName} component={c} trees={componentTree}/> )}
   <Json>
   {JSON.stringify(pageClientState,0,2)}
   </Json>
   </PageStateContext.Provider>
 );
}

const eventTypes =  [
  'onClick', 'onKeyup', 'onKeyDown', 'onBlur',
  'onChange', 'onFocus'];

const RenderComponent = ({ component, trees = [], preview, selectedComponent }) => {

  const on = selectedComponent?.ID === component.ID;
  const kids = trees.filter(t => t.componentID === component.ID);
  const Component = Library[component.ComponentType];

  const { 
    handleComponentEvent ,
    pageClientState,
    setPageClientState 
  } = usePageContext()

  const eventMap = eventTypes.reduce((items, name) => {
    items[name] = e => handleComponentEvent(e, {
      name ,
      component
    });  
    return items;
  },{});
 
  const bound = component.settings?.find(f => f.SettingName === 'bound' && !!f.SettingValue);
  if (bound && pageClientState) {
    const node = component.settings?.find(f => f.SettingName === 'target')
    if (node) {
      const target = node.SettingValue;
      Object.assign(eventMap, {
        value: pageClientState[target],
        onChange: e => setPageClientState(s => ({...s, [target]: e.target.value}))
      })
    }
  }

  

  return <>  
  {/* {JSON.stringify(eventMap)} */}
    <Preview 
      on={on} 
      component={Component} 
      {...component}  
      {...eventMap}  
      preview={preview}
     >
      {!!kids.length && <>{kids.map(c => <RenderComponent 
          selectedComponent={selectedComponent} 
          
          trees={trees} 
          key={c.ComponentName} 
          component={c} /> )}</>} 
    </Preview>
  </>
}


ComponentTree.defaultProps = {};
export default ComponentTree;
