import * as React from "react";
import { useStateManager } from "./useStateManager"; 

const monitoredText = localStorage.getItem('monitored');

const DEFAULT_APPLICATION_SETTINGS = {
  loud: false, 
  messages: [], 
  monitoredEvents: !monitoredText ? [] : JSON.parse(monitoredText),
  busy: false, 
  pageTabs: {},
  showTrace: false, 
  disableLinks: false,
  disableRequests: false,
  openTraceLog: { },
  supportedEvents: [],
  libraryJSON: {},
  hydratedLibrary: {},
  libraryLoaded: false,
  queryState: { },
  pageRefState: {},
  applicationData: null,
  pageModalState: {},
  pageResourceState: [],
  pageClientState: {},
  applicationClientState: {},
  dirty: false, 
};
 
export const useApplicationState = () => {
  return useStateManager(DEFAULT_APPLICATION_SETTINGS);  
}