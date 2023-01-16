import * as React from "react"; 
import { useMachine } from '@xstate/react';
import { applicationMachine } from '../machines';


import { getApplicationInfo, getApplicationByName, getPageByPath, setApplication } from "../connector/sqlConnector";
import { useApplicationState } from "./useApplicationState";
import { objectReduce } from "../components/library/util"; 
import { useApplicationUtil } from "./useApplicationUtil";
import { useParams } from "react-router-dom"; 
 
export const useApplicationLoader = (state, preview) => { 

  const services = {
    initApps: async () => { 
      state.setBusy(`Loading application data...`);  
      return !!pagename
        ? await getApplicationByName(appname, pagename)
        : await getApplicationInfo();   ;
    },

    setState: async (context) => {
      const { page } = context;
      if (!!page) { 
        const clientState = objectReduce(page.state); 
        state.setPageClientState(clientState)
        return clientState;
      }
    },

    setAppConfig: async (context) => {
      state.setApplicationData(context.apps); 
      state.setBusy(false);
    },

    getPage: async (context) => {
      const { appname, pagename } = context;
      state.setQueryState(e => ({ ...e, pageLoaded: true  })); 
      state.setBusy(`Reloading page "${pagename}"...`);
      return await getPageByPath(appname, pagename);
    },

    setPage: async (context) => {
      updateApplicationData(context.page);
      state.setBusy(false);
      state.setQueryState(e => ({ ...e, pageLoaded: false  })); 
    },


    setError: async (context) => {
      alert ('ERROR')
    },

    saveApp: async (context) => { 
      return await setApplication(context.app); 
    }
  };

  const [status, send] = useMachine(applicationMachine, { services } );

  const utils = useApplicationUtil(state); 
  const { appname, pagename } = useParams(); 
 
  // get configuration for the all applications or,
  // if the route has a pagename, just the application with that page
  const downloadApplicationConfig = React.useCallback(async () => {  
      // alert(pagename)
    // downloads app info from server
    // const applicationConfig = !!pagename
    //   ? await getApplicationByName(appname, pagename)
    //   : await getApplicationInfo();  

    // state.setApplicationData(applicationConfig); 
    // state.setBusy(false);
    // return applicationConfig;
 
  }, [state, getApplicationInfo, getApplicationByName, appname, pagename]);

  // save current application
  const uploadApplicationConfig = React.useCallback(async (app) => { 
    state.setBusy(`Committing changes...`) ;
    send({
      type: 'SAVE_APP',
      app
    })
    // await setApplication(app); 
    // await downloadApplicationConfig();
  }, [downloadApplicationConfig, setApplication, state]);

  // replace a page in the application JSON with an updated one
  const updateApplicationData = React.useCallback((downloadedPage) => {

    if (!state.applicationData) return;

    state.setApplicationData(apps => apps.map(app => ({

      ...app,

      // replace the page in memory with the downloaded one
      pages: app.pages.map(page => 
        page.ID === downloadedPage.ID 
          ? downloadedPage 
          : page
        ) 

    })));

  },  [state]);

  // gets the current page JSON from the server
  const downloadCurrentPage = React.useCallback(async () => {  
    
    if (!pagename) return;
    utils.shout ({ pagename }, 'Downloading settings for ' + pagename)
    
     state.setBusy(`Reloading page "${pagename}"...`);

    send({
      type: 'LOAD_PAGE',
      appname,
      pagename,
    });


    // // download page JSON from server
    // const selectedPage = await getPageByPath(appname, pagename);
    
    // utils.shout(selectedPage, 'Got server page ' + selectedPage.PageName);
  
    // // update the local JSON with the new page
    // updateApplicationData(selectedPage);   
 
    // // clear initial state variables  
    // state.setPageClientState({});

    // // mark pageLoaded as FALSE to fire the pageOnLoad event
    // state.setQueryState(e => ({ ...e, pageLoaded: false  })); 

    // state.setBusy(false); 

  }, [pagename, appname, utils, state]);
 
  // return page node based in its name
  const getPageByName = React.useCallback((app, name) =>  app.pages.find(f => f.PagePath === name) , []);

  const getApplicationContext = React.useCallback(() => {
      
    if (!state.applicationData) {
      return { }
    }
    // TODO: all of this should be loaded in state
    const appContext = utils.getAppByName(appname);
    
    if (!appContext) {
      return { }
    }

    if (!appContext.pages) {
      return { appContext }
    }

    const homePage =  appContext.HomePage;
    const defaultPage = !homePage
      ? appContext.pages[0]
      : appContext.pages.find(f => f.ID === homePage) ;

    const currentPage = preview ? null : defaultPage;

    const selectedPage = !!pagename 
      ? utils.getPageByName(appContext, pagename)  
      : currentPage;

    return { appContext, selectedPage, homePage };

  }, [state, appname, pagename])
 
  return { 
    downloadApplicationConfig,
    downloadCurrentPage,
    uploadApplicationConfig,
    getApplicationContext,
    machineProps: status.matches('applications_loaded') || 
    status.matches('page_loaded.page_complete')
      ? {} 
      : {
      value: status.value,  
    }
  }
}