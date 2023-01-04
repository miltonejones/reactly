import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Toolbar from './Toolbar';
 
afterEach(() => cleanup());
 
describe('<Toolbar/>', () => {
 it('Toolbar mounts without failing', () => {
   render(<Toolbar />);
   expect(screen.getAllByTestId("test-for-Toolbar").length).toBeGreaterThan(0);
 });
});

