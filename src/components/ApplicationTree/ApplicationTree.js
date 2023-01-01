import React from 'react';
import { Flex, Text, Spacer, TinyButton } from ".."; 
import { styled, Avatar } from '@mui/material';
import { AppStateContext } from "../../hooks/AppStateContext";
import { RenderComponent } from '../ComponentTree/ComponentTree';
import { usePageContext } from "../../hooks/usePageContext";
import { objectReduce } from "../library/util";
  

const componentOrder = (a, b) => (a.order > b.order ? 1 : -1);

const ApplicationTree = ({ application, queryState, loadPage, children, ...props }) => {

  const { handleComponentEvent } = usePageContext(); 
  const { applicationClientState,   setQueryState, setApplicationClientState } = React.useContext(AppStateContext); 
 
  const applicationProps = !application?.state
    ? null
    : objectReduce(application.state); 

  const setAppState = () => new Promise(resolve => {
    setApplicationClientState(state => {
      if(queryState.appLoaded) return state 
      console.log ({ applicationProps })
      if (!(!!state && !!Object.keys(state).length ) && !!applicationProps) {
        resolve(applicationProps)
        return applicationProps;
      }
      resolve(state)
      return state;
    }); 
  })


  const handleAppLoad = React.useCallback(async () => {
    const state = await setAppState();
    setQueryState(qs =>  {
      if(qs.appLoaded) return qs 
      // alert(JSON.stringify(application?.events,0,2)) 
      if (application?.events) {

        (async () => {
          await handleComponentEvent(null, {
            name: 'onApplicationLoad',
            component: application,
            options: {
              ID: application.ID 
            }
          }); 
        })();
        
      }
 

      
      return {...qs, appLoaded: true, appContext: application}
    })  
  }, [setAppState, application, handleComponentEvent ])  

  React.useEffect(() => {  
    // if(queryState.appLoaded) return 
    handleAppLoad();
    // setApplicationClientState(state => {
    //   console.log ({ applicationProps })
    //   if (!(!!state && !!Object.keys(state).length ) && !!applicationProps) {
    //     return applicationProps;
    //   }
    //   return state;
    // }); 
    // alert('APP LOADED')
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
