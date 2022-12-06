import React from 'react';
import {  Box, Card } from '@mui/material'; 
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
  let obj = null, dataRows = [], resource;


  if (args.bindings)  {
    obj = JSON.parse(args.bindings); 
    const id = obj.resourceID;
    resource = pageResourceState.find(f => f.resourceID === obj.resourceID);
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
          selectedIndex: props.selectedIndex || args.selectedIndex,
          ID: !args.selectedColumn ? i : resource.records[i][args.selectedColumn],
         }}
      >
        {/* <Card sx={{width: 200, height: 200, overflow: 'auto'}}>
       <pre>
       {JSON.stringify(row,0,2)}
       </pre>
        </Card> */}
        <Box sx={{width: '100%' }}>
     {children} 

        </Box>
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
          bindable: !0  ,
          when: p => !p.use_id
        },  
        {
          title: 'Selected ID',
          label: 'selectedID'  ,
          bindable:  !0  ,
          when: p => p.use_id
        } ,
        {
          title: 'ID Column',
          label: 'selectedColumn' ,
          type: 'tablecolumn'  ,
          when: p => p.use_id
        } ,
        {
          title: 'Select by ID',
          label: 'use_id'  ,
          type: 'boolean'
        } ,
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
      ...LayoutStyles.categories, 
    ]
  }, 
  allowChildren: !0,
  Defaults: {
    emptyMessage: 'No records to display.'
   }
}
 

export default ReactlyRepeater;


