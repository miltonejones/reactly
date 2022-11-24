import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ComponentStyles from './ComponentStyles';
 
afterEach(() => cleanup());
 
describe('<ComponentStyles/>', () => {
 it('ComponentStyles mounts without failing', () => {
   render(<ComponentStyles />);
   expect(screen.getAllByTestId("test-for-ComponentStyles").length).toBeGreaterThan(0);
 });
});

