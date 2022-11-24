import React from 'react';
import { styled, Box } from '@mui/material';
import { AppStateContext } from '../../hooks/AppStateContext';
import Library from '../library';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: 0, //theme.spacing(4)
}));

const Preview = ({ component: Component, on, children, sx, ...props}) => {
  return <Component {...props} sx={{...sx, outline: on ? 'solid 2px gray' : 'none', outlineOffset: 1}}>
    {children}
  </Component>
}
 
const ComponentTree = ({ tree, preview }) => {
  const { queryState = {}, setQueryState  } = React.useContext(AppStateContext);
  const { selectedComponent = {}} = queryState;
  if (!tree) return <>no content</>
  const components = tree.filter(f => !f.componentID);

 return (
   <Layout data-testid="test-for-ComponentTree">
      {components.map(c => <RenderComponent selectedComponent={selectedComponent} preview={preview} key={c.ComponentName} component={c} trees={tree}/> )}
   </Layout>
 );
}

const RenderComponent = ({ component, trees = [], preview, selectedComponent }) => {

  const on = selectedComponent?.ID === component.ID;
  const kids = trees.filter(t => t.componentID === component.ID);
  const Component = Library[component.ComponentType]
 

  return <> 
    <Preview on={on} component={Component} {...component}  preview={preview}>
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
