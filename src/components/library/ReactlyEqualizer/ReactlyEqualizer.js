import React from 'react';
import { Box } from '@mui/material';  
import { Add } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { AppStateContext } from "../../../hooks/AppStateContext";
import { getSettings } from '../util';


const FrameLooper = (analyser, context, canvas) => () => {
	window.RequestAnimationFrame =
		window.requestAnimationFrame(FrameLooper) ||
		window.msRequestAnimationFrame(FrameLooper) ||
		window.mozRequestAnimationFrame(FrameLooper) ||
		window.webkitRequestAnimationFrame(FrameLooper);
	
	const fbc_array = new Uint8Array(analyser.frequencyBinCount);
	const  bar_count = 64; //window.innerWidth / 2;
	
	analyser.getByteFrequencyData(fbc_array);
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#ffffff";
	
	for (var i = 0; i < bar_count; i++) {
		const bar_pos = i * 4;
		const bar_width = 2;
		const bar_height = -(fbc_array[i] / 2);
		
		context.fillRect(bar_pos, canvas.height, bar_width, bar_height);
	}
}



const audioConnect = (audio) => {
  const context = new AudioContext();
  const analyser = context.createAnalyser();
  const source = context.createMediaElementSource(audio);


  // canvas = document.getElementById("canvas");
  // context = canvas.getContext("2d");
  
  // canvas.width = window.innerWidth * 0.80;
  // canvas.height = window.innerHeight * 0.60;
  
  source.connect(analyser);
  analyser.connect(context.destination);
  return {
    analyser,
    context
  }
}

class Eq extends React.Component {

  componentDidMount() {
    const { canvas, reference } = this.props
    const { id } = reference;
    const context = canvas.getContext("2d");
    const ok = audioConnect(reference); 

    canvas.width = 400;
    canvas.height = 100;
 

    const frameLoop = FrameLooper(
      ok.analyser, context, reference
     );

     frameLoop()

  }

  render() {
    return <h2>Hi, I am a Car!</h2>;
  }
}


const ReactlyComponentEqualizer = ({ children, ...props }) => {
  const ref = React.useRef(null)
  const { pageRefState, shout } = React.useContext(AppStateContext);
  const args = getSettings(props.settings);
  const [looper, setLooper] = React.useState(false);
  const [connected, setConnected] = React.useState(false);

  React.useEffect (() => {
    if (connected) return;
    setConnected(state => {
      if (!state && !!args.audio) {
        const [label, id] = args.audio.split('-');

        if (!!pageRefState[id]) {
          //   console.log({ media: pageRefState[id], pageRefState, id })
          //  const ok = audioConnect(pageRefState[id]); 
          //  shout ({ ok }, 'Connected to audio');
          //  const context = ref.current.getContext("2d");
          //  const frameLoop = FrameLooper(
          //   ok.analyser, context, ref.current
          //  );

          //  frameLoop();
           return pageRefState[id];
        } 
        return false
      }
      return state;
    });
  }, [pageRefState, connected, args])

  
  if (!connected) {
    return <>Waiting for audio</>
  }

 return (
   <ReactlyComponent component={Box} {...props}>

      <canvas ref={ref}></canvas>
     
     {  !!ref.current &&  <Box sx={{outline: 'solid 2px rebeccapurple'}}>
      <Eq reference={connected} canvas={ref.current} />
      </Box>}

      <pre>

      {JSON.stringify(args,0,2)}
     
      </pre>
   </ReactlyComponent>
 );
}

 

const ReactlyEqualizer = {
  Icon: Add,
  Component: ReactlyComponentEqualizer 
}
 

export default ReactlyEqualizer;


