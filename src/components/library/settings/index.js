
import { Icons } from '../icons';
import { Box } from '@mui/material'; 

const renderOption = (props, option) => {
  const Icon = Icons[option];
  if (!Icon) return <Box {...props}>{option}</Box>
  return <Box {...props}><Icon /> {option}</Box>
}


export const iconSettings = {
  types: Object.keys(Icons),
  renderOption
}