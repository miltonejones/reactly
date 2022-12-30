import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ParameterPopover from './ParameterPopover';
 
afterEach(() => cleanup());
 
describe('<ParameterPopover/>', () => {
 it('ParameterPopover mounts without failing', () => {
   render(<ParameterPopover />);
   expect(screen.getAllByTestId("test-for-ParameterPopover").length).toBeGreaterThan(0);
 });
});

