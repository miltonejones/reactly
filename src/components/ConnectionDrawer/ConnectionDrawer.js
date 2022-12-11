import React from 'react';
import { styled, Box, IconButton, Drawer, TextField, Link,
  Divider, Typography, Stack, Grid, Card, Switch } from '@mui/material';
import { Tiny, PopoverInput, Flex, Text, Spacer, TextBtn ,QuickSelect, QuickMenu, DeleteConfirmMenu, TextBox, PillMenu} from '..';
import { Close, RecentActors, Add, Code, Biotech, DatasetLinked, AutoStories, Delete, Save, CheckCircleOutline, CheckCircle } from "@mui/icons-material";  
import { Json } from '../../colorize'; 
import { useEditor } from '../../hooks/useEditor';
import ComponentEvents from '../ComponentEvents/ComponentEvents';
import { JsonModal } from '../../colorize';
 
const Layout = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '50vh'
}));
 
  

const ConnectionNode = ({ 
    ID, 
    name , 
    dirty,
    resources = [], 
    connectionClick,
    connectionDrop,
    resourceClick ,
    resourceDrop ,
    resourceCommit, 
    connectionCommit, 
    selectedResourceID,
    selectedConnectionID
  }) => { 
  const children = resources.filter(f => f.connectionID === ID)
  return <>
    <Text small active={ID === selectedConnectionID} >
        <Flex onClick={() => connectionClick(ID)}>

          <Tiny icon={DatasetLinked} />

          {name}

        </Flex>

        <Spacer />


        {ID === selectedConnectionID && <>
        {dirty && <Tiny icon={Save}  onClick={() => connectionCommit()} />}
        <Tiny icon={Close}  onClick={() => connectionClick()} />
          </> }

          <DeleteConfirmMenu message={`Delete connection ${name}?`} 
            onDelete={(e) => !!e && connectionDrop && connectionDrop(ID, true)}   />

        {/* <Tiny icon={Delete}  onClick={() => connectionDrop && connectionDrop(ID)} />  */}

    </Text >

    {children.map(kid => <Text small 
        active={kid.ID === selectedResourceID} >

      <Flex sx={{ml: 4 }} 
        onClick={() => resourceClick(kid.ID)} >
        <Tiny icon={AutoStories} />  {kid.name}
      </Flex>

      <Spacer />
      
      {kid.ID === selectedResourceID && <>
        {dirty && <Tiny icon={Save}  onClick={() => resourceCommit()} />}
        <Tiny icon={Close}  onClick={() => resourceClick()} />
      </> }


      <DeleteConfirmMenu message={`Delete resource ${kid.name}?`} 
            onDelete={(e) => !!e && resourceDrop && resourceDrop(ID, true)}   />

      {/* <Tiny icon={Delete}  onClick={() => resourceDrop && resourceDrop(kid.ID)} />  */}

    </Text>)}

    <Text small>
      <Flex sx={{ml: 4 }}  
        onClick={() => resourceClick('new', ID)} >
        <Tiny icon={Add} /> 
        <Link>Add resource</Link>
      </Flex> 
    </Text>

    {/* <Text small onClick={() => connectionClick('new')}>
      <Tiny icon={Add} /> 
      <Link>Add connection</Link>
    </Text> */}
  </>
}

const ConnectionForm = ({ connection, connectionCommit, onChange, dirty }) => {
  const handleChange = key => e => onChange(key, !e.target ? e : e.target.value);
  const { name, root, type} = connection;

  return <>
  <Typography sx={{pl: 1}} variant="caption"><b>Configure Connection</b></Typography>
  <Divider  sx={{mb: 2}}/>
  <Box sx={{mr: 2, ml: 2}}>

    <Grid container spacing={2}>  
      <Grid item xs={12}>
        <TextField label="Name" fullWidth onChange={handleChange('name')} value={name} size="small" />
      </Grid> 
      <Grid item xs={12}>
        <TextField label="URL" fullWidth onChange={handleChange('root')} value={root} size="small" />
      </Grid> 
      <Grid item xs={12}>
        <PillMenu options={['rest', 'mysql', 'dynamo']} onChange={handleChange('type')} value={type} />
      </Grid> 
      <Grid item xs={12}>
         <Flex>
          <Spacer />
          <TextBtn variant="contained" disabled={!dirty} onClick={connectionCommit} endIcon={<Save />}>save</TextBtn>
         </Flex>
      </Grid> 
    </Grid>
    
  </Box>
  </>
}

