import * as React from 'react';
import Library from '../components/library';
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
      const maxID = getMax(app.pages.map(f => f.ID)); 
      app.pages = app.pages.concat({ ...existing, ID: maxID + 1
          , PageName: existing.PageName + ' (copy)'
          , PagePath: existing.PagePath + '-copy'}) 
    })
  }
   
  const setPage = async(appID, page, pageID) => {
    editProg(appID, async (app) => {
      const existing = app.pages.find((c) => c.ID === page.ID);
      const maxID = getMax(app.pages.map(f => f.ID)); 
      app.pages = !existing 
        ? app.pages.concat({ ...page, ID: maxID + 1})
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
        Value: value,
        Type: type
      }

      if (!page.state) {
        Object.assign(page, {state: []})
      }
 

      const maxID = getMax(page.state.map(f => f.ID));
 
      page.state = page.state.find(f => f.ID === stateID)
        ? page.state.map((c) => c.ID === stateID ? {...setting, ID: stateID} : c)
        : page.state.concat({...setting, ID: maxID + 1});
    });
  }

  const dropPageState = async (appID, pageID, stateID) => {
    editPage(appID, pageID, async (page) => {
      page.state = page.state.filter(f => f.ID !== stateID) 
    });
  }


  
  const setComponentProp = async (appID, pageID, componentID, key, value) => {
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


  return { dropComponent, applications, editProg, editPage, editComponent , setComponentEvent, addComponent,
    setComponentName, dropPageState, setPageState, setComponentStyle, setComponentProp, setPageProps,
    dropComponentEvent, setComponentParent, setPageScript , dropPageScript, setResource,
    dropResource, dropConnection, setConnection, setPage, dropPage, duplicatePage};
}