import * as React from 'react'; 
import { getComponent } from '../components/library/util';
import { uniqueId } from '../components/library/util';
import { getMax } from '../components/library/util';
import { AppStateContext } from './AppStateContext';

export const useEditor = (apps) => {
  const [applications, setApplications] = React.useState(apps);
  const app = React.useContext(AppStateContext)
  const { Library } = React.useContext(AppStateContext)


  const findProg = ID => applications.find(a => a.ID === ID);

  const updateProg = (prog) =>{
    
    const updated = applications.map((t) => (t.ID === prog.ID ? prog : t));
 
    setApplications(updated);
    app.setAppData(updated)
    app.setDirty(true)
  }

  const editProg = async (ID, edit) => {
    const app = findProg(ID);
    const res = await edit(app);
 
    updateProg(app);
    return res;
  };

  const editPage = async (appID, pageID, edit) => {
    const res = editProg(appID, async (app) => {
 
      const page = app.pages.find((c) => c.ID === pageID);
      if (!page) {
        return edit(app);
      }
      await edit(page, app);
      app.pages = app.pages.map((c) => c.ID === pageID ? page : c);
      return page;
    });
    return res;
  };

  const editResource = async (appID, resourceID, edit) => {
    const res = editProg(appID, async (app) => {
      const resource = app.resources.find((c) => c.ID === resourceID);
      await edit(resource, app);
      app.resources = app.resources.map((c) => c.ID === resourceID ? resource : c);
      return resource;
    });
    return res;
  };

  const editComponent = async (appID, pageID, componentID, edit) => {
    const res = editPage(appID, pageID, async (page, app) => {

      const component = page.components.find((c) => c.ID === componentID);

      if (!component) {
        return edit (page, app);
      }
      

      await edit(component, page, app);
      page.components = page.components.map((c) => c.ID === componentID ? component : c);
      return component;
    });
    return res;
  };


  const setParameter = async (appID, pageID, param) => {
    const res = editPage(appID, pageID, async (page, app) => {
       
      if (!page.parameters ) {
        Object.assign(page, { parameters: []});
      }

      page.parameters  = page.parameters .filter(f => f.name === param)
       .concat({name: param, ID: uniqueId()});
      return page;
    });
    return res;
  }

  const dropParameter = async(appID, pageID, ID) => { 
    const res = editPage(appID, pageID, async (page, app) => {
      page.parameters  = page.parameters.filter(f => f.ID !== ID) 
      return page;
    });
    return res; 
  }


  const setProgProps = async (appID, props) => { 
    editProg(appID, async (app) => { 
      Object.assign(app, props)  
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
    await app.commitProg(prog);
    app.refreshProgs()
  };

  const dropResource = async(appID, ID) => { 
    editProg(appID, async (app) => {
      app.resources = app.resources.filter(f => f.ID !== ID) 
    })
  }

  const setResource = async(appID, resource) => { 
    editProg(appID, async (app) => {
       
      app.resources = app.resources.find(f => f.ID === resource.ID)
        ? app.resources.map((c) => c.ID === resource.ID ? {...resource, ID: resource.ID} : c)
        : app.resources.concat({...resource, ID: uniqueId()});
    })
  }

  const setResourceEvent = async (appID, pageID, resourceID, event) => {
    editResource(appID, resourceID, async (resource) => {

      if (!resource.events) {
        Object.assign(resource, {events: []})
      }
      // alert (JSON.stringify({resource, event}))
      
      resource.events = resource.events.find(f => f.ID === event.ID)
        ? resource.events.map((c) => c.ID === event.ID ? event : c)
        : resource.events.concat({...event, ID: uniqueId()});
    });
  }

  const dropResourceEvent = async (appID, pageID, resourceID, eventID) => {
    editResource(appID, resourceID, async (resource) => {
      Object.assign(resource, { events: resource.events.filter(f => f.ID !== eventID)   }) ; 
    }); 
  }

  const dropConnection = async(appID, ID) => { 
    editProg(appID, async (app) => {
      app.connections = app.connections.filter(f => f.ID !== ID) 
    })
  }
  
  const setConnection = async(appID, connection) => { 
    editProg(appID, async (app) => {
       
      app.connections = app.connections.find(f => f.ID === connection.ID)
        ? app.connections.map((c) => c.ID === connection.ID ? {...connection, ID: connection.ID} : c)
        : app.connections.concat({...connection, ID: uniqueId()});
    })
  }

  const dropComponent = async (appID, pageID, componentID) => { 

    const command = async (object) => {
      object.components = object.components.filter(f => f.ID !== componentID) 
    }
 
    editPage(appID, pageID, command);
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
   
  const setPage = async(appID, page, pageID, fn) => {
    editProg(appID, async (app) => {
      const existing = app.pages.find((c) => c.ID === page.ID); 

      const createdPage = existing ? {...page, pageID} : { ...page, appID, ID: uniqueId()}

      app.pages = !existing 
        ? app.pages.concat(createdPage)
        : app.pages.filter(f => f.ID === page.ID ? createdPage : f);

      fn && fn (createdPage)
    })
  }
   
  const addComponent = async (appID, pageID, component, options) => {
    const { order, after, before, fn } = options ?? {}
    
    const command = async (object) => { 


      if (!Library) { 
        return alert ('App has no lib!!')
      }
      const item = Library[component.ComponentType];
      if (!item) { 
        return alert (`Could not find component ${component.ComponentType}`)
      }

      const settings = item.Defaults;
      const styles = item.Presets;
   
 
      let maxOrder = getMax(object.components.map(f => f.order));

      const box = {...component, pageID, ID: uniqueId(), order: maxOrder + 100}
      
      if (after) {
        const nextID = object.components.find(f => f.order > order);
        const diff = order + parseInt((nextID.order - order) / 2);
        
        Object.assign(box, {order: diff});
 
      } else if (before) {
        const previousIDs = object.components.filter(f => f.order < order);
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
      
      if (styles) {
        Object.keys(styles).map(style => {
          return box.styles.push({
            Key: style,
            Value: styles[style]
          })
        }) 
      }
 
      
      object.components = object.components.concat(box);

      fn && fn(box)

      return box;
    }
 
    
    const res = editPage(appID, pageID, command);
    return res;
  };
  
  const setPageProps = async (appID, pageID, props) => { 
    editPage(appID, pageID, async (page, app) => {
      Object.assign(page, props) 
    });
  }

  const importComponent = async (appID, sourceID, destID, componentID) => { 
    editComponent(appID, sourceID, componentID, async (component, sourcePage) => {
      const dressed = getComponent(sourcePage, component);
      const redressed = dressed.map(c => ({
        ...c, 
        pageID: destID,
        events: []
      }))
      
      // alert (JSON.stringify(redressed))

      const dependentProps = redressed.reduce((out, comp) => {  
        const props = comp.boundProps;
        if (!props) return out;
        props.map(({ boundTo }) => {
          const state = sourcePage.state?.find(f => f.Key === boundTo);
          !!state && out.push({...state, ID: uniqueId()});
        });
        return out;
      }, [])

      await app.Alert (<pre>{JSON.stringify(dependentProps,0,2)}</pre>)


      editPage(appID, destID, async (page) => {
        
        page.components = (page.components||[])
        .filter(c => !redressed.find(r => r.ID === c.ID))
        .concat(redressed);

        page.state = (page.state||[])
        .filter(c => !dependentProps.find(r => r.Key === c.Key))
        .concat(dependentProps);

        console.log ({ redressed:  page.components })

      }) 
    });
  }

  
  const dropPageScript = async (appID, pageID, scriptID) => {
    editPage(appID, pageID, async (page) => { 
      Object.assign(page, { scripts: page.scripts.filter(f => f.ID !== scriptID) }); 
    });
  }

  
  const setPageScript = async (appID, pageID, scriptID, name, code, fn) => {
    editPage(appID, pageID, async (page) => {
      const setting = {
        name, code
      }
      
      if (!page.scripts) {
        Object.assign(page, { scripts: []});
      } 

      const scriptExists = page.scripts.find(f => f.ID === scriptID);
      const createdScript = scriptExists ? {...setting, ID: scriptID} : {...setting, ID: uniqueId()}
 
      page.scripts = scriptExists
        ? page.scripts.map((c) => c.ID === scriptID ? createdScript : c)
        : page.scripts.concat(createdScript);
      
      fn && fn (createdScript)
    });
  }

  const setPageState = async (appID, pageID, stateID, key, value, type, fn) => {
    
    if (!key) return;

    const command = async (object) => {
      const setting = {
        Key: key,
        Value: value || "",
        Type: type || "string"
      }

      if (!object.state) {
        Object.assign(object, {state: []})
      } 

      Object.assign(object, { state: object.state.find(f => f.ID === stateID)
        ? object.state.map((c) => c.ID === stateID ? {...setting, ID: stateID} : c)
        : object.state.concat({...setting, ID: uniqueId() }) })
        
      fn && fn(object) 
    };
 

    editPage(appID, pageID, command);
  }

  const dropPageState = async (appID, pageID, stateID) => {
    const command = async (page) => {
      page.state = page.state.filter(f => f.ID !== stateID) 
    } 

    editPage(appID, pageID, command);
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

      if (key === 'order') {
        return Object.assign(component, { order: value});
      }

      // await app.Alert(<pre>
      //   {JSON.stringify(setting, 0, 2)}
      // </pre>)


      component.settings = component.settings.find(f => f.SettingName === key)
        ? component.settings.map((c) => c.SettingName === key ? setting : c)
        : component.settings.concat(setting);
    });
  }

  const dropComponentEvent = async (appID, pageID, componentID, eventID) => {
    editComponent(appID, pageID, componentID, async (component, page) => { 
      if (!component) return app.Alert(<>Component {componentID} not found on {page?.PageName}</>)
      app.Alert (<pre>{JSON.stringify({ appID, pageID, eventID, events: component?.events }, 0, 2)}</pre>)
      Object.assign(component, { events: component.events.filter(f => f.ID !== eventID)   }) ;
    });
  }

  const setComponentName = async (appID, pageID, componentID, ComponentName) => {
    editComponent(appID, pageID, componentID, async (component) => {
      Object.assign(component, { ComponentName }) ;
    });
  }

  const drillComponent = (page, component, out = []) => {
    const children = page.components.filter(f => f.componentID === component.ID);

    console.log ({i: children.length, p: page.components, id: component.ID})

    if (children.length) {
      return out.concat([component, children.map(child => drillComponent(page, child, out)) ]);
    }


    return out; //out.concat()
    // return out;
    
  }

  const setComponentCustomName = async (appID, pageID, componentID, ComponentCustomName) => {
    editComponent(appID, pageID, componentID, async (component, page) => {
      console.log (drillComponent(page, component) )
      // Object.assign(component, { ComponentCustomName }) ;
    });
  }

  const setComponentParent = async (appID, pageID, childID, componentID) => {
    editComponent(appID, pageID, childID, async (component) => { 
      Object.assign(component, { componentID }) ;
    });
  }

  const setPageParent = async (appID, childID, pageID) => {
    editPage(appID, childID, async (page) => { 
      Object.assign(page, { pageID }) ;
    });
  }




  const setComponentStyle = async (appID, pageID, componentID, key, value, selector) => {
    
    editComponent(appID, pageID, componentID, async (component) => { 

      const style = {
        Key: key ,
        Value: value ,
        selector
      };

      if (value === null) { 
        return  component.styles = component.styles.filter(f => f.Key !== key) 
      }
      component.styles = component.styles.find(f => f.Key === key && (!selector || f.selector === selector)  )
        ? component.styles.map((c) => c.Key === key && 
            (!selector || c.selector === selector) ? style : c)
        : component.styles.concat(style);
    });
  }




  const setComponentEvent = async (appID, pageID, componentID, event) => {
    editComponent(appID, pageID, componentID, async (component) => {
      

      component.events = component.events.find(f => f.ID === event.ID)
        ? component.events.map((c) => c.ID === event.ID ? event : c)
        : component.events.concat({...event, ID: uniqueId()});
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
    dropComponentEvent, setComponentParent, setPageScript , dropPageScript, setResource, importComponent,
    dropResource, dropConnection, setConnection, setPage, dropPage, duplicatePage, setComponentCustomName,
    createProg, setTheme, dropTheme, setPageEvent, setProgProps, setParameter, dropParameter,  
    setResourceEvent, dropResourceEvent, setPageParent };
}