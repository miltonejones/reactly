import React from 'react';
import { Table, TableHead, TableRow, TableCell, 
  TableBody, Box, styled, Link, Typography, IconButton } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { GridOn } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
import { Flex } from '../..';
import { PageStateContext } from '../../../hooks/usePageContext';
import { usePageResourceState } from '../../../hooks/usePageResourceState';
import { useImageLoader } from '../ReactlyInfoCard/ReactlyInfoCard';

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
    dataRows,
    columnMap,
    typeMap
  } = usePageResourceState(settings); 

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

  const RowIcon = Icons[args.rowIcon || props.rowIcon]
  const SelectedRowIcon = Icons[args.selectedRowIcon]

  const selected_indicator_col = args.selected_indicator_col || 0;

 return (
  <>  
 {/* <pre>
 {JSON.stringify(args,0,8)}
 </pre> */}
   <ReactlyComponent component={Table} {...props}>

      {!!columnMap && <TableHead>
        <TableRow>
          {columnMap.map( t => <TableCell key={t}>{bindingObject.bindings[t]}</TableCell>)} 
        </TableRow>
      </TableHead>
}

      <TableBody>
        {dataRows.map((row, i) => (
          <TableRow key={i}  >
            {Object.values(row).map((cell, k) => <Cell 
              columnMap={columnMap} 
              typeMap={typeMap}
              displayKey={columnMap?.[k]}
              color={args['row-color']}
              selected={isSelected(row, i)}
              onClick={e => {
                
                onCellClick && onCellClick(e, {
                  ID: !args.selectedColumn ? i : resource.records[i][args.selectedColumn],
                  row: i,
                  cell: k,
                  ...resource,
                  ...resource.records[i]
                });


                onRowClick && onRowClick(e, {
                  ID: !args.selectedColumn ? i : resource.records[i][args.selectedColumn],
                  row: i, 
                  ...resource,
                  ...resource.records[i]
                })

              }}
              key={k} component="th" scope="row">
              <Flex nowrap={args.nowrap}>


                {k === selected_indicator_col && !!RowIcon && !isSelected(row, i) && <RowIcon />}
                {k === selected_indicator_col && !!SelectedRowIcon && isSelected(row, i) && <SelectedRowIcon />}

                <CellContent value={cell} 
                   color={args['row-color']}
                   selected={isSelected(row, i)}
                   columnMap={columnMap} 
                   typeMap={typeMap}
                   displayKey={columnMap?.[k]}
                   >
                   {truncate(cell, args.truncate)}
                </CellContent>
             
                
                </Flex>
            </Cell> )}
            
          </TableRow>
        ))}
      </TableBody>

        
   </ReactlyComponent>
 
  </>
 );
}

const CellContent = ({ columnMap, typeMap, displayKey, value, selected,  children, ...props}) => {


  const displayType = typeMap?.[displayKey];

  const { image } = useImageLoader(value, displayType?.settings?.default_image)


  if (!(!!typeMap && !!columnMap && !!typeMap[ displayKey ])) {
    return <>{children}</>
  } 

  if (displayType?.type === 'Text') {
    return <Typography variant={displayType.settings.Variant || 'body2'}>{children}</Typography> 
  }
 
  if (displayType?.type === 'Link') {
    return <Linked { ...props} selected={selected} sx={{ cursor: 'pointer'}} {...displayType.settings}>
      <Typography variant={displayType.settings.Variant || 'body2'}>{children}</Typography>
    </Linked>
  }
 

  if (displayType?.type === 'Image') {
    return <img src={image} style={{
      width: displayType.settings.Width,
      height: displayType.settings.Height,
      borderRadius: displayType.settings.Radius
    }}/>
  }

  return <>{children}</>
}

const colorize = ({ selected, theme, color = 'primary', columnMap, typeMap, displayKey }) => {
  const displayType = typeMap?.[displayKey];

  const obj =  {
    fontWeight: selected ? 500 : 400,
    color: selected ? 'white' :'#222',
    backgroundColor: !selected ? 'white' : (theme.palette[color]||theme.palette.primary).main
  }


  if (displayType?.type === 'Image') {
    Object.assign(obj, {
      width: displayType.settings.Width
    }) 
  }


  return obj;

};



const Linked = styled(Link)(colorize)
const Cell = styled(TableCell)(colorize)


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


