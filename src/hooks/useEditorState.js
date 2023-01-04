import * as React from "react";
import { useStateManager } from ".";

export const useEditorState = () => {
  return useStateManager(DEFAULT_EDITOR_SETTINGS);
}


const DEFAULT_EDITOR_SETTINGS = {
  json: false, 
  showLib: false, 
  showSettings: false,
  hilit: false, 
  message: '',
  expandedNodes: {}, 
  showTabs: true,
  collapsed: {},
  drawerState: { },
  popoverContent: null,
  anchorEl: null
};
 