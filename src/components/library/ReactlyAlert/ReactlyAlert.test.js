import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ReactlyAlert from './ReactlyAlert';
 
afterEach(() => cleanup());
 
describe('<ReactlyAlert/>', () => {
 it('ReactlyAlert mounts without failing', () => {
   render(<ReactlyAlert />);
   expect(screen.getAllByTestId("test-for-ReactlyAlert").length).toBeGreaterThan(0);
 });
});

