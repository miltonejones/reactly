import React from 'react';
import { Box, Chip, styled } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { ViewCarousel } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import './ReactlyCarousel.css'
  
 

 

const ReactlyComponentCarousel = ({ children, ...props }) => {
  const [index , setIndex] = React.useState(0)
  const [loaded, setLoaded] = React.useState(false);
  const args = getSettings(props.settings);

  if (!args?.images) {
    return <>No images to display</>
  }
 
  const carouselImages = !!args?.images && typeof args?.images === 'string' 
      ? JSON.parse(args?.images)
      : args?.images;
  const images = carouselImages.map(f => f.src);
 return (
 
  <><ReactlyComponent component={Box} {...props} sx={{
    height: 360, 
    border: 1, 
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderColor: 'divider'
    }}>
 
{props.componentEditing && <Box sx={{
  position: 'absolute',
  top: 10,
  left: 10,
  zIndex: 40
 }}>

<Chip color="success" label={<><em>Preview Mode</em> index: {index % carouselImages.length} --- speed: {args.speed}</>} />


 </Box>}

      <Carousel speed={args.speed} imageList={carouselImages} loaded={loaded} setLoaded={setLoaded} onClick={setIndex} />
   </ReactlyComponent>
   {/* {JSON.stringify(props)} */}
   </> 
 );
}

const css = (o) =>
  Object.keys(o)
    .filter((f) => !!o[f])
    .join(" ");

const Carousel = ({ imageList, onClick, loaded, setLoaded, speed = 10 }) => {
  const load = React.useRef(0);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [running, setRunning] = React.useState(false);
  const [runnable, setRunnable] = React.useState(false);
  const [timer, setTimer] = React.useState(null);
  const showPic = imageList[currentIndex % imageList.length];
  const hidePic = imageList[(currentIndex + 1) % imageList.length];

  const setCurrent = () => { 
    setCurrentIndex(c => {
     const next = c + 1;
     onClick(next)
     return next;
    })
   
  }

   const enactSlide = React.useCallback((stateSetters, setCurrent, index) => {
    let timer1, timer2;
    // alert (1)
    const next = () => { 
      setCurrent();
      stateSetters.map((f) => f(false));
      !!timer1 && clearTimeout(timer1);
      timer2 = setTimeout(() => { 
        enactSlide(stateSetters, setCurrent, index);
      }, speed * 999);
    };
    stateSetters.map((f) => f(true));
    !!timer2 && clearTimeout(timer2);
    timer1 = setTimeout(next, 499);
  }, []);

  React.useEffect(() => {
    if (load.current === 1) return;
    load.current = 1
    !timer &&
      setTimer(
        setTimeout(
          () => { 
            enactSlide([setRunnable, setRunning], setCurrent, currentIndex)
            onClick && onClick(currentIndex)
          },
          2999
        )
      );
  }, [timer, load, loaded, currentIndex,enactSlide,onClick]);

  return (
    <Box className={css({ running, runnable })}> 
      <Box
          className="carousel-show scroll-head">
            <Box className="text">
              {showPic.text} 
            </Box>
        <img
          src={showPic.src}
          alt="{Title}"
        />
      </Box>
      <Box
          className="carousel-hide scroll-head">
        <img
          src={hidePic.src}
          alt="{Title}"
        />
      </Box>
    </Box>
  );
};




const Settings = {
  categories: [

    {
      name: 'General',
      always: true,
      settings: [  
        {
          title: 'Speed',
          label: 'speed' 
        }, 
      ]
    }, 
    {
      name: 'Images', 
      always: true,
      settings: [  
        {
          title: 'Add images to the carousel',
          label: 'images' ,
          type: 'imagelist'
        },  
      ]
    }, 
  ]
}


const ReactlyCarousel = {
  Icon: ViewCarousel,
  Component: ReactlyComponentCarousel,
  Settings,
  Styles: GenericStyles, 
  Defaults: { speed: 10 }
}
 

export default ReactlyCarousel;


