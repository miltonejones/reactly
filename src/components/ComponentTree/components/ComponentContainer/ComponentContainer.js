import React from 'react';
import { styled, Box, Card } from '@mui/material';
import { Flex, Text, DeleteConfirmMenu, TinyButton } from '../../..';
import { Edit, Close } from "@mui/icons-material"; 
import { ComponentQuickMenu } from '../../../ContentTree/ContentTree';
import { useReactly } from "../../../../hooks";
import { AppStateContext } from "../../../../context"; 
 
const Layout = styled(Box)(({ theme, active }) => ({ 
  position:  'relative',  
  '--editor-opacity':  active ? 1 : 0,
  '&:hover': {
    '--editor-opacity':  1,
  }, 
}));
 
const Tip = styled(Card)(({ theme, active , menu, offset}) => ({  
  position:  'absolute', 
  padding: theme.spacing(1),
  [offset]: theme.spacing(-5), 
  left: theme.spacing(1),  
  cursor: 'pointer',
  opacity: 'var(--editor-opacity)',
  color: theme.palette.common.white,
  backgroundColor: theme.palette[active ? 'error' : 'primary'][menu ? 'light' : 'main'],
  zIndex: 3
}));
 
const ComponentContainer = ({  name, ...props}) => {
  const reactly = useReactly();
  const ref = React.useRef(null);
  const [is, setIs] = React.useState(false); 
  const [h, setH] = React.useState('top'); 

  const { selectedPage } = React.useContext(AppStateContext);


  React.useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setH(rect.bottom > 300 ? 'top' : 'bottom') 
    } 

  }, [ref])
  const { children, setQueryState, on, ...selectedComponent } = props;
  const { ComponentType, pageID, ID } = selectedComponent;
 
  if (ComponentType === 'Spacer' || selectedPage?.ID !== pageID) return children;
  
const handleClick = () => {
  setQueryState(s => ({...s, selectedComponent: on ? null : selectedComponent}));
}
 return (
  <Layout ref={ref} active={is}>
  <Tip active={on} menu={is} elevation={7} offset={h}><Flex
    >

      <TinyButton onClick={handleClick}  sx={{color: 'inherit'}} icon={on ? Close : Edit}  />

     
      
      <Text onClick={handleClick} active small>{name}  </Text>

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
