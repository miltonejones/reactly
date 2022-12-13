import * as React from 'react';
import { PageStateContext } from '../PageStateContext';
import moment from 'moment';
import { useOpenLink } from '.';
import { usePageRef } from '.';


export const useDataResource = () => {
 
  const {
    setPageResourceState, 
    getPageResourceState, 
    shout,
    Alert,
  } = React.useContext(PageStateContext);

  

  const execResourceByName =  (name, fn) => { 
    setPageResourceState(resourceState => { 
      const state = resourceState.find(e => e.name === name); 
      fn(state);
      return resourceState;
    }) 
  } 

  const getResourceByName =  (name) => {
    const state = getPageResourceState();
    return state?.find(e => e.name === name);
  } 

  return {
    getResourceByName,
    execResourceByName
  }

}