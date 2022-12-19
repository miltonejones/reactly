import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ConsoleDrawer from './ConsoleDrawer';
 
afterEach(() => cleanup());
 
describe('<ConsoleDrawer/>', () => {
 it('ConsoleDrawer mounts without failing', () => {
   render(<ConsoleDrawer />);
   expect(screen.getAllByTestId("test-for-ConsoleDrawer").length).toBeGreaterThan(0);
 });
});

