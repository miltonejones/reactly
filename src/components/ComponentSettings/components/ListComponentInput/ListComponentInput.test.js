import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ListComponentInput from './ListComponentInput';
 
afterEach(() => cleanup());
 
describe('<ListComponentInput/>', () => {
 it('ListComponentInput mounts without failing', () => {
   render(<ListComponentInput />);
   expect(screen.getAllByTestId("test-for-ListComponentInput").length).toBeGreaterThan(0);
 });
});