const ResourceForm = ({ setAnswer, answer, dirty, resource, terms, setTerms, onPreview, 
    onTermDrop, onTermAdd, onChange, setDirty, resourceCommit }) => {
  const { ID, connectionID, name, path, format, method, values, columns, node } = resource;
  const handleChange = key => e => onChange(key, !e.target ? e : e.target.value);


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAliasOpen = event => {
    setAnchorEl(event.currentTarget)
  } 

  const handleAliasClose = event => {
    setAnchorEl(null)
  } 


  return <>

<JsonModal json={resource} />
      <Typography sx={{pl: 1}} variant="caption"><b>Configure Resource</b></Typography>
      <Divider  sx={{mb: 2}}/>
      <Box sx={{mr: 2, ml: 2}}>

        <Grid container spacing={2}>  
          <Grid item xs={6}>
            <TextField label="Name" fullWidth onChange={handleChange('name')} value={name} size="small" />
          </Grid> 
          <Grid item xs={6}>
            <TextField label="Path" fullWidth onChange={handleChange('path')} value={path} size="small" />
          </Grid>
          <Grid item xs={3}>     
            <QuickMenu caret label={method || 'Method'} onChange={handleChange('method')} options={['GET','POST','PUT','DELETE',]}
                value={method}/>  
          </Grid>
           
          <Grid item xs={9}>
              <PillMenu options={['rest', 'querystring']} onChange={handleChange('format')} value={format} />
          </Grid>
        </Grid>

      </Box>
      

      <Flex sx={{pl: 1, pr: 1, mt: 2}}>
        <JsonModal json={values} />
        <Typography 
            variant="caption"><b>Values</b></Typography>
        <TextBtn onClick={handleAliasOpen}  endIcon={<Add />}>add</TextBtn>
        <Spacer />
        <TextBtn disabled={!dirty} variant="contained" size="small"
        endIcon={<Save />}
                onClick={resourceCommit} >Save</TextBtn>
        <TextBtn variant={!! answer ? "outlined" : "contained"}  size="small"
          endIcon={!!answer ? <Close /> : <Biotech />}
                onClick={() => {
                  if(!!answer) {
                    return setAnswer(null)
                  }
                  onPreview(format)
                }} color="warning">{!!answer ? "Clear" : "Test"}</TextBtn>
      </Flex>

      <Divider  sx={{mb: 2, mt: 1}}/>

      <Grid sx={{ml: 1}} container spacing={2}>
        
        <Grid item xs={2}>
        <JsonModal json={terms} />
          <Typography variant="caption"><b>Key</b></Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="caption"><b>Value</b></Typography>
        </Grid>
 


        {values?.map(prop => <>

            <Grid item xs={2}>
              {prop.key}
            </Grid>
            <Grid item xs={8}>
              <TextField placeholder={`Enter ${prop.key} value`}  value={terms[prop.key]} 
              autoComplete="off"
                onChange={e => {
                  setTerms(s => ({...s, [prop.key]: e.target.value}));
                  setDirty(true)
                }}
              size="small" />
            </Grid>
            <Grid item xs={1}>
             <Box onClick={() => onTermDrop(prop.key)}>
              <Tiny sx={{mt: 2}} icon={Close} />
             </Box>
            </Grid>

          </>)}
      </Grid>

      <PopoverInput label="Add a query string value" 
        onChange={value => {
      if (!value) return handleAliasClose();   
      onTermAdd(value)
      handleAliasClose();
    }} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>

  </>
}

const Check = ({ on }) => <Tiny icon={on ? CheckCircle : CheckCircleOutline} />

