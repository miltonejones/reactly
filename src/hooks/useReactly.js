import * as React from "react"; 
import { AppStateContext } from "./AppStateContext";
import { useEditor } from "./useEditor";
import {  Stack } from "@mui/material";  
import { Text } from '../components';

export const useReactly = () => {
  const editor = useEditor();
  const { 
    selectedPage, 
    setQueryState, 
    appContext, 
    CreateComponent, 
    Confirm, 
    Prompt, 
    props 
  } = React.useContext(AppStateContext);
  const componentParent = selectedPage || appContext;

  const methods = {};

  methods.onSettingsChange = React.useCallback((componentID, label, value) => { 
    editor.setComponentProp(appContext.ID, selectedPage?.ID, componentID, label, value);
  },  [ editor, appContext, selectedPage ]);

  methods.onStyleChange = React.useCallback((componentID, label, value, selector) => { 
    editor.setComponentStyle(
      appContext.ID,
      selectedPage?.ID,
      componentID,
      label,
      value,
      selector
    );
  },  [ editor, appContext, selectedPage ]);

  methods.onEventChange = React.useCallback((componentID, event, type) => {
    const command = type === 'connection' 
      ? editor.setResourceEvent
      : editor.setComponentEvent
      
      command(appContext.ID, selectedPage?.ID, componentID, event);
  },  [ editor, appContext, selectedPage ]);

  methods.onSettingsPaste = React.useCallback( (componentID, type, props) => {
    editor.pasteComponentProps(appContext.ID, selectedPage?.ID, componentID, type, props)
  }, [editor, appContext, selectedPage]);

  methods.onMove = React.useCallback( (componentID, parentID) => {
    editor.setComponentParent(appContext.ID, selectedPage?.ID, componentID, parentID);
  }, [editor, appContext, selectedPage]);

  methods.ondEventDelete = React.useCallback( async (componentID, eventID, type, confirmed) => {
    const command = type === 'connection' 
      ? editor.dropResourceEvent
      : editor.dropComponentEvent
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this event?",
      "Confirm delete"
    );
    if (!ok) return;
    command(appContext.ID, selectedPage?.ID, componentID, eventID);
  }, [editor, appContext, selectedPage]);

  methods.onPageMove = React.useCallback( async (pageID) => {
    editor.setPageParent(appContext.ID, selectedPage?.ID, pageID)
  }, [editor, appContext, selectedPage]);

  methods.onPropChange = React.useCallback( (props, state) => {
    if (state) {
      return editor.setPageEvent(appContext.ID, selectedPage?.ID, state); //alert (JSON.stringify(state))
    }
    editor.setPageProps(appContext.ID, selectedPage?.ID, props);
  }, [editor, appContext, selectedPage]);

  methods.onComponentImport = React.useCallback( async (sourceID, destID, componentID) => {
    editor.importComponent(appContext.ID, sourceID, destID, componentID);
  }, [editor, appContext, selectedPage]);

  methods.onThemeChange = React.useCallback( async (themeID, themeName, theme) => {
    const ok = themeName || await Prompt('Enter a theme name');
    if (!ok) return;
    editor.setTheme (appContext.ID, theme, ok)
  }, [editor, appContext, selectedPage]);

  methods.onScriptPromote = React.useCallback( async (scriptID) => {
    const ok = await Confirm(
      <Stack>
        Are you sure you want to promote this script?
        <Text small active error>This will remove it from the current page</Text>
      </Stack>,
      "Confirm promote"
    );
    if (!ok) return;
    editor.promotePageScript(appContext.ID, selectedPage?.ID, scriptID)
  }, [editor, appContext, selectedPage]);

  methods.onDropScript = React.useCallback( async (scriptID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this script?",
      "Confirm delete"
    );
    if (!ok) return;
    editor.dropPageScript(appContext.ID, selectedPage?.ID, scriptID);
  }, [editor, appContext, selectedPage]);

  methods.onPageDelete = React.useCallback( async (pageID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this page?",
      "Confirm delete"
    );
    if (!ok) return;
    editor.dropPage(appContext.ID, pageID);
  }, [editor, appContext, selectedPage]);

  methods.onDropComponent = React.useCallback( async (componentID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this component?" + componentID,
      "Confirm delete"
    );
    if (!ok) return;
    editor.dropComponent(appContext.ID, selectedPage?.ID, componentID);
  }, [editor, appContext, selectedPage]);

  methods.quickComponent = React.useCallback( async (selected, componentID) => {
    const max =
      (componentParent.components || []).filter((f) => f.ComponentType === selected)
        .length + 1;
    const name = `${selected}-${max}`;
    return editor.appendComponent({
      selected,
      name,
    }, componentID);
  }, [editor, appContext, selectedPage]);

  methods.appendComponent = React.useCallback((ok, componentID, options) => { 
    const component = {
      ComponentType: ok.selected,
      ComponentName: ok.name,
      componentID, 
      state: [],
      styles: [],
      events: [],
      settings: [],
      scripts: [],
      data: [],
    };
   const res = editor.addComponent(appContext.ID, selectedPage?.ID, component, {...options, 
    fn: (comp) => {
      // return Alert(<pre>{JSON.stringify(comp,0,2)}</pre>)
      setQueryState(s => ({...s, selectedComponent: comp}));
    }}); 
  }, [editor, appContext, selectedPage]);

  methods.createComponent = React.useCallback(  async (componentID, options) => {
    const ok = await CreateComponent(componentParent.components);
    if (!ok) return;
    editor.appendComponent(ok, componentID, options);
  }, [editor, appContext, selectedPage]);

  return methods;

}