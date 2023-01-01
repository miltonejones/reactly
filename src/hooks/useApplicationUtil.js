import * as React from "react";
import useDynamoStorage from "./DynamoStorage";
import { useApplicationState } from "./useApplicationState";
import {useParams } from "react-router-dom"; 


export const useApplicationUtil = (state) => { 
 
  const { appname } = useParams()

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
   


  return {
    shout,
    monitorEvent,
    addPageTab,
    createBreadcrumbs
  }
}