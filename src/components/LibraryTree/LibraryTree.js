import React from 'react';
import { styled, IconButton, Link , Box, Divider, Tabs, Collapse, Switch, Grid, Stack, Typography, Chip } from '@mui/material';
import { Flex, PopoverPrompt, Spacer, SearchBox, Tiny , Text, TextInput, QuickSelect, DeleteConfirmMenu, QuickMenu, TinyButton } from '..' 
import { Icons, renderIconOption } from '../library/icons'; 
import { JsonTree } from '../../colorize'; 
import { TabButton } from '../ComponentPanel/ComponentPanel';
import { AppStateContext } from '../../hooks/AppStateContext';
import { TextBtn } from '../Control/Control';
import { JsonView } from '../../colorize';
import { uniqueId } from '../library/util';

const sortByOrder = (a,b) => a.order > b.order ? 1 : -1;
const conseq = (count, out = []) => { for (var e=0;++e<count + 1;out.push(e)); return out; };


export const useLibrary = () => {
  const { config, commitComponent, updateLib} = React.useContext(AppStateContext);


   
  const createComponent = (componentKey) => {
    const updated = {
      ...config,
      [componentKey]: {
        Icon: 'Add',
        dirty: true,
        Settings: {
          categories: [
            {
              name: 'General',
              always: true,
              settings: []
            }
          ]
        },
        Styles: {
          categories: []
        },
        Events: [],
        Defaults: {}
      }
    } 
    updateLib(updated)
  }

  const setComponentProps = (componentKey, propName, propVal) => {
    const updated = {
      ...config,
      [componentKey]: {
        ...config[componentKey],
        dirty: true,
        [propName]: propVal
      }
    } 
    updateLib(updated)
  }

  const setComponentDefaults =  (componentKey, propName, propVal) => {
    const ex = config[componentKey].Defaults || {}; 

    if (!propVal || (typeof propVal === 'string' && !propVal?.length)) {
      delete ex[propName]
    } else {
      Object.assign(ex, {[propName]: propVal})
    }

    
    const updated = {
      ...config,
      [componentKey]: {
        dirty: true,
        ...config[componentKey],
        Defaults : ex
      }
    } 
   // alert (JSON.stringify(ex))
    updateLib(updated)
  }

  const importComponentChild = (
    componentKey, 
    settingType, 
    sourceProp
   ) => {

    const [sourceKey, sourceName] = sourceProp.split('.');
    const sourceNode = config[sourceKey][settingType].categories
        .find(f => f.name === sourceName);

    if (!sourceNode) return alert ('NO NODE!');

    const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          [settingType]: {
            categories: config[componentKey][settingType].categories
              .concat({ ...sourceNode })
          }
        }
      }     
    updateLib(updated)

  }

  const importEvent = (
    componentKey,  
    sourceProp
   ) => {
 
    const sourceNode = config[sourceProp].Events;

    if (!sourceNode) return alert ('NO NODE!');

    const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          Events: (config[componentKey].Events||[]).concat([...sourceNode])
        }
      }     
    updateLib(updated)

  }

  const addComponentChild = (
    componentKey, 
    settingType,
    categoryName,
    childName, 
    props) => {

      const settings = props.split(',').map(f => ({
        label: f,
        title: f,
        ID: uniqueId()
      }))

      const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          [settingType]: {
            categories: config[componentKey][settingType].categories.map( category => {
              return category.name !== categoryName ? category : {
                ...category,
                [childName]: (category[childName] || []).concat(settings)
                
              }
            })
          }
        }
      } 
      updateLib(updated)
  }
  
  const addCategory = (
    componentKey, 
    settingType, 
    childName,
    props ) => {

      const settings = props.split(',').map(f => ({
        name: f,
        [childName]: [],
        ID: uniqueId()
      }))

      const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          [settingType]: {
            categories: config[componentKey][settingType].categories 
              .concat(settings)
          }
        }
      } 
      updateLib(updated)
  }
  
  const dropCategory = (
    componentKey, 
    settingType,
    categoryName ) => {
 
      const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          [settingType]: {
            categories: config[componentKey][settingType].categories 
              .filter(f => f.name !== categoryName)
          }
        }
      } 
      updateLib(updated)
  }
  
  const setCategoryProp = (
    componentKey, 
    settingType,
    category ) => { 
      const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          [settingType]: {
            categories: config[componentKey][settingType].categories 
              .map(f => f.ID === category.ID ? category : f)
          }
        }
      } 
      updateLib(updated)
  }
  
  const addEvent = (
    componentKey, 
    eventName ) => {

      const settings = eventName.split(',').map(f => ({
        name: f,
        title: `${f} event`,
        ID: uniqueId()
      }))

      const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          Events:  (config[componentKey].Events||[]).concat(settings)
        }
      } 
      updateLib(updated)
  }
  
  const dropEvent = (
    componentKey, 
    eventName ) => {
 

      const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          Events:  (config[componentKey].Events||[]).filter(f => f.name !== eventName)
        }
      } 
      updateLib(updated)
  }
  
  const editEvent = (
    componentKey, 
    eventName,
    key,
    value ) => {
 

      const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          Events:  (config[componentKey].Events||[]).map(f => f.name !== eventName ? f : {
            ...f,
            [key]: value
          })
        }
      } 
      updateLib(updated)
  }
  
  const dropComponentChild = (
    componentKey, 
    settingType,
    categoryName,
    childName, 
    settingName) => {
 

      const updated = {
        ...config,
        [componentKey]: {
          ...config[componentKey],
          dirty: true,
          [settingType]: {
            categories: config[componentKey][settingType].categories.map( category => {
              return category.name !== categoryName ? category : {
                ...category,
                [childName]: (category[childName] || []).filter(f => f.label !== settingName)
                
              }
            })
          }
        }
      } 
      updateLib(updated)
  }
  
  const setComponentChild = (
    componentKey, 
    settingType,
    categoryName,
    childName, 
    prop
  ) => {
     

    const updated = {
      ...config,
      [componentKey]: {
        ...config[componentKey],
        dirty: true,
        [settingType]: {
          categories: config[componentKey][settingType].categories.map( category => {
            return category.name !== categoryName ? category : {
              ...category,
              [childName]: category[childName]
                .map(setting => setting.ID === prop.ID ? prop : setting)
            }
          })
        }
      }
    } 
    updateLib(updated)
}

  const commit = (componentKey) => {
    const { dirty, ...rest} = config[componentKey];
    commitComponent(componentKey, rest)
  }

  const setCategoryAlways = (
        componentKey, 
        settingType,
        categoryName,
        always 
      ) => { 
    const updated = {
      ...config,
      [componentKey]: {
        ...config[componentKey],
        dirty: true,
        [settingType]: {
          categories: config[componentKey][settingType].categories.map( category => {
            return category.name !== categoryName ? category : {
              ...category ,
              always
            }
          })
        }
      }
    } 
    updateLib(updated)
  }

  return {
    setComponentProps,
    setComponentChild,
    setCategoryAlways,
    setComponentDefaults,
    addComponentChild,
    dropComponentChild,
    addCategory,
    dropCategory,
    createComponent,
    importComponentChild,
    addEvent,
    dropEvent,
    editEvent,
    setCategoryProp,
    importEvent,
    commit
  }
}


