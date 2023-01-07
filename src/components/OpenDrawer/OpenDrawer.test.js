import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import OpenDrawer from './OpenDrawer';
 
afterEach(() => cleanup());
 
describe('<OpenDrawer/>', () => {
 it('OpenDrawer mounts without failing', () => {
   render(<OpenDrawer />);
   expect(screen.getAllByTestId("test-for-OpenDrawer").length).toBeGreaterThan(0);
 });
});

