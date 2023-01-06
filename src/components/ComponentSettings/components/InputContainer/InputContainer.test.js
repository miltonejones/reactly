import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import InputContainer from './InputContainer';
 
afterEach(() => cleanup());
 
describe('<InputContainer/>', () => {
 it('InputContainer mounts without failing', () => {
   render(<InputContainer />);
   expect(screen.getAllByTestId("test-for-InputContainer").length).toBeGreaterThan(0);
 });
});

