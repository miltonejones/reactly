import React from 'react'; 
import { Box, Alert } from '@mui/material';  
import { Speaker } from "@mui/icons-material";
import ReactlyComponent from '../reactly';
import { GenericStyles } from '../styles'; 
import { getStyles, getSettings } from '../util';
import { PageStateContext } from '../../../hooks/usePageContext';

 
const ReactlyAudioComponent = ({
  settings,
  styles, 
  ...props

}) => { 
  const { pageRefState, setPageRefState, } = React.useContext(PageStateContext);
    const ref = React.useRef(null)

    const args = getSettings(settings); 
    const style = getStyles(styles) ; 

    const properties = {};
   
    React.useEffect(() => {
      if(pageRefState[props.ID] || !ref.current) {
        return;
      }
      setPageRefState({
        ...pageRefState,
        [props.ID]: ref.current
      })
    }, [])
  
  return (
   <Box   > 
    <audio {...args} src={props.src || args.src} ref={ref}> 
    </audio>
        {/* <pre>{JSON.stringify(args,0,2)}</pre>
       <pre>{JSON.stringify(props,0,2)}</pre> */}
   </Box> 
  );
}


const Settings = {
  categories: [ 
    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Media URL',
          label: 'src' ,
          bindable: !0, 
        },  
        {
          title: 'Auto Play',
          label: 'autoplay',
          type: 'boolean' 
        },  
        {
          title: 'Controls',
          label: 'controls',
          type: 'boolean' 
        },  
      ]
    }, 

   ]
}
 


const ReactlyAudio = {
  Icon: Speaker,
  Component: ReactlyAudioComponent ,
  Settings, 
  Defaults: { 
  }
}
 
ReactlyAudio.defaultProps = {};
export default ReactlyAudio;
