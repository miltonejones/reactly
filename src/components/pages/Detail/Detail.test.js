import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import Detail from './Detail';
 
afterEach(() => cleanup());
 
describe('<Detail/>', () => {
 it('Detail mounts without failing', () => {
   render(<Detail />);
   expect(screen.getAllByTestId("test-for-Detail").length).toBeGreaterThan(0);
 });
});