const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 

const Expander = ({ on }) => <TinyButton icon={on ? Icons.Remove : Icons.Add}  deg={!on ? 0 : 180} />


const EditableListCell = ({ label, value, options, caption, onChange, onAdd, onDelete}) => {
  return   (<Flex fullHeight>
  <QuickMenu
      small
      value={value}
      onChange={onChange}
      label={value || label} options={options || []} 
    />

    {/* save/delete option buttons  */}
    {!!value && <>

      {/* cancel button */}
      <TinyButton icon={Icons.Close} onClick={() => onChange('')} />
      
      {/* delete button  */}
      <DeleteConfirmMenu message={`Delete "${value}" option?`}    
        onDelete={e =>  !!e && onDelete() } /> 
 
    </>}

    {/* add options popover  */}
    {!value &&  <PopoverPrompt 
      sx={{width:16, height: 16, cursor: 'pointer'}} 
      component={Icons.Add} 
      label={caption} 
      onChange={onAdd}> 
    </PopoverPrompt>  
    }

  </Flex>)
}
 
const SettingRow = ({ Name, ID, settingType, component, image, xs, order, categoryName, childName, ...props }) => {
  const { title, label, type, types, bindable, when, free } = props;
  const [js, setJS] = React.useState(when)
  const [adv, setAdv] = React.useState(false)
  const [opt, setOpt] = React.useState('')
  const [error, setError] = React.useState('')
  const { setComponentChild, setComponentDefaults, dropComponentChild } = useLibrary();

  const saveSetting = (key, val) => {
    const added = {
      ...props,
      ID,
      [key]: typeof val !== 'function' ? val : val.toString()
    }

    setComponentChild( 
      Name, 
      settingType,
      categoryName,
      childName, 
      added,
      order
      )
  }

  const addOpt = (key) => {
    const added = (types || []).concat(key.split(','));
    saveSetting('types', added) 
  }

  const dropOpt = () => {
    const added = (types || []).filter(f => f !== opt);
    setOpt('')
    saveSetting('types', added)
  }

  let options = (typeof types === 'string'
    ? (types?.indexOf('ICON_TYPES') > -1 
        ? Object.keys(Icons)
        : [types]
        )
    : (types?.indexOf('ICON_TYPES') > -1 
        ? Object.keys(Icons)
        : types
        ))
        
    options = options?.map(o => !!o && typeof o === 'object' ? Object.values(o)[0] : o) || [];

  
  const dataTypes = ['pill', 'boolean', 'chip', 'shadow', 'listtable', 'tablecolumn', 'valuelist',
  'repeatertable', 'listbuilder', 'imagelist', 'text']
  return <>
  <Grid sx={{mt: 1}} spacing={1} container>
 
 {/* <Grid item xs={2}>
   
 </Grid> 
 */}

 {/* <Grid item xs={1}>


 </Grid> 

 <Grid item xs={1}>
   <Flex fullHeight>


   </Flex>
 </Grid>  */}


 <Grid item xs={3}>
 <Flex>
  <TinyButton icon={Icons.Settings} onClick={() => setAdv(!adv)} />
 <TextInput fullWidth size="small" label="Title"
       onChange={e => {
         saveSetting('title', e.target.value)
       }}
     value={title} />
   <DeleteConfirmMenu message={`Delete "${title}" setting?`}    
     onDelete={e => !!e && dropComponentChild(Name, settingType, categoryName,
           childName, label)} /> 
 </Flex>
 </Grid>

 <Grid item xs={2}>
   <TextInput size="small"
       onChange={e => {
         saveSetting('label', e.target.value)
       }} label="Attribute Name" value={label} />
       </Grid>
   
   

 <Grid item xs={2}> 
 
   {type !== 'boolean' && !types?.length && <TextInput size="small" label="Default value" 
     onChange={e => setComponentDefaults(Name, label, e.target.value)}
   value={component.Defaults?.[label]} />}

   {type !== 'boolean' && !!types?.length && <QuickSelect options={types} size="small" label="Default value" 
     onChange={e => setComponentDefaults(Name, label, e)}
   value={component.Defaults?.[label]} />}


   {type === 'boolean' && <Flex
     onClick={e => setComponentDefaults(Name, label, !component.Defaults?.[label])} fullHeight>
     <Switch checked={!!component.Defaults?.[label]}
       size="small"/>
     <Text small>Default to <b>{!!component.Defaults?.[label] ? 'true' : 'false'}</b></Text>
   </Flex> }
 </Grid> 

   
       <Grid item xs={1}> 

 </Grid>


</Grid>
<Collapse in={adv}>

<Flex fullWidth  sx={{ p: 1 }} spacing={2}>


  
Order
<TextInput
       onChange={e => {
         saveSetting('order', e.target.value)}} size="small" value={order} sx={{maxWidth: 50, ml: 1}} />


Input type
  <QuickMenu options={dataTypes} 
    onChange={val => {
      saveSetting('type', val)
    }}
    title="Select input type"
    value={type || 'text'} label={!type ? "text" : <b>{type}</b>} caret small />

    Condition: 
  <Flex nowrap  sx={{maxWidth: 100}}>
  <PopoverPrompt 
    helperText={error}  
    onChange={e => {
      setJS(e)
      saveSetting('when', e); 
    }}

    sx={{cursor: 'pointer'}}
    underline="hover"
    component={Link}
    value={js?.toString()}
    label={`Edit condition`}  
    > 
      {!!js ? js?.toString() : 'show if...'}
  </PopoverPrompt>
  </Flex> 

    List options:
  <Flex nowrap  sx={{maxWidth: 140}}>
  <EditableListCell
      options={options} onChange={setOpt} value={opt}
     caption={`Add option to ${title}`} onAdd={addOpt} onDelete={dropOpt} 
     label={opt || `Options (${options?.length || '0'})`}
     />  
</Flex>
</Flex>
<Flex fullWidth  sx={{ p: 1 }} spacing={2}>

    Grid columns
  <QuickMenu
    small
    caret
    value={xs||'12'} 
    label={`${xs || '12'} columns`} 
    onChange={e => {
    !!e && saveSetting('xs', e)
    }} options={[1,2,3,4,5,6,7,8,9,10,11,12].map(g => g.toString())} />

<Flex nowrap sx={{width: 180}} onClick={e => {
        saveSetting('bindable', !bindable)
      }}>
    <Switch checked={bindable} size="small"/>
    <Text small>Allow data binding</Text>
  </Flex>

  <Flex nowrap sx={{width: 280}} onClick={e => {
        saveSetting('free', !free)
      }}>
    <Switch checked={free} size="small"/>
    <Text small>Allow free text</Text>
  </Flex>
  <Flex nowrap sx={{width: 280}} onClick={e => {
        saveSetting('image', !image)
      }}>
    <Switch checked={image} size="small"/>
    <Text small>Use named images</Text>
  </Flex>

</Flex>

</Collapse>
  </>
}

