import React from 'react';
import { Box, Typography, styled } from '@mui/material'; 
import { GenericStyles } from '../styles'; 
import { Filter2 } from '@mui/icons-material';
import ReactlyComponent, { useTextBind } from '../reactly';
import Library from "..";
import useScrollCouple from "./useScrollCouple";
import { AppStateContext } from "../../../hooks/AppStateContext";
import { usePageContext } from "../../../hooks/usePageContext";
import { getStyles, getSettings } from '../util';
  

const ScrollCoupleHeader = styled("div")`
  width: 100%;
  height: calc(var(--header-large-height) - var(--scroll-offset));
  max-height: calc(var(--header-large-height) - var(--scroll-offset));
  background-color: magenta;
  overflow: hidden;
  position: relative;
  transition: height 0.2s linear;
  & img.scroll-head {
    position: absolute;
    top: -50%;
    left: 0px;
    width: 100%;
    height: auto;
  }
  & .scroll-text {
    position: absolute;
    top: 220px;
    left: 20px; 
  }
  &.mobile {
    height: calc(var(--header-small-height) - var(--scroll-offset));
    max-height: calc(var(--header-small-height) - var(--scroll-offset));
    & img.scroll-head {
      top: -25%;
    }
  }
`;

const src = 'https://is3-ssl.mzstatic.com/image/thumb/Music/v4/c3/49/ff/c349ffd7-1a29-05fd-4247-0655f1eb2567/source/1200x630sr.jpg';

const ChildComponent = ({ component , page, ...props  }) => {
  const args = getSettings(props.settings); 
  const style = getStyles(props.styles) ; 
const children = page?.components?.filter(d => d.componentID === component.ID)
  const { Component } = Library[component.ComponentType];
  const { attachEventHandlers } = usePageContext();
  const eventMap = attachEventHandlers(component);
 
  return <> 
  {/* {JSON.stringify(fixed)} */}
   <Component 
   {...args}
   {...props}
    {...component}
    {...eventMap}
    >
      {children?.map(kid => <ChildComponent  page={page}  component={kid} { ...kid} />)}
  </Component>
  </>
}

 
const ReactlyComponentScrollCouple = ({ small = 120, selectedPage, large = 400, children, ...props }) => {

  const args = getSettings(props.settings);  
  const offspring = selectedPage?.components?.filter(f => f.componentID === props.ID);

  const [bodyProp, headerProp] = offspring;
  const { fixed } = useTextBind(props.settings);


  const { outerStyle, scrollerRef, innerStyle } = useScrollCouple();
  if (!offspring) return <i />
  const style = {
    "--header-small-height": small + "px",
    "--header-large-height": large + "px",
  };
 return (
  <Box style={outerStyle}>
 
    <ReactlyComponent component={Box} {...props} style={style}>
 

      <ScrollCoupleHeader
        small={120}
        large={320}
      > 
      
{!!headerProp &&  <ChildComponent page={selectedPage} className="scroll-head" component={headerProp} {...headerProp} />}
   
        <Box className="scroll-text">
          <Typography variant="h4" sx={{color: 'white' }}>{args.label || props.label}</Typography>
          <Typography  sx={{color: 'white' }}>{props.subtitle || fixed.subtitle}</Typography>
          </Box>
        </ScrollCoupleHeader>


      <Box style={innerStyle} ref={scrollerRef}>
{!!bodyProp &&  <ChildComponent page={selectedPage} component={bodyProp} {...bodyProp} />} 
      </Box>
    </ReactlyComponent>
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
          title: 'Label',
          label: 'label' ,
          bindable: true,
          type: 'chip',
        }, 
        {
          title: 'Sub Title',
          label: 'subtitle' ,
          type: 'chip',
          bindable: true
        }, 
      ]
    },
    {
      name: 'Appearance',
      settings: [ 
        {
          title: 'Variant',
          label: 'variant',
          types: [ ], 
        } 
      ]
    },
  ]
}


const ReactlyScrollCouple = {
  Icon: Filter2,
  Component: ReactlyComponentScrollCouple,
  Settings,
  Styles: GenericStyles, 
  allowChildren: 1 ,
  childLimit: 2,
  Defaults: { }
}
 

export default ReactlyScrollCouple;


