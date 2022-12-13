import * as React from 'react';
import { PageStateContext } from '../PageStateContext';
import moment from 'moment';
import { useOpenLink } from '.';
import { usePageRef } from '.';
import { useDataResource } from '.';


export const useRunScript = () => {
 
  const {
    setPageClientState,
    selectedPage,
    shout,
    getPageResourceState,
    pageResourceState,
    Alert,
  } = React.useContext(PageStateContext);

  const { openLink, openPath } = useOpenLink()
  const { getRefByName, execRefByName, getRef } = usePageRef();
  const { getResourceByName, execResourceByName } = useDataResource()


  const handleScriptRequest = async (block, opts) => {

    try {

      // call that function to get the client function
      const action = eval(`(${block})()`); 
      if (block.indexOf('async') > -1) { 
        return await action(selectedPage, opts) ;
      }
      // call the client function
      return action(selectedPage, opts)
    } catch (ex) {
      Alert (ex.message);
    }
  }

  const executeScriptByName = (scriptName, options) => {
    const scr = selectedPage.scripts?.find(f => f.name === scriptName);
    return executeScript(scr.ID, options)
  }

  const executeScript = (scriptID, options) => {

    const scr = selectedPage.scripts?.find(f => f.ID === scriptID);

    const scripts = selectedPage.scripts.reduce((out, s) => {
      out[s.name.replace(/\s/g, '_')] = (args) => executeScriptByName(s.name, args)
      return out;
    }, { scripts: 1 });

    // console.log ('scripts', { scripts })

    const opts = {
      state: {} ,
      setState: setPageClientState, 
      data: options,
      api: { 
        getPageResourceState,
        pageResourceState,
        Alert,

        executeScriptByName,
        scripts,

        openLink, 
        openPath,

        getRef, 
        getRefByName, 
        execRefByName,

        getResourceByName ,
        execResourceByName,

        moment
      }
    }
    // console.log ({opts, index})
    if (scr) {  
      return handleScriptRequest(`function runscript() {
        return  ${scr.code}
      }`, opts)
    } 
    console.log ('Could not find script') 
  }

  return {
    executeScriptByName,
    executeScript
  }
}