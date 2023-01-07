import React from 'react';
import { styled, Box, IconButton, Drawer, TextField, Link,
  Divider, Typography, Stack, Collapse, Grid, Card, Switch } from '@mui/material';
import { Tiny, TinyButton, PopoverInput, Flex, Text, Spacer, TextBtn ,PopoverPrompt,
  QuickSelect, QuickMenu, DeleteConfirmMenu, TextBox, PillMenu} from '..';
import { Close, Gamepad, RecentActors, Add, Code, Bolt, DatasetLinked, Settings,
    AutoStories, Delete, Save, CheckCircleOutline, CheckCircle, Edit } from "@mui/icons-material";   
import ComponentEvents from '../ComponentEvents/ComponentEvents';
import { JsonModal } from '../../colorize';
import { useRunScript } from '../../hooks/subhook/useRunScript';
import { StateComponentInput } from '../ComponentSettings/components';
import { AppStateContext, EditorStateContext } from "../../context";
import { useReactly } from '../../hooks';
import { DrawerNavigation } from '../pages/Editor/components';
import { OpenDrawer } from '..';
 
const Layout = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  minHeight: '60vh'
}));

const sx = { height: 480, overflowY: 'auto', overflowX: 'hidden' }
 
  
const Check = ({ on }) => <Tiny icon={on ? CheckCircle : CheckCircleOutline} />


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
            onDelete={(e) => !!e && resourceDrop && resourceDrop(kid.ID, true)}   />

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

