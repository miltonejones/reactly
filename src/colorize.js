import React from "react";
import { SketchPicker } from 'react-color';
import { Text, TinyButton, TabButton, Flex } from './components';
import { Collapse, Tabs, Divider, Box, Link, Popover } from '@mui/material';
import {
  Add, Remove , RadioButtonUnchecked
} from "@mui/icons-material";
import { TextInput } from "./components";

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


const isColor = (hue) => !!hue && typeof hue === 'string' && !!hue?.length  &&
(hue?.toString().indexOf('#') > -1 || hue?.toString().indexOf('rgb') > -1)

const JsonLink = ({ edit, children: innerText, value, path, onOpen}) => {
  if (!edit) {
    return innerText;
  }
  return <>
  {isColor(value) && <Box onClick={(e) => onOpen(e, value, path)} sx={{width: 12, height: 12, 
    border: 1, borderColor: 'divider',
    backgroundColor: value}}></Box>}
  <Link onClick={(e) => onOpen(e, value, path)}>{innerText}</Link>
  </>
}

const JsonTree = ({onChange, ...props}) => {

  const [hue, setHue] = React.useState('')
  const [dots, setDots] = React.useState(null)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handlePopoverClick = (event, value, path) => { 
    setDots (path.join('.'))
     if (typeof value === 'string' || typeof value === 'number') setHue(value)
     else setHue(null)
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null); 
  };

  const handleChange = (color) => {
    setHue(color)
    // alert(dots)
    onChange && onChange(dots, color);
  }

  const isColor = !!hue && typeof hue === 'string' && !!hue?.length  &&
      (hue?.toString().indexOf('#') > -1 || hue?.toString().indexOf('rgb') > -1)
 
  return <>
  {/* {dots}
  {onChange?.toString()} */}
  <JsonTreeBody {...props} 
      handlePopoverClick={handlePopoverClick}/>

  <Popover 
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose} 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
   <Box sx={{p: 2}}>
   <Box><Text small> <b>{dots}</b> </Text></Box>
     {isColor ? <SketchPicker
    onChange={e => handleChange(e.hex)} 
    color={ hue } 
     /> : 
      <TextInput size="small" autoComplete="off" value={hue} 
            onChange={e => handleChange(e.target.value )} />
    }
  </Box>
    </Popover>
  
  </>
}

const JsonTreeBody = ( { path = [], edit, json, label, indent = 0, handlePopoverClick }) => {


  const [expanded, setExpanded] = React.useState([])
  const expand = name => {
    setExpanded(d => d.indexOf(name) > -1 
        ? d.filter(f =>  f !== name)
        : d.concat(name))
  }
 
  if (typeof json === 'string' || typeof json === 'number') {
    return <Flex nowrap>

<Text small sx={{ml:  indent}}  
    ><TinyButton icon={RadioButtonUnchecked} 
    /><JsonLink onOpen={handlePopoverClick} path={path} value={json} edit={edit}>{label}</JsonLink> : {json}
    </Text>
    </Flex>
  }

  return <> 

    {!(typeof json === 'string' || typeof json === 'number') && !!json && Object.keys(json).map(node => {
       if (Array.isArray(json[node])) {
        return <>
          <Text onClick={() => expand(node)} sx={{ml:  indent}} small key={node}
            ><Icon on={expanded.indexOf(node) > -1} /><b>{node}</b></Text>
          {json[node].map(child => <Collapse in={expanded.indexOf(node) > -1}>
            <JsonTreeBody 
              handlePopoverClick={handlePopoverClick} 
              edit={edit} 
              json={child} 
              indent={indent + 3} 
              path={path.concat(node)}
              />
          </Collapse>)}

          <Divider />
        </>
       } 
       if (typeof (json[node]) === 'object') {
        return <>
        <Text onClick={() => expand(node)} sx={{ml:  indent}} small key={node}
          ><Icon on={expanded.indexOf(node) > -1} /><b>{node}</b></Text> 
          {!!json[node] && Object.keys(json[node]).map(child => <Collapse in={expanded.indexOf(node) > -1}>
            <JsonTreeBody handlePopoverClick={handlePopoverClick}
              path={path.concat([node, child])} 
              edit={edit} json={json[node][child]} label={child} indent={indent + 3} />
          </Collapse>)} 
          <Divider />
        </>
       } 
       if (typeof (json[node]) === 'function') return <i />
      return <Flex nowrap>
        <Text small sx={{ml:  indent}} key={node}
      ><TinyButton icon={RadioButtonUnchecked} /> <JsonLink 
          path={path.concat(node)} onOpen={handlePopoverClick} value={json[node]} edit={edit}>{node}</JsonLink>: {json[node]} 
      </Text>
      </Flex>
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