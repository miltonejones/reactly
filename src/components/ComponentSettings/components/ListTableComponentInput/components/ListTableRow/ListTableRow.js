import React from 'react';
import { styled, Box, Grid, Divider } from '@mui/material';
import { Flex, Text, Tiny, Spacer, QuickSelect, TinyButton, QuickMenu, TextInput } from '../../../../..';
import { CheckCircle, Settings, Edit, CheckCircleOutline } from "@mui/icons-material";  
import { useRunScript } from '../../../../../../hooks/subhook/useRunScript';
import { AppStateContext } from "../../../../../../context";
 
const Check = ({ on }) => <Tiny icon={on ? CheckCircle : CheckCircleOutline} />
 
const ListLabel  = ({ active, addProp, onMove, children, onSettings }) => {
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
    return <QuickMenu small options={menu.map(e => e.name)} 
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
    const { 
      getApplicationScripts 
    } = useRunScript();


     const {  
      EditCode, 
    } = React.useContext(AppStateContext);
 
    const scriptList = getApplicationScripts();
    const scriptMenu = scriptList.filter(f => !!f.page)
      .map(f => ({
        ...f,
        label: `${f.page}.${f.name}`
      }));

    const handleTransform = (col) => (name) => {
      if (!name) return;
     
      const menuItem = scriptMenu.find(f => f.label === name); 
 
 

      handleType({ 
          [col]: {
          ...type,
          settings: {
            ...type?.settings,
            transform: menuItem.ID,
          }
        },
      })
    }

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
          types: variants,
          xs: 6
        },
        { 
          label: "underline",
          xs: 6,
          types: [
            "always",
            "hover",
            "none"
          ], 
        }
      ]
    }

    const handleBindingChange = title => {
      setState(state => ({
        dirty: 1,
        ...state,
        bindings: {
          ...state.bindings,
          [col]: getBindableByName(title)
        }
      }))
    }


    const displayTypes = Object.keys(displayConf);
    const selectedProp = displayConf[typeName]

    const args = {
      xs: 6,
      sx: active ? { borderBottom: 1, borderColor: 'divider' } : {}
    }
    const transformer = scriptMenu.find(f => f.ID === type?.settings?.transform);
 return (
   < >
    
        
          
    <Grid item {...args} key={col} >
      <Flex fullHeight>
       
        { (!!componentBound || !active) &&  <Check on={active} />  }
        {!!active && !componentBound  && <TinyButton onClick={() => setSettings(!settings)}  deg={settings ? 0 : 729} icon={Settings} />}
        <ListLabel onMove={onMove} active={active} small onSettings={() => setSettings(!settings)} addProp={addProp} > 
          {col}
        </ListLabel>
      </Flex>

    </Grid>


    <Grid item {...args}>  
  
      {/* repeatertable bindings specify which component property is bound to the
      data field */}
      {!!componentBound && <Flex sx={{p: t => t.spacing(1,0)}} fullWidth>
        <QuickMenu caret
        label={!state.bindings[col] ? `Bind ${col} to` : state.bindings[col].title} 
        value={!state.bindings[col] ? '' : state.bindings[col].title}
        onChange={handleBindingChange} 
        options={bindableProps.map(f => f.title)} />
        </Flex>}

      {!componentBound && active && <TextInput 
        prompt
        small
        disabled={!active}
        value={state.bindings[col]}
        onChange={e => {
          setState(s => ({
            dirty: 1,
            ...s,
            bindings: {
              ...s.bindings,
              [col]: e.target.value
            }
          }))
      }} 
      size="small" label={
        <Text small><em>set label for {col}</em></Text>
      }/>}

    </Grid>


      {/* data bound tables can specify data types for each column  */}
       {(settings ) && <><Grid xs={12} item sx={{mb: 1}}>
        
        <Divider sx={{mb: 1}} />

        <Flex fullHeight sx={{mb: 1}}>
          <Text small>Display as</Text>
          <QuickMenu small label={type?.type||'Choose type'} caret value={type?.type} 
            onChange={value => !!value && handleType({
             [col]: {
              type: value,
              settings: {
                ...type?.settings
              }
            },
          })} options={displayTypes} /> 
        </Flex>
        </Grid>
        <Grid xs={12} item sx={{mb: 1}}>
        <Flex>

          {!!transformer && <Text small>Transform: </Text>}
        <QuickMenu small label={transformer?.label ? 
            ` ${transformer?.label}`
            : 'Choose transform'} caret 
            value={transformer?.label} 
            options={scriptMenu.map(f => f.label)}
            onChange={handleTransform(col)} /> 
          {!!transformer && <TinyButton icon={Edit} 
            onClick={() => EditCode(transformer.code, transformer.name) }
              />}
        </Flex>
 

        </Grid>
        
        </>}

        {!!selectedProp && settings && <Grid xs={12} item sx={{pb: 1}}>
          <Grid container spacing={1}>
            {selectedProp.map(prop => <Grid key={prop.label} item xs={prop.xs || 12}>
              <Text active small>{prop.title || prop.label} </Text>
              <TypeInput {...prop} value={type?.settings[prop.label]} onChange={value => !!value && handleType({
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
    return <QuickMenu small caret options={types} value={value} label={value || label} onChange={w => !!w && onChange(w)}/>
  }

  return <TextInput small prompt size="small" value={value} fullWidth label={`Set value for ${label}`} caret onChange={e => onChange(e.target.value)} />
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
