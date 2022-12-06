import React from 'react';
import { Table, TableHead, TableRow, TableCell, 
  TableBody, Box, styled } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { GridOn } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import { Flex } from '../..';
import { PageStateContext } from '../../../hooks/usePageContext';
import { usePageResourceState } from '../../../hooks/usePageResourceState';

const truncate = (value, length) => {
  try {

    if (!value.substr || !length) {
      return value;
    }
    const over = value?.length && value.length > length;
    return `${value.substr(0, length)}${over ? '...' : ''}`
  } catch (ex) {
    return typeof value;
  }
}
  
const ReactlyComponentTable = ({ children, ...props }) => {
  const { pageResourceState } = React.useContext(PageStateContext);
  const { componentEditing, preview, onRowClick, onCellClick, settings} = props;
 


  const args = getSettings(settings);
  const  {
    bindingObject,
    resource,
    dataRows
  } = usePageResourceState(settings);
  // let obj = {}, parsed = [];//, resource;


  // if (args.bindings)  {
  //   obj = JSON.parse(args.bindings); 
  //   const id = obj.resourceID;
  //   resource = pageResourceState.find(f => f.resourceID === obj.resourceID);
  //   if (resource) {
  //     parsed = resource.records.map(record => {
  //       return Object.keys(obj.bindings).reduce((items, res) => {
  //         items[obj.bindings[res]] = record[ res ]
  //         return items;
  //       }, {})
  //     })
  //   }
  // }

  if (!dataRows.length && !componentEditing) {
    return <> 
    <Box sx={{m: 2}}>{args.emptyMessage}</Box></>
  }

  const isSelected = (row, i) => {
    try {
      if (args.use_id) {
        return resource.records[i][args.selectedColumn].toString() === props.selectedID.toString()
      }
      return props.selectedIndex?.toString() === i.toString();
    } catch (e) {
      return false;
    }
  }

 return (
  <>  
   <ReactlyComponent component={Table} {...props}>

      {!!bindingObject.bindings && <TableHead>
        <TableRow>
          {Object.values(bindingObject?.bindings).map( t => <TableCell key={t}>{t}</TableCell>)} 
        </TableRow>
      </TableHead>
}

      <TableBody>
        {dataRows.map((row, i) => (
          <TableRow
            onClick={e => {
              onRowClick && onRowClick(e, {
                ID: !args.selectedColumn ? i : resource.records[i][args.selectedColumn],
                row: i, 
                ...resource.records[i]
              })
            }}
            key={i} 
          >
            {Object.values(row).map((cell, k) => <Cell 
            color={args['row-color']}
                selected={isSelected(row, i)}
              onClick={e => {
                onCellClick && onCellClick(e, {
                  ID: !args.selectedColumn ? i : resource.records[i][args.selectedColumn],
                  row: i,
                  cell: k,
                  ...resource.records[i]
                })
              }}
              key={k} component="th" scope="row">
              <Flex nowrap={args.nowrap}>{truncate(cell, args.truncate)}</Flex>
            </Cell> )}
            
          </TableRow>
        ))}
      </TableBody>

        
   </ReactlyComponent>
 
  </>
 );
}

const Cell = styled(TableCell)(({ selected, theme, color = 'primary' }) =>( {
  fontWeight: selected ? 500 : 400,
  color: selected ? 'white' :'#222',
  backgroundColor: !selected ? 'white' : (theme.palette[color]||theme.palette.primary).main
}))


const Settings = {
  categories: [ 
    {
      name: 'General',
      always: true,
      settings: [ 
        {
          title: 'Message to display when empty',
          label: 'emptyMessage',
          type: 'chip'
        }, 
      ]
    },
    {
      name: 'Appearance', 
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
          title: 'Active Row Color',
          label: 'row-color',
          types: ['primary', 'secondary', 'warning', 'error', 'success']
        },
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
    {
      name: 'Selection', 
      settings: [   
        {
          title: 'Selected Row',
          label: 'selectedIndex',
          bindable:  !0  ,
          when: p => !p.use_id
        } ,
        {
          title: 'Selected ID',
          label: 'selectedID'  ,
          bindable:  !0  ,
          when: p => p.use_id
        } ,
        {
          title: 'Select by ID',
          label: 'use_id'  ,
          type: 'boolean'
        } ,
        {
          title: 'ID Column',
          label: 'selectedColumn' ,
          type: 'tablecolumn'  ,
          when: p => p.use_id
        } ,
      ]
    }, 
    {
      name: 'Behavior', 
      settings: [   
        {
          title: 'Truncate Cell Text',
          label: 'truncate' ,
          xs:6
        } ,
        {
          title: 'Sticky Header',
          label: 'stickyHeader',
          type:  'boolean', 
        } ,
        {
          title: 'Disable text wrap',
          label: 'nowrap' ,
          type:  'boolean', 
        } 
      ]
    },
  ]
}

const Events =  [
  {
    name: 'onRowClick',
    title: 'List row is clicked',
    description: 'User clicks on a row in the list.',
    emits: ['row', 'ID']
  }, 
  {
    name: 'onCellClick',
    title: 'List cell is clicked',
    description: 'User clicks on a cell in a row.',
    emits: ['row', 'cell', 'ID']
  }, 
]


const ReactlyTable = {
  Icon: GridOn,
  Component: ReactlyComponentTable,
  Events,
  Settings,
  Styles: GenericStyles, 
  Defaults: {
    emptyMessage: 'No records to display.'
   }
}
 

export default ReactlyTable;


