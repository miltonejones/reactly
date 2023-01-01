import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Redirector from './Redirector';
 
afterEach(() => cleanup());
 
describe('<Redirector/>', () => {
 it('Redirector mounts without failing', () => {
   render(<Redirector />);
   expect(screen.getAllByTestId("test-for-Redirector").length).toBeGreaterThan(0);
 });
});

