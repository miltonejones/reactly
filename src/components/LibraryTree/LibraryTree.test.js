import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import LibraryTree from './LibraryTree';
 
afterEach(() => cleanup());
 
describe('<LibraryTree/>', () => {
 it('LibraryTree mounts without failing', () => {
   render(<LibraryTree />);
   expect(screen.getAllByTestId("test-for-LibraryTree").length).toBeGreaterThan(0);
 });
});