const ResourceForm = ({ onStateChange, setAnswer, answer, dirty, resource, terms = {}, setTerms, onPreview, 
    onTermDrop, onTermAdd, onChange, setDirty, resourceCommit }) => {

  const { ID, connectionID, name, path, format, method, values, columns, transform, node } = resource;
  const handleChange = key => e => onChange(key, !e.target ? e : e.target.value);

  const statePrefix = name?.toLowerCase().replace(/\s/g, '_');

  const {  
    EditCode
  } = React.useContext(AppStateContext);

  const {
    getApplicationScripts,
    applicationScriptRenderOption,
    applicationScriptOptionLabel,
    scriptList
  } = useRunScript()

  const [showTransform, setShowTransform] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAliasOpen = event => {
    setAnchorEl(event.currentTarget)
  } 

  const handleAliasClose = event => {
    setAnchorEl(null)
  } 

  const handleEdit = React.useCallback(ID => {
    const script = scriptList.find(s => s.ID === ID)
    if (script) {
      EditCode(script.code, script.name)
    }
  }, [scriptList])

  const isGetRequest = method === 'GET' ||  method === 'DELETE';

  return <>

    <JsonModal json={resource} />
    <Typography sx={{pl: 1}} variant="caption"><b>Configure Resource</b></Typography>
    <Divider  sx={{mb: 2}}/>
    <Box sx={{...sx, width: 'calc(100% - 1rem)'}}>

    <Box sx={{mr: 1, ml: 1}}>

        <Grid container spacing={1}>  
          <Grid item xs={6}>
            <Text small>Name</Text>
            <TextField placeholder="Resource name" fullWidth onChange={handleChange('name')} value={name} size="small" />
          </Grid> 
          <Grid item xs={6}>
            <Text small>Path</Text>
            <TextField placeholder="Resource path" fullWidth onChange={handleChange('path')} value={path} size="small" />
          </Grid>

          <Grid item xs={4}  >     
            <Flex fullHeight sx={{mt: isGetRequest ? 0 : 0.5}}>
            <Text small>Method</Text>
              <QuickMenu caret label={method || 'Method'} onChange={handleChange('method')} options={['GET','POST','PUT','DELETE',]}
                  value={method}/>  
            </Flex>
          </Grid>
           
          {isGetRequest && <Grid item xs={7}>
              <Flex fullHeight>
                <Spacer />
                <Text small>Format</Text>
  
                <PillMenu options={['rest', 'querystring']} 
                onChange={handleChange('format')} value={format} /> 
             
              </Flex>
          </Grid> }

          <Grid item xs={isGetRequest ? 1 : 8}>
            <Flex fullHeight sx={{mt: isGetRequest ? 0 : 0.5}} >
              <Spacer />
              {method !== 'GET' && <>
              
                <TextBtn 
                  disabled={!dirty} 
                  variant="contained" 
                  size="small"
                  endIcon={<Save />}
                  onClick={resourceCommit} 
                  >Save</TextBtn>

                <TextBtn 
                  variant={!! answer ? "outlined" : "contained"}  
                  size="small"
                  endIcon={!!answer ? <Close /> : <Bolt />}
                  onClick={() => {
                    if(!!answer) {
                      return setAnswer(null)
                    }
                    onPreview(format)
                  }} 
                color="warning">{!!answer ? "Clear" : "Test"}</TextBtn>


              </>}
              <TinyButton icon={Settings} onClick={() => setShowTransform(!showTransform)} />
            </Flex>
          </Grid>
           
          <Grid item xs={12}>     
            <Collapse in={showTransform || !!transform}>
              <Divider sx={{mb: 1}} />
              <Flex  sx={{mb: 2}}>
                <Tiny icon={Code} /> 
                <Text active small>Transform {isGetRequest ? "incoming data" : "outgoing request"}</Text>
              </Flex>
               
               <Flex fullWidth >
                  

               <QuickSelect fullWidth
                label="Choose transform script"
                    value={transform}
                    options={scriptList} 
                    getOptionLabel={applicationScriptOptionLabel} 
                    renderOption={applicationScriptRenderOption}  
                    onChange={handleChange('transform')} 
                  />
                 
               
               <TinyButton icon={Edit} onClick={() => handleEdit(transform.ID)} />


               </Flex>
            </Collapse>
          </Grid>
        </Grid>

      </Box>
       

      <Flex sx={{pl: 1, pr: 1, mt: 2}}>


       {isGetRequest && <>
        <JsonModal json={values} />
        <Typography 
              variant="caption"><b>Values</b></Typography>
          <TextBtn onClick={handleAliasOpen}  endIcon={<Add />}>add</TextBtn>
        </>}


        <Spacer />

      {isGetRequest && <>
      
        <TextBtn 
          disabled={!dirty} 
          variant="contained" 
          size="small"
          endIcon={<Save />}
          onClick={resourceCommit} 
          >Save</TextBtn>

        <TextBtn 
          variant={!! answer ? "outlined" : "contained"}  
          size="small"
          endIcon={!!answer ? <Close /> : <Bolt />}
          onClick={() => {
            if(!!answer) {
              return setAnswer(null)
            }
            onPreview(format)
          }} 
        color="warning">{!!answer ? "Clear" : "Test"}</TextBtn>

      </>}


      </Flex>
{/* <pre>
[{JSON.stringify(terms,0,2)}]
</pre>
<pre>
[{JSON.stringify(values,0,2)}]
</pre> */}
      <Divider  sx={{mb: 2, mt: 1}}/>
{/* */}
      {isGetRequest && <Grid sx={{ml: 1}} container spacing={0}>
        
        <Grid item xs={2}>
        <JsonModal json={terms} />
          <Typography variant="caption"><b>Key</b></Typography>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="caption"><b>Value</b></Typography>
        </Grid>
 


        {isGetRequest && values?.map(prop => <>

          <Grid item xs={2}>
              <Flex fullHeight>

                <PopoverPrompt 
                  small
                  value={terms[prop.key] }
                  component={Text}
                  onChange={e => {
                    setTerms(s => ({...s, [prop.key]: e}));
                    setDirty(true)
                  }} 
                  label={<>Set value for "{prop.key}"</>} 
                >{prop.key}</PopoverPrompt>

              </Flex>
          </Grid>

          <Grid item xs={6}>
            <Flex fullHeight>
              <Text small active>
                  {terms[prop.key]} 
              </Text> 
            </Flex>  
          </Grid>

          <Grid item xs={1}>

          <DeleteConfirmMenu message={`Remove term "${prop.key}"?`} 
            onDelete={(e) => !!e && onTermDrop && onTermDrop(prop.key)}   /> 
          </Grid>

          <Grid item xs={3}>
            <PopoverPrompt 
              small
              value={  statePrefix + '_' + prop.key}
              component={TinyButton}
              icon={Add}
              onChange={e => {
                !!e && onStateChange(null, e, terms[prop.key],
                    isNaN(terms[prop.key]) ? 'string' : 'number'
                  )
                // alert (e)
              }} 
              label={<>Create a client variable for "{prop.key}"</>} 
             />

          </Grid>

        </>)}
      </Grid>}   

    </Box>
    
      <PopoverInput label="Add a query string value" 
        onChange={value => {
      if (!value) return handleAliasClose();   
      onTermAdd(value)
      handleAliasClose();
    }} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>

  </>
}

