import React from 'react';
import { Flex, Text, Spacer, TinyButton } from ".."; 
import { styled, Avatar } from '@mui/material';
import { AppStateContext } from "../../hooks/AppStateContext";
import { RenderComponent } from '../ComponentTree/ComponentTree';
import { objectReduce } from "../library/util";
  

const componentOrder = (a, b) => (a.order > b.order ? 1 : -1);

const ApplicationTree = ({ application, queryState, loadPage, children, ...props }) => {

  const { applicationClientState, setQueryState, setApplicationClientState } = React.useContext(AppStateContext); 
 
  const applicationProps = !application?.state
    ? null
    : objectReduce(application.state); 


  React.useEffect(() => {  
    if(queryState.appLoaded) return 
    setApplicationClientState(state => {
      console.log ({ applicationProps })
      if (!(!!state && !!Object.keys(state).length ) && !!applicationProps) {
        return applicationProps;
      }
      return state;
    }); 
    setQueryState(qs => ({...qs, appLoaded: true, appContext: application})) 
  }, [applicationProps, queryState, setQueryState, application, setApplicationClientState]);

     
  if (!queryState.appLoaded) {
    return <Flex
    onClick={loadPage} >
    <Avatar className="App-logo" onLoad={loadPage} src="/logo192.png" alt="loader" >A</Avatar>
    Loading application components...
    </Flex>
  }
  
  const componentTree = application.components;
  const components = componentTree?.filter((f) => !f.componentID);

  return <>
  {/* [{JSON.stringify(applicationProps)}]
  [{JSON.stringify(applicationClientState)}] */}
    {components?.sort(componentOrder).map((c) => (
      <RenderComponent
        key={c.ComponentName}

        {...props}


        componentList={componentTree}
        component={c}

      />
    ))} 
    {children}
  </>
}


ApplicationTree.defaultProps = {};
export default ApplicationTree;
