import React from 'react';
import {  Box } from '@mui/material'; 
import { GenericStyles, LayoutStyles } from '../styles'; 
import { Loop } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { PageStateContext } from '../../../hooks/usePageContext';
import { RepeaterContext } from '../../../hooks/AppStateContext';



const ReactlyComponentRepeater = ({ children, ...props }) => {
  const { pageResourceState } = React.useContext(PageStateContext); 
  const { componentEditing, preview, onRowClick, onCellClick, settings} = props;
  
  const args = getSettings(settings);
  let obj = null, dataRows = [];


  if (args.bindings)  {
    obj = JSON.parse(args.bindings); 
    const id = obj.resourceID;
    const resource = pageResourceState.find(f => f.resourceID === obj.resourceID);
    if (resource) {
      dataRows = resource.records.map(record => {
        return Object.keys(obj.bindings).reduce((items, res) => {
          items[res] = {
            ...obj.bindings[res],
            record
          }
          return items;
        }, {})
      })
    }
  }
 
 return (
  <>  
  
 <ReactlyComponent component={Box} {...props}>
      {dataRows?.map((row, i) => <RepeaterContext.Provider  
        value={{ 
          row,
          index: i,
          selectedIndex: props.selectedIndex || args.selectedIndex
         }}
      >
     {children} 
      </RepeaterContext.Provider>)}
   </ReactlyComponent> 
  
  </>
 );
}

const Settings = {
  categories: [  
    {
      name: 'Data',  
      always: true,
      settings: [  
        {
          title: 'Bind to data resource',
          label: 'bindings' ,
          type: 'repeatertable'
        },  
        {
          title: 'Selected index',
          label: 'selectedIndex' ,
          bindable: !0 
        },  
      ]
    },  
  ]
}

const ReactlyRepeater = {
  Icon: Loop,
  Component: ReactlyComponentRepeater, 
  Settings,
  Styles: {
    categories: [ 
      ...GenericStyles.categories,
      ...LayoutStyles.categories
    ]
  }, 
  allowChildren: !0,
  Defaults: {
    emptyMessage: 'No records to display.'
   }
}
 

export default ReactlyRepeater;


