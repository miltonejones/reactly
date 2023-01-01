import * as React from 'react';
import { AppStateContext } from '../AppStateContext'; 
import { useNavigate  } from "react-router-dom"; 


export const useOpenLink = () => {
   


  const navigate =  useNavigate();
  // const navigate = (path) => window.location.replace(path);
  const {
    appContext,
    selectedPage,
    disableLinks,
    preview,
    monitoredEvents,
    shout,
    queryState,
    setPageClientState,
    pageClientState ,
    setQueryState,
    Alert,
    setApplicationClientState,
    applicationClientState,
    debugMode,
    pageTabs,  
    addPageTab,
    
  } = React.useContext(AppStateContext);


  const listening = React.useCallback((name) => monitoredEvents.indexOf(name) > -1,  [monitoredEvents]);

  const hello = async (json, msg) => {
    if (!shout) return console.log({shoutless: json});
    await shout(json, msg)
  }

  const getApplicationClientStateAsync = () => new Promise(yes => {
    setApplicationClientState(state => {
      yes(state);
      return state;
    })
  })


  const createPageParams = React.useCallback(
    /**
     * 
     * @param {*} parameters JSON object of the page parameters
     * @param {*} options - other options to pass to the params 
     * @param {*} callback - when a callback is used the params are passed back as a function
     * object containing navigation parameters
     */
    async (parameters, options, callback) => {

      const { records, ...rest} = pageClientState;
      const { records: rec, ...op} = options ?? {};

      const appState = await getApplicationClientStateAsync();


      setPageClientState(state => {
        const { records, ...rest} = state;
        listening('createPageParams') && hello ({ parameters, options: op, pageClientState: rest }, 'createPageParams: starting')
        return state
      })

      // parse page parameters if present
      const params = {}
      setPageClientState(state => {

        !!parameters && Object.keys(parameters).map(key => {
          
          // get parameter value
          const triggerKey = parameters[key];   
          const stateProp = state[key];

          // assign value of client state by default
          let triggerProp = state[ triggerKey ];


          listening('createPageParams') && hello({ triggerKey, stateProp, appState, triggerProp},  `createPageParams: parsing param "${key}"`)
          if (stateProp) {
            return Object.assign(params, {[key]: stateProp  });
          }

          // if there is a 'dot', read the value from passed in options
          if (typeof triggerKey === 'string' && triggerKey.indexOf('.') > 0) {



            const values = triggerKey.split('.'); 

            // values with 3 parts are data-bound
            // values "[component].data.[fieldname]"
            if (values.length === 3) {
              const [t, prop, datum] = values;

              triggerProp = options[datum]; 
              listening('createPageParams') && hello( { triggerProp, options  }, 'createPageParams: data bound values: ' + triggerProp);
              if (!!triggerProp ) {
                Object.assign(params, {[key]: triggerProp  });
              }
            }


            const [t, optionKey] = triggerKey.split('.') ;


            if (t === 'application') {
              // application params come from that scope
              // TODO: options should mutate based on scope. use getParametersFromScope?
              triggerProp = appState[optionKey];
              listening('createPageParams') && hello( { triggerProp, t, optionKey, appState, applicationClientState  }, 'createPageParams: application scope: ' + triggerProp );
            } else {
              triggerProp = options[optionKey]; 
              listening('createPageParams') && hello( { triggerProp, options  }, 'createPageParams: page scope: ' + triggerProp );
            }

            listening('createPageParams') && hello( { valid: !!triggerProp  }, 'createPageParams: passing prop: ' + triggerProp );

            // pass the resulting value into page params
            if (!!triggerProp ) {
              listening('createPageParams') && hello( { triggerProp, options  }, 'createPageParams: parsing options: ' + triggerProp + ` from "${t}"`);
              Object.assign(params, {[key]: triggerProp  });
            }
          } else if (triggerProp) { 
            // pass the resulting value into page params
            if (!!triggerProp?.length ) {
              listening('createPageParams') && hello( { triggerProp, options  }, 'createPageParams: passing state value: ' + triggerProp);
              Object.assign(params, {[key]: triggerProp  });
            }
          } else {
            listening('createPageParams') && hello( { triggerKey, parameters  }, 'createPageParams: parsing parameters: ' + triggerKey);
            Object.assign(params, {[key]: triggerKey  });
          }

        });

        !!callback && listening('createPageParams') && hello( { params  }, 'createPageParams: returning results  as function');

        !!callback && callback(params)

        return state;
    })

     listening('createPageParams') && hello( { params  }, 'createPageParams: returning params in sync');
    return params;

  }, [pageClientState, applicationClientState])

  
  const openLink = React.useCallback(
    /**
     * 
     * @param {*} ID id of the link in the page definition
     * @param {*} parameters JSON object of the page parameters
     * @param {*} options - other options to pass to the link 
     */
    async (ID, parameters = {}, options) => {
      const { records, ...rest} = pageClientState; 

      if (listening('openLink')  ) {

        hello ({ ID, parameters, options, pageClientState: rest || {
          error: 'No current state'
        } }, 'openLink')
    
      }

    const targetPage = appContext.pages.find((f) => f.ID === ID); 

  

    // parse page parameters if present,
    await createPageParams(parameters, options, pageParams => {
 
  
  
      // listening('openLink')  && hello ({ pageParams }, 'openLink pageParams');
  
      const navroot = debugMode ? 'debug' : 'apps';
      const prefix = preview ? 'edit': navroot;
   
   
      const values = Object.values(pageParams) ;
      const path = values.join('/'); 
      const value = `/${prefix}/${appContext.path}/${targetPage.PagePath}`;
      const url = [value].concat(!!path ? [path] : []).join('/');  

      addPageTab(targetPage, parameters)
  
      listening('openLink') && 
        hello ( { url, path, pageParams, values }, `Navigating to ${value}`)
      
      if (disableLinks) {
        if (listening('openLink')  )  hello({  pageParams }, 'stopping here');
          return
      }
  
  
      navigate(url) 

    });

    return

    // // otherwise pass parameters into page state
    // setQueryState((s) => ({
    //   ...s,
    //   page: targetPage, 
    //   pageLoaded: false,
    //   // appLoaded: false,
    //   params ,
    // }))

    
  }, [queryState, disableLinks, listening, preview, setQueryState])


  const openPath = React.useCallback(
    /**
     * 
     * @param {*} path path of the link in the page definition
     * @param {*} parameters JSON object of the page parameters
     * @param {*} options - other options to pass to the link 
     * @returns 
     */
    async (path, parameters, options) => {

    const { appContext } = queryState;
    if (listening('openPath')  ) {
      await hello ({ path, parameters, options }, 'openPath')
    }

    // look up the path ID
    const targetPage = appContext.pages.find((f) => f.PagePath === path); 
    if (targetPage) {
      listening('openPath') && 
        hello ( { path }, `Navigating to ${targetPage.ID}`)
      
      return await openLink(targetPage.ID, parameters, options);
    }
    if (listening('openPath')  ) {
      await hello (`Invalid path ${path}`, 'Could not find path')
    }
  }, [queryState, disableLinks, openLink])

  return { 
    openLink,
    openPath,
    createPageParams
  }

}