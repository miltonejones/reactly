import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import MainMenu from './MainMenu';
 
afterEach(() => cleanup());
 
describe('<MainMenu/>', () => {
 it('MainMenu mounts without failing', () => {
   render(<MainMenu />);
   expect(screen.getAllByTestId("test-for-MainMenu").length).toBeGreaterThan(0);
 });
});

