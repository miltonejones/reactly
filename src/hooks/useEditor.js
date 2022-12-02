import * as React from 'react';
import Library from '../components/library';
import { uniqueId } from '../components/library/util';
import { getMax } from '../components/library/util';
import { AppStateContext } from './AppStateContext';

export const useEditor = (apps) => {
  const [applications, setApplications] = React.useState(apps);
  const app = React.useContext(AppStateContext)


  const findProg = ID => applications.find(a => a.ID === ID);

  const updateProg = (prog) =>{
    const updated = applications.map((t) => (t.ID === prog.ID ? prog : t));
    setApplications(updated);
    app.setAppData(updated)
    app.setDirty(true)
  }

  const setProgProps = async (appID, props) => {

    editProg(appID, async (app) => {
      Object.assign(app, { ...props });
    })
  }

  const setTheme = (appID, theme, name) => {
    editProg(appID, async (app) => {
       
      if (!app.themes) {
        Object.assign(app, { themes: []});
      }

      app.themes = app.themes.find(f => f.ID === theme.ID)
        ? app.themes.map((c) => c.ID === theme.ID ? {...theme, ID: theme.ID} : c)
        : app.themes.concat({...theme, name, ID: uniqueId()});
    })
  }

  const dropTheme = async(appID, ID) => { 
    editProg(appID, async (app) => {
      app.themes = app.themes.filter(f => f.ID !== ID) 
    })
  }


  const createProg = async (Name) => { 
    const prog = {
      Name,
      "path": Name.toLowerCase().replace(/\s/g, '-'),
      "ID": uniqueId(),
      "pages": [],
      "connections": [],
      "resources": []
    }
    const updated = applications.concat(prog)
    setApplications(updated);
    app.setAppData(updated)
    app.setDirty(true)
  };

  const editProg = async (ID, edit) => {
    const app = findProg(ID);
    await edit(app);
    updateProg(app);
  };

  const dropResource = async(appID, ID) => { 
    editProg(appID, async (app) => {
      app.resources = app.resources.filter(f => f.ID !== ID) 
    })
  }

  const setResource = async(appID, resource) => { 
    editProg(appID, async (app) => {
      
      const maxID = getMax(app.resources.map(f => f.ID)); 
      app.resources = app.resources.find(f => f.ID === resource.ID)
        ? app.resources.map((c) => c.ID === resource.ID ? {...resource, ID: resource.ID} : c)
        : app.resources.concat({...resource, ID: maxID + 1});
    })
  }

  const dropConnection = async(appID, ID) => { 
    editProg(appID, async (app) => {
      app.connections = app.connections.filter(f => f.ID !== ID) 
    })
  }
  
  const setConnection = async(appID, connection) => { 
    editProg(appID, async (app) => {
      
      const maxID = getMax(app.connections.map(f => f.ID)); 
      app.connections = app.connections.find(f => f.ID === connection.ID)
        ? app.connections.map((c) => c.ID === connection.ID ? {...connection, ID: connection.ID} : c)
        : app.connections.concat({...connection, ID: maxID + 1});
    })
  }

  const editPage = async (appID, pageID, edit) => {
    editProg(appID, async (app) => {
      const page = app.pages.find((c) => c.ID === pageID);
      await edit(page, app);
      app.pages = app.pages.map((c) => c.ID === pageID ? page : c);
    });
  };

  const dropComponent = async (appID, pageID, componentID) => {
    editPage(appID, pageID, async (page) => {
      page.components = page.components.filter(f => f.ID !== componentID) 
    });
  }

  const dropPage = async(appID, pageID) => {
    editProg(appID, async (app) => {
      app.pages = app.pages.filter(f => f.ID !== pageID) 
    });
  }

  const duplicatePage = async(appID, pageID) => {
    editProg(appID, async (app) => {
      const existing = app.pages.find((c) => c.ID === pageID); 
      app.pages = app.pages.concat({ ...existing, appID, ID: uniqueId()
          , PageName: existing.PageName + ' (copy)'
          , PagePath: existing.PagePath + '-copy'}) 
    })
  }
   
  const setPage = async(appID, page, pageID) => {
    editProg(appID, async (app) => {
      const existing = app.pages.find((c) => c.ID === page.ID); 
      app.pages = !existing 
        ? app.pages.concat({ ...page, appID, ID: uniqueId()})
        : app.pages.filter(f => f.ID === page.ID ? {...page, pageID} : f)
    })
  }
   
  const addComponent = async (appID, pageID, component, options) => {
    const { order, after, before } = options ?? {}
    
    editPage(appID, pageID, async (page, app) => { 
      const settings = Library[component.ComponentType].Defaults;
  


      const maxID = getMax(page.components.map(f => f.ID)); 
      let maxOrder = getMax(page.components.map(f => f.order));

      const box = {...component, ID: maxID + 1, order: maxOrder + 100}
      
      if (after) {
        const nextID = page.components.find(f => f.order > order);
        const diff = order + parseInt((nextID.order - order) / 2);
        
        Object.assign(box, {order: diff});
 
      } else if (before) {
        const previousIDs = page.components.filter(f => f.order < order);
        const previousID = getMax(previousIDs.map(f => f.order)); 

        const diff = order - parseInt((order - previousID) / 2);
        
        Object.assign(box, {order: diff});
 
      }

      if (settings) {
        Object.keys(settings).map(setting => {
          return box.settings.push({
            SettingName: setting,
            SettingValue: settings[setting]
          })
        }) 
      }
      
      page.components = page.components.concat(box)
    });
  };
  
  const editComponent = async (appID, pageID, componentID, edit) => {
    editPage(appID, pageID, async (page, app) => {
      const component = page.components.find((c) => c.ID === componentID);
      await edit(component, page, app);
      page.components = page.components.map((c) => c.ID === componentID ? component : c);
    });
  };

  const setPageProps = async (appID, pageID, props) => { 
    editPage(appID, pageID, async (page, app) => {
      Object.assign(page, props) 
    });
  }

  
  const dropPageScript = async (appID, pageID, scriptID) => {
    editPage(appID, pageID, async (page) => { 
      Object.assign(page, { scripts: page.scripts.filter(f => f.ID !== scriptID) }); 
    });
  }

  
  const setPageScript = async (appID, pageID, scriptID, name, code) => {
    editPage(appID, pageID, async (page) => {
      const setting = {
        name, code
      }
      
      if (!page.scripts) {
        Object.assign(page, { scripts: []});
      }

      const maxID = getMax(page.scripts.map(f => f.ID));
      // alert (JSON.stringify({setting, maxID}))
 
      page.scripts = page.scripts.find(f => f.ID === scriptID)
        ? page.scripts.map((c) => c.ID === scriptID ? {...setting, ID: scriptID} : c)
        : page.scripts.concat({...setting, ID: maxID + 1});
    });
  }

  const setPageState = async (appID, pageID, stateID, key, value, type) => {
    editPage(appID, pageID, async (page) => {
      const setting = {
        Key: key,
        Value: value || "",
        Type: type || "string"
      }

      if (!page.state) {
        Object.assign(page, {state: []})
      }
 

      Object.assign(page, { state: page.state.find(f => f.ID === stateID)
        ? page.state.map((c) => c.ID === stateID ? {...setting, ID: stateID} : c)
        : page.state.concat({...setting, ID: uniqueId() }) }) 
   
    });
  }

  const dropPageState = async (appID, pageID, stateID) => {
    editPage(appID, pageID, async (page) => {
      page.state = page.state.filter(f => f.ID !== stateID) 
    });
  }

  const setComponentBinding = async(appID, pageID, componentID, binding, key) => {

    editComponent(appID, pageID, componentID, async (component) => {
 

      if (!component.boundProps) {
        Object.assign(component, {boundProps: []})
      }
 
      // if boundTo is false, remove the binding
      if (!binding.attribute) {
        return component.boundProps = component.boundProps.filter(f => f.attribute !== key)
      }

      // alert (JSON.stringify(binding,0,2))

      component.boundProps = component.boundProps.find(f => f.attribute === binding.attribute)
        ? component.boundProps.map((c) => c.attribute === binding.attribute ? binding : c)
        : component.boundProps.concat({ ...binding, ID: uniqueId() });
    });

  }
  
  const setComponentProp = async (appID, pageID, componentID, key, value) => {
 

    if (value.hasOwnProperty('attribute')) {
      return setComponentBinding(appID, pageID, componentID, value, key)
    }
 

    editComponent(appID, pageID, componentID, async (component) => {
      const setting = {
        SettingName: key,
        SettingValue: value
      }
      component.settings = component.settings.find(f => f.SettingName === key)
        ? component.settings.map((c) => c.SettingName === key ? setting : c)
        : component.settings.concat(setting);
    });
  }

  const dropComponentEvent = async (appID, pageID, componentID, eventID) => {
    editComponent(appID, pageID, componentID, async (component) => { 
      Object.assign(component, { events: component.events.filter(f => f.ID !== eventID)   }) ;
    });
  }

  const setComponentName = async (appID, pageID, componentID, ComponentName) => {
    editComponent(appID, pageID, componentID, async (component) => {
      Object.assign(component, { ComponentName }) ;
    });
  }

  const setComponentParent = async (appID, pageID, childID, componentID) => {
    editComponent(appID, pageID, childID, async (component) => { 
      Object.assign(component, { componentID }) ;
    });
  }

  const setComponentStyle = async (appID, pageID, componentID, key, value) => {
    editComponent(appID, pageID, componentID, async (component) => {
      const style = {
        Key: key ,
        Value: value 
      };

      if (value === null) { 
        return  component.styles = component.styles.filter(f => f.Key !== key) 
      }
      component.styles = component.styles.find(f => f.Key === key)
        ? component.styles.map((c) => c.Key === key ? style : c)
        : component.styles.concat(style);
    });
  }

  const setComponentEvent = async (appID, pageID, componentID, event) => {
    editComponent(appID, pageID, componentID, async (component) => {
     
      const maxID = getMax(component.events.map(f => f.ID));

      component.events = component.events.find(f => f.ID === event.ID)
        ? component.events.map((c) => c.ID === event.ID ? event : c)
        : component.events.concat({...event, ID: maxID + 1});
    });
  }

  const setPageEvent = async (appID, pageID, event) => {
    editPage(appID, pageID, async (page) => {
     if (!page.events) {
      Object.assign(page, {events: []});
     } 

      page.events = page.events.find(f => f.ID === event.ID)
        ? page.events.map((c) => c.ID === event.ID ? event : c)
        : page.events.concat({...event, ID: uniqueId()});
    });
  }


  return { dropComponent, applications, editProg, editPage, editComponent , setComponentEvent, addComponent,
    setComponentName, dropPageState, setPageState, setComponentStyle, setComponentProp, setPageProps,
    dropComponentEvent, setComponentParent, setPageScript , dropPageScript, setResource,
    dropResource, dropConnection, setConnection, setPage, dropPage, duplicatePage, 
    createProg, setTheme, dropTheme, setPageEvent, setProgProps};
}