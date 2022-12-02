const fs = require('fs');
const data = require ('./data.js')

const uniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

// const filenames = fs.readdirSync('node_modules/@mui/icons-material/');


// const icons = filenames.filter (d => d.indexOf('.js') > 1 && 
// d.indexOf('Outlined') < 1  && 
// d.indexOf('Sharp') < 1  && 
// d.indexOf('Rounded') < 1  && 
// d.indexOf('TwoTone') < 1 ) ;


// console.log ( icons );

// const list = icons.map(f => f.replace('.js', ''));
// const keys = list.map(e => `${e}: ${e}`).join(' \n, ')

// fs.writeFileSync( 'index.js', `

// import {${list.join(', ')}} from "@mui/icons-material";

// export const Icons = {
//   ${keys}
// }

// `  )
 

console.log(data.AppData)

const fixed = data.AppData.reduce((apps, app) => {
  
  apps = apps.concat( {
    ...app,
    pages: app.pages.reduce((pages, page) => {
      pages = pages.concat({
        ...page,
        components: page.components.reduce((components, component) => {

          const boundProps = !component.settings 
            ? []
            : component.settings.filter(f => f.SettingName === 'bound')
              .map(s => {
                const target = component.settings.find(f => f.SettingName === 'target')
                console.log({target})
                return ({
                  attribute: s.SettingValue,
                  boundTo: !target ? 'NO TARGET FOR THIS FIELD' : target.SettingValue,
                  ID: uniqueId()
                })
              })

          Object.assign(component, { boundProps })

          components = components.concat({
            ...component,
            settings: !component.settings ? [] : component.settings.reduce((settings, setting) => {
              settings = settings.concat({

                ...setting 
              })
              return settings;
            }, [])
          }, [])
          return components
        }, [])
      })
      return pages;
    }, [])
  })

  return apps;

}, []);

// console.log (JSON.stringify(fixed,0,2))

fs.writeFileSync( 'index.json', JSON.stringify(fixed,0,2))

/**
 * 
 *
 * 
 * 
 


 */