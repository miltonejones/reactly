import React from 'react';
import { styled, Box, Grid } from '@mui/material';
import { Flex, Text, Tiny, QuickSelect, QuickMenu, TextInput } from '../../../../..';
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material"; 
 
const Check = ({ on }) => <Tiny icon={on ? CheckCircle : CheckCircleOutline} />
 
const ListLabel  = ({ active, addProp, onMove, children }) => {
  const sx = { maxWidth: 140, 
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis' }

  const menu = [
    {
      name: 'Move up',
      action: () => onMove(children, -1)
    },
    {
      name: 'Move down',
      action: () => onMove(children, 1)
    },
    {
      name: '-', 
    },
    {
      name: 'Remove',
      action: () => addProp(children)
    }
  ];

  const handleMenu = (name) => {
    const { action } = menu.find(item => item.name === name);
    !!action && action();
  }

  if (active) {
    return <QuickMenu options={menu.map(e => e.name)} 
      onChange={handleMenu}  label={<b>{children}</b>}/>
  }

  return <Text small onClick={() => addProp(children)}>{ children }</Text>

}


const ListTableRow = ( { 
      active, addProp, componentBound, col,
      bindableProps, getBindableByName, state, 
      setState , onMove }) => {
 return (
   < >
    
        
          
    <Grid item xs={6} key={col} >
      <Flex fullHeight>
        <Check on={active} /> 
        <ListLabel onMove={onMove} active={active} small addProp={addProp} > 
          {col}
        </ListLabel>
      </Flex>

    </Grid>


    <Grid item xs={6}>  

      {!!componentBound && <QuickSelect 
        label={`Bind ${col} to`} 
        value={!state.bindings[col] ? '' : state.bindings[col].title}
        onChange={e => {
          setState(s => ({
            ...s,
            bindings: {
              ...s.bindings,
              [col]: getBindableByName(e)
            }
          }))
        }} 
        options={bindableProps.map(f => f.title)} />}

      {!componentBound && active && <TextInput 
        disabled={!active}
        value={state.bindings[col]}
        onChange={e => {
          setState(s => ({
            ...s,
            bindings: {
              ...s.bindings,
              [col]: e.target.value
            }
          }))
      }} 
      size="small" placeholder={`Label for ${col}`}/>}

    </Grid>

       


   </>
 );
}
ListTableRow.defaultProps = {};
export default ListTableRow;
