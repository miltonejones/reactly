import * as React from "react";
import { useStateManager } from ".";

export const useEditorState = () => {
  return useStateManager(DEFAULT_EDITOR_SETTINGS, ['collapsed', 'expandedNodes']);
}


const DEFAULT_EDITOR_SETTINGS = {
  json: false, 
  showLib: false, 
  showSettings: false,
  showTabs: true,
  hilit: false, 
  message: '',
  expandedNodes: {}, 
  collapsed: {},
  drawerState: { },
  popoverContent: null,
  anchorEl: null
};
 