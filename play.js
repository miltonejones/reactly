 
 const json = require('./index.json')
 const fs = require('fs')
 
 const file = fs.readFileSync(`./index.json`);

 console.log(file.length)
 
 
 

 

 json.map(a => {

  const { pages, resources , connections, themes, ...rest} = a;

  console.log(a.Name, a.ID)

  a.pages.map(p => {
    console.log ('----'+p.PageName, p.ID, JSON.stringify(p).length)
  })
  
  console.log ('--resources', JSON.stringify(resources).length); 
  console.log ('--connections', JSON.stringify(connections).length); 
  console.log ('--themes', JSON.stringify(themes).length); 

  console.log ('--rest', JSON.stringify(rest).length); 
  console.log('-------------------------------------')
  console.log ('TOTAL', JSON.stringify(a).length); 
  console.log('-------------------------------------')
})
 

//  const errors = []
//  Object.keys(json).map(key => {
//   try {

//     const file = fs.readFileSync(`./src/components/library/Reactly${key}/Reactly${key}.js`);
//     const regex = /Icon\:\s*(\w+)/.exec(file.toString());
//     const icon = regex[1]
//     console.log ({ key, size: file.length, icon })
//     Object.assign(json[key], {Icon: icon})
//   } catch (e) {
//     // console.log (e.message);
//     errors.push(e.message)
//   }
//  }) 

//  fs.writeFileSync( 'index.json', JSON.stringify(json,0,2))

// console.log (errors)