

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
    return false;
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

  return arg?.value;
};
 
export const getSettings = settings => settings.reduce((items, res) => {
    items[res.SettingName] = res.SettingValue;
    return items;
  }, {});


export const getStyles = styles => {
  const args = styles.reduce((items, res) => {
    items[res.Key] = res.Value || "";
    return items;
  }, {});

   if (args['grid-template-rows']) {
    Object.assign(args, {'grid-template-rows': gridTransform(args['grid-template-rows'])})
   }
  
   if (args['grid-template-columns']) {
    Object.assign(args, {'grid-template-columns': gridTransform(args['grid-template-columns'])})
   }
  
   if (args['padding']) {
    Object.assign(args, {'padding': paddingTransform(args['padding'])})
   }
  
   if (args['margin']) {
    Object.assign(args, {'margin': paddingTransform(args['margin'])})
   }
   
   if (args['border-radius']) {
    Object.assign(args, {'border-radius': paddingTransform(args['border-radius'])})
   }
   
   if (args['border-width']) {
    Object.assign(args, {'border-width': paddingTransform(args['border-width'])})
   }
   
   if (args['border-color']) {
    Object.assign(args, {'border-color': colorTransform(args['border-color'])})
   }
  
   if (args['background-color']) {
    Object.assign(args, {'background-color': colorTransform(args['background-color'])})
   }
  return args;
}


export const getMax = array => array.reduce((count, res) => { 
  return Math.max(res, count);
}, 0);

