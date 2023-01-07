import React from "react";
import { 
  FormControlLabel, 
  Switch, ToggleButtonGroup, ToggleButton,
  Box, 
  Button, 
  Card, 
  TextField, 
  Stack,
  Typography,
  IconButton, 
  Chip,
  InputAdornment,  
  Popover,
  styled } from "@mui/material";
  import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { ExpandMore, Search, Save, Close } from "@mui/icons-material";
import { AppStateContext } from '../../context';
import { Icons } from '../library/icons'; 
 
export const AU = styled('span')(({ theme, active, error, small, hover }) => ({
  cursor: 'pointer',
  fontWeight: active ? 600 : 400,
  fontSize: small ? '0.85rem' : '1rem',
  // fontStyle: 'italic',
  // color: error ? theme.palette.error.main : '#222', 
  '&:hover': {
    textDecoration: 'underlined',
    color: hover || theme.palette.primary.dark
  }
})) 


export const PopoverPrompt = ({ 
    label, 
    value, 
    onChange, 
    helperText,
    component: Component = TextBtn, 
    saveIcon = Save,
    children, 
    ...props 
  }) => { 
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleAliasOpen = event => {
    setAnchorEl(event.currentTarget)
  } 

  const handleAliasClose = event => {
    setAnchorEl(null)
  }  

  return  <>
  

  <Tooltag title={label} component={Component} onClick={handleAliasOpen} {...props}>{children}</Tooltag>

  <PopoverInput label={label} value={value}
  helperText={helperText}
  saveIcon={saveIcon}
    onChange={text => {
      if (!text) return handleAliasClose();  
      onChange && onChange(text)
      handleAliasClose();
    }} anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>

  
  </>
}


export const PopoverTextBox = ({ 
      label, 
      saveIcon: SaveIcon = Save, 
      value, 
      onChange, 
      helperText, 
      disabled,
      handlePopoverClose, 
      ...props 
    
    }) => {
  const [typedVal, setTypedVal] = React.useState(value);
  const handleChange = () => {
    !!typedVal && onChange && onChange(typedVal);
    handlePopoverClose()
  }
  return <Stack sx={{p: 2, minWidth: 300}} {...props} spacing={1}>
    <Typography>{label}</Typography>
    <TextField disabled={disabled} label={label} size="small" value={typedVal} onChange={ (e) => { 
      setTypedVal(e.target.value) 
    } } autoComplete="off" autoFocus 
    helperText={helperText}
    onKeyUp={e => e.keyCode === 13 && handleChange()}/>
    <Flex> 
    <Spacer />
    <TinyButton icon={Close} onClick={handlePopoverClose} />
    <TinyButton icon={SaveIcon} onClick={handleChange}/>
  </Flex>
</Stack>
}


export const PopoverInput = ( { 
    label, 
    value, 
    onChange, 
    anchorEl, 
    setAnchorEl, 
    children ,
    helperText,
    saveIcon = Save
  } ) => {  

  const open = Boolean(anchorEl);
 

  const handlePopoverClose = () => { 
    onChange(false);
  };

  return <Popover 
      open={open}
      anchorEl={anchorEl}
      onClose={handlePopoverClose} 
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      {children || <PopoverTextBox 
        label={label}
        value={value}
        saveIcon={saveIcon}
        helperText={helperText}
        handlePopoverClose={handlePopoverClose}
        onChange={value => {
          onChange && onChange(value)
        }}
      />}
    </Popover>
}



export const OptionSwitch = ({ options = [], value, onChange }) => {

  const [checked, setChecked] = React.useState(options[0] === value)

  return  <ToggleButtonGroup exclusive value={checked ? options[0] : options[1]}
  color="primary" 
  onChange={(e, n) => {
    setChecked(options[0] === n);
    onChange(n)
  }} size="small">
  <ToggleButton value={ options[0]}>
 { options[0]}
  </ToggleButton>
  <ToggleButton value={options[1]}>
    {options[1]}
  </ToggleButton>
</ToggleButtonGroup>  



 
}


// export const Tiny = (props) => {
//   console.log ('tiny', { props })
//   return  <>t</>
// }


