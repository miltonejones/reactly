import * as React from "react"; 
import { useApplicationState } from "./useApplicationState";
import { getApplicationInfo } from "../connector/sqlConnector";
import {useParams } from "react-router-dom"; 
import { getApplicationByName } from "../connector/sqlConnector";
import { getPageByPath } from "../connector/sqlConnector";
import { objectReduce } from "../components/library/util"; 
import { useApplicationUtil } from "./useApplicationUtil";
import { setApplication } from "../connector/sqlConnector";


export const useApplicationLoader = (state) => { 

  const { appname, pagename } = useParams(); 
  const util = useApplicationUtil();

 
  // get configuration for the all applications or,
  // if the route has a pagename, just the application with that page
  const downloadApplicationConfig = React.useCallback(async () => {  
     
    // downloads app info from server
    const items = !!pagename
      ? await getApplicationByName(appname, pagename)
      : await getApplicationInfo();  

    state.setApplicationData(items); 
    state.setBusy(false);
    return items;
 
  }, [state, getApplicationInfo, appname, pagename]);


  // save current application
  const uploadApplicationConfig = React.useCallback(async (app) => { 
    state.setBusy(`Committing changes...`) 
    await setApplication(app); 
    await downloadApplicationConfig()
  }, []);


  // replace a page in the application JSON with an updated one
  const updateApplicationData = React.useCallback((downloadedPage) => {

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
    util.shout ({pagename}, 'Downloading ' + pagename)
    
    state.setBusy(`Reloading page "${pagename}"...`);
    
    // download page JSON from server
    const selectedPage = await getPageByPath(appname, pagename);
    
    util.shout(selectedPage, 'Got server page ' + selectedPage?.PageName);
 
    // get initial state variables from the page config
    const stateProps = !selectedPage?.state
      ? null
      : objectReduce(selectedPage.state); 

    // update the local JSON with the new page
    updateApplicationData(selectedPage);  

    util.shout( { stateProps }, 'adding initial properties', 'orange')
 
    // add initial state variables from the new page to pageClientState
    await state.setPageClientStateAsync(stateProps);

    // mark pageLoaded as FALSE to fire the pageOnLoad event
    state.setQueryState(state => ({...state, pageLoaded: false })); 

    state.setBusy(false); 

  }, [pagename, appname, state]);


  const getApplicationContext = React.useCallback(() => {
      
    if (!state.applicationData) {
      return { }
    }
    //  all of this should be loaded in state
    const appContext = state.applicationData.find(f => f.path === appname);
    
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

    const selectedPage = !!pagename 
      ? appContext.pages.find(f => f.PagePath === pagename) 
      : defaultPage;

    return {
      appContext, selectedPage, homePage
    }

  }, [state, appname, pagename])

  return { 
    downloadApplicationConfig,
    downloadCurrentPage,
    uploadApplicationConfig,
    getApplicationContext
  }
}