import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import BooleanComponentInput from './BooleanComponentInput';
 
afterEach(() => cleanup());
 
describe('<BooleanComponentInput/>', () => {
 it('BooleanComponentInput mounts without failing', () => {
   render(<BooleanComponentInput />);
   expect(screen.getAllByTestId("test-for-BooleanComponentInput").length).toBeGreaterThan(0);
 });
});

