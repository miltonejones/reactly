import * as React from "react"; 
import { AppStateContext } from "../context";
import { useEditor } from "./useEditor";
import { Stack } from "@mui/material";  
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
    setPageClientState,
  } = React.useContext(AppStateContext);

  const componentParent = selectedPage || appContext;
  const appContextID = appContext.ID;
  const selectedPageID = selectedPage?.ID;

  const methods = {};

  // state methods
  methods.onStateChange = React.useCallback( (stateID, label, value, type) => { 
    const update =  {}
 
    label?.split(',').map(key => {
      editor.setPageState(appContextID, selectedPageID, stateID, key, value, type, pg => {
        setQueryState(s => ({
          ...s,
          page: pg
        }))
      });
      Object.assign(update, {[key]: value});
    })
    setPageClientState(s => ({
      ...s, 
      ...update
    }))
    ;
  },  [editor, appContextID, selectedPageID]);
 
  methods.onStateDrop = React.useCallback((stateID) => {
    editor.dropPageState(appContextID, selectedPageID, stateID);
  },  [editor, appContextID, selectedPageID]);

  // connection methods
  methods.setResource = editor.setResource;
  methods.setConnection = editor.setConnection;

  methods.onResourceDelete =  React.useCallback(async (ID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this resource?",
      "Confirm delete"
    );
    if (!ok) return;
    editor.dropResource(appContextID, ID);
  },  [editor, appContextID, selectedPageID]);

  methods.onConnectionDelete = React.useCallback(async (ID, confirmed) => {
    const ok =confirmed ||  await Confirm(
      "Are you sure you want to delete this connection?",
      "Confirm delete"
    );
    if (!ok) return;
    editor.dropConnection(appContextID, ID);
  },  [editor, appContextID, selectedPageID]);


  // event methods
  methods.onEventChange = React.useCallback((componentID, event, type) => {
    const command = type === 'connection' 
      ? editor.setResourceEvent
      : editor.setComponentEvent
      
      command(appContextID, selectedPageID, componentID, event);
  },  [editor, appContextID, selectedPageID]);

  methods.onEventDelete = React.useCallback(async (componentID, eventID, type, confirmed) => {
    const command = type === 'connection' 
      ? editor.dropResourceEvent
      : editor.dropComponentEvent
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this event?",
      "Confirm delete"
    );
    if (!ok) return;
    command(appContextID, selectedPageID, componentID, eventID);
  }, [editor, appContextID, selectedPageID]);


  // page methods
  methods.duplicatePage = React.useCallback(id => {
    editor.duplicatePage(appContextID, id)
  }, [appContextID, editor]) ;

  methods.onPageMove = React.useCallback(async (pageID) => {
    editor.setPageParent(appContextID, selectedPageID, pageID)
  }, [editor, appContextID, selectedPageID]);

  methods.onPropChange = React.useCallback((props, state) => {
    if (state) {
      return editor.setPageEvent(appContextID, selectedPageID, state);  
    }
    editor.setPageProps(appContextID, selectedPageID, props);
  }, [editor, appContextID, selectedPageID]);

  methods.onPageDelete = React.useCallback(async (pageID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this page?",
      "Confirm delete"
    );
    if (!ok) return;
    editor.dropPage(appContextID, pageID);
  }, [editor, appContextID, selectedPageID]);

  methods.onThemeChange = React.useCallback(async (themeID, themeName, theme) => {
    const ok = themeName || await Prompt('Enter a theme name');
    if (!ok) return;
    editor.setTheme (appContextID, theme, ok)
  }, [editor, appContextID, selectedPageID]);

  methods.createPage = React.useCallback(async (pageID, pageName) => {
    const PageName = pageName || 
      await Prompt('Enter a name for your page', 'Create Page');
    if (!PageName) return;
    const page = {
      PageName,
      PagePath: PageName.toLowerCase().replace(/\s/g, '-'),
      pageID,
      components: [],
    }
    editor.setPage(appContextID, page, pg => { 
      setQueryState((s) => ({
        ...s,
        page: pg,
        pageLoaded: false,
        appLoaded: false, 
      }))
    });
  }, [editor, Prompt, appContextID, selectedPageID])

  // script methods
  methods.onScriptPromote = React.useCallback(async (scriptID) => {
    const ok = await Confirm(
      <Stack>
        Are you sure you want to promote this script?
        <Text small active error>This will remove it from the current page</Text>
      </Stack>,
      "Confirm promote"
    );
    if (!ok) return;
    editor.promotePageScript(appContextID, selectedPageID, scriptID)
  }, [editor, appContextID, selectedPageID]);

  methods.onDropScript = React.useCallback(async (scriptID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this script?",
      "Confirm delete"
    );
    if (!ok) return;
    editor.dropPageScript(appContextID, selectedPageID, scriptID);
  }, [editor, appContextID, selectedPageID]);

  methods.onScriptChange = React.useCallback(async (
    scriptID, name, code, 
   { fn, existingName, pageID , parentID, comment }
  ) => { 
      const scriptName = name || await Prompt('Enter a name for the script', 'Name new script', existingName);
      if (!scriptName) return;
      editor.setPageScript(appContextID, pageID || selectedPageID, scriptID, scriptName, code, fn, parentID, comment);
  }, [editor, appContextID, selectedPageID]);


  // component methods
  methods.onSettingsPaste = React.useCallback((componentID, type, props) => {
    editor.pasteComponentProps(appContextID, selectedPageID, componentID, type, props)
  }, [editor, appContextID, selectedPageID]);

  methods.onMove = React.useCallback((componentID, parentID) => {
    editor.setComponentParent(appContextID, selectedPageID, componentID, parentID);
  }, [editor, appContextID, selectedPageID]);
  
  methods.onDropComponent = React.useCallback(async (componentID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this component?" + componentID,
      "Confirm delete"
    );
    if (!ok) return;
    editor.dropComponent(appContextID, selectedPageID, componentID);
  }, [editor, appContextID, selectedPageID]);

  methods.quickComponent = React.useCallback(async (selected, componentID) => {
    if (!selected) return;
    const max =
      (componentParent.components || []).filter((f) => f.ComponentType === selected)
        .length + 1;
    const name = `${selected}-${max}`;
    return methods.appendComponent({
      selected,
      name,
    }, componentID);
  }, [methods.appendComponent, appContextID, selectedPageID]);

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
    editor.addComponent(appContextID, selectedPageID, component, {...options, 
    fn: (comp) => {
      // return Alert(<pre>{JSON.stringify(comp,0,2)}</pre>)
      setQueryState(s => ({...s, selectedComponent: comp}));
    }}); 
  }, [editor, appContextID, selectedPageID]);

  methods.createComponent = React.useCallback(async (componentID, options) => {
    const ok = await CreateComponent(componentParent.components);
    if (!ok) return;
    methods.appendComponent(ok, componentID, options);
  }, [methods.appendComponent, appContextID, selectedPageID]);

  methods.onComponentImport = React.useCallback(async (sourceID, destID, componentID) => {
    editor.importComponent(appContextID, sourceID, destID, componentID);
  }, [editor, appContextID, selectedPageID]);

  methods.onSettingsChange = React.useCallback((componentID, label, value) => { 
    editor.setComponentProp(appContextID, selectedPageID, componentID, label, value);
  },  [editor, appContextID, selectedPageID]);

  methods.onStyleChange = React.useCallback((componentID, label, value, selector) => { 
    editor.setComponentStyle(
      appContextID,
      selectedPageID,
      componentID,
      label,
      value,
      selector
    );
  },  [editor, appContextID, selectedPageID]);

  methods.onNameChange = React.useCallback(async (componentID, old) => {
    const name = await Prompt(
      `Enter a new name for "${old}"`,
      "Rename component",
      old
    );
    if (!name) return;
    editor.setComponentName(appContextID, selectedPageID, componentID, name);
  },  [editor, appContextID, Prompt, selectedPageID]);
 
  methods.onCustomName = React.useCallback(async (componentID) => {
    const customName = await Prompt('Enter name for custom component', 'Name component');
    if (!customName) return 
    editor.setComponentCustomName(appContextID, selectedPageID, componentID, customName);
  },  [editor, appContextID, Prompt, selectedPageID]);

  methods.onDropComponent = React.useCallback(async (componentID, confirmed) => {
    const ok = confirmed || await Confirm(
      "Are you sure you want to delete this component?" + componentID,
      "Confirm delete"
    );
    if (!ok) return;
    editor.dropComponent(appContextID, selectedPageID, componentID);
  },  [editor, appContextID, Prompt, selectedPageID]);

 
  return methods;

}