import React from 'react';
import { Typography, Collapse, styled, Grid, Box, Stack } from '@mui/material';
import { Flex, Spacer, TextBtn, TextInput, QuickSelect, Text, Tiny, TinyButton } from '../../..'; 
import { AppStateContext } from '../../../../hooks/AppStateContext'; 
import { CheckCircle, Save, CheckCircleOutline, ExpandMore, ExpandLess } from "@mui/icons-material";  
import { getSettings } from '../../../library/util';
import { ListTableRow } from './components';



const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(1)
}));
 
const Check = ({ on }) => <Tiny icon={on ? CheckCircle : CheckCircleOutline} />

const ListTableComponentInput = ({ 
  header,
  value,
  handleChange,
  resources ,
  type,
  component,
  selectedPage
}) => {  
  
  const { Library } = React.useContext(AppStateContext);
  const [terms, setTerms] = React.useState({});
  const [fields, setFields] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const object = !!value && typeof(value) === 'string' && type !== 'tablecolumn' 
    ? JSON.parse(value)
    : value
  const [state, setState] = React.useState( object || {
    resourceID: null,
    bindings: {

    }
  });

  const previewConnectionRequest = async () => { 
    const qs = Object.keys(terms).map(t => `${t}=${terms[t]}`).join('&');  
    // handleComponentRequest (qs, resource) 
  }

  const addProp = name => { 
    
    setFields (f => f.indexOf(name) > -1 
      ? f.filter(e => e !== name)
      : f.concat(name));
 

    const bindings = state.bindings || {}; 
    const defaultTypes = Object.keys(bindings).reduce((out, key) => {
      out[key] = {
        type: 'Text',
        settings: {}
      }
      return out;
    }, {})

    const columnNames = (state.columnMap || Object.keys(bindings));
    const typeMap = (state.typeMap || defaultTypes);

    if (typeMap[name]) {
      delete typeMap[name]
    } else {
      typeMap[name] = {
        type: 'Text',
        settings: {}
      }
    }

    if (bindings?.[name]) {
      delete bindings[name]
    } else {
      Object.assign(bindings, {[name]: name})
    }
    
    const columnMap = columnNames.indexOf(name) > -1 
        ? columnNames.filter(e => e !== name)
        : columnNames.concat(name);
    
     setState(s => ({
      ...s,
      bindings ,
      columnMap,
      typeMap
    }))
       
  }

  
  const offspring = selectedPage?.components?.find(f => f.componentID === component?.ID);


  const cats = !offspring ? null : Library[offspring.ComponentType];
  const bindableProps = !cats ? [] : cats.Settings?.categories.reduce((array, category) => {
    const settings = category.settings.filter(f => f.bindable);
    settings.map(f => array = array.concat({
      title: `${offspring.ComponentName}.${f.label}`,
      componentID: offspring.ID,
      SettingName: f.label
    }))
    return array
  }, [])

// repeatertable
  const resource = resources.find(f => f.ID === state.resourceID);

  const bindingKeys = Object.keys(state.bindings || {});


  const colnames = !state.bindings ? [] : bindingKeys;

 

  const componentBound = type === 'repeatertable' && !!bindableProps;
  const bindableNames = bindableProps.map(f => f.title);
  const getBindableByName = name => bindableProps.find(f => f.title === name);


  const handleType = (type) => {
    const typeMap = {
      ...state.typeMap,
      ...type
    }

    setState(s => ({
      ...s,
      typeMap
    }));
  }


  const handleMove = (key, offset) => {
    const columnMap = (state.columnMap || Object.keys(state.bindings));
    const index = columnMap.indexOf(key);
    arraymove(columnMap, index, index + offset);
    setState(s => ({
      ...s,
      columnMap
    })) 
  }

  function arraymove(arr, fromIndex, toIndex) {
    if (toIndex > -1) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    } 
    return arr;
  }
 

  const bindingSort = (col1, col2) => {
    const a = state.bindings[col1];
    const b = state.bindings[col2];
    if (!(a && b)) return 1;
    return bindingKeys.indexOf(a) > bindingKeys.indexOf(b) 
      ? -1 : 1; 
  }

  if (type === 'tablecolumn') {
    const args = getSettings(component.settings)
    if (!args.bindings) {
      return <>no bindings</>
    }
    const bindingProps = JSON.parse(args.bindings);
    const columnRes = resources.find(f => f.ID === bindingProps.resourceID);
    if (columnRes) {
      return <>
      {header}
      <QuickSelect value={value} onChange={handleChange} options={columnRes.columns} />
      </>
    }
    return <pre>
      
      {/* [[{JSON.stringify(columnRes,0,2)}]]
      [[{JSON.stringify(resources.map(f => f.ID),0,2)}]] */}
    
    </pre>
  }

 return (
   <Layout data-testid="test-for-ListTableComponentInput"> 
     
    


      {header}

      <QuickSelect value={resource?.name} options={resources.map(f => f.name)} onChange={value => {
        const res = resources.find(f => f.name === value);
        if (!res) return;
        setState(s => ({...s, resourceID: res.ID}))
      }}/>

      <Box sx={{mt: 2}}>
        <Text small variant="caption">Bound Fields</Text> 

        <Grid container sx={{mt: 0.5}} spacing={1}>

          {!componentBound && <>
            
            <Grid item xs={6}>
              <Text small active>Name</Text>
            </Grid>
            
            <Grid item xs={6}>
              <Text small active>Label</Text> 
            </Grid>
          </>}

          {!componentBound && state.columnMap?.map((col, index) => {
            const typeMap = state.typeMap
            const type = !typeMap ? {} : typeMap[col]
            const args = {
              active: !0, addProp, componentBound, col,
              bindableProps, getBindableByName, state, handleType,
              setState, onMove: handleMove, index , type
              } 

            return <ListTableRow key={col} {...args} />

          })} 


          
          {!!componentBound && resource?.columns
            .filter(col => colnames.indexOf(col) > -1)
            .map((col, index) => { 
            const args = {
              active: !0, addProp , componentBound, col,
              bindableProps, getBindableByName, state, 
              setState } 

            return <ListTableRow {...args} />
          })}


        </Grid>

        <Grid item>

        <Text small variant="caption">Available Fields</Text> 
        </Grid>
 
          
          {resource?.columns
            .filter(col => colnames.indexOf(col) < 0)
            .map((col, index) => { 
            const args = {
              active: !1, addProp , componentBound, col,
              bindableProps, getBindableByName, state, 
              setState } 

            return <ListTableRow {...args} />
          })}


      </Box>
 

      {/*  */}
        <Flex sx={{mt: 2}}>
          {/* <TextBtn color="warning" variant="contained" onClick={() => setOpen(!open) }>test</TextBtn> */}
          <Spacer />

          <TextBtn endIcon={<Save />} variant="contained" onClick={() => handleChange(state) }>save</TextBtn>
        </Flex>

<pre>

{/* [{JSON.stringify(state,0,2)}] */}
</pre>

        {/* form for setting request variables, when needed  */}
        <Collapse sx={{mt: 2}} in={open}>
          <Text small>Set values</Text>
          <Grid container>
             
          {resource?.values.map(b => <>
            <Grid item xs={5}>
            <Text sx={{pt:1, textAlign: 'right'}} small>{b.key}</Text>
            </Grid>
            <Grid item xs={7}>
            <TextInput size="small" placeholder={`value for ${b.key}`} 
               value={terms[b.key]} 
              onChange={e => {
                setTerms(s => ({...s, [b.key]: e.target.value}))
              }}
              />
            </Grid>
          </>)}
          </Grid>
          <Flex sx={{mt: 1}}>
            <Spacer />

          <TextBtn variant="contained" onClick={() => previewConnectionRequest() }>send request</TextBtn>
          </Flex>
        </Collapse>
 {/* [   <pre>
      {JSON.stringify(resource,0,2)}
    </pre>] */}
   </Layout>
 );
}
ListTableComponentInput.defaultProps = {};
export default ListTableComponentInput;
