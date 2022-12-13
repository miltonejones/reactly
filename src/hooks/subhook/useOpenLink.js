import * as React from 'react';
import { PageStateContext } from '../PageStateContext';


export const useOpenLink = () => {
  
  const {
    setPageClientState,
    pageClientState ,
    appContext, 
    setQueryState,
    preview,
    shout,
    Alert
  } = React.useContext(PageStateContext);


  const createPageParams = React.useCallback(
    /**
     * 
     * @param {*} parameters JSON object of the page parameters
     * @param {*} options - other options to pass to the params 
     */
    (parameters, options) => {

      const { records, ...rest} = pageClientState;
      const { records: rec, ...op} = options ?? {};


      setPageClientState(state => {
        const { records, ...rest} = state;
        shout ({ parameters, options: op, pageClientState: rest }, 'createPageParams')
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


          shout({ triggerKey, stateProp, triggerProp},  `createPageParams: parsing param "${key}"`)
          if (stateProp) {
            return Object.assign(params, {[key]: stateProp  });
          }

          // if there is a 'dot', read the value from passed in options
          if (typeof triggerKey === 'string' && triggerKey.indexOf('.') > 0) {
            const [t, optionKey] = triggerKey.split('.') ;
            triggerProp = options[optionKey]; 
            shout( { triggerProp, options  }, 'createPageParams: parsing options');
            // pass the resulting value into page params
            if (!!triggerProp?.length ) {
              Object.assign(params, {[key]: triggerProp  });
            }
          } else {
            shout( { triggerKey, parameters  }, 'createPageParams: parsing parameters');
            Object.assign(params, {[key]: triggerKey  });
          }

        });


        return state;
    })

    return params;

  }, [pageClientState])

  
  const openLink = React.useCallback(
    /**
     * 
     * @param {*} ID id of the link in the page definition
     * @param {*} parameters JSON object of the page parameters
     * @param {*} options - other options to pass to the link 
     */
    async (ID, parameters, options) => {
      const { records, ...rest} = pageClientState;
    await shout ({ ID, parameters, options, pageClientState: rest || {
      error: 'No current state'
    } }, 'openLink')

    const targetPage = appContext.pages.find((f) => f.ID === ID); 


    // parse page parameters if present,
    const params = createPageParams(parameters, options);

    await shout ({ params }, 'openLink params')

    if (!preview) {
      const value = `/apps/${appContext.path}/${targetPage.PagePath}`;
      const path = [value, Object.values(params).join('/')].join('/'); 

      // when in live mode, navigate to page
      return window.location.replace(path)
    } 

       // return shout(params, 'stopping here');

    // otherwise pass parameters into page state
    setQueryState((s) => ({
      ...s,
      page: targetPage,
      pageLoaded: false,
      params ,
    }))
  }, [appContext,  preview, setQueryState])


  const openPath = React.useCallback(
    /**
     * 
     * @param {*} path path of the link in the page definition
     * @param {*} parameters JSON object of the page parameters
     * @param {*} options - other options to pass to the link 
     * @returns 
     */
    async (path, parameters, options) => {

    await shout ({ path, parameters, options }, 'openPath')

    // look up the path ID
    const targetPage = appContext.pages.find((f) => f.PagePath === path); 
    if (targetPage) {
      return await openLink(targetPage.ID, parameters, options);
    }
    await shout (`Invalid path ${path}`, 'Could not find path')
  }, [appContext, openLink])

  return { 
    openLink,
    openPath,
    createPageParams
  }

}