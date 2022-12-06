import React from 'react'; 
import { Box, Alert } from '@mui/material';  
import { Speaker } from "@mui/icons-material";
import ReactlyComponent from '../reactly';
import { GenericStyles } from '../styles'; 
import { getStyles, getSettings } from '../util';
import { PageStateContext } from '../../../hooks/usePageContext';
import { usePageResourceState } from '../../../hooks/usePageResourceState';
import { AppStateContext } from '../../../hooks/AppStateContext';

 
const ReactlyAudioComponent = ({
  settings,
  styles, 
  ...props

}) => { 
  const [boundRows, setBoundRows] = React.useState([])
  const [index, setIndex] = React.useState([])
  const { pageRefState, setPageRefState, pageClientState, pageResourceState,
      getPageClientState , setPageClientState } = React.useContext(PageStateContext);
  
  const { onPlayerStart, onPlayerStop, onProgress, onPlayerPaused, onPlayerEnded  } = props;
    const ref = React.useRef(null);
    const [listeners, setListeners] = React.useState([])

    const args = getSettings(settings); 
    const style = getStyles(styles) ; 
 

    const properties = {};



    const  {
      bindingObject,
      resource,
      dataRows
    } = usePageResourceState(settings);

   

    // const musicRows = !dataRows ? [] : dataRows.map(f => `${args.url}/${Object.values(f)[0]}`);
    let src = props.src || args.src;
    // if (boundRows.length) {
    //   src = boundRows[props.selectedIndex]
    // }
    
    const playNext = ((selectedIndex) => () => { 
      const setting = props.boundProps?.find(f => f.attribute === 'selectedIndex');
      const s = getPageClientState();
      return alert (JSON.stringify(s)) 
 
      const nextIndex = props.selectedIndex - (-1);
      if (!setting) return;
      alert(nextIndex)
      setPageClientState(state => ({
        ...state,
        [setting.boundTo]: nextIndex
      }));
      setTimeout(() => ref.current.play(), 888);

    })(props.selectedIndex);



    React.useEffect(() => {


      // const rows = !dataRows ? [] : dataRows.map(f => `${args.url}/${Object.values(f)[0]}`);
      // let src = props.src || args.src;
      // if (rows.length && !boundRows.length) {
      //   setBoundRows(rows)
      // }
      // setIndex(props.selectedIndex)
      
      if(pageRefState[props.ID] || !ref.current) {
        return ; //console.log ({message: 'Not rendering ' + props.ID});
      }

      setPageRefState({
        ...pageRefState,
        [props.ID]: ref.current
      });

      const handlePlay =  () => {
        // alert ('Firing play')
        onPlayerStart && onPlayerStart (ref.current)
      };
      const handleEnd = () => {
        // alert ('Firing end')
        onPlayerEnded && onPlayerEnded (ref.current, {
          ...args, 
        })
        // playNext();
      };
      const handlePause = () => {
        onPlayerStop && onPlayerStop (ref.current)
      };
      
      const handleTimeUpdate =  () => {
        if (!ref.current) return;
        onProgress && onProgress (ref.current, {
          currentTime: ref.current.currentTime,
          duration: ref.current.duration,
          currentTime: ref.current.currentTime,
          progress: ref.current.currentTime / ref.current.duration
        })
      };


      setListeners(listen => {
        if (listen.indexOf('ended') < 0) {
          ref.current.addEventListener('ended', handleEnd);
          ref.current.addEventListener('play', handlePlay)
          ref.current.addEventListener('pause', handlePause)
          ref.current.addEventListener('timeupdate', handleTimeUpdate);
          console.log ('added ended listener', listeners); 
        }
        return listen.concat('ended');
      });

      
    }, [onProgress, onPlayerStop, args, onPlayerStart ]);


  return (
   <Box sx={{width: 'fit-content'}} {...props} > 
    <audio {...args} src={src} ref={ref}> 
    </audio>
         {/* <pre>{JSON.stringify(src,0,2)}</pre>  */}
        {/* <pre>{JSON.stringify(props.selectedIndex,0,2)}</pre>
   */}
      {/* <pre>{JSON.stringify(pageResourceState,0,2)}</pre> */}
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

    {
      name: 'Data',  
      settings: [  
        {
          title: 'Bind to data resource',
          label: 'bindings' ,
          type: 'repeatertable'
        },  
      ]
    }, 

    
    {
      name: 'Playlist',  
      settings: [  
        {
          title: 'Selected Track',
          label: 'selectedIndex',
          bindable:  !0
        } ,
        {
          title: 'Audio Base URL',
          label: 'url',  
        },  
        {
          title: 'Add audio URLs playlist',
          label: 'playlist' ,
          type: 'imagelist'
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
    description: 'Audio player track position changes.',
    emits: ['currentTime','duration','currentTime','progress']
  }, 
]


const ReactlyAudio = {
  Icon: Speaker,
  Component: ReactlyAudioComponent ,
  Settings, 
  Events,
  bindableProps: ['source'],
  Defaults: { 
  }
}
 
ReactlyAudio.defaultProps = {};
export default ReactlyAudio;
