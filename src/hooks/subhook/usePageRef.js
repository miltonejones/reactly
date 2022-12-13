import * as React from 'react';
import { PageStateContext } from '../PageStateContext'; 


export const usePageRef = () => {

  const {
    pageRefState, 
    setPageRefState,
    selectedPage,
    preview,
    shout,
    Alert
  } = React.useContext(PageStateContext);


  const getRef = React.useCallback((ID) => {
    return pageRefState[ID]
  }, [pageRefState])


  const execRefByName = React.useCallback((name, fn) => {
    setPageRefState(refState => {
      const component = selectedPage.components.find(f => f.ComponentName === name);
      if (component) {
        const ref = refState[component.ID]
        fn(ref);
      } else {
        Alert ('Could not find component ' + name);
        console.log ({ refState })
      }
      return refState;
    });
    
  }, [selectedPage])
 

  const getRefByName = React.useCallback((name) => {
    const component = selectedPage.components.find(f => f.ComponentName === name);
    if (component) {
      return getRef(component.ID)
    }
    Alert ('Could not find component ' + name)
  }, [selectedPage, getRef])


  return {
    getRef,
    execRefByName,
    getRefByName
  }

}