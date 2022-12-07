
import { Box, Typography } from '@mui/material';
import { Flex, Pill } from '../..';


const PaddingSizes = [
  'Xxs/0.125',
  'Xs/0.25',
  'Sm/0.5',
  'Md/0.75',
  'Lg/1',
  'Xl/1.5',
  'Xxl/2',
  '3xl/2.5'
]

export const StandardColors = [
  { name: 'Background - Primary', value: 'rgb(255,255,255)' },
  { name: 'Background - Secondary', value: 'rgb(246,246,248)' },
  { name: 'Background - Tertiary', value: 'rgb(228,230,234)' },
  { name: 'Neutral 0', value: 'rgb(255,255,255)' },
  { name: 'Neutral 1', value: 'rgb(246,246,248)' },
  { name: 'Neutral 2', value: 'rgb(228,230,234)' },
  { name: 'Neutral 3', value: 'rgb(211,214,220)' },
  { name: 'Neutral 4', value: 'rgb(193,197,205)' },
  { name: 'Neutral 5', value: 'rgb(176,181,191)' },
  { name: 'Neutral 6', value: 'rgb(159,165,176)' },
  { name: 'Neutral 7', value: 'rgb(143,149,161)' },
  { name: 'Neutral 8', value: 'rgb(126,133,146)' },
  { name: 'Neutral 9', value: 'rgb(110,117,131)' },
  { name: 'Neutral 10', value: 'rgb(94,101,116)' },
  { name: 'Neutral 11', value: 'rgb(79,86,100)' },
  { name: 'Neutral 12', value: 'rgb(69,77,91)' },
  { name: 'Neutral 13', value: 'rgb(61,68,82)' },
  { name: 'Neutral 14', value: 'rgb(53,59,73)' },
  { name: 'Neutral 15', value: 'rgb(44,50,63)' },
  { name: 'Neutral 16', value: 'rgb(37,42,53)' },
  { name: 'Neutral 17', value: 'rgb(28,33,43)' },
  { name: 'Neutral 18', value: 'rgb(21,25,32)' },
  { name: 'Neutral 19', value: 'rgb(14,17,22)' },
  { name: 'Neutral 20', value: 'rgb(7,8,11)' },
  { name: 'Neutral 21', value: 'rgb(0,0,0)' },
  { name: 'Primary 0', value: 'rgb(209,210,238)' },
  { name: 'Primary 1', value: 'rgb(79,82,189)' },
  { name: 'Primary 2', value: 'rgb(53,55,128)' },
  { name: 'Primary 3', value: 'rgb(28,29,66)' },
  { name: 'Secondary 0', value: 'rgb(209,210,238)' },
  { name: 'Secondary 1', value: 'rgb(79,82,189)' },
  { name: 'Secondary 2', value: 'rgb(53,55,128)' },
  { name: 'Secondary 3', value: 'rgb(28,29,66)' },
  { name: 'Surface - Brand 1', value: 'rgb(237,238,248)' },
  { name: 'Surface - Brand 2', value: 'rgb(206,207,237)' },
  { name: 'Surface - Brand 3', value: 'rgb(174,175,225)' },
  { name: 'Surface - Brand 4', value: 'rgb(142,144,213)' },
  { name: 'Surface - Brand 5', value: 'rgb(111,113,201)' },
  { name: 'Surface - Brand 6', value: 'rgb(79,82,189)' },
  { name: 'Surface - Neutral 1', value: 'rgb(252,252,253)' },
  { name: 'Surface - Neutral 2', value: 'rgb(242,243,245)' },
  { name: 'Surface - Neutral 3', value: 'rgb(232,234,237)' },
  { name: 'Surface - Neutral 4', value: 'rgb(222,225,229)' },
  { name: 'Surface - Neutral 5', value: 'rgb(213,215,221)' }
];



const renderOption = (props, option) => {
  const [key, value] = option?.split('/');
  if (!value) return <Box {...props}>{option}</Box>
  return <Box {...props}> {key} ({value}rem) </Box>
}

export const colorOption = (props, option) => { 
  if (!option.name) return <Box {...props}>{option}</Box>
  return <Flex {...props}> <Pill square backgroundColor={option.value}>&nbsp;</Pill> {option.name}</Flex>
}

export const Hues = [
  {
    name: 'Neutral 5'
  }
]

const attempt = str => {
  try {
    return JSON.parse(str)
  } catch (e) {
    return false;
  }
}

export const getOptionColor =  (option, key = 'name') => {
  const opt = typeof option === 'string'
    ? attempt(option)
    : option;
  if (opt) {
    return opt[key];
  }

  const hail = StandardColors.find(f => f.value === option);
  if (hail) {
    return hail[key];
  }
  return opt?.[key] || option; //JSON.stringify({key, option}); // ; 
}

