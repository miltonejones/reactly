import React from 'react';
import { styled, Box, Divider, Tabs, Collapse, Switch, Grid, Stack, Typography, Chip } from '@mui/material';
import { Flex, PopoverPrompt, Spacer, SearchBox, Tiny , Text, TextInput, QuickSelect, QuickMenu, TinyButton } from '..' 
import { Icons } from '../library/icons'; 
import { JsonTree } from '../../colorize'; 
import { TabButton } from '../ComponentPanel/ComponentPanel';
import { AppStateContext } from '../../hooks/AppStateContext';
import { TextBtn } from '../Control/Control';


export const useLibrary = () => {
  const { config, commitComponent, updateLib} = React.useContext(AppStateContext);


  
  const createComponent = (componentKey) => {
    const updated = {
      ...config,
      [componentKey]: {
        Icon: 'Add',
        dirty: true,
        Settings: {
          categories: []
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
    const ex = config[componentKey].Defaults;
    if (!propVal?.length) {
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

  const addComponentChild = (
    componentKey, 
    settingType,
    categoryName,
    childName, 
    props) => {

      const settings = props.split(',').map(f => ({
        label: f,
        title: f
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
        [childName]: []
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
                .map(setting => setting.label === prop.label ? prop : setting)
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
    commit
  }
}



const Expander = ({ on }) => <TinyButton icon={on ? Icons.Remove : Icons.Add}  deg={!on ? 0 : 180} />


const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const SettingRow = ({ Name, settingType, component, categoryName, childName, ...props }) => {
  const { title, label, type, types, bindable, when, } = props;
  const [js, setJS] = React.useState(when)
  const [opt, setOpt] = React.useState('')
  const [error, setError] = React.useState('')
  const { setComponentChild, setComponentDefaults, dropComponentChild } = useLibrary();

  const saveSetting = (key, val) => {
    const added = {
      ...props,
      [key]: val
    }
    setComponentChild( 
      Name, 
      settingType,
      categoryName,
      childName, 
      added
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

  const options = typeof types === 'string'
    ? [types]
    : (types?.indexOf('ICON_TYPES') > -1 
        ? Object.keys(Icons)
        : types
        );

  
  const dataTypes = ['pill', 'boolean', 'chip', 'shadow', 'listtable', 'tablecolumn', 'valuelist',
  'repeatertable', 'listbuilder', 'imagelist', 'text']
  return <Grid sx={{mt: 1}} spacing={1} container>
 
    <Grid item xs={1}>
     <Flex sx={{height: '100%'}}  onClick={e => {
            saveSetting('bindable', !bindable)
          }}>
     <Switch checked={bindable} size="small"/>
      <Text small>Bindable</Text>
     </Flex>
    </Grid> 

    <Grid item xs={1}>
      <Flex sx={{height: '100%'}}>
      <QuickMenu options={dataTypes} 
       onChange={val => {
        saveSetting('type', val)
      }}
        value={type || 'text'} label={!type ? "text" : <b>{type}</b>} caret small />
      </Flex>
    </Grid> 


    <Grid item xs={2}>
    <Flex>
    <TextInput fullWidth size="small" label="Title"
          onChange={e => {
            saveSetting('title', e.target.value)
          }}
        value={title} />

      <QuickMenu options={[`Delete "${title}" setting?`]} 
          label={ <TinyButton icon={Icons.Delete}  />}
            onChange={e => !!e && dropComponentChild(Name, settingType, categoryName,
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
      <TextInput size="small"
      helperText={error}
          onChange={e => {
            setJS(e.target.value)
            const code = e.target.value;
            try {
              const scr = eval(code);
              if (typeof scr === 'function' || !code) {
                try {
                  const enact = scr()
                  if (typeof enact !== 'boolean') {
                    return setError('Function must return a boolean')
                  }
                } catch (ex) {
                    // do nothing
                }
                setError('')
                return saveSetting('when', code)
              }
              setError('Not a valid function')
            } catch (e) {
              setError(e.message)
            }
          }}
      label="When" value={js?.toString()} />
    </Grid>

    <Grid item xs={2}>
     <Flex fullHeight>

     <QuickSelect
        value={opt}
        onChange={setOpt}
        label="Options" options={options || []} />

        {!!opt && <>
          <TinyButton icon={Icons.Close} onClick={() => setOpt('')} />
          <QuickMenu options={[`Delete "${opt}" option?`]} 
          label={ <TinyButton icon={Icons.Delete}  />}
            onChange={e => !!e && dropOpt()} />
        </>}
        
        {!opt && <>
         <PopoverPrompt sx={{width:16, height: 16, cursor: 'pointer'}} component={Icons.Add} label={`Add option to ${title}`} 
          onChange={addOpt}> 
         </PopoverPrompt> 

        </>}
     </Flex>
    </Grid> 


    <Grid item xs={2}>
      <TextInput size="small" label="Default" 
        onChange={e => setComponentDefaults(Name, label, e.target.value)}
      value={component.Defaults?.[label]} />
    </Grid> 

  </Grid>
}

const EventRow = ({ title, name, description }) => {
  const dataTypes = ['pill', 'boolean', 'chip', 'shadow', 'listtable', 'tablecolumn', 'valuelist',
  'repeatertable', 'listbuilder', 'imagelist']
  return <Grid sx={{mt: 1}} spacing={1} container>
    <Grid item xs={3}>
      <TextInput size="small" label="Event Name" value={name} />
    </Grid>  
    <Grid item xs={3}>
      <TextInput size="small" label="Title" value={title} />
    </Grid>  
    <Grid item xs={5}>
      <TextInput fullWidth size="small" label="Title" value={description} />
    </Grid>  
  </Grid>
}

const CategoryTree = ({ categories, component, childName, Name, title, styleCategories, settingsCategories }) => {
  const Icon = title === 'Settings' ? Icons.Settings : Icons.Palette;
  const { setCategoryAlways, addComponentChild,importComponentChild, dropCategory, addCategory } = useLibrary();

  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const category = categories[value];

  return <>


<Flex baseline>
  <Text active small>
    Categories
  </Text>

  <Tabs onChange={handleChange} value={value} sx={{minHeight: 24, mt: 1, ml: 1, mb: 2 }}>
  {categories.map(category =>  <TabButton  label={category.name} /> )}
 
</Tabs> 

<PopoverPrompt
  onChange={val => addCategory(Name, title, childName, val)}
  endIcon={<Icons.Add />}
  label={<>Add category</>}
  
>Add category</PopoverPrompt>

{title === 'Styles' && <QuickMenu 
  onChange={val => !!val && importComponentChild(Name, title, val)}
  options={styleCategories} label={<TextBtn
  endIcon={<Icons.MoreVert />}
  >Import style category</TextBtn>}/>}

{title === 'Settings' && <QuickMenu options={settingsCategories} label={<TextBtn
  endIcon={<Icons.MoreVert />}
  >Import settings category</TextBtn>}/>}


</Flex>


{!!category && <Flex sx={{borderBottom: 1, borderColor: 'divider', p: 1}} key={category.name}>
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

<QuickMenu options={[`Delete category "${category.name}"?`]} 
          label={ <TinyButton icon={Icons.Delete}  />}
            onChange={e => {
              !!e && dropCategory(Name, title,  category.name)
              setValue(0)
            }} /> 

   </Flex>}

   {!!category && !!category[childName].length && category[childName].map (kid => <SettingRow 
   Name={Name}
    settingType={title}
    categoryName={category.name}
    childName={childName}
    component={component} key={kid.label} {...kid} />)}
 
  
  </>
}

const EventTree = ({ events }) => {
  const Icon = Icons.Bolt;
  return <>
  {/* <Chip icon={<Icon />} sx={{ mt: 2}} label={<b>Events</b>} color="error" variant="outlined" size="small" /> */}
  {/* <Typography variant="h6" sx={{ml: 1, mt: 1}}>{title}</Typography> */}
  {events.map(event => <EventRow {...event} key={event.name}/>)}
  
  </>
}

const ComponentRow = ({ Name, allowChildren, Icon, allowedChildren = [], Defaults = {}, hidden}) => {

  const { Library , config} = React.useContext(AppStateContext);
  const { setComponentProps } = useLibrary();

  const def = Object.keys(Defaults).map(s => `${s}: ${Defaults[s]}`);
  const allowableChildren = Object.keys(Library)
    .filter(f => !!Library[f].hidden);

  return <Grid container sx={{ml: 2, mt: 2}} spacing={2}>

    <Grid xs={2}>
      <Flex> 
  <QuickSelect label="Icon" 
    onChange={val => setComponentProps(Name, 'Icon', val)}
    value={typeof Icon === 'string' ? Icon : 'unusable'} options={Object.keys(Icons)} />
      </Flex>
    </Grid>


    <Grid xs={1}>
      <Flex onClick={e => {
      setComponentProps(Name, 'hidden', !hidden)
    }}
    >
      <Switch checked={!!hidden} />
       <Text small> Hidden</Text>
      </Flex>
    </Grid>

  <Grid xs={2}>
    <Flex onClick={e => {
      setComponentProps(Name, 'allowChildren', !allowChildren)
    }}>
    <Switch checked={!!allowChildren}  />
     <Text small> Allow Children</Text>
    </Flex>
  </Grid>


  <Grid xs={3}>
    <Flex>
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
          label={ <TinyButton icon={Icons.Add}  />}  /> 
    </Flex>
  </Grid>

  <Grid xs={2}>
      <Flex> 
  <QuickSelect label="Default settings" options={def} />
      </Flex>
    </Grid>



  </Grid>
}

const LibraryNode = ({ component, name, expanded, expand , styleCategories, settingsCategories}) => {
  const { commit } = useLibrary();
  const { Library } = React.useContext(AppStateContext);
  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Icon = Icons[Library[name].Icon];
  return <>
  <Flex sx={{borderBottom: 1, borderColor: 'divider'
            , p: 1, backgroundColor: expanded ? 'aliceblue' : 'white'}}>
    <Expander on={expanded} />

      <Flex onClick={() => expand(name)}>

        <Tiny icon={Icon} />
        {/* <Icon /> */}
       <Text small active={expanded}> {name}</Text>
 
      </Flex>
       <Spacer />
       {JSON.stringify(component).length} bytes
       {!!component.dirty && <TinyButton icon={Icons.Save} 
        onClick={() => commit(name)}
        />}
      </Flex>
      <Collapse in={expanded}>
        <ComponentRow {...component} Name={name} /> 
        <Tabs onChange={handleChange} value={value} sx={{minHeight: 24, mt: 1, ml: 1, mb: 2 }}>
          <TabButton  iconPosition="start" disabled={!component.Settings}  icon={<Tiny icon={Icons.Settings}/>}  label="Settings" />
          <TabButton  iconPosition="start" disabled={!component.Styles}    icon={<Tiny icon={Icons.Palette}/>}  label="Styles" />
          <TabButton  iconPosition="start" disabled={!component.Events}   icon={<Tiny icon={Icons.Bolt}/>} label="Events" />
        </Tabs>

       <Box sx={{ml: 2, pb: expanded ? 4 : 0, borderBottom: 4, borderColor: 'divider'}}>
       {expanded && value === 0 && !!component.Settings?.categories && <CategoryTree  
       styleCategories={styleCategories} 
       settingsCategories={settingsCategories} 
       title="Settings" childName="settings" 
        Name={name}  categories={component.Settings.categories} component={component}/>}
       {expanded && value === 2 && !!component.Events && <EventTree  events={component.Events} />}
       {expanded && value === 1 && !!component.Styles?.categories && <CategoryTree
            styleCategories={styleCategories} 
            settingsCategories={settingsCategories}  title="Styles" childName="styles" 
           Name={name}  categories={component.Styles.categories} component={component}/>}
       </Box>
      </Collapse>
  </>
}
 
const LibraryTree = () => {
  const { Library , config} = React.useContext(AppStateContext);
  const [expanded, setExpanded] = React.useState([]);
  const [filter, setFilter] = React.useState('');
  const { createComponent } = useLibrary();
  
  const expand = node => {
    setExpanded(nodes => nodes.indexOf(node) > -1 
      ? nodes.filter(item => node !== item)
      : nodes.concat(node));
  }

  const styleCategories = Object.keys(Library).reduce ((out, key) => {
    const styles = Library[key].Styles;
    if (!styles) return out;
    out = out.concat(styles.categories?.filter(f => !!f.name).map(cat => `${key}.${cat.name}`));
    return out;
  }, [])
  
  const settingsCategories = Object.keys(Library).reduce ((out, key) => {
    const settings = Library[key].Settings;
    if (!settings) return out;
    out = out.concat(settings.categories?.filter(f => !!f.name).map(cat => `${key}.${cat.name}`));
    return out;
  }, [])
  
 return (
  <Layout data-testid="test-for-LibraryTree">
    <Flex >
      <Stack>
     <Flex>
       <Typography variant="caption">{Object.keys(config).length} components</Typography>
      <PopoverPrompt sx={{width:16, height: 16, cursor: 'pointer'}} 
      onChange={val => !!val && createComponent(val)}
          component={Icons.Add} label={`Add component`}  > 
         </PopoverPrompt> 

     </Flex>
        <Typography variant="h5">Reactly Component Library</Typography>
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
      styleCategories={styleCategories} 
      settingsCategories={settingsCategories} 
        expanded={expanded.indexOf(name) > -1} key={name} name={name} component={config[name]} />
     })}
  </Layout>
 );
}
LibraryTree.defaultProps = {};
export default LibraryTree;
