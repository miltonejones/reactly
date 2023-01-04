import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ContentPopover from './ContentPopover';
 
afterEach(() => cleanup());
 
describe('<ContentPopover/>', () => {
 it('ContentPopover mounts without failing', () => {
   render(<ContentPopover />);
   expect(screen.getAllByTestId("test-for-ContentPopover").length).toBeGreaterThan(0);
 });
});

