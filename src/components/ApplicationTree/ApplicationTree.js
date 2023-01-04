import React from 'react';
import { Flex  } from ".."; 
import { Avatar } from '@mui/material';
import { AppStateContext } from "../../context";
import { RenderComponent } from '../ComponentTree/ComponentTree';
import { usePageContext } from "../../hooks/usePageContext";
 import { objectReduce } from "../library/util";
  

const componentOrder = (a, b) => (a.order > b.order ? 1 : -1);

const ApplicationTree = ({ children, ...props }) => {

  const { handleComponentEvent } = usePageContext(); 
  const { setQueryState, setApplicationClientState, queryState, preview, appContext  } = React.useContext(AppStateContext); 
 
  const applicationProps = !appContext?.state
    ? null
    : objectReduce(appContext.state); 

  // const setAppState = () => new Promise(resolve => {
  //   setApplicationClientState(state => {
  //     if(queryState.appLoaded) return state 
  //     console.log ({ applicationProps })
  //     if (!(!!state && !!Object.keys(state).length ) && !!applicationProps) {
  //       resolve(applicationProps)
  //       return applicationProps;
  //     }
  //     resolve(state)
  //     return state;
  //   }); 
  // })


  const handleAppLoad = React.useCallback(async () => {
  
    setQueryState(qs =>  {
      if(qs.appLoaded) return qs 
      // alert(JSON.stringify(application?.events,0,2)) 
      if (appContext?.events) {

        (async () => {
          await handleComponentEvent(null, {
            name: 'onApplicationLoad',
            component: appContext,
            options: {
              ID: appContext.ID 
            }
          }); 
        })();
        
      }
 

      
      return {...qs, appLoaded: true, appContext }
    })  
  }, [  appContext, setQueryState, handleComponentEvent ])  

  React.useEffect(() => {  
    handleAppLoad();
     if(queryState.appLoaded) return 
    setApplicationClientState(state => {
      console.log ({ applicationProps })
      if (!(!!state && !!Object.keys(state).length ) && !!applicationProps) {
        return applicationProps;
      }
      return state;
    }); 
    // alert('APP LOADED')
  }, [handleAppLoad]);

     
  if (!queryState.appLoaded) {
    return <Flex  >
    <Avatar className="App-logo" src="/logo192.png" alt="loader" >A</Avatar>
    Loading application components...
    </Flex>
  }
  
  const componentTree = appContext.components;
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
