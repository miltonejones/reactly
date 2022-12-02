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
  const { onPlayerStart, onPlayerStop, onProgress, onPlayerPaused, onPlayerEnded  } = props;
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
      });

      ref.current.addEventListener('play', () => {
        // alert ('Firing play')
        onPlayerStart && onPlayerStart (ref.current)
      })

      ref.current.addEventListener('ended', () => {
        // alert ('Firing end')
        onPlayerEnded && onPlayerEnded (ref.current, {
          ...args
        })
      })

      ref.current.addEventListener('pause', () => {
        onPlayerStop && onPlayerStop (ref.current)
      })

      ref.current.addEventListener('timeupdate', () => {
        onProgress && onProgress (ref.current, {
          currentTime: ref.current.currentTime,
          duration: ref.current.duration,
          progress: ref.current.currentTime / ref.current.duration
        })
      })

      
    }, [])
  
  return (
   <Box sx={{width: 'fit-content'}} {...props} > 
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
 

const Events =  [
  {
    name: 'onPlayerStart',
    title: 'Audio Starts playing',
    description: 'Audio player playing event fires.'
  }, 
  {
    name: 'onPlayerStop',
    title: 'Audio Stops playing',
    description: 'Audio stop playing event fires.'
  }, 
  {
    name: 'onPlayerEnded',
    title: 'Audio track ended',
    description: 'Audio player track reaches its end.'
  }, 
  {
    name: 'onPlayerPaused',
    title: 'Audio track paused',
    description: 'Audio player track is paused.'
  }, 
  {
    name: 'onProgress',
    title: 'Audio position changes',
    description: 'Audio player track position changes.'
  }, 
]


const ReactlyAudio = {
  Icon: Speaker,
  Component: ReactlyAudioComponent ,
  Settings, 
  Events,
  Defaults: { 
  }
}
 
ReactlyAudio.defaultProps = {};
export default ReactlyAudio;
