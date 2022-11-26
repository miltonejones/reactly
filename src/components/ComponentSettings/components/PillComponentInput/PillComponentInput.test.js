import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import PillComponentInput from './PillComponentInput';
 
afterEach(() => cleanup());
 
describe('<PillComponentInput/>', () => {
 it('PillComponentInput mounts without failing', () => {
   render(<PillComponentInput />);
   expect(screen.getAllByTestId("test-for-PillComponentInput").length).toBeGreaterThan(0);
 });
});