export const Tiny = ({icon: Icon, hidden, ...props}) => {
  let Smiley = Icon;
  if (!Icon) {
    return <>?</>
  }
  if (typeof Icon === 'string') {
    Smiley = Icons[Icon];
    if (!Smiley) {
      return <>{Icon}</>
    }
  }
  return <Smiley {...props} 
  sx={{m: 0, width: 16, height: 16, ...props.sx,
    opacity: hidden ? 0 : 1,
    transition: 'opacity 0.1s linear'}} />
}
  

export const Flex = styled(Box)(({ theme, maxWidth, nowrap, baseline, fullWidth, fullHeight, direction="row", 
wrap, spacing = 1 }) => {
  const obj = {
    display: "flex",
    height: fullHeight ? "100%" : '',
    width: fullWidth ? '100%' : 'inherit',
    alignItems: baseline ? "baseline" : "center",
    flexDirection: direction,
    gap: theme.spacing(spacing),
    whiteSpace: nowrap ? 'nowrap' : 'inherit',
    flexWrap: wrap ? "wrap" : "nowrap",
   };

   if (maxWidth) {
    Object.assign(obj, {
      width: maxWidth,
      maxWidth,
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    })
   }

   return obj;
});
 
export const Pane = styled(Card)(({ collapsed, theme }) => ({
 width: collapsed ? `calc(25% - 8px)` : `calc(100% - ${theme.spacing(8)})`,
 padding: theme.spacing(1),
 transition: "width 0.3s ease-in",
}));


const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

 
export const Tooltag = ({
 component: Component,
 title,
 children,
 ...props
}) => { 
  return (
    <HtmlTooltip placement="left-start" arrow title={title}> 

      <Component {...props}>
       {children}</Component>
 
    </HtmlTooltip>
   )
};
 
export const Spacer = styled(Box)(() => ({
 flexGrow: 1,
}));
 
export const TextBtn = styled(Button)(({ theme }) => ({
 textTransform: "capitalize",
 whiteSpace: "nowrap",
 borderRadius: '1rem',
 padding: theme.spacing(0.5, 2),
 boxShadow: 'none'
}));
 
export const UL = styled("ul")(({ theme, margin, collapsed }) => ({
 padding: 0,
 margin: margin ? theme.spacing(4) : 0,
 // marginBottom: theme.spacing(6),
 listStyle: "none",
 width: `calc(100% - ${margin ? theme.spacing(8) : 0})`,
 "& li": {
   display: "flex",
   alignItems: "center",
   float: collapsed ? "left" : "none",
   width: collapsed ? `calc(25% - 8px)` : "100%",
 },
}));
 
 
 
export const Arrow = styled(ExpandMore)(({ on }) => ({
 transform: on ? "rotate(450deg)" : "rotate(270deg)",
 transition: "transform 0.3s ease-in",
}));
 
/**
* * exposes clipboard copy method to components
* @returns copy method and copied state
*/
export function useClipboard() {
 const [copied, setCopied] = React.useState(false);
 const copy = (datum) => {
   navigator.clipboard
     // * save data to clipboard
     .writeText(datum)
     .then(() => {
       // * add clipboard data to copied state
       setCopied(datum);
       // * clear copied state after pause for various coolness
       setTimeout(() => setCopied(false), 299);
     })
     .catch(console.warn);
 };
 // return method and state
 return { copy, copied };
}

export const RotateButton = styled(IconButton)(({ deg = 0 }) => ({
  transition: 'transform 0.125s linear', 
  transform: `rotate(${deg}deg)`
}));

export const RotateExpand = styled(ExpandMore)(({ deg = 0 }) => ({
  transition: 'transform 0.125s linear', 
  transform: `rotate(${deg}deg)`
}));

const ChipWord = ({label, onDelete, ...props}) => {
  const regex = /\{([^}]+)\}/g;
  const chipped = regex.exec(label);
  if (chipped) {
    return <Chip size="small" {...props} label={chipped[1]} 
    variant="outlined"
      deleteIcon={<Close />} 
      onDelete={() => onDelete(label)}
      onClick={() => onDelete(label)}
      />
  }
  return <Box {...props}>{label}</Box>
}


