import React from 'react';
import { styled, Box } from '@mui/material';
import { Flex, PillMenu , Spacer } from '../../..';
 
const Layout = styled(Box)(({ theme }) => ({
 margin: theme.spacing(4)
}));
 
const PillComponentInput = ({
  header,
  image, 
  types,
  value,
  handleChange
}) => {
  return <Flex fullWidth  nowrap>
    {header}
    <Spacer />
    <PillMenu image={image} options={types} value={value} onChange={handleChange} />
  </Flex>
}
PillComponentInput.defaultProps = {};
export default PillComponentInput;
