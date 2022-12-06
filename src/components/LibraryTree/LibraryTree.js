import React from 'react';
import { styled, Box, Divider, Tabs, Collapse, Switch, Grid, Stack, Typography, Chip } from '@mui/material';
import { Flex, Spacer, SearchBox, Tiny , Text, TextInput, QuickSelect, QuickMenu, TinyButton } from '..'
import Library from '../library'
import { Icons } from '../library/icons';
import config from '../library/library.json'
import { JsonTree } from '../../colorize'; 
import { TabButton } from '../ComponentPanel/ComponentPanel';




const Expander = ({ on }) => <TinyButton icon={on ? Icons.Remove : Icons.Add}  deg={!on ? 0 : 180} />
/**
 * 
              "title": "Variant",
              "label": "variant",
              "types": [
                "contained",
                "outlined",
                "text"
              ], 
              "type": "pill"

 */

const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));

const SettingRow = ({ title, label, type, types, bindable, renderOption }) => {
  const dataTypes = ['pill', 'boolean', 'chip', 'shadow', 'listtable', 'tablecolumn', 'valuelist',
  'repeatertable', 'listbuilder', 'imagelist', 'text']
  return <Grid sx={{mt: 1}} spacing={1} container>

    <Grid item xs={1}>
     <Flex sx={{height: '100%'}}>
     <Switch checked={bindable} size="small"/>
      <Text small>Bindable</Text>
     </Flex>
    </Grid> 

    <Grid item xs={1}>
      <Flex sx={{height: '100%'}}>
      <QuickMenu options={dataTypes} value={type || 'text'} label={!type ? "text" : <b>{type}</b>} caret small />
      </Flex>
    </Grid> 


    <Grid item xs={3}>
      <TextInput fullWidth size="small" label="Title" value={title} />
    </Grid>

    <Grid item xs={2}>
      <TextInput size="small" label="Attribute Name" value={label} />
    </Grid>
    {/* <Grid item xs={2}>
      <TextInput size="small" label="Render function" value={renderOption} />
    </Grid> */}

    <Grid item xs={2}>
      {!!types && typeof types !== 'string' && <QuickSelect label="Options" options={types} />}
      {!types || typeof types === 'string' && <TextInput size="small" label="Options" value={types} />}
    </Grid> 
    <Grid item xs={1}>
      <Flex sx={{height: '100%'}}>
       <TinyButton icon={Icons.Delete} />
      </Flex>
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

const CategoryTree = ({ categories, childName, title }) => {
  const Icon = title === 'Settings' ? Icons.Settings : Icons.Palette;
  return <>
  {/* <Chip icon={<Icon />} sx={{ mt: 2}} label={<b>{title}</b>} color="error" variant="outlined" size="small" /> */}
  {/* <Typography variant="h6" sx={{ml: 1, mt: 1}}>{title}</Typography> */}
  {categories.map(category => <>
  
    <Flex sx={{borderBottom: 1, borderColor: 'divider', p: 1}} key={category.name}>
    <Text small active>{category.name}</Text> 
    <Spacer />
    <Text small>Always visible</Text> 
    <Switch size="small" checked={category.always} />
   </Flex>

   {!!category[childName].length && category[childName].map (kid => <SettingRow key={kid.label} {...kid} />)}
 
  </>)}
  
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

const LibraryNode = ({ component, name, expanded, expand }) => {
  const [value, setValue] = React.useState(0);
 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const Icon = Library[name].Icon;
  return <>
  <Flex sx={{borderBottom: 1, borderColor: 'divider', p: 1}} onClick={() => expand(name)}>
    <Expander on={expanded} />
        <Tiny icon={Icon} />
       <Text small active={expanded}> {name}</Text>
       <Spacer />
       {JSON.stringify(component).length} bytes
      </Flex>

      <Collapse in={expanded}>
        <Tabs onChange={handleChange} value={value} sx={{minHeight: 24, mt: 1, ml: 1, mb: 2 }}>
          <TabButton  iconPosition="start" disabled={!component.Settings}  icon={<Tiny icon={Icons.Settings}/>}  label="Settings" />
          <TabButton  iconPosition="start" disabled={!component.Events}    icon={<Tiny icon={Icons.Palette}/>}  label="Styles" />
          <TabButton  iconPosition="start" disabled={!component.Styles}   icon={<Tiny icon={Icons.Bolt}/>} label="Events" />
        </Tabs>

       <Box sx={{ml: 2, mb: expanded ? 4 : 0}}>
       {expanded && value === 0 && !!component.Settings?.categories && <CategoryTree title="Settings" childName="settings" categories={component.Settings.categories} />}
       {expanded && value === 2 && !!component.Events && <EventTree  events={component.Events} />}
       {expanded && value === 1 && !!component.Styles?.categories && <CategoryTree title="Styles" childName="styles" categories={component.Styles.categories} />}
       </Box>
      </Collapse>
  </>
}
 
const LibraryTree = () => {
  const [expanded, setExpanded] = React.useState([]);
  const [filter, setFilter] = React.useState('');

  const expand = node => {
    setExpanded(nodes => nodes.indexOf(node) > -1 
      ? nodes.filter(item => node !== item)
      : nodes.concat(node));
  }
  
 return (
   <Layout data-testid="test-for-LibraryTree">
    <Flex>
      <Stack>
        <Typography variant="caption">{Object.keys(config).length} components</Typography>
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
      return <LibraryNode expand={expand} expanded={expanded.indexOf(name) > -1} key={name} name={name} component={config[name]} />
     })}
   </Layout>
 );
}
LibraryTree.defaultProps = {};
export default LibraryTree;