export const ChipBox = ({onChange, value = '', ...props})  => {
  const ref = React.useRef(null)
  const [content, setContent] = React.useState(value);
  const [chips, setChips] = React.useState(true)

  const deleteWord = (word) => {
    const trimmed = content.replace(word, '');
    setContent(trimmed);
    onChange && onChange({ target: { value: trimmed }});
  } 
  

  const startAdornment = !chips || typeof content !== 'string' ? null : <InputAdornment position="start">
    {content?.split(' ').map(word => <ChipWord 
      onClick={() => {
        setChips(false);
        !!ref.current && ref.current.focus()
      }}
      onDelete={deleteWord} label={word} sx={{mr: 1}}>[{word}]</ChipWord>)}
  </InputAdornment>


  const handleChange = event => {
    setContent(event.target.value);
    onChange && onChange(event)
  }

  const { buttons, ...rest } = props;

  return <TextInput
    autoFocus={!chips}
    size="small"
    {...rest} 
    onFocus={() => setChips(false)}
    onBlur={() => setChips(true)}
    value={chips ? '' : content}
    label={chips ? '' : props.label}
    placeholder=""
    InputProps={{startAdornment}}
    onChange={handleChange}
    sx={{maxWidth: 400, overflow: 'hidden'}}
  />
}

export const SearchBox = ({value, onChange, onClose, startIcon = true, ...props}) => {
  const startAdornment = !startIcon ? null  : <InputAdornment position="start">
    <IconButton size="small">
      <Tiny icon={Search} />
    </IconButton>
  </InputAdornment>

  const adornment = !value?.length ? {startAdornment} : {
    startAdornment,
    endAdornment: <InputAdornment position="end">
      <IconButton size="small" onClick={onClose}>
        <Close />
      </IconButton>
    </InputAdornment>,
  }

  return  <TextInput size="small" {...props} sx={{mr: 1, ...props.sx}} value={value} autoComplete="off" onChange={onChange} 
  InputProps={adornment} autoFocus/>
};


export const Area = styled(Card)(({ theme, breadcrumbs, pinned = false }) => ({
  height: `calc(100vh - ${breadcrumbs ? 212 : 182}px)`,
  backgroundColor: '#f5f5f5 ', 
  position: 'absolute',
  top: breadcrumbs ? 94 : 64,
  left: pinned ? 340 : 0,
  width: !pinned ? 'calc(100vw - 96px)' : 'calc(100vw - 436px)',
  transition: 'left 0.1s linear', 
  margin: theme.spacing(0, 2),
  padding: theme.spacing(1, 4, 10, 4),
  borderRadius: 8,
  overflow: 'auto'
}));


export const TextBox = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(1), 
  marginBottom: theme.spacing(1),
  '& .MuiInputBase-input': {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    fontFamily: 'Courier'
  }
}));

export const TinyButton = ({icon: Icon, ...props}) => <RotateButton {...props}  sx={{ ...props.sx, width: 18, height: 18}}>
  <Icon sx={{width: 16, height: 16}} />
</RotateButton>

export const TextInput = ({ sx, prompt, buttons, ...props }) => {
  if (prompt) {
    return <PopoverPrompt

      {...props}
      component={Text}
      label={props.label}
      onChange={value => !!value && props.onChange({ target: { value }})}

      >
        <Flex maxWidth={300} nowrap
        sx={{ 
          '&:hover': {
            textDecoration: 'underline',
            borderRadius: 0.25,
            outline: 'solid 1px',
            outlineColor: '#bdbdbd', 
            outlineOffset: 4,
          } }}
        >{!!props.value ? <u>{props.value}</u> :  (props.label||props.placeholder)}</Flex>
      </PopoverPrompt>
  }

  const adornment = !buttons 
    ? null  
    :  { endAdornment: <InputAdornment position="end">{buttons}</InputAdornment> }

  return  <TextField {...props} InputProps={adornment} sx={{ ...props.sx, fontSize: '0.85rem' }}/> 
}
 
export const Text = styled(Box)(({ theme, hover, active, small, error, link, fullWidth, muted, spacing = 1 }) => ({
  display: 'flex',
  color:muted 
    ? theme.palette.grey[600]
    : ( error 
      ? theme.palette.error.main 
      : (link 
          ? theme.palette.primary.main 
          : theme.palette.black
          )),
  textDecoration: link ? 'underline' : 'none',
  gap: theme.spacing(spacing) ,
  alignItems: 'center',
  // borderBottom: small || error ? '' : 'solid 1px gray',
  fontSize: small ? '0.85rem' : '1rem',
  maxWidth: fullWidth ? '100%' : 400,
  padding: theme.spacing(0.5, 0),
  fontWeight: active ? 600 : 400,
  cursor: 'pointer', 
  '&:hover': {
    textDecoration: hover ? 'underline' : 'none',
  }
}));
