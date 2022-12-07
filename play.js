 
 const json = require('./src/components/library/library.json')
 const fs = require('fs')
 

 const errors = []
 Object.keys(json).map(key => {
  try {

    const file = fs.readFileSync(`./src/components/library/Reactly${key}/Reactly${key}.js`);
    const regex = /Icon\:\s*(\w+)/.exec(file.toString());
    const icon = regex[1]
    console.log ({ key, size: file.length, icon })
    Object.assign(json[key], {Icon: icon})
  } catch (e) {
    // console.log (e.message);
    errors.push(e.message)
  }
 }) 

 fs.writeFileSync( 'index.json', JSON.stringify(json,0,2))

console.log (errors)