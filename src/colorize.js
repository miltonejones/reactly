import React from "react";
import { Text, TinyButton, TabButton } from './components';
import { Collapse, Tabs, Divider, Box } from '@mui/material';
import {
  Add, Remove , RadioButtonUnchecked
} from "@mui/icons-material";

const Icon = ({ on }) => <TinyButton icon={on ? Remove : Add}  deg={!on ? 0 : 180} />

function syntaxHighlight(json, css) {
  if (typeof json != 'string') {
       json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      var cls = 'number';
      if (/^"/.test(match)) {
          if (/:$/.test(match)) {
              cls = 'key';
          } else {
              cls = 'string';
          }
      } else if (/true|false/.test(match)) {
          cls = 'boolean';
      } else if (/null/.test(match)) {
          cls = 'null';
      }
      return '<span class="' + cls + '">' + match + '</span>';
  }).replace(css ? /"/g : '', '');
}

const JsonView = ({ json }) => {
  const [index, setIndex] = React.useState(0);
  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };
  return <>
        <Tabs onChange={handleChange} value={index} sx={{minHeight: 24, mt: 1, ml: 1, width: '90vw' }}   >
        <TabButton label="Tree View"/>
        <TabButton label="Raw JSON" /> 
      </Tabs>
    <Box sx={{mt: 2}}>
      {index === 0 && <JsonTree json={json} />}
      {index === 1 && <Json>{JSON.stringify(json,0,2)}</Json>}
    </Box>
      
  </>
}

const JsonTree = ( { json, indent = 0 }) => {
  const [expanded, setExpanded] = React.useState([])
  const expand = name => {
    setExpanded(d => d.indexOf(name) > -1 
        ? d.filter(f =>  f !== name)
        : d.concat(name))
  }

  if (json.constructor === Array) {
    return <>what now??</>
  }


  return <> 
    {Object.keys(json).map(node => {
       if (Array.isArray(json[node])) {
        return <>
          <Text onClick={() => expand(node)} sx={{ml:  indent}} small key={node}
            ><Icon on={expanded.indexOf(node) > -1} /><b>{node}</b></Text>
          {json[node].map(child => <Collapse in={expanded.indexOf(node) > -1}>
            <JsonTree json={child} indent={indent + 3} />
          </Collapse>)}

          <Divider />
        </>
       } 
      return <Text small sx={{ml:  indent}} key={node}
      ><TinyButton icon={RadioButtonUnchecked} /> {node}: {JSON.stringify(json[node])}</Text>
    })}
  </>
}  

const Json = ({ children, css }) =>  <pre>
  <div
  dangerouslySetInnerHTML={{__html: syntaxHighlight(children, css)}}
/>
</pre>

export {
  syntaxHighlight,
  JsonView,
  JsonTree,
  Json
}