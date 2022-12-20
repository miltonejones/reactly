import * as React from 'react';
import { PageStateContext } from '../PageStateContext';
import { Box } from '@mui/material'; 
import moment from 'moment';
import { useOpenLink } from '.';
import { usePageRef } from '.';
import { useDataResource } from '.';
import { AppStateContext } from '../AppStateContext';


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
 

  const { openLink, openPath } = useOpenLink()
  const { getRefByName, execRefByName, getRef } = usePageRef();
  const { getResourceByName } = useDataResource()

  
  const getApplicationScripts = () => { 
    const appScripts = !appContext.scripts 
      ? []
      : [{
        label: 'Application'
      }].concat(appContext.scripts.map(s => ({
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
      out = out.concat((pg.scripts || []).map(s => ({
        ...s,
        label: s.name,
        page: pg.PageName,
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

 /**async function transformMusic (page, options) {
  const { api, data, application, setState } = options; 
 
  let transformed = data;

  const transform = fn => {

    application.setState(state => {
      fn(state.playlist_db);
      return state;
    })

  }

  transform(playlist_db => {
     if (playlist_db) {
       transformed = {
         ...data,
         records: data.records.map(rec => ({
           ...rec,
           favorite: playlist_db.indexOf(rec.FileKey) > -1 ? 'Favorite' : 'FavoriteBorder'
          }))
       }
     } else console.log ('NO PLAYLIST IN MEMORY')
   })  ;
  

  return transformed;
}
 */



  const handleScriptRequest = async (block, opts, title) => { 

    try { 
      // call that function to get the client function
      const action = eval(`(${block})()`); 
      if (block.indexOf('async') > -1) { 
        return await action(selectedPage, opts) ;
      }
      // call the client function
      return action(selectedPage, opts)
    } catch (ex) {
      Alert (ex.message, 'Script error in ' + title);
    }
  }
 

  const executeScriptByName = (scriptName, options, execResourceByName) => { 

    const scriptList = getApplicationScripts();
    const scr = scriptList.find(f => f.name === scriptName); 
 
    if (!scr) {
      return Alert(`Could not find script "${scriptName}"`)
    }

    // const scr = page.scripts?.find(f => f.name === scriptName);
    return executeScript(scr.ID, options, execResourceByName)
  }

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
        Alert: (message) => Alert(message, scr.name + ' alert'),

        executeScriptByName: (scriptName, options) => executeScriptByName(scriptName, options, execResourceByName), 

        openLink, 
        openPath,

        getRef, 
        getRefByName, 
        execRefByName: (name, fn) => execRefByName(name, fn, scr.name),
        shout,

        getResourceByName ,
        execResourceByName,

        moment
      }
    }


    // console.log ({opts, index})
    if (scr) {  
      return await handleScriptRequest(`function runscript() {
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