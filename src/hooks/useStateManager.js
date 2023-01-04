import * as React from 'react'; 

const attempt = str => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return false;
  }
}

export const useStateManager = (settings, persist) => {

  const options = Object.keys(settings).reduce((out, setting) => { 
    const store = attempt(localStorage.getItem(setting));
    if (!!persist && !!store && persist.find(item => setting === item)) {
      out[setting] = store 
    } else {
      out[setting] = settings[setting];
    }
    return out;
  }, { });

  React.useEffect(() => {
    !!persist && console.log ({ options })
  }, [options, persist])
 
  const [ properties, setProperty ] = React.useState(options);

  const createSetter = (key) => (input) => {
    setProperty(property => {
      const value = typeof input === 'function'
        ? input(property[key])
        : input;
      
        !!persist && console.log ({ key, value});

      !!persist && 
        persist.find(item => key === item) &&
        localStorage.setItem(key, JSON.stringify(value));

      return {
        ...property,
        [key]: value
      }
    })
  }

  const methods = Object.keys(settings)
    .reduce((setters, key) => {

      // setter method name generated from property name
      const method = camelize('set ' + key);

      // state setters can be called with a value or callback function
      setters[method] = createSetter(key);

      return setters; 
    }, {});

  
  const asynced = createAsyncronousSetters(methods);
  

  return {
    ...methods,
    ...asynced,
    ...properties
  }
}


export const createAsyncronousSetters = (asyncable) => 
  Object.keys(asyncable).reduce((out, key) => {
    const stateSetter = asyncable[key];
    
    out[key.replace('set', 'get')] = () => new Promise(resolve => {
      stateSetter(state => {
        resolve(state);
        return state;
      })
    });

    out[`${key}Async`] = (props) => new Promise(resolve => {
    
      stateSetter(old => {
        const better = {
          ...props,
          ...old,
        };
        resolve (better);
        return better;

      });
    });

    return out;
  }, {});



function replacer (word, index) {
  return index === 0 ? word.toLowerCase() : word.toUpperCase();
}

function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, replacer)
    .replace(/\s+/g, "");
}
