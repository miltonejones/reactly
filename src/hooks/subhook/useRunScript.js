import * as React from 'react'; 
import { Box } from '@mui/material'; 
import moment from 'moment';
import { useOpenLink } from '.';
import { usePageRef } from '.';
import { useDataResource } from '.';
import { AppStateContext } from '../../context';
import { useClipboard } from '../../components';
import { map } from '../../components/library/util';
import { Json } from '../../colorize';
// import { downloadApplicationScripts } from '../../connector/sqlConnector';


export const useRunScript = () => {
 
  const { 
    setApplicationClientState ,
    applicationClientState, 
    Alert,
    Confirm,
    shout,
    setPageClientState, 
    pageResourceState,
    appContext,
    selectedPage,
    pagename
 
  } = React.useContext(AppStateContext); 
 

  const { copy } = useClipboard();
  const { openLink, openPath } = useOpenLink()
  const { getRefByName, execRefByName, getRef } = usePageRef();
  const { getResourceByName, setResourceByName } = useDataResource()
 
  
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
      // pg.components?.map(comp =>  
      //   comp.scripts?.map(scr => 
      //     out.push({
      //       ...scr,
      //       label: scr.name,
      //       hidden: 1,
      //       page: comp.ComponentName,
      //       ID: scr.scr
      //     })

      //   )
      // )
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
    if (!option) {
      return 'Option not detected'
    }
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
    // eslint-disable-next-line no-eval
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
    // eslint-disable-next-line no-eval
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

  const getState = () => new Promise (resolve => {
    setPageClientState(state => {
      resolve(state);
      return state;
    })
  });

  const getApplicationState = () => new Promise (resolve => {
    setApplicationClientState(state => {
      resolve(state);
      return state;
    })
  });

  const createOpts = (script, options, execResourceByName) => ({

      state: {} ,
      setState: setPageClientState, 
      getState,
      data: options,
      pagename,
      application: {
        pages: appContext.pages,
        setState: setApplicationClientState,
        getState: getApplicationState,
        state: applicationClientState
      },

      api: {  
        pageResourceState,
        Confirm,

        Alert: (message, title, pre) => Alert(message, title || (script.name + ' alert'), pre),
        JSON: (json, title) => Alert(<Json>{JSON.stringify(json, 0, 2)}</Json>, title || (script.name + ' alert')),

        executeScriptByName: (scriptName, options) => executeScriptByName(scriptName, options, execResourceByName), 

        openLink, 
        openPath,

        getRef, 
        getRefByName, 
        execRefByName: (name, fn) => execRefByName(name, fn, script.name),
        shout,
        shuffle,
        getResourceByName ,
        setResourceByName,
        execResourceByName,
        copy,
        moment,
        map
      }
    
  }); 


  const invokeScript = async(script, options, execResourceByName) => {

    const opts = createOpts(script, options, execResourceByName)

    // console.log ({opts, index})
    if (script) {  
      if (script.code.indexOf('async') > -1) { 
        return await handleScriptRequestAsync(`function runscript() {
          return  ${script.code}
        }`, opts, script.name)
      }
      return handleScriptRequest(`function runscript() {
        return  ${script.code}
      }`, opts, script.name)
    } 
 
  }

  const invokeScriptSync = (script, options, execResourceByName) => {

    const opts = createOpts(script, options, execResourceByName)

    // console.log ({opts, index})
    if (script) {   
      return handleScriptRequest(`function runscript() {
        return  ${script.code}
      }`, opts, script.name)
    } 
 
  }

  const executeScript = async (scriptID, options, execResourceByName) => {


    // const { appContext } = queryState;

    if (!appContext) {
      return alert ('No appContext!')
    } 

    const scriptList = getApplicationScripts();
    const scr = scriptList.find(f => f.ID === scriptID); 

    if (scr) {
      return await invokeScript(scr, options, execResourceByName)
    }

    console.log ('Could not find script') 
    shout ({ scriptID }, 'Script does not exist');
  }

  return {
    executeScriptByName,
    executeScript,
    invokeScriptSync,
    handleScriptRequest,
    getApplicationScripts,
    applicationScriptRenderOption,
    applicationScriptOptionLabel,
    scriptList,
    invokeScript
  }
}