const EventRow = ({ title, name, Name, emits = [], description, eventNames }) => {
  const [emit, setEmit] = React.useState('')

  const { dropEvent, editEvent } = useLibrary();
 
  return <Grid sx={{mt: 1}} spacing={1} container>
    <Grid item xs={2}>
      <QuickSelect options={eventNames} value={name} /> 
    </Grid>  
    <Grid item xs={2}>
      <TextInput size="small" label="Title"
      onChange={e => editEvent(Name, name, 'title', e.target.value)}
       fullWidth value={title} />
    </Grid>  
    <Grid item xs={3}>
      <TextInput fullWidth size="small"
      onChange={e => editEvent(Name, name, 'description', e.target.value)}
      label="Description" value={description} />
    </Grid>  
    <Grid item xs={2}> 
      <EditableListCell options={emits} onChange={setEmit} value={emit}
        caption="Add emitted value"
        onAdd={e => editEvent(Name, name, 'emits', (emits||[]).concat(e))} 
        onDelete={e => {
          editEvent(Name, name, 'emits', 
            (emits||[]).filter(f => f !== emit))
            setEmit('')
        }}  
        label={`Event emits ${emits.length} values`}
        /> 
    </Grid>  
    <Grid item xs={1}>
       <Flex fullHeight>
        <DeleteConfirmMenu message={`Delete event "${name}"?`}    
        onDelete={e =>    !!e && dropEvent(Name, name) } /> 
       </Flex>
    </Grid>
  </Grid>
}

