import React from 'react';
import { PageStateContext } from "./usePageContext";
import { getSettings } from '../components/library/util';




export const usePageResourceState = (settings) => {
  const { appContext, setPageResourceState, pageResourceState } = React.useContext(PageStateContext);


  let bindingObject = {}, dataRows = [], resource;


  const componentProps = getSettings(settings);
  if (componentProps.bindings)  {
    bindingObject = JSON.parse(componentProps.bindings); 
    const id = bindingObject.resourceID;
    resource = pageResourceState.find(f => f.resourceID === bindingObject.resourceID);
    if (resource) {
      dataRows = resource.records.map(record => {
        return Object.keys(bindingObject.bindings).reduce((items, res) => {
          items[bindingObject.bindings[res]] = record[ res ]
          return items;
        }, {})
      })
    }
  }


  const executeComponentRequest = async (
    connections,  
    qs, 
    res, 
    slash = '?', 
    eventHandler
  ) => {
    const  { events, connectionID, path, node, columns } = res;
    const connection = connections.find(f => f.ID === connectionID);
    const url = new URL(path, connection.root); 
    const endpoint = `${url}${slash}${qs}`; 

    !!events && eventHandler(events, 'loadStarted', {
      url,
      endpoint
    }) 

    const response = await fetch(endpoint); 
    const json = await response.json();

    const rows = !node ? json : json[node];

    const collated = rows.map(row => columns.reduce((items, res) => { 
      items[res] = row[res]
      return items
    }, {})); 


    !!events && eventHandler && eventHandler(events, 'loadStarted', { 
      options: json, 
    }) 
 

    
    return collated ;
  }

  const handleComponentRequest = (qs, resource, 
    slash = '?', 
    eventHandler) => {

    executeComponentRequest(appContext.connections, qs, resource, slash, eventHandler)
    .then(records => { 
      setPageResourceState(s => s.filter(e => e.resourceID !== resource.ID)
        .concat({
          resourceID: resource.ID,
          name: resource.name,
          records
        }))
    })
   
  }


  return {
    bindingObject,
    resource,
    dataRows,
    handleComponentRequest,
    executeComponentRequest,
    pageResourceState
  }


}