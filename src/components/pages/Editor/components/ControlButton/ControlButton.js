import React from 'react';
import { styled, Box } from '@mui/material';
import { RotateButton } from '../../../..';
  
const ControlButton = ({ deg = 0, onClick, icon, hidden}) => {
  if (hidden) return <i />
 return (
  <RotateButton
      deg={deg}
      onClick={onClick}
    > {icon}
    </RotateButton>
 );
}
ControlButton.defaultProps = {};
export default ControlButton;