const CategoryTree = ({ categories, component, order, childName, Name, title, styleCategories, settingsCategories }) => {
  const Icon = title === 'Settings' ? Icons.Settings : Icons.Palette;
  const { setCategoryAlways, setCategoryProp, addComponentChild,importComponentChild, dropCategory, addCategory } = useLibrary();

  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const sorted = categories.sort(sortByOrder)
  
  const category = sorted[value];

  return <>


<Flex baseline sx={{  borderBottom: 1, borderColor: 'divider', mb: 2, mt: 3, pb: 0  }}>
 
  <Text active small>
  Categories
  </Text>

  <Tabs onChange={handleChange} value={value} sx={{minHeight: 24, mt: 1, ml: 1, mb: 2 }}>
    {sorted.map(category =>  <TabButton key={category.name} label={category.name} /> )}
  
  </Tabs> 

 
    {categories.length > 1 && <QuickMenu value={category.order}
    title="Category Order"
    label={<Tiny icon={Icons.Numbers}/>}
      onChange={e => {  
        !!e && setCategoryProp(Name, title, {
          ...category,
          order: e
        }); 
      }}
    options={conseq(categories.length)} />}
 
  <Spacer />
  <PopoverPrompt
    onChange={val => addCategory(Name, title, childName, val)}
    endIcon={<Icons.Add />}
    label={<>Add category</>}
    
  >Add category</PopoverPrompt>

  {title === 'Styles' && <QuickMenu 
    onChange={val => !!val && importComponentChild(Name, title, val)}
    options={styleCategories} label={<TextBtn variant="contained"
    endIcon={<Icons.MoreVert />}
    >Import style category</TextBtn>}/>}

  {title === 'Settings' && <QuickMenu
      onChange={val => !!val && importComponentChild(Name, title, val)}
      options={settingsCategories} label={<TextBtn variant="contained"
      endIcon={<Icons.MoreVert />}
    >Import settings category</TextBtn>}/>}


</Flex>


{!!category && <Flex sx={{borderBottom: 1, borderColor: 'divider', pb: 1}} key={category.name}>
    <Text small >Category:</Text> 
    <Text small active>{category.name}</Text> 


<PopoverPrompt
  onChange={val => addComponentChild(Name, title, category.name, childName, val)}
  endIcon={<Icons.Add />}
  label={<>Add {category.name} setting</>}
  
>Add setting</PopoverPrompt>

    <Spacer />
    <Flex onClick={e => setCategoryAlways(
          Name, 
          title,
          category.name,
        !category.always)}>

      <Text small>Always visible</Text> 
      <Switch size="small" checked={category.always} />
    </Flex>

    <DeleteConfirmMenu message={`Delete category "${category.name}"?`}    
        onDelete={e => !!e && dropCategory(Name, title,  category.name) } /> 

         

   </Flex>}

   {!!category && !!category[childName].length && category[childName]
    .sort(sortByOrder)
    .map (kid => <SettingRow 
   Name={Name}
    settingType={title}
    categoryName={category.name}
    childName={childName}
    component={component} key={kid.label} {...kid} />)}
 
  
  </>
}

