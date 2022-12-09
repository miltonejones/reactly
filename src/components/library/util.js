 

export const getPropertyOptions = (page, event, component, resources) => {
  const options = !page?.state ? [] : page.state.map(d => d.Key);


  !!page?.parameters && Object.keys(page.parameters).map(paramKey => {
    return options.push(`parameters.${paramKey}`);
  })


  !!event?.emits && event.emits.map(paramKey => {
    return options.push(`event.${paramKey}`);
  })


  if (!!component) {
    const args = getSettings(component.settings || []); 
    if (args.bindings && !!resources){
      const bindings = JSON.parse(args.bindings);
      const resource = resources.find(f => f.ID === bindings.resourceID);

      console.log ({ resource })
      if (!resource.columns) {
        return options;
      }
      resource.columns.map(p => options.push(`${component.ComponentName}.data.${p}`))
    }
  }


  return options;
}

const gridTransform = (value) => {
  const fr = [];
  for (let e = 0; e < value; e++) {
    fr.push('1fr');
  }
  return fr.join(' ')
};
 
const attempt = str => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return str;
  }
}

const paddingTransform = (prop) => {
  if (!prop?.split || prop === null || prop === 'null') return null;
  const [key, value] = prop.split('/');
  if (!value) return prop;
  return `${value}rem`;
};
 
const colorTransform = (prop) => {
  const arg = typeof prop === 'string'
    ? attempt(prop)
    : prop;

    if (arg?.value) {
      return arg.value;
    }
  
  return arg;
};
 
export const getSettings = (settings = []) => settings.reduce((items, res) => {
    items[res.SettingName] = res.SettingValue;
    return items;
  }, {});

export const objectReduce = (object = []) => [...object].reduce((items, res) => {
  items[res.Key] =  res.Value === undefined 
    ? ""
    : res.Value; // || typeof res.Value;
  return items;
}, {});


export const getStyles = styles => {
  const args = objectReduce(styles)

   if (args['grid-template-rows']) {
    Object.assign(args, {'grid-template-rows': gridTransform(args['grid-template-rows'])})
   }
  
   if (args['grid-template-columns']) {
    Object.assign(args, {'grid-template-columns': gridTransform(args['grid-template-columns'])})
   }

   Object.keys(args).map(key => {
    if (key.indexOf('edges') > 0) return ;
    if (key.indexOf('free') > 0) return ;//delete args[key];
    ['padding', 'margin'].map(selector => {
      if (key.indexOf(selector) === 0) {
        if (!args[selector + '-edges'] && key.indexOf('-') > 0 ) return delete args[key];
        !!args[selector + '-edges'] && delete args[selector];
        Object.assign(args, {[key]: paddingTransform(args[key])})
      }
    });
    if (key.indexOf('color') > -1) {
      
    }
   })
  
  //  if (args['padding']) {
  //   Object.assign(args, {'padding': paddingTransform(args['padding'])})
  //  }
  
  //  if (args['margin']) {
  //   Object.assign(args, {'margin': paddingTransform(args['margin'])})
  //  }
   
   if (args['border-radius']) {
    Object.assign(args, {'border-radius': paddingTransform(args['border-radius'])})
   }

  const transformKey = (key, fn) => {
    if (args.hasOwnProperty(key)) {
      const prop = fn(args[key]);
      if (!fn || fn === 'null') return delete args[key];
      Object.assign(args, { [key]: prop })
      return;
    } 
    // console.log ({key, val: args[key]})
    // Object.assign(args, { [key]: null })
  }
  
  ['border-color', 'background-color', 'color'].map(type => transformKey(type, colorTransform));
  transformKey('border-width', paddingTransform)
  //  if (args['border-width']) {
  //   Object.assign(args, {'border-width': paddingTransform(args['border-width'])})
  //  }
   
  //  if (args['border-color']) {
  //   Object.assign(args, {'border-color': colorTransform(args['border-color'])})
  //  }
  
  //  if (args['background-color']) {
  //   Object.assign(args, {'background-color': colorTransform(args['background-color'])})
  //  }
  return args;
}


export const getMax = array => array.reduce((count, res) => { 
  return Math.max(res, count);
}, 0);


export const uniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

function findMatches(regex, str, matches = []) { 
  const res = regex.exec(str)  
  res && matches.push(res) && findMatches(regex, str, matches)
  return matches
}

export const fixText = (str, options, parameters) => {
  const test = /\{([^}]+)\}/g
  let out = str;

  findMatches(test, str).map(match => {
    let prop;  
    if (match[1].indexOf('parameters.') === 0) {
      const [name, key] = match[1].split('.');
      prop = !parameters ? 'unknown' : parameters[key];
    } else prop = options[match[1]]
    return out = out.replace(match[0], prop)
  }) 
  return out;
}


export const getParams = (state, page, route) => { 
  const params = {};
  const vals = route['*'];

  // console.log ({state, route}, page?.parameters)

  if (vals && page?.parameters) {

    const ps = vals.split('/')
    Object.keys(page.parameters).map((p, i) =>{
      params[p] = ps[i]
      // console.log ({p})
    } )
  
    if (params) { 
      return params;
    }
  
  }
 
  if (state.params) { 
    return state.params;
  }
 
  return {}; //page.parameters


  
}
