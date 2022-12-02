import React from 'react';
import { Pagination } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Pin } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
  
const ReactlyComponentPagination = ({ children, ...props }) => {
  const args = getSettings(props.settings);
 return (<>
 {/* <pre>
  {JSON.stringify(args,0,2)}
  {props.onChange?.toString()}
 </pre> */}
   <ReactlyComponent component={Pagination} {...props} page={parseInt(props.page)} 
      onChange={(e, page) => props.onPageChange && props.onPageChange(e, {page})}/>
 </>
 );
}


export const Events =  [
  {
    name: 'onPageChange',
    title: 'Button is clicked',
    description: 'Page value changes'
  }
]

const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Count',
          label: 'count' ,
          bindable: 1
        }, 
        {
          title: 'Visible items',
          label: 'boundaryCount' 
        }, 
        {
          title: 'Sibling count',
          label: 'siblingCount' 
        }, 
        {
          title: 'Disabled',
          label: 'disabled',
          type: 'boolean' 
        }, 
      ]
    },
    {
      name: 'Behavior',
      settings: [ 
        {
          title: 'Page',
          label: 'page',
          bindable: 1 
        }, 
        {
          title: 'Default Page',
          label: 'defaultPage',
          bindable: 1 
        }, 
        {
          title: 'hide Next Button',
          label: 'hideNextButton',
          type: 'boolean' 
        }, 
        {
          title: 'hide Prev Button',
          label: 'hidePrevButton',
          type: 'boolean' 
        }, 
        {
          title: 'show First Button',
          label: 'showFirstButton',
          type: 'boolean' 
        }, 
        {
          title: 'show Last Button',
          label: 'showLastButton',
          type: 'boolean' 
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: ['outlined'
         , 'text' ], 
        } ,
        {
          title: 'Color',
          label: 'color',
          types: ['primary'
          , 'secondary'
          , 'standard' ], 
        }  ,
        {
          title: 'Size',
          label: 'size',
          types: ['small'
          , 'medium' 
          , 'large' ], 
        }  ,
        {
          title: 'Shape',
          label: 'shape',
          types: ['circular'
          , 'rounded' ], 
        } 
      ]
    },
  ]
}


const ReactlyPagination = {
  Icon: Pin,
  Component: ReactlyComponentPagination,
  Settings,
  Styles: GenericStyles, 
  Defaults: {
    count: 10,
    defaultPage: 1
   },
   Events
}
 

export default ReactlyPagination;


