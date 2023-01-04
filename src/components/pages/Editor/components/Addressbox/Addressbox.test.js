import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Addressbox from './Addressbox';
 
afterEach(() => cleanup());
 
describe('<Addressbox/>', () => {
 it('Addressbox mounts without failing', () => {
   render(<Addressbox />);
   expect(screen.getAllByTestId("test-for-Addressbox").length).toBeGreaterThan(0);
 });
});

