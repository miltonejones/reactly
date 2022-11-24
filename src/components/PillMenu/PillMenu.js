import React from 'react';
import { styled, Box, Typography, Tooltip } from '@mui/material';
import { Flex } from "..";
 
export const Pill = styled(Box)(({ theme, square ,round, selected, backgroundColor = 'white' }) => ({
 padding: square || round ? 0 : theme.spacing(0.5, 1),
 borderRadius: round ? '50%' : theme.spacing(0.5),
 width: square || round ? 32 : 'fit-content',
 height: square || round  ? 32 : 'inherit',
 backgroundColor: !selected ? backgroundColor : '#ececec',
 cursor: 'pointer',
 '&:hover': {
  backgroundColor:  '#ececec'
 }
}));
 
const PillMenu = ( { options = [], value, image, onChange }) => {
 return (
   <Flex data-testid="test-for-PillMenu"> 
     {options.map(o => <Pill selected={o === value} onClick={() => onChange && onChange(o)} key={o}>
      {image 
        ? <Tooltip title={o}><img alt={o} src={`/icon/${o}.png`} /></Tooltip>
        : <Typography sx={{fontWeight: o === value ? 600 : 400}} variant="caption">{o}</Typography>}
     </Pill>)}
   </Flex>
 );
}
PillMenu.defaultProps = {};
export default PillMenu;
