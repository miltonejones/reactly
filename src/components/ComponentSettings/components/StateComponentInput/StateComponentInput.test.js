import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import StateComponentInput from './StateComponentInput';
 
afterEach(() => cleanup());
 
describe('<StateComponentInput/>', () => {
 it('StateComponentInput mounts without failing', () => {
   render(<StateComponentInput />);
   expect(screen.getAllByTestId("test-for-StateComponentInput").length).toBeGreaterThan(0);
 });
});

