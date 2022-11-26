import React from 'react';
import { Table, TableHead, TableRow, TableCell, 
  TableBody, Box } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { GridOn } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { PageStateContext } from '../../../hooks/usePageContext';
  
const ReactlyComponentTable = ({ children, ...props }) => {
  const { pageResourceState } = React.useContext(PageStateContext);
  const { settings} = props;
  const args = getSettings(settings);
  let obj = null, parsed = []
  if (args.bindings)  {
     obj = JSON.parse(args.bindings); 
    const id = obj.resourceID;
    const resource = pageResourceState.find(f => f.resourceID === obj.resourceID);
    if (resource) {
      parsed = resource.records.map(record => {
        return Object.keys(obj.bindings).reduce((items, res) => {
          items[obj.bindings[res]] = record[ res ]
          return items;
        }, {})
      })
    }
  }

  if (!parsed.length) {
    return <Box sx={{m: 2}}>No records to display.</Box>
  }

 return (
  <>
  {/* <pre>
    {JSON.stringify(Object.values(obj.bindings),0,2)}
  </pre>
 */}


   <ReactlyComponent component={Table} {...props}>
      <TableHead>
          <TableRow>
            {Object.values(obj.bindings).map( t => <TableCell key={t}>{t}</TableCell>)} 
          </TableRow>
        </TableHead>
        <TableBody>
          {parsed.map((row, i) => (
            <TableRow
              key={i} 
            >
              {Object.values(row).map((cell, k) => <TableCell key={k} component="th" scope="row">
                {cell}
              </TableCell> )}
              
            </TableRow>
          ))}
        </TableBody>

        
   </ReactlyComponent>
 
  </>
 );
}


const Settings = {
  categories: [

    // {
    //   name: 'General',
    //   settings: [  
    //     {
    //       title: 'Label',
    //       label: 'label' 
    //     }, 
    //   ]
    // },

    {
      name: 'Appearance',
      always: true,
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [ ], 
        } 
      ]
    },
    {
      name: 'Data',  
      settings: [  
        {
          title: 'Bind to data resource',
          label: 'bindings' ,
          type: 'listtable'
        },  
      ]
    }, 
  ]
}


const ReactlyTable = {
  Icon: GridOn,
  Component: ReactlyComponentTable,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyTable;


