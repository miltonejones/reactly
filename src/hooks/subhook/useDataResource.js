import * as React from 'react'; 
import { AppStateContext, PageStateContext } from '../../context';
import moment from 'moment';
import { useOpenLink } from '.';
import { usePageRef } from '.';


export const useDataResource = () => {
  
  
  const {   
    setPageResourceState,  
  } = React.useContext(AppStateContext); 

 

  const getResourceByName =  (name) => new Promise(yes => {
    setPageResourceState(resourceState => { 
      const state = resourceState.find(e => e.name === name); 
      yes(state);
      return resourceState;
    }) 
  })


  const setResourceByName =  (resource) => new Promise(yes => {
    setPageResourceState(resourceState => { 
      const state = resourceState.map(e => e.name === resource.name
          ? resource
          : e); 
      yes(state);
      return state;
    }) 
  })



  return {
    getResourceByName ,
    setResourceByName
  }

}