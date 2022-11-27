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
  const { onRowClick, onCellClick, settings} = props;
  const args = getSettings(settings);
  let obj = null, parsed = [];


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


   <ReactlyComponent component={Table} {...props}>

      <TableHead>
        <TableRow>
          {Object.values(obj.bindings).map( t => <TableCell key={t}>{t}</TableCell>)} 
        </TableRow>
      </TableHead>


      <TableBody>
        {parsed.map((row, i) => (
          <TableRow
            onClick={e => {
              onRowClick && onRowClick(e, {
                row: i, 
                ...row
              })
            }}
            key={i} 
          >
            {Object.values(row).map((cell, k) => <TableCell 
              onClick={e => {
                onCellClick && onCellClick(e, {
                  row: i,
                  cell: k,
                  ...row
                })
              }}
              key={k} component="th" scope="row">
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
    {
      name: 'Appearance',
      always: true,
      settings: [ 
        {
          title: 'Size',
          label: 'size',
          types: [ 'medium', 'small'], 
        } ,
        {
          title: 'padding',
          label: 'padding',
          types: [ 	'checkbox','none','normal'], 
        } ,
        {
          title: 'Sticky Header',
          label: 'stickyHeader',
          type:  'boolean'
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

const Events =  [
  {
    name: 'onRowClick',
    title: 'List row is clicked',
    description: 'User clicks on a row in the list.'
  }, 
  {
    name: 'onCellClick',
    title: 'List cell is clicked',
    description: 'User clicks on a cell in a row.'
  }, 
]


const ReactlyTable = {
  Icon: GridOn,
  Component: ReactlyComponentTable,
  Events,
  Settings,
  Styles: GenericStyles, 
  Defaults: { }
}
 

export default ReactlyTable;


