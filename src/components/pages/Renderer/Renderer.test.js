import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Renderer from './Renderer';
 
afterEach(() => cleanup());
 
describe('<Renderer/>', () => {
 it('Renderer mounts without failing', () => {
   render(<Renderer />);
   expect(screen.getAllByTestId("test-for-Renderer").length).toBeGreaterThan(0);
 });
});

