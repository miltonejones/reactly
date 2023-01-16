import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ComponentOrderComponentInput from './ComponentOrderComponentInput';
 
afterEach(() => cleanup());
 
describe('<ComponentOrderComponentInput/>', () => {
 it('ComponentOrderComponentInput mounts without failing', () => {
   render(<ComponentOrderComponentInput />);
   expect(screen.getAllByTestId("test-for-ComponentOrderComponentInput").length).toBeGreaterThan(0);
 });
});

