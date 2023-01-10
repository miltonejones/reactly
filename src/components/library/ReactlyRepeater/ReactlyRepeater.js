import React from 'react';
import {  Box, Card } from '@mui/material';  
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { AppStateContext, RepeaterContext } from '../../../context';
import { useRepeater } from '../../../hooks/useRepeater';



const ReactlyComponentRepeater = ({ children, ...props }) => {
  const { pageResourceState } = React.useContext(AppStateContext); 
  const { componentEditing, preview, onRowClick, onCellClick, settings} = props;
  
  const args = getSettings(settings); 
  const repeater = useRepeater(props); 
 

 
 
 return (
  <>  
  {/* <pre>
{JSON.stringify(dataRows,0,2)}

</pre> */}
 <ReactlyComponent component={Box} {...props}>
      {repeater.dataRows?.map((row, i) => <RepeaterContext.Provider  
        value={{ 
          row,
          index: i, 
          selectedIndex: props.selectedIndex || args.selectedIndex,
          ID: !args.selectedColumn ? i : repeater.resource.records[i][args.selectedColumn],
         }}
      >
     
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
  Component: ReactlyComponentRepeater,  
}
 

export default ReactlyRepeater;


