import React from 'react';
import { Table, TableHead, TableRow, TableCell, 
  TableBody, Box, styled, Link, Typography, IconButton } from '@mui/material';  
import ReactlyComponent from '../reactly';
import { Icons } from '../icons';
import { getSettings } from '../util';
import { Flex , Text } from '../..';
import { PageStateContext } from '../../../hooks/usePageContext';
import { usePageResourceState } from '../../../hooks/usePageResourceState';
import { useImageLoader } from '../ReactlyInfoCard/ReactlyInfoCard';
import { useRunScript } from '../../../hooks/subhook/useRunScript';

const truncate = (value, length) => {
  try {

    if (!value.substr || !length) {
      return value;
    }
    const over = value?.length && value.length > length;
    return `${value.substr(0, length)}${over ? '...' : ''}`
  } catch (ex) {
    if (!value) {
      return ''
    }
    return JSON.stringify (value);
  }
}
  
const ReactlyComponentTable = ({ children, ...props }) => {
  const { pageResourceState } = React.useContext(PageStateContext);
  const { componentEditing, preview, onHeadClick, onRowClick, onCellClick, settings} = props;
 


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
          {columnMap.map( (t, i) => <TableCell 
            onClick={e => {

              onHeadClick && onHeadClick(e, { 
                value: t,
                cell: i,  
              });

            }}
            key={t}><Text active link={!!onHeadClick}>{bindingObject.bindings[t]}</Text></TableCell>)} 
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
                  column: columnMap[k],
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


  const [content, setContent] = React.useState(children)

  const displayType = typeMap?.[displayKey];
  const transformer = displayType?.settings?.transform;

  const { executeScript } = useRunScript();

  React.useEffect(() => {
    if (!transformer) return;

    (async() => {
      const res = await executeScript(transformer, children);
      !!res && setContent(res);
    })()

  }, [transformer])

  // const content = children; //!transformer ? children : executeScript(transformer, { data: children });

  // !!transformer && console.log ({ content: executeScript(transformer, { data: children })   });


  const { image } = useImageLoader(value, displayType?.settings?.default_image)


  if (!(!!typeMap && !!columnMap && !!typeMap[ displayKey ])) {
    return <>{content}</>
  } 

  if (displayType?.type === 'Text') {
    return <Typography variant={displayType.settings.Variant || 'body2'}>{content}</Typography> 
  }
 
  if (displayType?.type === 'Link') {
    return <Linked { ...props} selected={selected} sx={{ cursor: 'pointer'}} {...displayType.settings}>
      <Typography variant={displayType.settings.Variant || 'body2'}>{content}</Typography>
    </Linked>
  }
 

  if (displayType?.type === 'Image') {
    return <img src={image} style={{
      width: displayType.settings.Width,
      height: displayType.settings.Height,
      borderRadius: displayType.settings.Radius
    }}/>
  }

  if (displayType?.type === 'Icon') {
    const Icon = Icons[content];
    return !Icon ? <i /> : <Icon />
  }

  return <>{content}</>
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
 


const ReactlyTable = { 
  Component: ReactlyComponentTable, 
}
 

export default ReactlyTable;


