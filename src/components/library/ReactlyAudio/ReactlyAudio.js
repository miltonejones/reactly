import React from "react";
import { Box, Alert } from "@mui/material"; 
import ReactlyComponent from "../reactly"; 
import { getStyles, getSettings } from "../util";
import { PageStateContext } from "../../../hooks/usePageContext";
import { AppStateContext } from "../../../hooks/AppStateContext";
import { usePageResourceState } from "../../../hooks/usePageResourceState"; 
import moment from "moment";

const ReactlyAudioComponent = ({ settings, styles, video, ...props }) => {  
  const {
    pageRefState,
    setPageRefState, 
  } = React.useContext(AppStateContext);

  const {
    onPlayerStart,
    onPlayerStop,
    onProgress,
    onPlayerPaused,
    onPlayerEnded,
  } = props;
  const ref = React.useRef(null);
  const [listeners, setListeners] = React.useState([]);
  const [source, setSource] = React.useState(null);

  const args = getSettings(settings);
  const style = getStyles(styles);

  const properties = {};

  const { bindingObject, resource, dataRows } = usePageResourceState(settings);
 
  let src = props.src || args.src; 
 
  React.useEffect(() => { 

    if (ref.current && !!src && source !== src) {
      setSource(s => {
        setTimeout(() => {
          ref.current.play()
        },99)
        return src;
      })
    }
 
    if (listeners.length) {
      return; 
    }
    if ((!ref.current) && !listeners.length) {
      return; 
    }

    setPageRefState && setPageRefState(s => ({
      ...s,
      [props.ID]: ref.current,
    }));

    const handlePlay = () => { 
      onPlayerStart && onPlayerStart(ref.current);
    };
    const handleEnd = () => {  
      onPlayerEnded &&
        onPlayerEnded(ref.current, {
          ...args,
        }); 
    };
    const handlePause = () => {
      onPlayerStop && onPlayerStop(ref.current);
    };

    const handleTimeUpdate = () => {
      if (!ref.current) return;
      // if (ref.current.currentTime !== parseInt(ref.current.currentTime)) return;
       const ms = (ref.current.currentTime / ref.current.duration) ;
       const progress = ms * 100;
      const duration_formatted = moment
        .utc(ref.current.duration * 1000)
        .format("mm:ss");
      const current_time_formatted = moment
        .utc(ref.current.currentTime * 1000)
        .format("mm:ss");
 

      onProgress &&
        onProgress(ref.current, {
          currentTime: ref.current.currentTime,
          duration: ref.current.duration,
          progress,
          duration_formatted,
          current_time_formatted,
        });
    };

    setListeners((listen) => {
      if (listen.indexOf("ended") < 0) {
        ref.current.addEventListener("ended", handleEnd);
        ref.current.addEventListener("play", handlePlay);
        ref.current.addEventListener("pause", handlePause);
        ref.current.addEventListener("timeupdate", handleTimeUpdate);
        console.log("added event listeners", listeners);
      }
      return listen.concat("ended");
    });
  }, [onProgress, source,src, onPlayerStop, args, onPlayerStart]);

  if (video) {
    return (
      <Box sx={{ width: "fit-content" }} {...props}>
        <video {...args} src={src} ref={ref} style={style}></video>
        {args.debug && <pre>{JSON.stringify(args,0,2)}</pre> } 
      </Box>
    );
  }

  return (
    <Box sx={{ width: "fit-content" }} {...props}>
      <audio {...args} id={`audio-${props.ID}`} src={src} ref={ref}></audio>
      {args.debug && <pre>{JSON.stringify(args,0,2)}</pre> }   
    </Box>
  );
};
 


const ReactlyAudio = { 
  Component: ReactlyAudioComponent, 
};

ReactlyAudio.defaultProps = {};
export default ReactlyAudio;
