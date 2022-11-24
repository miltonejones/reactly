const fs = require('fs');


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


const b = `
Background - Primary - rgb(255,255,255)
Background - Secondary - rgb(246,246,248)
Background - Tertiary - rgb(228,230,234)
Neutral 0 - rgb(255,255,255)
Neutral 1 - rgb(246,246,248)
Neutral 2 - rgb(228,230,234)
Neutral 3 - rgb(211,214,220)
Neutral 4 - rgb(193,197,205)
Neutral 5 - rgb(176,181,191)
Neutral 6 - rgb(159,165,176)
Neutral 7 - rgb(143,149,161)
Neutral 8 - rgb(126,133,146)
Neutral 9 - rgb(110,117,131)
Neutral 10 - rgb(94,101,116)
Neutral 11 - rgb(79,86,100)
Neutral 12 - rgb(69,77,91)
Neutral 13 - rgb(61,68,82)
Neutral 14 - rgb(53,59,73)
Neutral 15 - rgb(44,50,63)
Neutral 16 - rgb(37,42,53)
Neutral 17 - rgb(28,33,43)
Neutral 18 - rgb(21,25,32)
Neutral 19 - rgb(14,17,22)
Neutral 20 - rgb(7,8,11)
Neutral 21 - rgb(0,0,0)
Primary 0 - rgb(209,210,238)
Primary 1 - rgb(79,82,189)
Primary 2 - rgb(53,55,128)
Primary 3 - rgb(28,29,66)
Secondary 0 - rgb(209,210,238)
Secondary 1 - rgb(79,82,189)
Secondary 2 - rgb(53,55,128)
Secondary 3 - rgb(28,29,66)
Surface - Brand 1 - rgb(237,238,248)
Surface - Brand 2 - rgb(206,207,237)
Surface - Brand 3 - rgb(174,175,225)
Surface - Brand 4 - rgb(142,144,213)
Surface - Brand 5 - rgb(111,113,201)
Surface - Brand 6 - rgb(79,82,189)
Surface - Neutral 1 - rgb(252,252,253)
Surface - Neutral 2 - rgb(242,243,245)
Surface - Neutral 3 - rgb(232,234,237)
Surface - Neutral 4 - rgb(222,225,229)
Surface - Neutral 5 - rgb(213,215,221)
`

const colors = b.split('\n')

const hues = colors.map(c => {
  const i = c.lastIndexOf('-');
  const name = c.substr(0, i - 1).trim();
  const value = c.substr(i + 1).trim();

  return {name, value};
})

console.log (hues.filter(f => !!f.value.length))

/**
 * 
 *
 * 
 * 
 


 */