const EventTree = ({ Name, events, eventNames, eventSources  }) => { 
  const { addEvent, importEvent } = useLibrary();
  return <>
  <Flex>
    <Text small active>Events</Text>
    <Spacer />
    <PopoverPrompt 
      onChange={val => !!val && addEvent(Name, val)}
          endIcon={<Icons.Add />} label={`Add event named:`}  > 
        add event </PopoverPrompt> 
        <QuickMenu  
        onChange={e => !!e && importEvent(Name, e)}
          options={eventSources} label={<TextBtn variant="contained"
          endIcon={<Icons.MoreVert />}
          >Import events</TextBtn>}/>

  </Flex>
  {/* <Chip icon={<Icon />} sx={{ mt: 2}} label={<b>Events</b>} color="error" variant="outlined" size="small" /> */}
  {/* <Typography variant="h6" sx={{ml: 1, mt: 1}}>{title}</Typography> */}
  {events?.map(event => <EventRow Name={Name} eventNames={eventNames} {...event} key={event.name}/>)}
  
  </>
}

const ComponentRow = ({ Name, allowChildren, Icon, allowedChildren = [], Defaults = {}, hidden}) => {

  const { Library , config} = React.useContext(AppStateContext);
  const { setComponentProps } = useLibrary();

  const def = Object.keys(Defaults).map(s => `${s}: ${Defaults[s].toString()}`);
  const allowableChildren = Object.keys(Library);

  return <Grid container sx={{ml: 2, mt: 2}} spacing={2}>

    <Grid xs={2}>
      <Flex> 
        Icon
  <QuickSelect label="Icon" 
  renderOption={renderIconOption}
    onChange={val => !!val && setComponentProps(Name, 'Icon', val)}
    value={typeof Icon === 'string' ? Icon : 'unusable'} options={Object.keys(Icons)} />
      </Flex>
    </Grid>


    <Grid xs={5}>
      <Flex spacing={2}>
        <Flex onClick={e => {
          setComponentProps(Name, 'hidden', !hidden)
        }}
        >
          <Switch checked={!!hidden} />
          <Text small> Hidden</Text>
        </Flex>
 
        <Flex onClick={e => {
          setComponentProps(Name, 'allowChildren', !allowChildren)
        }}>
          <Switch checked={!!allowChildren}  />
          <Text small> Allow Children</Text>
        </Flex> 

        <QuickSelect disabled={!allowChildren} label="Allowed children" options={allowedChildren} />
            
        <QuickMenu options={allowableChildren} 
          value={allowedChildren}
          onChange={child => {
          if (!child) return;
          const arr = (allowedChildren || []);
          const added = arr.find(d => d === child)
            ? arr.filter(d => d !== child)
            : arr.concat(child)
            
          setComponentProps(Name, 'allowedChildren', added)
          }}
          label={ <TinyButton icon={Icons.Add}  />}  
        /> 
    </Flex>
  </Grid>

  <Grid xs={2}>
      <Flex> 
  <QuickSelect label="Default settings" options={def} />
      </Flex>
    </Grid>



  </Grid>
} 

