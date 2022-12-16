import * as React from 'react';

export const useLocalStorage = (values = {}) => {
  const object = Object.keys(values).reduce((items, key) => {
   //  localStorage.removeItem(key)
   items[key] = localStorage.getItem(key) || values[key];
    return items;
  }, {});

  const [state, setState] = React.useState(object);

  const setItem = (key, value) =>{
    setState(s => ({...s, [key]: value}));
    try {
      localStorage.setItem(key, value)
      console.log ('Saved "%s": %s bytes', key, value?.length)
    } catch (e) {
      console.log ({ localStorageError: e})
    }
  }

  const getItem = (key) => state[key] || localStorage.getItem(key)  ;

  return { state, setItem, getItem };
}