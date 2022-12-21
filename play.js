 
 const app = require('./index.json')
 const fs = require('fs')

 const root = '/home/miltonejones/studio'


 const getSettings = (settings = []) => settings.reduce((items, res) => {
  items[res.SettingName] = isNaN(res.SettingValue) ? res.SettingValue : Number(res.SettingValue);
  return items;
}, {});

 const objectReduce = (object = []) => [...object].reduce((items, res) => {
items[res.Key] =  res.Value === undefined 
  ? ""
  : res.Value; // || typeof res.Value;
return items;
}, {});




 const componentTree = (components, ID, indent = '') => {
   const children = !!ID 
    ? components.filter (f => f.componentID === ID)
    : components.filter (f => !f.componentID);

  const component = components.find(f => f.ID === ID) ?? {};
  const tagname = !component.ComponentName ? 'React.Fragment' : `${clean(component.ComponentType)}_${component.ID}`
  let args = '';
  let evt = ''
  let kids = ''

  
  if (component.settings) {
    const settings = getSettings(component.settings)
    args = '\n  ' + indent + Object.keys(settings).map(s => {
      if (s === 'children') {
        kids = settings[s]
      } else {
        if (typeof settings[s] === "string") {
          return ` ${s}="${settings[s]}"`
        }
        return ` ${s}={${settings[s]}}`
      }
    }).join('\n  ' + indent)
  }

  
  if (component.events) { 
    evt = '\n  ' + indent + component.events.map(ev => {
      return ` ${ev.event}={e => execute(e, ${JSON.stringify(ev.action)})}`
    }).join('\n  ' + indent) 
  } else console.log ('NO EVENTS')

  console.log ('%s<%s%s%s>', indent, tagname, args, evt);

  !!kids && console.log (indent + kids);



  children.map(child => componentTree(components, child.ID, indent + '  '));

  console.log ('%s</%s>\n', indent, tagname );

 }




 
 const file = fs.readFileSync(`./index.json`);

 const clean = s => s.replace(/\s/g, '_').replace(/-/g, '_')

 const appPath = `${root}/${clean(app.Name)}`
 fs.mkdirSync (appPath)

 const pagesPath = `${appPath}/pages`
 fs.mkdirSync (pagesPath)


app.pages.map(page => {
  const pagePath = `${pagesPath}/${clean(page.PageName)}`
  fs.mkdirSync (pagePath)

  const componentsPath = `${pagePath}/components`
  if (!fs.existsSync(componentsPath)) {
    fs.mkdirSync (componentsPath) 
  }

  console.log ('\n\n<%s>', page.PageName);
  componentTree (page.components, null, '   ')
  console.log ('</%s>\n\n', page.PageName);


  page.components.map(component => {
    const componentPath = `${componentsPath}/${clean(component.ComponentName)}_${component.ID}`
    fs.mkdirSync (componentPath) 
  })

})



 console.log(file.length)
 
   