const LibraryNode = ({ component, keys, name, eventNames, expanded, expand , eventSources, styleCategories, settingsCategories}) => {
  const { commit } = useLibrary();
  const { Library, refreshLib } = React.useContext(AppStateContext);
  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Icon = Icons[Library[name].Icon];

  if (!!expanded && expanded !== name) {
    return <i />
  }
  return <>
  <Flex sx={{borderBottom: 1, borderColor: 'divider'
            , p: 1, backgroundColor: expanded ? 'aliceblue' : 'white'}}>
    <Expander on={expanded} />

      <Flex onClick={() => expand(name)}>

        <Tiny icon={Icon} />
        {/* <Icon /> */}
      {!expanded && <Text small active={expanded}> {name}</Text>}
 
      </Flex>

      {!!expanded && <QuickMenu value={name} small label={<b>{name}</b>} options={keys} onChange={expand} caret />}

       <Spacer />
       {JSON.stringify(component).length} bytes


       <TinyButton icon={Icons.Close} 
        onClick={() => expand(name)}
        />

       {!!component.dirty && <>

        <TinyButton icon={Icons.Undo} 
        onClick={() => refreshLib()}
        />

        <TinyButton icon={Icons.Save} 
        onClick={() => commit(name)}
        />
       </>}
      </Flex>

      <Collapse in={expanded}>
        {!!expanded &&    <>
          
          <ComponentRow {...component} Name={name} /> 

          <Flex  sx={{ ml: 2, borderBottom: 1, borderColor: 'divider', mb: 2, mt: 3, pb: 0  }}>
            <Text small active>Configure</Text>
            <Tabs onChange={handleChange} value={value} sx={{minHeight: 24, ml: 1, mb: 0 }}>
              <TabButton  iconPosition="start"  uppercase icon={<Tiny icon={Icons.Settings}/>}  label="Settings" />
              <TabButton  iconPosition="start"  uppercase  icon={<Tiny icon={Icons.Palette}/>}  label="Styles" />
              <TabButton  iconPosition="start" uppercase icon={<Tiny icon={Icons.Bolt}/>} label="Events" />
              <TabButton  iconPosition="start" uppercase icon={<Tiny icon={Icons.Code}/>} label="JSON" />
            </Tabs>
          </Flex>

          <Box sx={{ml: 2, pb: expanded ? 4 : 0, borderBottom: 4, borderColor: 'divider'}}>
            {expanded && value === 0 && !!component.Settings?.categories && <CategoryTree  
              styleCategories={styleCategories} 
              settingsCategories={settingsCategories} 
            title="Settings" childName="settings" 
              Name={name}  categories={component.Settings.categories} component={component}/>}
            {expanded && value === 2 &&  <EventTree eventSources={eventSources} Name={name} eventNames={eventNames}  events={component.Events} />}

            {value === 3 && <JsonView initial={0} json={component} />}

            {expanded && value === 1 && !!component.Styles?.categories && <CategoryTree
              styleCategories={styleCategories} 
              settingsCategories={settingsCategories}  title="Styles" childName="styles" 
            Name={name}  categories={component.Styles.categories} component={component}/>}
          </Box>
          
          </>
        }
        
      </Collapse>
  </>
}
 
