import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import IconComponentInput from './IconComponentInput';
 
afterEach(() => cleanup());
 
describe('<IconComponentInput/>', () => {
 it('IconComponentInput mounts without failing', () => {
   render(<IconComponentInput />);
   expect(screen.getAllByTestId("test-for-IconComponentInput").length).toBeGreaterThan(0);
 });
});

