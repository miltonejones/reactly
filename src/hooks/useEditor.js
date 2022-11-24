import * as React from 'react';
import { getMax } from '../components/library/util';

export const useEditor = (apps) => {
  const [applications, setApplications] = React.useState(apps);


  const findProg = ID => applications.find(a => a.ID === ID);

  const updateProg = (prog) =>{
    setApplications((f) =>  f.map((t) => (t.ID === prog.ID ? prog : t)) );
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
  
  const editComponent = async (appID, pageID, componentID, edit) => {
    editPage(appID, pageID, async (page, app) => {
      const component = page.components.find((c) => c.ID === componentID);
      await edit(component, page, app);
      page.components = page.components.map((c) => c.ID === componentID ? component : c);
    });
  };

  
  
  const setPageState = async (appID, pageID, stateID, key, value) => {
    editPage(appID, pageID, async (page) => {
      const setting = {
        Key: key,
        Value: value
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

  const setComponentStyle = async (appID, pageID, componentID, key, value) => {
    editComponent(appID, pageID, componentID, async (component) => {
      const style = {
        Key: key ,
        Value: value 
      }

      if (value === null) { 
        return  component.styles = component.styles.filter(f => f.Key !== key) 
      }
      component.styles = component.styles.find(f => f.Key === key)
        ? component.styles.map((c) => c.Key === key ? style : c)
        : component.styles.concat(style);
    });
  }


  return { applications, editProg, editPage, editComponent ,
    dropPageState, setPageState, setComponentStyle, setComponentProp };
}