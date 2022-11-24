import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ComponentEvents from './ComponentEvents';
 
afterEach(() => cleanup());
 
describe('<ComponentEvents/>', () => {
 it('ComponentEvents mounts without failing', () => {
   render(<ComponentEvents />);
   expect(screen.getAllByTestId("test-for-ComponentEvents").length).toBeGreaterThan(0);
 });
});

