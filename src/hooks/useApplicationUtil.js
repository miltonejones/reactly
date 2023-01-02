import * as React from "react";
import useDynamoStorage from "./DynamoStorage";
import { useApplicationState } from "./useApplicationState";
import {useParams, useLocation } from "react-router-dom"; 


export const useApplicationUtil = (state) => { 
 
  const { appname, pagename } = useParams()
  const location = useLocation();
 
  // return application node based in its name
  const getAppByName = React.useCallback(name => state.applicationData.find(f => f.path === name), [state]);
  
  // return page node based in its name
  const getPageByName = React.useCallback((app, name) =>  app.pages.find(f => f.PagePath === name) , [state]);


  const addTabByLocation = pathname => {
    if (!state.applicationData) {
      return { }
    }
    const [space, subroutine, app, path] = pathname.split('/');
    const application = getAppByName(app);
    if (path) {
      const page = getPageByName(application, path)
      return  addPageTab(page, page.parameters);
    }
    addPageTab()
  }

  const addPageTab = React.useCallback((page, parameters) => {

    if (!page) { 
      return state.setPageTabs(tabs => ({
        ...tabs,
        [appname]: {
          path: '/',
          parameters
        }
      })); 
    }

    state.setPageTabs(tabs => ({
      ...tabs,
      [page.PageName]: {
        path: page.PagePath,
        parameters
      }
    }));

  }, [state, appname])

  const monitorEvent = React.useCallback(eventName => state.setMonitoredEvents(e => {
    const monitored = e.indexOf(eventName) > -1 ? e.filter(f => f !== eventName) : e.concat(eventName);
    localStorage.setItem('monitored', JSON.stringify(monitored))
    return monitored;
  } ), [state]);


  const shout =  React.useCallback(async( j, m = 'message', color, fontWeight) => {
      
      state.setMessages(msgs => msgs.concat({
          json: j,
          message: m,
          color,
          fontWeight,
          timestamp: new Date().getTime()
        }) 
      ) 
       if (state.loud) {
        console.log("%s\n------------------\n%o", m, j)
       }
  } , [state]);



  const createBreadcrumbs = React.useCallback((pages, node, items = []) => {
    if (!pages) return items.concat('huh');
    const currentPage  = pages.find(f => f.ID === node.pageID);

    if (currentPage) {  
      return createBreadcrumbs(pages, currentPage).concat(node.PageName);
    }

    return items.concat(node.PageName); //.concat(node.PageName)
  } , [  ])
   

  // add tabs to editor based on location
  React.useEffect(() => { 
    addTabByLocation(location.pathname)
  }, [location]);
  


  return {
    shout,
    monitorEvent, 
    createBreadcrumbs,
    getAppByName,
    getPageByName
  }
}