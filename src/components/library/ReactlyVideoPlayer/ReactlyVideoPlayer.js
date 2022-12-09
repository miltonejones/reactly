import React from 'react';
import { Box, Alert } from "@mui/material"; 
import ReactlyComponent from '../reactly';
import ReactlyAudio from '../ReactlyAudio/ReactlyAudio';
  
const ReactlyComponentVideoPlayer = ({ children, ...props }) => {
  const { Component } = ReactlyAudio;
 return (
   <Component {...props} video>
      {children}
   </Component>
 );
}

 

const ReactlyVideoPlayer = { 
  Component: ReactlyComponentVideoPlayer 
}
 

export default ReactlyVideoPlayer;


