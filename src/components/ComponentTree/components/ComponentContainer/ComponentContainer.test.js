import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ComponentContainer from './ComponentContainer';
 
afterEach(() => cleanup());
 
describe('<ComponentContainer/>', () => {
 it('ComponentContainer mounts without failing', () => {
   render(<ComponentContainer />);
   expect(screen.getAllByTestId("test-for-ComponentContainer").length).toBeGreaterThan(0);
 });
});

