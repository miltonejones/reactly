
import { Box } from '@mui/material';
import { Icons, renderIconOption } from './icons'; 
import { getOptionColor, colorOption } from './styles'; 
import config from './library.json'
import { StandardColors } from './styles';
import { uniqueId } from './util';

const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
} 


const fn = {
  renderOption,
  getOptionColor,
  getOptionLabel: getOptionColor,
  colorOption,
  renderIconOption
}


const expand = (array, omitIcons) => array.reduce((out, item) => { 

  Object.keys(item).map(key => {

      if (key === 'when') {
          // try {
          //     Object.assign(item, { [key]:  eval(item[key]) })
          // } catch (e) {
          //   console.log ({ e })
          // }
      } else if (item[key] && typeof(item[key]) === 'string' && item[key].indexOf('FN-') === 0){
        const [t, name] = item[key].split('-') 
        Object.assign(item, {[key]:  fn[name] || `Could not find ${name}` })
      }
  })
  
  if (item.types === 'COLOR_TYPES') {
    Object.assign(item, {types: ['COLOR_TYPES'] }) ;
  }
  if (item.types && item.types.find && item.types.find(f => typeof f === 'object')) {
    Object.assign(item, { getOptionLabel: fn.getOptionLabel })
    // Object.assign(item, {types: item.types.map(e => JSON.stringify(e))}) ;
  }
  if (item.types === 'ICON_TYPES' && !omitIcons) {
    Object.assign(item, {types: ['ICON_TYPES']}) ;
  }

  if (!item.ID) {
    Object.assign(item, {ID: uniqueId()})
  }
 
  if (!item.order || item.order === 1) {
    Object.assign(item, {order: out.length})
  }
 
  return out.concat(item);
}, [])


export const reduce = (array) => array.reduce((out, item) => {
        
  if (typeof item !== 'string') {
    Object.keys(item).map(key => {
      if (typeof item[key] === 'function') {
        if (key === 'when') {
          Object.assign(item, { [key]:  item[key].toString() })
        } else {
          Object.assign(item, {[key]:  `FN-${item[key].name}` })
        }
      }
    })
  }

  if (item.label.toLowerCase().indexOf('icon') > -1 || item.label === 'end') {
    Object.assign(item, {types: 'ICON_TYPES' }) ;
  }

  if (!item.ID) {
    Object.assign(item, {ID: uniqueId()})
  }
  if (!item.order) {
    Object.assign(item, {order: 1})
  }
 
 
  return out.concat(item);
}, [])


export const reactlyParse = (component, fn, omitIcons) =>   {
  try {
    return {
      ...component,
      Styles: !component.Styles?.categories ? {} : {
        categories: [
          ...component.Styles?.categories.map((cat, order) => { 
            cat.styles = fn(cat.styles, omitIcons)  
            if (!cat.ID) {
              Object.assign(cat, {ID: uniqueId()})
            }
            if (!cat.order || cat.order === 1) {
              Object.assign(cat, {order})
            } 
            return cat;
          })
        ]
      },
      Settings: !component.Settings?.categories ? {} : {
        categories: [
          ...component.Settings?.categories.map((cat, order) => { 
            cat.settings = fn(cat.settings, omitIcons)  
            if (!cat.ID) {
              Object.assign(cat, {ID: uniqueId()})
            }
            if (!cat.order|| cat.order === 1) {
              Object.assign(cat, {order})
            } 
            return cat;
          })
        ]
      }
    
    }
  } catch (ex) {
    console.log ({ ex, component }) 
    return component
  }
}


export const reduceComponent = component => reactlyParse(component, reduce);

export const reduceLibrary = library => {
  return Object.keys(library).reduce((object, key) => {
    object[key] = reactlyParse({...library[key]}, reduce);
    return object;
  }, {})
}

export const expandComponent = component => reactlyParse(component, expand);

export const expandLibrary = (library, conf, omitIcons) => {
  if (!conf) {
    alert ('Expansion failed!')
    return false
  }
  return Object.keys(conf).reduce((object, key) => {
    object[key] = {
      ...reactlyParse(conf[key], expand, omitIcons),
      Component: !library[key] ? null : library[key].Component,
      Icon: conf[key].Icon //library[key].Icon //Icons [ conf[key].Icon ]
    };
    return object;
  }, {})
}
