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
  }


  const editProg = async (ID, edit) => {
    const app = findProg(ID);
    await edit(app);
    updateProg(app);
  };


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
  
  const addComponent = async (appID, pageID, component, options) => {
    const { order, after, before } = options ?? {}
    // alert (JSON.stringify({ order, after, before }))
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

  
  
  const setPageState = async (appID, pageID, stateID, key, value, type) => {
    editPage(appID, pageID, async (page) => {
      const setting = {
        Key: key,
        Value: value,
        Type: type
      }
 

      const maxID = getMax(page.state.map(f => f.ID));

      // return alert (maxID)

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

  const setComponentName = async (appID, pageID, componentID, ComponentName) => {
    editComponent(appID, pageID, componentID, async (component) => {
      Object.assign(component, { ComponentName }) ;
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
    setComponentName, dropPageState, setPageState, setComponentStyle, setComponentProp, setPageProps };
}