const LibraryTree = ({onClose}) => {
  const { Library , config} = React.useContext(AppStateContext);
  const [expanded, setExpanded] = React.useState('');
  const [filter, setFilter] = React.useState('');
  const { createComponent } = useLibrary();

  const f = Object.keys(Library).find(f => !Object.keys(config).find(k => k === f));
  
  // const expand = node => {
  //   setExpanded(nodes => nodes.indexOf(node) > -1 
  //     ? nodes.filter(item => node !== item)
  //     : nodes.concat(node));
  // }

  const expand = node => setExpanded(s =>!!expanded && node === expanded ? '' : node);

  const styleCategories = Object.keys(Library).reduce ((out, key) => {
    const styles = Library[key].Styles;
    if (!styles) return out;
    out = out.concat(styles.categories?.filter(f => !!f.name).map(cat => `${key}.${cat.name}`));
    return out;
  }, [])
  
  const eventNames = Array.from(new Set(Object.keys(Library).reduce ((out, key) => {
    const events = Library[key].Events;
    if (!events) return out;
    out = out.concat(events.map(cat => cat.name ));
    return out;
  }, [])));
  
  const eventSources = Object.keys(Library).reduce ((out, key) => {
    const events = Library[key].Events;
    if (!events) return out;
    out = out.concat(key);
    return out;
  }, [])
  
  const settingsCategories = Object.keys(Library).reduce ((out, key) => {
    const settings = Library[key].Settings;
    // console.log({key, settings})
    if (!settings) return out;
    out = out.concat(settings.categories?.map(cat => `${key}.${cat.name}`));
    return out;
  }, [])
  
 return (
  <Layout data-testid="test-for-LibraryTree">
  
    <Flex >
      <Stack>

     <Flex sx={{ml: 6}}>
       <Typography variant="caption">{Object.keys(config).length} components</Typography>
      <PopoverPrompt 
      onChange={val => !!val && createComponent(val)}
          endIcon={<Icons.LibraryAdd />} label={`Add component`}  > 
        add component </PopoverPrompt> 

     </Flex>

       <Flex>
     <IconButton onClick={onClose}>
        <Icons.ArrowBack />
     </IconButton>
       <Typography variant="h5">Reactly Component Library</Typography>
       </Flex>
      </Stack>
 
      <Spacer />
      <SearchBox onClose={() => setFilter('')} label="filter" value={filter} onChange={e => setFilter(e.target.value)}/>
    </Flex>
    <Divider sx={{mt: 1}} />
     {Object.keys(config)
      .filter(f => !filter || f.toLowerCase()
          .indexOf(filter.toLowerCase()) > -1 )
      .sort((a,b) => a > b ? 1 : -1)
      .map(name => {
      const Icon = Library[name].Icon;
      return <LibraryNode expand={expand} 
      settingsCategories={settingsCategories} 
      eventNames={eventNames}
      keys={Object.keys(config)}
      eventSources={eventSources}
      styleCategories={styleCategories} 
      settingsCategories={settingsCategories} 
        expanded={expanded} key={name} name={name} component={config[name]} />
     })}
  </Layout>
 );
}
LibraryTree.defaultProps = {};
export default LibraryTree;
