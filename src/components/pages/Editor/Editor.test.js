import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Editor from './Editor';
 
afterEach(() => cleanup());
 
describe('<Editor/>', () => {
 it('Editor mounts without failing', () => {
   render(<Editor />);
   expect(screen.getAllByTestId("test-for-Editor").length).toBeGreaterThan(0);
 });
});

