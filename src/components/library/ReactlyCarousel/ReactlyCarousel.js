import React from 'react';
import { Box, styled } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { ViewCarousel } from '@mui/icons-material';
import ReactlyComponent from '../reactly';
import { getSettings } from '../util';
import './ReactlyCarousel.css'
  
 


// const images = [
//   'https://is5-ssl.mzstatic.com/image/thumb/Features124/v4/de/a7/0a/dea70a03-c5f6-9dd4-faa9-4ab51610fd57/mzl.nrobskfq.jpg/1200x630cw.png',
//   'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/29/c2/eb/29c2ebac-dd71-447c-1fcc-d179d4a06815/source/1200x630sr.jpg',
//   'https://is1-ssl.mzstatic.com/image/thumb/Music/v4/fb/a6/3b/fba63b0a-7aae-8f51-6a5c-aeab720396c6/source/1200x630sr.jpg',
//   'https://is1-ssl.mzstatic.com/image/thumb/Music71/v4/19/60/91/19609166-bd55-fdc3-b121-a1cdb6e7aea8/source/1200x630sr.jpg',
//   'https://is3-ssl.mzstatic.com/image/thumb/Music49/v4/fb/41/06/fb4106b8-6546-b9ce-a31e-55eefa6157f7/source/1200x630sr.jpg',
//   'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/9b/b6/ac/9bb6ac34-2ed4-e3d6-b32d-3c1b3e111c19/source/1200x630sr.jpg', 
// ]

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
 

      <Carousel imageList={images} loaded={loaded} setLoaded={setLoaded} onClick={setIndex} />
   </ReactlyComponent>
   
{/* [ <pre>
  {JSON.stringify(JSON.parse(args?.images),0,2)}
 </pre>] */}
   </> 
 );
}

const css = (o) =>
  Object.keys(o)
    .filter((f) => !!o[f])
    .join(" ");

const Carousel = ({ imageList, onClick, loaded, setLoaded }) => {
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
      }, 5999);
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
            {/* <Box className="text">
              carousel text here
            </Box> */}
        <img
          src={showPic}
          alt="{Title}"
        />
      </Box>
      <Box
          className="carousel-hide scroll-head">
        <img
          src={hidePic}
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


