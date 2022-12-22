const fs = require('fs');
const data = require ('./data.js')


function camelize(str) {
  return  camelize2(str
      .replace('.min.js', '')
      .replace(/\./g, '')
      )
      .replace(/-/g, '')
}

function camelize2(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}


 const filenames = fs.readdirSync('node_modules/react-syntax-highlighter/dist/esm/styles/prism');
const all = filenames.filter(d => d.indexOf('min.js') > 0).map(camelize);//.join(', ');
const line = `import {${all}} from 'react-syntax-highlighter/dist/esm/styles/prism'`
const lihe = `const stylenames = {${all}}`
  
console.log (all)
/**
connection endpoints
------------------------------------------------------------------

iTunes Search API: https://itunes.apple.com
Sky Tunes API: https://u8m0btl997.execute-api.us-east-1.amazonaws.com
all: sortby,direction,page,type
search: page,type,param


client state variables
------------------------------------------------------------------

search_sort,search_direction,search_page,search_type,current_page,player_url,selected_index,page_count,row_count,play_button_icon,player_progress,player_duration,track_name,album_image,artist_name,player_progress_formatted,tab_index,search_param 



carousel images
------------------------------------------------------------------

https://s-media-cache-ak0.pinimg.com/originals/9f/08/0c/9f080cff13af2942eed3e3097ec50876.jpg,https://s3.amazonaws.com/fapbucket.com/assets/Courtesy-Norman-Seeff.jpg.jpg,https://is3-ssl.mzstatic.com/image/thumb/Music49/v4/fb/41/06/fb4106b8-6546-b9ce-a31e-55eefa6157f7/source/1200x630sr.jpg,
https://is1-ssl.mzstatic.com/image/thumb/Music/v4/9e/1e/57/9e1e574b-45ef-c77a-aabb-d732f018df62/source/1200x630sr.jpg,https://is5-ssl.mzstatic.com/image/thumb/Music/v4/76/b0/5b/76b05bf9-eba1-aa9c-6943-50bc4ca3f8ac/source/1200x630sr.jpg,https://is4-ssl.mzstatic.com/image/thumb/Music/v4/9d/e5/ae/9de5ae48-6e3a-135f-83ac-3b7962a30247/source/1200x630sr.jpg,https://jarrettmpho.files.wordpress.com/2015/02/image.jpg,https://is4-ssl.mzstatic.com/image/thumb/Music71/v4/60/5c/9d/605c9dd4-2a1e-84bd-12f6-2087b8af0521/source/1200x630sr.jpg,https://is3-ssl.mzstatic.com/image/thumb/Music2/v4/9a/ac/36/9aac36bc-127f-665e-fbc0-e2219a7e30bb/source/1200x630sr.jpg,https://is3-ssl.mzstatic.com/image/thumb/Music18/v4/60/81/33/608133b7-e8bf-3811-f755-bac85fa8f587/source/1200x630sr.jpg,https://is5-ssl.mzstatic.com/image/thumb/Music/v4/75/90/c5/7590c5ea-0431-c6ab-fafa-9888ee6fb827/source/1200x630sr.jpg,https://is3-ssl.mzstatic.com/image/thumb/Music/v4/c3/49/ff/c349ffd7-1a29-05fd-4247-0655f1eb2567/source/1200x630sr.jpg
 
 */
 

 

// const values = {
//   name: 'tony',
//   email: 'something',
//   address: 'nowhere'
// }

// const str = '{name} is the man from {address}';
// const ok = 'milton is the man from here';
 
 

// console.log (str)
// console.log (out)
// console.log (good)

// const uniqueId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

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
 

// console.log(data.AppData)

// const fixed = data.AppData.reduce((apps, app) => {
  
//   apps = apps.concat( {
//     ...app,
//     pages: app.pages.reduce((pages, page) => {
//       pages = pages.concat({
//         ...page,
//         components: page.components.reduce((components, component) => {

//           const boundProps = !component.settings 
//             ? []
//             : component.settings.filter(f => f.SettingName === 'bound')
//               .map(s => {
//                 const target = component.settings.find(f => f.SettingName === 'target')
//                 console.log({target})
//                 return ({
//                   attribute: s.SettingValue,
//                   boundTo: !target ? 'NO TARGET FOR THIS FIELD' : target.SettingValue,
//                   ID: uniqueId()
//                 })
//               })

//           Object.assign(component, { boundProps })

//           components = components.concat({
//             ...component,
//             settings: !component.settings ? [] : component.settings.reduce((settings, setting) => {
//               settings = settings.concat({

//                 ...setting 
//               })
//               return settings;
//             }, [])
//           }, [])
//           return components
//         }, [])
//       })
//       return pages;
//     }, [])
//   })

//   return apps;

// }, []);

// // console.log (JSON.stringify(fixed,0,2))

// fs.writeFileSync( 'index.json', JSON.stringify(fixed,0,2))

// /**
//  * 
//  *
//  * 
//  * 
 


//  */