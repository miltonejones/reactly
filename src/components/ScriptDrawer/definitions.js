export const definitions = {
  page: {
    setState: {
      description: 'Sets the value of the current page client state',
      snippet: `setState(state => ({...state, new_state}));`
    }, 

    
    getState: {
      description: 'Returns a promise containing the value of the current page client state',
      snippet: `const state = await getState();`,
      async: true
    }, 
  },

  application: {
    setState: {
      description: 'Sets the value of the current application state',
      snippet: `application.setState(state => ({...state, new_state}));`
    },  
    getState:  {
      description: 'Returns a promise containing the value of the current application state',
      snippet: `const state = await application.getState();`,
      async: true
    },  
  },

  api: { 
 

    Confirm:  {
      description: 'Opens a modal prompt for user confirmation',
      snippet: `const confirmed = await api.Confirmed("Are you sure?", "Title");
if (!confirmed) {
  return;
}`,
      async: true
    },
    Alert:{
      description: 'Opens a modal prompt with a text message',
      snippet: `await api.Alert("This is important!", "Title");`,
      async: true
    },
    JSON: {
      description: 'Opens a modal prompt to display a Javascript object as data',
      snippet: `await api.JSON(object, "Title"); `,
      async: true
    },

    executeScriptByName:  {
      description: 'Execute a script anywhere in the application by name',
      snippet: `api.executeScriptByName("script_name", { data }); `, 
    }, 

    openPath:  {
      description: 'Navigates to a page in the application',
      snippet: `api.openPath("page_name", { parameters }); `, 
    },

    execRefByName:  {
      description: 'Returns a function with a DOM reference to an application component as its argument',
      snippet: `api.execRefByName("component_name", (component) => {
  component.go();
})`, 
    },

    execResourceByName:  {
      description: 'Executes a data resource by name',
      snippet: `api.execResourceByName("resource_name", { parameters })`,
      async: true 
   },

   shout:  {
      description: 'Sends a message to the Reactly log',
      snippet: `api.shout(object, "Title")`,
      async: true 
  }, 

    map:  {
      description: 'Loops over an array asynchronously',
      snippet: `await api.map(array, async (item, index) => {
})`,
      async: true 
   }, 

    shuffle:  {
      description: 'Shuffles an array',
      snippet: `const shuffled = api.shuffle(array)`, 
   } ,

    copy:  {
      description: 'Copies a string to the clipboard',
      snippet: `api.copy(string)`, 
   }, 
    moment:  {
      description: 'Returns a reference to moment',
      snippet: `api.moment`, 
   },
  }
}

export const definitionMenu = Object.keys(definitions).reduce((out, defKey) => {
  out.push({
    label: <b>{defKey}</b> 
  });
  Object.keys(definitions[defKey])
    .sort((a,b) => a > b ? 1 : -1)
    .map(def => {
    out.push({
      label: defKey + '.' + def,
      ...definitions[defKey][def]
    })
  })
  return out;
}, [])