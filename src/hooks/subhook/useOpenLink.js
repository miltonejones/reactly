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

    shout,
    queryState,
    setPageClientState,
    pageClientState ,
    setQueryState,
    Alert
 
  } = React.useContext(AppStateContext);

  const hello = async (json, msg) => {
    if (!shout) return console.log({shoutless: json});
    await shout(json, msg)
  }


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
        hello ({ parameters, options: op, pageClientState: rest }, 'createPageParams')
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


          hello({ triggerKey, stateProp, triggerProp},  `createPageParams: parsing param "${key}"`)
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
              hello( { triggerProp, options  }, 'createPageParams: data bound values');
              if (!!triggerProp ) {
                Object.assign(params, {[key]: triggerProp  });
              }
            }


            const [t, optionKey] = triggerKey.split('.') ;
            triggerProp = options[optionKey]; 
            hello( { triggerProp, options  }, 'createPageParams: parsing options');
            // pass the resulting value into page params
            if (!!triggerProp ) {
              Object.assign(params, {[key]: triggerProp  });
            }
          } else if (triggerProp) { 
            hello( { triggerProp, options  }, 'createPageParams: passing state value');
            // pass the resulting value into page params
            if (!!triggerProp?.length ) {
              Object.assign(params, {[key]: triggerProp  });
            }
          } else {
            hello( { triggerKey, parameters  }, 'createPageParams: parsing parameters');
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
    async (ID, parameters = {}, options) => {
      const { records, ...rest} = pageClientState; 

    await hello ({ ID, parameters, options, pageClientState: rest || {
      error: 'No current state'
    } }, 'openLink')

    const targetPage = appContext.pages.find((f) => f.ID === ID); 


    // parse page parameters if present,
    const params = createPageParams(parameters, options);

    await hello ({ params }, 'openLink params')

    if (!preview) {
      const value = `/apps/${appContext.path}/${targetPage.PagePath}`;
      const path = [value, Object.values(params).join('/')].join('/');  
      
      navigate(path, { state: { refresh: 1 }})
      // when in live mode, navigate to page
      return
    } 

    if (disableLinks) {
       return hello({  params }, 'stopping here');
    }


    // otherwise pass parameters into page state
    setQueryState((s) => ({
      ...s,
      page: targetPage,
      pageLoaded: false,
      // appLoaded: false,
      params ,
    }))
  }, [queryState, disableLinks, preview, setQueryState])


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
    await hello ({ path, parameters, options }, 'openPath')

    // look up the path ID
    const targetPage = appContext.pages.find((f) => f.PagePath === path); 
    if (targetPage) {
      return await openLink(targetPage.ID, parameters, options);
    }
    await hello (`Invalid path ${path}`, 'Could not find path')
  }, [queryState, disableLinks, openLink])

  return { 
    openLink,
    openPath,
    createPageParams
  }

}