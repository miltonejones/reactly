import React from 'react';
import { styled, Box, Grid, Divider } from '@mui/material';
import { Flex, Text, Tiny, QuickSelect, QuickMenu, TextInput } from '../../../../..';
import { CheckCircle, CheckCircleOutline } from "@mui/icons-material"; 
 
const Check = ({ on }) => <Tiny icon={on ? CheckCircle : CheckCircleOutline} />
 
const ListLabel  = ({ active, addProp, onMove, children, onSettings }) => {
  const sx = { maxWidth: 140, 
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis' }

  const menu = [
    {
      name: 'Settings',
      action: () => onSettings()
    },
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
      setState , onMove, type, handleType }) => {
    const [settings, setSettings] = React.useState(false);
    const typeName = type?.type;

    const displayConf = {
      Text: [
        {
          label: 'Variant',
          types: variants
        }
      ],
      Image: [
        {
          label: 'Width',
          xs: 4
        },
        {
          label: 'Height',
          xs: 4
        },
        {
          label: 'Radius',
          xs: 4
        },
        {
          title: 'Default Image',
          label: 'default_image' 
        },
      ],
      Icon: [
        {
          label: 'Size',
          types: [
            "small",
            "medium",
            "large"
          ],
        },
      ],
      Link: [
        {
          label: 'Variant',
          types: variants
        },
        { 
          label: "underline",
          types: [
            "always",
            "hover",
            "none"
          ], 
        }
      ]
    }


    const displayTypes = Object.keys(displayConf);
    const selectedProp = displayConf[typeName]


 return (
   < >
    
        
          
    <Grid item xs={6} key={col} >
      <Flex fullHeight>
        <Check on={active} />  
        <ListLabel onMove={onMove} active={active} small onSettings={() => setSettings(!settings)} addProp={addProp} > 
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

       {(settings ) && <Grid xs={12} item>
        
        <Divider sx={{mb: 1}} />

        <Flex fullHeight>
          <Text small>Display as</Text>
          <QuickSelect value={type?.type} onChange={value => handleType({
             [col]: {
              type: value,
              settings: {
                ...type?.settings
              }
            },
          })} options={displayTypes} />
        </Flex>
 

        </Grid>}

        {!!selectedProp && settings && <Grid xs={12} item sx={{pb: 1}}>
          <Grid container spacing={1}>
            {selectedProp.map(prop => <Grid key={prop.label} item xs={prop.xs || 12}>
              <Text small>{prop.title || prop.label} </Text>
              <TypeInput {...prop} value={type?.settings[prop.label]} onChange={value => handleType({
                [col]: {
                  ...type,
                  settings: {
                    ...type?.settings,
                    [prop.label]: value
                  }
                }
              })} />
      
            </Grid>)}

            <Divider sx={{ mt: 1, mb: 0, width: '100%'}} />

          </Grid>
  </Grid>}

   </>
 );
}

const TypeInput = ({ label, types, value, type, onChange }) => {

  if (types) {
    return <QuickSelect options={types} value={value} label={label} onChange={onChange}/>
  }

  return <TextInput size="small" value={value} fullWidth label={label} onChange={e => onChange(e.target.value)} />
}

const variants = [
  "body1",
  "body2",
  "button",
  "caption",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "inherit",
  "overline",
  "subtitle1",
  "subtitle2"
];


ListTableRow.defaultProps = {};
export default ListTableRow;
