import React from 'react';
import { styled, Box, Card } from '@mui/material';
import { Flex, Text, DeleteConfirmMenu, TinyButton } from '../../..';
import { Edit, Close } from "@mui/icons-material"; 
import { ComponentQuickMenu } from '../../../ContentTree/ContentTree';
import { useReactly } from "../../../../hooks";
import { AppStateContext } from "../../../../context"; 
 
const Layout = styled(Box)(({ theme, active, hilit }) => ({ 
  outline: hilit ? `dotted 1px ${theme.palette.grey[600]}` : 'none',
  position:  'relative',  
  // width: 'fit-content',
  '--editor-opacity':  active ? 1 : 0,
  // '&:hover': {
  //   '--editor-opacity':  1,
  // }, 
}));
 
const Tip = styled(Card)(({ theme, active , menu, offset}) => ({  
  position:  'absolute', 
  padding: theme.spacing(1),
  [offset.vertical]: theme.spacing(-4), 
  [offset.horizontal]: theme.spacing(2),  
  cursor: 'pointer',
  opacity: 'var(--editor-opacity)',
  color: theme.palette.common.white,
  backgroundColor: theme.palette[active ? 'secondary' : 'warning'][menu ? 'light' : 'main'],
  zIndex: 3
}));
 
const ComponentContainer = ({  name, ...props}) => {
  const reactly = useReactly();
  const ref = React.useRef(null);
  const [is, setIs] = React.useState(false); 
  const [offset, setOffset] = React.useState({
    vertical: 'top',
    horizontal: 'left'
  }); 
 

  const { selectedPage, preview, setQueryState, queryState } = React.useContext(AppStateContext);
  const { children, on, ...selectedComponent } = props;
  const { ComponentType, pageID, ID } = selectedComponent;
  // const { selectedContainer } = queryState;
 

  const handleMouseEnter = () => {
    setQueryState(state => ({
      ...state,
      selectedContainer: ID
    }));

    if (ref.current) {
      const rect = ref.current.getBoundingClientRect(); 
      setOffset({
        vertical: rect.bottom > 300 ? 'top' : 'bottom',
        horizontal: rect.left < 1500 ? 'left' : 'right'
      }) 
    } 

  }

  const handleMouseLeave = () => {
    setQueryState(state => ({
      ...state,
      selectedContainer: null
    }))
  }
 
  if (!preview || ComponentType === 'Spacer' || selectedPage?.ID !== pageID) return children;
  
const handleClick = () => {
  setQueryState(s => ({...s, selectedComponent: on ? null : selectedComponent}));
}
 return (
  <Layout ref={ref} 
    hilit={queryState.selectedContainer === ID }
    active={is || queryState.selectedContainer === ID || on} 
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    
    >
  <Tip active={on} menu={is} elevation={7} offset={offset}><Flex
    >

      <TinyButton onClick={handleClick}  sx={{color: 'inherit'}} icon={on ? Close : Edit}  /> 
      
      <Text onClick={handleClick} active small>{ComponentType}: {name}  </Text>

      <DeleteConfirmMenu  onOpen={() => setIs(1)} onClose={() => setIs(0)} hover="inherit" message={`Delete component ${name}?`} 
           onDelete={(value) => {
            setIs(0);
            !!value && reactly.onDropComponent(ID, 1)
          }}
              />


      <ComponentQuickMenu onOpen={() => setIs(1)} onClose={() => setIs(0)} component={selectedComponent} />
    </Flex></Tip>
   { children }
 </Layout>
 );
}
ComponentContainer.defaultProps = {};
export default ComponentContainer;
