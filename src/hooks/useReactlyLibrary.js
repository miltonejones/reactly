import * as React from "react";
import useDynamoStorage from "./DynamoStorage";
import { reduceComponent } from "../components/library/library";
import { expandLibrary  } from "../components/library";
import Library from "../components/library";

const eventTypes = [
  {
    name: "onPageLoad",
    description: "Page  finishes loading.",
  },
  {
    name: "dataLoaded",
    description: "Data finishes loading.",
  },
  {
    name: "loadStarted",
    description: "Data starts loading.",
  }, 
  {
    name: 'onApplicationLoad', 
    description: 'Application finishes loading.'
  },  
];

export const useReactlyLibrary = (state) => {


  const { getItems, setItem } = useDynamoStorage();

  const getLibraryItems = React.useCallback(async () => {
    const cache = localStorage.getItem('reactly-library');
    if (cache) {
      try {
        return JSON.parse(cache); 
      } catch (e) {
        // do nothing
      }
    }
    const items = await getItems();
    const json = JSON.stringify(items);
    localStorage.setItem('reactly-library', json);
    return items;
  }, [getItems]);

  // download reactly component library
  const downloadReactlyLibrary = React.useCallback( async () => {
    state.setBusy(`Reloading data...`);

    // get library components
    const items = await getLibraryItems();



    // decode base64 values
    const converted = Object.keys(items).reduce((out, item) => {
      const [label, key] = item.split('-');
      out[key] = JSON.parse(atob(items[item]))
      return out;
    }, {});
    
    // add library JSON to memory
    state.setLibraryJSON(s => converted);
    
    state.setBusy(false);

    return converted; 

  }, [state, getItems]);


 // save library component
  const uploadReactlyComponent = async (key, component) => { 
    state.setBusy(`Saving ${key}...`); 
  
    // remove UI add-ons from component before saving
    const dehydratedComponent = reduceComponent(component);
    

    await setItem(`reactly-${key}`, JSON.stringify(dehydratedComponent))
    localStorage.removeItem('reactly-library'); 
    const updated = await downloadReactlyLibrary();
    updateLibrary(updated)
  }

  // parse the supported events list from the library before 
  // committing it to state
  const getSupportedEventList = library => {

    const eventNames = Object.keys(library).reduce ((out, key) => {
      const events = library[key].Events;
      if (!events) return out;
      out = out.concat(events.filter(e => !out.find(f => f.name === e.name) ));
      return out;
    }, []);

    state.setSupportedEvents(eventNames.concat(eventTypes));
    state.setHydratedLibrary(library);
  }

  // hydrate the library JSON for the UI
  const updateLibrary =  React.useCallback( async (configurationJSON) => {
    const library = expandLibrary(Library, configurationJSON); 
    state.setLibraryJSON(configurationJSON);
    getSupportedEventList(library);  
    state.setBusy(false);

  }, [state, getSupportedEventList, expandLibrary]);

  const getReactlyConfig = async () => {
    const reactlyConfig = await downloadReactlyLibrary();
    await updateLibrary (reactlyConfig);
  }


  return {
    downloadReactlyLibrary,
    uploadReactlyComponent,
    getSupportedEventList,
    updateLibrary,
    getReactlyConfig
  }

}