const ConnectionTree = ({ nodes, resource, onAddProp, indent = 0, path = []}) => {
  if (!nodes || !resource) {
    return <i />
  } 

  const dot = path.join('.');
  const fields = resource.columns;

  return <>  
      {Object.keys(nodes).map(node => { 

        if (Array.isArray(nodes[node])) {
          return <>
            <Text small onClick={() => {
              onAddProp(node, dot);
            }} sx={{ml: indent}} key={node}
            > <Check on={fields?.indexOf(node) > -1 || node === resource.node} /> {node} </Text>
            <ConnectionTree resource={resource} fields={fields} onAddProp={onAddProp}  
                path={path.concat(node)} nodes={nodes[node][0]} indent={indent + 4} /> 
            <Divider />
          </>
        }

        return <><Text small onClick={() => { 
              onAddProp(node, dot);
            }}  sx={{ml: indent}} key={node}
          > <Check on={fields?.indexOf(node) > -1 || node === resource.node} /> {node} </Text> 

            {typeof nodes[node] === 'object' &&  <ConnectionTree resource={resource} fields={fields} onAddProp={onAddProp}  
                path={path.concat(node)} nodes={nodes[node]} indent={indent + 4} /> }

        </>
      })}
  </>

}
 
 
const ConnectionDrawer = ({ open, setResource, dropResource, handleSwitch,
    resources = [], connections = [], appID, handleDrop, selectedPage,
    setConnection, dropConnection, handleClose, handleChange ,
    onEventChange, onEventDelete, application}) => {
  // const { setResource } = useEditor()
  const [selected, setSelected] = React.useState({})
  const [selectedConnection, setSelectedConnection] = React.useState({})
  const [terms, setTerms] = React.useState({});
  const [dirty, setDirty] = React.useState(null)
  const [answer, setAnswer] = React.useState(null)
  const [fields, setFields] = React.useState([])
  const { ID, connectionID, path, format, method, values, columns, node } = selected;
 

  
  const previewConnectionRequest = async (format) => {
    const connection = connections.find(f => f.ID === connectionID);
    const url = new URL(path, connection.root);
    
    const slash = format === 'rest' ? '/' : '?'
    const qs = format === 'rest'
      ? Object.keys(terms).map(t => `${terms[t]}`).join('/')
      : Object.keys(terms).map(t => `${t}=${terms[t]}`).join('&');


    const endpoint = `${url}${slash}${qs}`;
    // return alert(endpoint)

    const response = await fetch(endpoint); 
    const json = await response.json();
    setAnswer(json);
    
  }

  const addProp = (name, where) => {  
    setSelected(resource => ({
      ...resource,
      node: where,
      columns:  resource.columns.indexOf(name) > -1 
      ? resource.columns.filter(e => e !== name)
      : resource.columns.concat(name) 
    })) 
    setDirty(true);
  }

  const setSelectedConnectionByID = (ID) => { 
    const res = !!ID && connections.find(f => f.ID === ID);
    setSelected({})
    if (ID) {
      setDirty(false); 
      if (ID === 'new') {
        return setSelectedConnection({ 
          name: 'New Connection',
          type: 'rest' 
        })
      }
      return setSelectedConnection(res || {})
    } 
    setSelectedConnection({})
  }

  const setSelectedResource = (ID, connectionID) => {
    const res = !!ID && resources.find(f => f.ID === ID);
    setSelectedConnectionByID()
    if (ID) {
      setDirty(false);
      if (ID === 'new') {
        return setSelected({
          connectionID,
          name: 'New Resource',
          method: 'GET',
          columns: [],
          values: []
        })
      }

      const initialTerms = res.values?.reduce((item, val) => {
         item[val.key] = val.value;
         return item;
      }, {})
      // alert (JSON.stringify(initialTerms))
      setTerms(initialTerms);

      return setSelected(res || {})
    }
    setSelected({})
  }

  const handleConnectionCommit = () => {
    setConnection(appID, selectedConnection);
  }

  const handleResourceCommit = () => { 
    const committed = {
      ...selected,
      values: selected?.values.map(val => ({
        ...val,
        value: terms[val.key]
      }))
    }
    // alert (JSON.stringify(selected.values,0,2))
    // alert (JSON.stringify(committed,0,2))
    // return alert (JSON.stringify(terms,0,2))
    setResource(appID, committed)
    setDirty(false);
  }

  const handleAddQueryTerm = term => {
    setSelected(resource => ({
      ...resource,
      values: resource.values.concat(term.split(',').map(key => ({ key })))
    }))
    setDirty(true);
  }

  const handleDropQueryTerm = key => { 
    setSelected(resource => ({
      ...resource,
      values: resource.values.filter(f => f.key !== key)
    }))
    setDirty(true);
  }

  const handleSelectedResourceChange = (key, value) => {
    setSelected(resource => ({
      ...resource,
      [key]: value
    }))
    setDirty(true);
  }

  const handleSelectedConnectionChange = (key, value) => {
    setSelectedConnection(connection => ({
      ...connection,
      [key]: value
    }))
    setDirty(true);
  }

  const Events =  [
    {
      name: 'dataLoaded', 
      title: 'data loads',
      description: 'Data finishes loading.'
    }, 
    {
      name: 'loadStarted', 
      title: 'data starts loading',
      description: 'Data starts loading.'
    }, 
  ]
  
 return (
  <Drawer open={open} anchor="bottom"> 
    <Layout data-testid="previewConnectionRequest-for-ConnectionDrawer">
      <Flex>
        <Typography variant="subtitle1">
          <b>Data Resources</b>
        </Typography>
         <TextBtn endIcon={<Add />} onClick={() => setSelectedConnectionByID('new')}>add</TextBtn>
        <Spacer />

        <IconButton disabled>
        <AutoStories                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  />
      </IconButton>

            <IconButton
              color="inherit" 
              onClick={() => { 
                handleSwitch({ scriptOpen: 1, connectOpen: false})
              }}
            >
              <Code />
            </IconButton>


        <IconButton
              color="inherit" 
              onClick={() => {
                handleSwitch({ connectOpen: false, stateOpen: 1})
              }}
            >
              <RecentActors />
            </IconButton>

        <IconButton  onClick={handleClose}>
          <Close />
        </IconButton>
      </Flex>
      <Divider />
     
    <Grid container sx={{height: 400}}>
      
      <Grid item xs={3} sx={{borderRight: 1, borderColor: 'divider'}}>
          <JsonModal json={connections} />
        <Typography sx={{pl: 1}} variant="caption">
          <b>Connections</b></Typography>
        <Divider  sx={{mb: 2}}/>

        {connections.map (connection => <ConnectionNode 
              resources={resources} 
              resource={selected}
              resourceCommit={handleResourceCommit}
              connectionCommit={() => {
                handleConnectionCommit()
                setDirty(false)
              }}
              resourceClick={setSelectedResource}
              selectedResourceID={selected?.ID}
              selectedConnectionID={selectedConnection?.ID}
              connectionClick={(e) => setSelectedConnectionByID(e)}
              key={connection.ID} 
              resourceDrop={dropResource}
              connectionDrop={dropConnection}
              dirty={dirty}
              {...connection} />)}

             
      </Grid>

      {!!selectedConnection?.name && <Grid item xs={3} sx={{borderRight: 1, borderColor: 'divider'}}>
          <ConnectionForm connection={selectedConnection} 
              dirty={dirty}
              connectionCommit={handleConnectionCommit}
              onChange={handleSelectedConnectionChange}/>
        </Grid>}

        {!!selected?.name && <Grid item xs={3} sx={{borderRight: 1, borderColor: 'divider'}}>
          <ResourceForm 
          setDirty={setDirty}
              dirty={dirty}
              answer={answer}
              setAnswer={setAnswer}
            resource={selected} 
            resourceCommit={handleResourceCommit}
            onChange={handleSelectedResourceChange}
            onTermAdd={handleAddQueryTerm}
            onTermDrop={handleDropQueryTerm}
            onPreview={previewConnectionRequest}
            setTerms={setTerms}
            terms={terms}
            /> 
        </Grid>}

        {!!answer && <Grid item xs={3} sx={{borderRight: 1, borderColor: 'divider'}}>
          <Typography sx={{pl: 1}} variant="caption"><b>Choose columns</b></Typography>
          <Divider  sx={{mb: 2}}/>
          <Box sx={{height: 400, overflow: 'auto', pl: 2}}>
          <ConnectionTree 
            resource={selected}
            onAddProp={addProp} nodes={answer} />
          </Box>
        </Grid>}

        {!!selected.columns && <Grid item xs={3} sx={{borderRight: 1, borderColor: 'divider'}}>
          <Typography sx={{pl: 1}} variant="caption"><b>Selected columns</b></Typography>
          <Divider  sx={{mb: 2}}/>
          <Box sx={{height: 400, overflow: 'auto', pl: 2}}>
            {selected.columns.map(col => <Text small key={col}>
              <Check on /> {selected.node}.{col}
              <Spacer />
              <Tiny onClick={() => addProp(col, selected.node)} icon={Close} />
            </Text>)}
          </Box>
        </Grid>} 

        {!answer && !!selected?.name && !selectedPage && <Grid item xs={3}>
        <Typography sx={{pl: 1}} variant="caption"><b>Events</b></Typography>
          <Divider  sx={{mb: 2}}/>
          <Flex sx={{p: 2}}>
          Select a page to see resource events </Flex></Grid>}

        {!answer && !!selected?.name && !!selectedPage && <Grid item xs={3} sx={{borderRight: 1, borderColor: 'divider'}}>
          <Typography sx={{pl: 1}} variant="caption"><b>Events</b></Typography>
          <Divider  sx={{mb: 2}}/>
          <Box sx={{height: 400, overflow: 'auto', pl: 2}}>
            <ComponentEvents 
            onChange={(id, event) => {
              onEventChange(id, event, 'connection')
            }}
            onEventDelete={(componentID, eventID) => {
              onEventDelete(componentID, eventID, 'connection')
            }}
            application={application}
            selectedPage={selectedPage}
            component={selected}
            addedEvents={Events}
            connections={connections}
            resources={resources}

            />

{/* selectedPage, 
    component, 
    onEventDelete, 
    onChange, 
    addedEvents,
    connections, 
    resources */}
          </Box>
        </Grid>} 

    </Grid>



   </Layout>
   </Drawer>
 );
}
ConnectionDrawer.defaultProps = {};
export default ConnectionDrawer;
