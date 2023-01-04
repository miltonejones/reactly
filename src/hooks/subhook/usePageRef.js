import * as React from 'react'; 
import { PageStateContext, AppStateContext } from '../../context';


export const usePageRef = () => {
 
  const { 
    Alert,
    queryState,
    pageRefState, 
    selectedPage,
    appContext,
    setPageRefState,
  } = React.useContext(AppStateContext); 
 

  const getRef = React.useCallback((ID) => {
    return pageRefState[ID]
  }, [pageRefState])


  const execRefByName = React.useCallback((name, fn, scriptName = 'unknown') => { 
    if (!name) {
      return Alert(<>
      Component cannot be referenced without a name
      <pre>
        {fn?.toString()}
      </pre>
      </>)
    }
    setPageRefState(refState => {
      const component = ((selectedPage?.components||[]).concat((appContext?.components||[])) )
          .find(f => f.ComponentName === name);
      if (component) {
        const ref = refState[component.ID]
        fn && fn(ref);
      } else {
        Alert (<>
          Could not find component {name} on page {selectedPage?.PageName}
        <pre>
          {fn?.toString()}
        </pre>
        </>, scriptName + '.execRefByName');
        console.log ({ refState, appContext })
      }
      return refState;
    });
    
  }, [queryState])
 

  const getRefByName = React.useCallback((name) => { 
    const component = selectedPage.components.find(f => f.ComponentName === name);
    if (component) {
      return getRef(component.ID)
    }
    Alert (<>
    Could not find component {name} on page {selectedPage?.PageName}
    </>, 'getRefByName'); 
  }, [queryState, getRef])


  return {
    getRef,
    execRefByName,
    getRefByName
  }

}