const ConnectionTree = ({ nodes, resource, onAddProp, indent = 0, path = []}) => {
  if (!nodes || !resource) {
    return <i />
  } 

  const dot = path.join('.');
  const fields = resource.columns;

    if (Array.isArray(nodes)) {
      return <>

      {/* <Text small onClick={() => {
        onAddProp(node, dot);
      }} sx={{ml: indent}} key={node}
      > <Check on={fields?.indexOf(node) > -1 || node === resource.node} /> {node} !!</Text> */}

      <ConnectionTree resource={resource} fields={fields} onAddProp={onAddProp}  
          path={path} nodes={nodes[0]} indent={indent} /> 
      <Divider />
    </>
    }




  return <>  
      {Object.keys(nodes).map(node => { 

        if (Array.isArray(nodes[node])) {
          return <>
            <Text small onClick={() => {
              onAddProp(node, dot);
            }} sx={{ml: indent}} key={node}
            > <Check on={fields?.indexOf(node) > -1 || node === resource.node} /> {node} !!</Text>
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
 
 
const ConnectionDrawer = () => {
 
  const [selected, setSelected] = React.useState({})
  const [selectedConnection, setSelectedConnection] = React.useState({})
  const [terms, setTerms] = React.useState({});
  const [dirty, setDirty] = React.useState(null)
  const [useClient, setUseClient] = React.useState(null)
  const [answer, setAnswer] = React.useState(null);

  const reactly = useReactly();

  const {  connectionID, path , method, transform, body, contentID } = selected;
 
  const { connectOpen: open, setDrawerState} = React.useContext(EditorStateContext); 
  const handleClose = () =>  setDrawerState((s) => ({ ...s, connectOpen: false }));
  
    const { 
      Alert, 
      setShowTrace,
      appContext,
      selectedPage
    } = React.useContext(AppStateContext);
    const {
      executeScript,
      getApplicationScripts 
    } = useRunScript()
    const appID = appContext.ID;
    const { resources = [], connections = [] } = appContext;
    const isGetRequest = method === 'GET';
  
  const previewConnectionRequest = async (format) => {
    const connection = connections.find(f => f.ID === connectionID);
    const url = new URL(path, connection.root);
    
    const slash = format === 'rest' ? '/' : '?'
    const qs = format === 'rest'
      ? Object.keys(terms).map(t => `${terms[t]}`).join('/')
      : Object.keys(terms).map(t => `${t}=${terms[t]}`).join('&');


    const requestOptions = isGetRequest ? null : {
      method,
      body,
      headers: { 'Content-Type': 'application/json' },
    }; 

    // return alert (JSON.stringify(requestOptions,0,2))

    const suffix = typeof qs === 'string' && !!qs?.length
      ? `${slash}${qs}`
      : ''


    const endpoint = isGetRequest ? `${url}${suffix}` : url;

    const response = await fetch(endpoint, requestOptions); 


    const json = await response.json();

    if (transform && method === 'GET') {
      const transformID = transform.ID || transform;
      const scriptList = getApplicationScripts()
      const script = scriptList?.find(f => f.ID === transformID);
 
      const res = await executeScript( script.ID, json )
 
      return setAnswer(res); 

    }

    if (!isGetRequest) {
      return setAnswer(json); 
      return Alert(<pre>
        {JSON.stringify(json,0,2)}
      </pre>)
    }

    setAnswer(json);
    
  }

  const addProp = (name, where) => {  
    setSelected(resource => ({
      ...resource,
      node: where,
      columns:  resource.columns?.indexOf(name) > -1 
      ? (resource.columns||[]).filter(e => e !== name)
      : (resource.columns||[]).concat(name) 
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
    reactly.setConnection(appID, selectedConnection);
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
    reactly.setResource(appID, committed)
    setDirty(false);
  }

  const handleAddQueryTerm = term => {
    // alert (term);
    const values =  (selected.values||[]).concat(term.split(',').map(key => ({ key })));
 //   return alert (JSON.stringify(values))
    setSelected(resource => ({
      ...resource,
      values
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

  const columnLabel = (node, col) => {
    if (!node) return col;
    return `${node}.${col}`
  }
  

 return (
  <OpenDrawer  open={open} anchor="bottom"> 
    <Layout data-testid="previewConnectionRequest-for-ConnectionDrawer">
      <Flex>
        <Typography variant="subtitle1">
          <b>Data Resources</b>
        </Typography>
         <TextBtn endIcon={<Add />} onClick={() => setSelectedConnectionByID('new')}>add</TextBtn>
        <Spacer />

        <DrawerNavigation selected="connectOpen" onClose={handleClose} horizontal /> 

      </Flex>
      <Divider />
     
    <Grid container>
      
      <Grid item xs={3} sx={{borderRight: 1, borderColor: 'divider'}}>
          <JsonModal json={connections} />
        <Typography sx={{pl: 1}} variant="caption">
          <b>Connections</b></Typography>
        <Divider  sx={{mb: 2}}/>
        <Box sx={{...sx}}>

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
                resourceDrop={reactly.onResourceDelete}
                connectionDrop={reactly.onConnectionDelete}
                dirty={dirty}
                {...connection} />)}

          
        </Box>
             
      </Grid>

      {!!selectedConnection?.name && <Grid item xs={3} sx={{borderRight: 1, borderColor: 'divider'}}>
          <ConnectionForm connection={selectedConnection} 
              dirty={dirty}
              connectionCommit={handleConnectionCommit}
              onChange={handleSelectedConnectionChange}/>
        </Grid>}

        {!!selected?.name && <Grid item xs={isGetRequest ? 4 : 3} sx={{borderRight: 1, borderColor: 'divider'}}>
          <ResourceForm 
          onStateChange={reactly.onStateChange}
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
          <Box sx={{...sx, pl: 2}}>
          <ConnectionTree 
            resource={selected}
            onAddProp={addProp} nodes={answer} />
          </Box>
        </Grid>}

        {!!selected.columns && isGetRequest && <Grid item xs={2} sx={{borderRight: 1, borderColor: 'divider'}}>
          <Typography sx={{pl: 1}} variant="caption"><b>Selected columns</b></Typography>
          <Divider  sx={{mb: 2}}/>
          <Box sx={{...sx, pl: 2}}>
            {selected.columns.map(col => <Text small key={col}>
              <Check on /> {columnLabel(selected.node, col)} 
              <Spacer />

          <DeleteConfirmMenu small message={`Remove column "${columnLabel(selected.node, col)}"?`} 
            onDelete={(e) => !!e &&  addProp(col, selected.node)}   /> 

              {/* <Tiny onClick={() => addProp(col, selected.node)} icon={Close} /> */}
            </Text>)}
          </Box>
        </Grid>} 

        {!isGetRequest && !!selected?.ID && <Grid item xs={3} 
            sx={{borderRight: 1, borderColor: 'divider'}}>
          <Typography sx={{pl: 1}} variant="caption"><b>Request Body</b></Typography>
          <Divider  sx={{mb: 2}}/>
          <Box sx={{...sx, pr: 2, pl: 2}}>
            <Flex onClick={() => setUseClient(!useClient)}>
              <Text small>
              Use client variable
              </Text>
              <Spacer />
              <Switch size="small" disabled={!!contentID} checked={useClient || !!contentID}/>
            </Flex>

            <Collapse in={useClient || !!contentID}>
            <StateComponentInput value={contentID} selectedPage={selectedPage}
              handleChange={(value) => handleSelectedResourceChange('contentID',  value)}
              header={<Text small>Choose JSON variable</Text>}/>

            </Collapse>


            <Collapse in={!contentID && !useClient}>
            <TextBox 
              fullWidth
              value={body}
              onChange={e => handleSelectedResourceChange('body', e.target.value)}
              multiline
              rows={15}
              placeholder="Type or paste request content"
              />
              </Collapse>




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
          <Box sx={{...sx, pl: 2}}>
            <ComponentEvents 
            onChange={(id, event) => {
              reactly.onEventChange(id, event, 'connection')
            }}
            onEventDelete={(componentID, eventID) => {
              reactly.onEventDelete(componentID, eventID, 'connection')
            }}
            application={appContext}
            selectedPage={selectedPage}
            component={selected}
            addedEvents={Events}
            connections={connections}
            resources={resources}

            />

 
          </Box>
        </Grid>} 

    </Grid>



   </Layout>
   </OpenDrawer>
 );
}
ConnectionDrawer.defaultProps = {};
export default ConnectionDrawer;
