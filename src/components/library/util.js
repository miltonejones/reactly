 

export const getPropertyOptions = (page, event, component, resources, app) => {
  const options = !page?.state ? [] : page.state.map(d => d.Key);
  const appstate = !app? [] : app.map(d => `application.${d.Key}`);


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


  return options.concat(appstate);
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
    items[res.SettingName] = isNaN(res.SettingValue) ? res.SettingValue : Number(res.SettingValue);
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

export const recurse = (page, selected, open = false) => { 
 
  const types = ['Drawer', 'Collapse']

  if (!selected) {
    return open;
  }
  
  const parents = page?.components?.filter(f => f.ID === selected.componentID);


  if (parents?.length) {
    const out = parents.map(kid => { 
      return recurse(page, kid, open || types.find(f => kid.ComponentType === f) )
    }) 
    const ok = out.some(f => !!f);
    return ok
  }

  return open || types.find(f => page.ComponentType === f);
}


// export const recurse = ({
//   page,
//   app
// }, selected, tag, open = false) => {
//   const parents = (page?.components||[]).concat(app?.components||[]);
  
//   const kids = parents.filter(f => f.componentID === tag.ID);
//   if (kids?.length) {
//     const out = kids.map(kid => recurse({ page, app }, selected, kid, open || selected?.ID === kid.ID )) 
//     const ok = out.some(f => !!f);
//     return ok
//   }
//   return open;
// }

export const getMax = array => array.reduce((count, res) => { 
  return Math.max(res, count);
}, 0);

export const getComponent = (page, component, matches = []) => { 
  const res = page?.components.filter(f => f.componentID === component.ID);
  matches.push(component)
  if (res.length) {
   res.map(t => {
    getComponent(page, t, matches)
    })
  } 
  return matches
}
 



export const uniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

function findMatches(regex, str, matches = []) { 
  const res = regex.exec(str)  
  res && matches.push(res) && findMatches(regex, str, matches)
  return matches
}

export const fixText = (str, options, parameters) => {
  const test = /\{([^}]+)\}/g
  let out = str;

  !!options && findMatches(test, str).map(match => {
    let prop;   
    if (match[1].indexOf('parameters.') === 0) {
      const [name, key] = match[1].split('.');
      prop = !parameters ? 'unknown' : parameters[key];
    } else prop = options[match[1]]
    return out = out.replace(match[0], prop)
  }) 
  return out;
}


export const css = (o) =>
  Object.keys(o)
    .filter((f) => !!o[f])
    .join(" ");


export const getParams = (state, page, route, shout) => { 
  const params = {};
  const vals = route['*'];

  const { appContext, ...rest} = state ?? {}
  shout && shout({state: rest, route, parameters: page?.parameters}, 'getParams' );


  // console.log ({state, route}, page?.parameters)

  if (vals && page?.parameters) {

    const ps = vals.split('/')
    Object.keys(page.parameters).map((p, i) =>{
      params[p] = ps[i]
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


export const map = async (list, fn, index = 0, out = []) => {
  if (index < list.length) {

    const trigger  = list[index];
    const res = await fn(trigger, index);
    out.push(res)
    return await map (list, fn, ++index, out );
  }
  return out;
}


// export const map = async (list, fn) => {
//   const out = [];
//   for (var index = 0; index < list.length; index++) {
//     const res =  await fn(list[index], index)
//     out.push(res);
//   } 
//   return out;
// }


  /**
   * 
   * @param {*} state current pageClientState
   * @param {*} param1 { target - the ID of the event target, value - value passed into the event}
   * @param {*} eventParams - data passed into the event
   * @param {*} routeParams - currrent page parameters
   * @returns parsed value
   */
  export const getPropertyValueFromString = (
    state, 
    { target, value }, 
    eventParams, 
    routeParams,
    shout
  ) => {

    const regex = /\{([^}]+)\}/g;
    const literal = regex.exec(value);

    const logData = { target, state, eventParams, routeParams }

    // literal values formatted as {value}
    if (literal) { 


    !!shout && shout(logData, `getPropertyValueFromString: Resolved "${value}" as "${literal[1]}"`)
      return literal[1];
    }

    if (typeof value === 'boolean') {
      !!shout && shout(logData, `getPropertyValueFromString: Resolved "${value}" as boolean "${value.toString()}"`)
      return value;
    }
 
    if (!value && value !== 0) {
      !!shout && shout(logData, `getPropertyValueFromString: Resolved "${value}" as empty string`)
      return ''
    }

    // transform 'dot' notation values
    if (value?.indexOf('.') > 0) {

      const [name, propKey] = value.split('.');
      if (name === 'application') {
        !!shout && shout({name, propKey, ...logData}, `getPropertyValueFromString: application value "${state[propKey]}""`)
        return state[propKey]
      }

      if (value.indexOf('parameters.') === 0) {
        !!shout && shout({name, propKey, ...logData}, `getPropertyValueFromString: Resolved "${value}" as parameter "${routeParams[propKey] }"`)
        return routeParams[propKey]  
      }  

      // must have eventParams to transform values 
      if (!eventParams) {

        !!shout && shout(logData, `getPropertyValueFromString: No event params. Returning "${value}""`)
        return `[...]`;
      } 

      const values = value.split('.'); 

      // values with 3 parts are data-bound
      // values "[component].data.[fieldname]"
      if (values.length === 3) {
        const [key, prop, datum] = values;

        !!shout && shout({key, prop, datum, ...logData}, `getPropertyValueFromString: Data bound value "${eventParams[datum]}""`)
        // "eventParams" are the fields from the event
        return eventParams[datum];
      }

      // values with 2 parts are pulled from the 
      // event fired by the calling component
      const [key, prop] = values;
      !!shout && shout({key, prop, ...logData}, `getPropertyValueFromString: Event data "${eventParams[prop]}""`)
      return eventParams[prop]
    }

    // numbers and strings passed as literals
    if (typeof value === 'number' || value?.indexOf('|') < 0) {
      if (state[value]) {
        !!shout && shout(logData, `getPropertyValueFromString: state data "${state[value]}""`)
        return truth(state[value]);
      }
      !!shout && shout(logData, `getPropertyValueFromString: literal data "${value}""`)
      return  truth(value);
    }
    // values with 2 parts are meant to toggle
    const [trueProp, falseProp] = value.split('|');
    const res = state[target] === trueProp ? falseProp : trueProp;

    !!shout && shout(logData, `getPropertyValueFromString: toggle data "${res}""`)
    return res
  } 

  export const truth = e => {
    if (e === 'true' || e === 'false') return eval(e);
    return e;
  }
