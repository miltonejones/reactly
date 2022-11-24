import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import PillMenu from './PillMenu';
 
afterEach(() => cleanup());
 
describe('<PillMenu/>', () => {
 it('PillMenu mounts without failing', () => {
   render(<PillMenu />);
   expect(screen.getAllByTestId("test-for-PillMenu").length).toBeGreaterThan(0);
 });
});