export const GenericStyles =  {
  categories: [
    {
      name: 'Dimensions',
      styles: [
        {
          title: 'Width',
          label: 'width',  
          xs: 6
        },
        {
          title: 'Height',
          label: 'height',  
          xs: 6
        },
        {
          title: 'Minimum Width',
          label: 'min-width',  
          xs: 6
        },
        {
          title: 'Minimum Height',
          label: 'min-heignt',  
          xs: 6
        },
        {
          title: 'Maximum Width',
          label: 'max-width',  
          xs: 6
        },
        {
          title: 'Maximum Height',
          label: 'max-heignt',  
          xs: 6
        },
      ]
    },
    {
      name: 'Position',
      styles: [
        { 
          title: 'position',
          label: 'position',
          types: ['relative', 'absolute', 'fixed'], 
        },
        { 
          label: 'top',
          title: 'top',
          xs: 3
        },
        { 
          label: 'left',
          title: 'left',
          xs: 3
        },
        { 
          label: 'bottom',
          title: 'bottom',
          xs: 3
        },
        { 
          label: 'right',
          title: 'right',
          xs: 3
        },
      ]
    },
    {
      name: 'Cursor',
      styles: [
        { 
          label: 'cursor',
          types: ['pointer', 'default', 'progress'], 
        }
      ]
    },
    {
      name: 'Padding',
      styles: [
        { 
          label: 'padding',
          types: PaddingSizes,
          renderOption,
          edges: !0,
          free: !0
        }
      ]
    },
    {
      name: 'Margin',
      styles: [
        { 
          label: 'margin',
          types: PaddingSizes,
          renderOption,
          edges: !0,
          free: !0
        }
      ]
    },
    {
      name: 'White Space',
      styles: [
        { 
          title: 'white-space',
          label: 'white-space',
          types: ['nowrap', 'break-space', 'pre', 'pre-line', 'pre-wrap', 'inherit']  
        },
        { 
          title: 'text-overflow',
          label: 'text-overflow',
          types: ['clip', 'ellipsis', 'inherit']  
        },
        { 
          title: 'overflow',
          label: 'overflow',
          types: ['auto', 'hidden', 'overlay', 'scroll' ]  
        }
      ]
    },
  ]
}

export const colorProps = { 
  types: StandardColors,
  renderOption: colorOption,
  getOptionLabel: getOptionColor,
  color: !0
};

export const ColorStyles =  {
  categories: [ 
    {
      name: 'Border',
      styles: [
        {
          title: 'Thickness',
          label: 'border-width',
          types: PaddingSizes,
          renderOption,
          free: !0
          // edges: !0,
        },
        {
          title: 'Type',
          label: 'border-style', 
          when: e => !!e['border-width'] && e['border-width'] !== 'null' ,
          types: ['dotted', 'solid', 'dashed', 'ridge', 'double', 'groove', 'inset', 'outset','unset', 'initial', 'inherit' ]
        },
        {
          title: 'Color',
          label: 'border-color',
          when: e => (!!e['border-width'] && e['border-width'] !== 'null') && 
            (!!e['border-style'] && e['border-style'] !== 'null') ,
          types: StandardColors,
          renderOption: colorOption,
          getOptionLabel: getOptionColor,
          color: !0
        },
        {
          title: 'Radius',
          label: 'border-radius',
          types: PaddingSizes,
          free: !0,
          renderOption,
          // edges: !0,
          when: e => (!!e['border-width'] && e['border-width'] !== 'null') && 
          (!!e['border-style'] && e['border-style'] !== 'null') && 
          (!!e['border-width'] && e['border-width'] !== 'null') ,
        },
      ] 
    },
    {
      name: 'Background',
      styles: [
        {
          title: 'Color',
          label: 'background-color',
          types: StandardColors,
          renderOption: colorOption,
          getOptionLabel : getOptionColor,
          color: !0
        }
      ]
    },
    {
      name: 'Shadow',
      styles: [
        {
          title: '',
          label: 'box-shadow', 
          type: 'shadow'
        }
      ]
    }
  ]
}

export const LayoutStyles = {
  categories: [
    {
      name: 'Layout',
      always: true,
      styles: [

        {
          title: 'Type',
          label: 'display',
          types: ['flex', 'grid'],
          start: 'flex',
          type: 'pill'
        },

        {
          title: 'Direction',
          label: 'flex-direction',
          types: ['column', 'row'],
          start: 'column',
          type: 'pill',
          when: e => e.display === 'flex'
        },

        {
          title: 'Align items',
          label: 'align-items',
          types: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
          start: 'center',   
          type: 'pill',
          when: e => e.display === 'flex',
          image: true
        },

        {
          title: 'Align items',
          label: 'align-items',
          types: ['stretch', 'start', 'center', 'end'],
          start: 'center',   
          type: 'pill',
          when: e => e.display === 'grid',
          image: true
        },

        {
          title: 'Justify items',
          label: 'justify-items',
          types: ['start',  'center', 'end', 'stretch'],
          start: 'center',   
          type: 'pill',
          image: true,
          when: e => e.display === 'grid',
        },

        {
          title: 'Align content',
          label: 'align-content',
          types: ['start', 'center', 'end' , 'space-between', 'space-around', 'space-evenly'],
          start: 'center',   
          type: 'pill',
          image: true,
          when: e => e.display === 'grid',
        },

        {
          title: 'Justify content',
          label: 'justify-content', 
          type: 'pill',
          image: true,
          types: ['flex-start', 'center', 'flex-end' , 'space-between', 'space-around', 'space-evenly'],
          start: 'center',   
        },

        {
          title: 'Rows',
          label: 'grid-template-rows',   
          types: [1,2,3,4,5,6,7,8,9,10,11,12],
          when: e => e.display === 'grid',
          render: (value) => {
            const fr = [];
            for (let e = 0; e < value; e++) {
              fr.push('1fr');
            }
            return fr.join(' ')
          }, 
        },

        {
          title: 'Columns',
          label: 'grid-template-columns',   
          when: e => e.display === 'grid', 
          types: [1,2,3,4,5,6,7,8,9,10,11,12], 
        },

        {
          title: 'Gap',
          label: 'gap',
          types: [4,8,12,16,20,24] .map(p => `${p}px`),
          free: !0
        },

        {
          title: 'Wrap child elements',
          label: 'flex-wrap', 
          type: 'boolean',
          when: e => e.display === 'flex'
        },

      ]
    },
    ...GenericStyles.categories,
    ...ColorStyles.categories
   
  ]
}

