import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ControlButton from './ControlButton';
 
afterEach(() => cleanup());
 
describe('<ControlButton/>', () => {
 it('ControlButton mounts without failing', () => {
   render(<ControlButton />);
   expect(screen.getAllByTestId("test-for-ControlButton").length).toBeGreaterThan(0);
 });
});

