import * as React from 'react';
import { PageStateContext } from '../PageStateContext';
import { Box } from '@mui/material'; 
import moment from 'moment';
import { useOpenLink } from '.';
import { usePageRef } from '.';
import { useDataResource } from '.';
import { AppStateContext } from '../AppStateContext';
import { useClipboard } from '../../components';


export const useRunScript = () => {
 
  const { 
    setApplicationClientState ,
    applicationClientState,
    queryState,
    Alert,
    shout,
    setPageClientState,
    getPageResourceState,
    pageResourceState,
    appContext,
    selectedPage,
 
  } = React.useContext(AppStateContext); 
 

  const { copy } = useClipboard();
  const { openLink, openPath } = useOpenLink()
  const { getRefByName, execRefByName, getRef } = usePageRef();
  const { getResourceByName } = useDataResource()

  
  const getApplicationScripts = (unfiltered) => {
    const filter = unfiltered 
      ? () => !0
      : (script) => !!script.code;
      
        
    const appScripts = !appContext.scripts 
      ? []
      : [{
        label: 'Application'
      }].concat(appContext.scripts
        .filter(filter)
        .map(s => ({
        ...s,
        label: s.name,
        page: 'application',
        ID: s.ID
      })))

    return appScripts.concat(appContext.pages.reduce((out, pg) => {
      if (!pg.scripts?.length) {
        return out;
      }
      out.push({
        label: pg.PageName
      })
      out = out.concat((pg.scripts || []) 
        .filter(filter)
        .map(s => ({
          ...s,
          label: s.name,
          page: pg.PageName,
          pageID: pg.ID,
          ID: s.ID
        })));
      return out;
    }, []))
  }

  const scriptList = getApplicationScripts()


  const applicationScriptRenderOption = (props, option) => {  
    if (!option.page) {
      return <Box {...props}><b>{option.label}</b></Box>
    }
    return <Box {...props} sx={{ml: 2}}>{option.label}</Box>
  }
 
  const applicationScriptOptionLabel =  (option) => {
    const js = scriptList.find(s => s.ID === (option.ID || option));
    if (js?.page) {
      return `${js.page}.${js.label}`
    }
    return '--none--' + JSON.stringify(option)
  }
 

const handleScriptRequestAsync = async (block, opts, title) => { 

  try { 
  //   await Alert(block, title, 1)
    // console.log ({ block, title})
    // call that function to get the client function
    const action = eval(`(${block})()`); 
    if (block.indexOf('async') > -1) { 
      // console.log ({ selectedPage, opts})
      return await action(selectedPage, opts) ;
    }
    // call the client function
    // console.log ({ selectedPage, opts})
    return action(selectedPage, opts)
  } catch (ex) {
    Alert (ex.message, 'Script error in ' + title);
  }
}

const handleScriptRequest =  (block, opts, title) => { 

  try { 
    // call that function to get the client function
    const action = eval(`(${block})()`);  
    // call the client function
    return action(selectedPage, opts)
  } catch (ex) {
    Alert (ex.message, 'Script error in ' + title);
  }
}


  const executeScriptByName =  (scriptName, options, execResourceByName) => { 

    const scriptList = getApplicationScripts();
    const scr = scriptList.find(f => f.name === scriptName); 
 
    if (!scr) {
      return Alert(`Could not find script "${scriptName}"`)
    }

    // const scr = page.scripts?.find(f => f.name === scriptName);
    return executeScript(scr.ID, options, execResourceByName)
  }

  const shuffle = unshuffled => unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  const executeScript = async (scriptID, options, execResourceByName) => {


    const { appContext } = queryState;

    if (!appContext) {
      return alert ('No appContext!')
    } 

    const scriptList = getApplicationScripts();
    const scr = scriptList.find(f => f.ID === scriptID); 
 

    const opts = {
      state: {} ,
      setState: setPageClientState, 
      data: options,
      application: {
        setState: setApplicationClientState,
        state: applicationClientState
      },

      api: { 
        getPageResourceState,
        pageResourceState,
        Alert: (message, title, pre) => Alert(message, title || (scr.name + ' alert'), pre),

        executeScriptByName: (scriptName, options) => executeScriptByName(scriptName, options, execResourceByName), 

        openLink, 
        openPath,

        getRef, 
        getRefByName, 
        execRefByName: (name, fn) => execRefByName(name, fn, scr.name),
        shout,
        shuffle,
        getResourceByName ,
        execResourceByName,
        copy,
        moment
      }
    }

    // console.log ({opts, index})
    if (scr) {  
      if (scr.code.indexOf('async') > -1) { 
        return await handleScriptRequestAsync(`function runscript() {
          return  ${scr.code}
        }`, opts, scr.name)
      }
      return handleScriptRequest(`function runscript() {
        return  ${scr.code}
      }`, opts, scr.name)
    } 
    console.log ('Could not find script') 
    shout ({ scriptID }, 'Script does not exist');
  }

  return {
    executeScriptByName,
    executeScript,
    handleScriptRequest,
    getApplicationScripts,
    applicationScriptRenderOption,
    applicationScriptOptionLabel,
    scriptList
  }
}