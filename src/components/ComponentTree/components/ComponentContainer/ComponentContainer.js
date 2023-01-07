import React from 'react';
import { styled, Box, Card } from '@mui/material';
import { Flex, Text, DeleteConfirmMenu, PopoverPrompt, TinyButton } from '../../..';
import { Edit, Close } from "@mui/icons-material"; 
import { ComponentQuickMenu } from '../../../ContentTree/ContentTree';
import { useReactly } from "../../../../hooks";
import { AppStateContext } from "../../../../context"; 
 
const Layout = styled(Box)(({ theme, active, hilit }) => ({ 
  outline: hilit ? `dotted 1px ${theme.palette.grey[600]}` : 'none',
  position:  'relative',   
  '--editor-opacity':  active ? 1 : 0, 
}));
 
const Tip = styled(Card)(({ theme, active , menu, offset}) => ({  
  position:  'absolute', 
  gap: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  [offset.vertical]: theme.spacing(-4), 
  [offset.horizontal]: theme.spacing(2),  
  transition: 'all 0.2s linear',
  cursor: 'pointer',
  opacity: 'var(--editor-opacity)',
  color: theme.palette.common.white,
  backgroundColor: theme.palette[active ? 'secondary' : 'warning'][menu ? 'light' : 'main'],
  zIndex: 3
}));
 
const ComponentContainer = ({  name, ...props}) => {
  const reactly = useReactly();
  const ref = React.useRef(null);
  const [selected, setActive] = React.useState(false); 
  const [offset, setOffset] = React.useState({
    vertical: 'top',
    horizontal: 'left'
  }); 
 
  const { selectedPage, preview, setQueryState, queryState } = React.useContext(AppStateContext);
  const { children, on, ...component } = props;
  const { ComponentType, pageID, ID } = component; 

  const suppressContainer = !preview || ComponentType === 'Spacer' || selectedPage?.ID !== pageID;

  const setContainerPosition = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect(); 
      setOffset({
        vertical: rect.bottom > 300 ? 'top' : 'bottom',
        horizontal: rect.left < 1500 ? 'left' : 'right'
      }) ;
    } 
  }
 
  const handleMouseEnter = () => {
    setContainerPosition();
    setQueryState(state => ({
      ...state,
      selectedContainer: ID
    })); 
  }

  const handleMouseLeave = () => {
    setQueryState(state => ({
      ...state,
      selectedContainer: null
    }));
  } 
  
  const handleClick = () => {
    setQueryState(s => ({...s, selectedComponent: on ? null : component}));
  }

  if (suppressContainer) return children;

 return (
  <Layout 
    ref={ref} 
    hilit={queryState.selectedContainer === ID }
    active={selected || queryState.selectedContainer === ID || on} 
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave} 
  >
    <Tip active={on} menu={selected} elevation={7} offset={offset}>
      
      <TinyButton onClick={handleClick} sx={{color: 'inherit'}} icon={on ? Close : Edit}  /> 
      
      <Text onClick={handleClick} active small>{ComponentType}:   </Text>

      <PopoverPrompt 
          onChange={value => !!value && reactly.onNameChange(component.ID, name, value)} 
          component={Text} 
          hover
          active 
          small 
          value={name} 
          label={`Enter a new name for "${name}"`} 
        >
        {name}
      </PopoverPrompt>

      <DeleteConfirmMenu  
        onOpen={() => setActive(1)} 
        onClose={() => setActive(0)} 
        hover="inherit" 
        message={`Delete component ${name}?`} 
        onDelete={(value) => {
          setActive(0);
          !!value && reactly.onDropComponent(ID, 1)
        }}
      />

      <ComponentQuickMenu 
        onOpen={() => setActive(1)} 
        onClose={() => setActive(0)} 
        component={component} 
      />
  
    </Tip>

   { children }
 </Layout>
 );
}

ComponentContainer.defaultProps = {};
export default ComponentContainer;
