import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ListTableComponentInput from './ListTableComponentInput';
 
afterEach(() => cleanup());
 
describe('<ListTableComponentInput/>', () => {
 it('ListTableComponentInput mounts without failing', () => {
   render(<ListTableComponentInput />);
   expect(screen.getAllByTestId("test-for-ListTableComponentInput").length).toBeGreaterThan(0);
 });
});

