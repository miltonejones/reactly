import React from 'react';
import { Typography, Collapse, styled, Grid, Box, Stack } from '@mui/material';
import { Flex, Spacer, TextBtn, TextInput, QuickSelect, Text, Tiny, TinyButton } from '../../..';
import Library from '../../../library';
import { CheckCircle, Save, CheckCircleOutline, ExpandMore, ExpandLess } from "@mui/icons-material";  
import { getSettings } from '../../../library/util';

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
    const exists = bindings?.[name];
    
    if (exists) {
      delete bindings[name]
    } else {
      Object.assign(bindings, {[name]: name})
    }
    
     setState(s => ({
      ...s,
      bindings 
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

  const changeOrder = (ordinal, offset) => {
    const bindings = arraymove(bindingKeys , ordinal, ordinal + offset)  
      .reduce ((obj, key) => {
        obj[key] = state.bindings[key]
        return obj;
      }, {})
    setState(s => ({...s, bindings}))
  }

  function arraymove(arr, fromIndex, toIndex) {
    if (toIndex > -1) {
      var element = arr[fromIndex];
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, element);
    } 
    return arr;
  }

  const test = arraymove(bindingKeys, 2, 1)
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
      
      [[{JSON.stringify(columnRes,0,2)}]]
      [[{JSON.stringify(resources.map(f => f.ID),0,2)}]]
    
    </pre>
  }

 return (
   <Layout data-testid="test-for-ListTableComponentInput"> 
   
{/* <pre>
{JSON.stringify(test,0,2)}
</pre>
  */}
{/* <pre>
{JSON.stringify(colnames,0,2)}
{JSON.stringify(state.bindings,0,2)}
</pre> */}
 
      {header}

      <QuickSelect value={resource?.name} options={resources.map(f => f.name)} onChange={value => {
        const res = resources.find(f => f.name === value);
        if (!res) return;
        setState(s => ({...s, resourceID: res.ID}))
      }}/>

      <Box sx={{mt: 2}}>
        <Text small variant="caption">Available Fields</Text>
        <Grid container sx={{mt: 0.5}} spacing={1}>

        <Grid item xs={5}>
            <Text small active>Name</Text>
          </Grid>
          
          <Grid item xs={7}>
            <Text small active>Label</Text> 
          </Grid>
          
        {resource?.columns.map((col, index) => {
          const active = colnames.indexOf(col) > -1  ;


          return <>
          
          
          <Grid item xs={4} key={col} >
              <Flex >
                <Check on={active} />
                <Text small onClick={() => addProp(col)}
                  sx={{fontWeight: active ? 600 : 400 }}>

                {col}
                </Text>
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

           {!componentBound && <TextInput 
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

            <Grid item xs={2}>
              <Flex sx={{ height: '100%' }}>
                <TinyButton disabled={!(index < resource.columns.length - 1)} onClick={() => changeOrder(index, 1)} icon={ExpandMore} sx={{mr: 1}}/>
                <TinyButton disabled={index === 0} onClick={() => changeOrder(index, -1)} icon={ExpandLess} />
              </Flex>
            </Grid>
 
                </> 
        })}

      </Grid>

      </Box>
 

      {/*  */}
        <Flex sx={{mt: 2}}>
          {/* <TextBtn color="warning" variant="contained" onClick={() => setOpen(!open) }>test</TextBtn> */}
          <Spacer />

          <TextBtn endIcon={<Save />} variant="contained" onClick={() => handleChange(state) }>save</TextBtn>
        </Flex>
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
