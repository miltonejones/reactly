import React from 'react';
import { AppStateContext } from "./AppStateContext";
import { useRunScript } from "./subhook/useRunScript";

export const useScriptReferences = () => {
  const {  
    appContext, Alert
  } = React.useContext(AppStateContext); 

  const { getApplicationScripts } = useRunScript();

  const getEventsFromObject = (object, prefix, field) => {
    return (object.events || []) 
      .filter(event => event.action && event.action.type === 'scriptRun')
      .map(s => ({
        label: `${prefix}.${!field ? '' : (object[field] + '.')}${s.event}`, 
        target: s.action.target
      }));
  }

  const getComponentTransforms = (component, pageName) => {
    const binding = component.settings?.find(f => f.SettingName === 'bindings');
    if (binding) {
      const bindingNode = JSON.parse(binding.SettingValue);
      const { typeMap } = bindingNode;
      if (typeMap) {
        return Object.keys(typeMap)
          .filter (type => !!typeMap[type].settings?.transform)
          .map(type => ({
            label: `${pageName}.${component.ComponentName}.${type}`,
            target: typeMap[type].settings.transform
          }))
      }

    }
    return []
  }

  const getPageEvents = () => {


    const pageEvents = !appContext.pages ? [] : appContext.pages?.reduce((out, page) => {
      page.components?.map(component => {
        out = out.concat( getEventsFromObject (component, page.PageName, 'ComponentName') );
      });
      return out;
      }, []);

    const dataEvents = !appContext.resources ? [] : appContext.resources?.reduce((out, resource) => {
      out = out.concat( getEventsFromObject (resource, resource.name) );
      if (resource.transform) {
        out.push({
          label: `${resource.name}.transform`,
          target: resource.transform.ID || resource.transform
        })
      }
      return out;
    }, []);

    const appEvents = !appContext.components ? [] :  appContext.components?.reduce((out, component) => {
      out = out.concat( getEventsFromObject (component, 'application', 'ComponentName') );
      return out;
      }, []) ;
  
    return pageEvents.concat([...appEvents, ...dataEvents ]);
  }

  const getDataTransforms = () => {
    
    const pageTransforms =  appContext.pages?.reduce((out, page) => {
      page.components?.map(component => {
        out = out.concat( getComponentTransforms (component, page.PageName) );
      });
      return out;
      }, []);

    return pageTransforms;
  }

  const getScriptReferences = ID => {
    if (!ID) return [];

    const scripts = getApplicationScripts();
    const events = getPageEvents();
    const transforms = getDataTransforms();

    const script = scripts.find(f => f.ID === ID);

    // get matching events
    const componentEvents = events.filter(event => event.target === ID);

    // get matching transforms
    const componentTransforms = transforms.filter(transform => transform.target === ID);

    // find other scripts referring to this script
    const referringScripts = scripts
      .filter(f => !!f.code && f.code.indexOf(script.name) > -1 && f.ID !== ID)
      .map(s => ({
        label: s.page + '.' + s.name,
        target: ID,
        script: s
      }));
 

    const transformNode = !componentTransforms.length
      ? []
      : [{
        label: <b>Value Transforms</b>
      }].concat(componentTransforms)


    const referenceNode = !referringScripts.length
      ? []
      : [{
        label: <b>References</b>
      }].concat(referringScripts)

    const componentNode = !componentEvents.length 
      ? []
      : [{
        label: <b>Event triggers</b>
      }].concat(componentEvents)

    return componentNode
      .concat(referenceNode)
      .concat(transformNode)
  }


  return {
    getPageEvents,
    getScriptReferences
  }
}
