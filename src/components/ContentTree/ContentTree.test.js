import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ContentTree from './ContentTree';
 
afterEach(() => cleanup());
 
describe('<ContentTree/>', () => {
 it('ContentTree mounts without failing', () => {
   render(<ContentTree />);
   expect(screen.getAllByTestId("test-for-ContentTree").length).toBeGreaterThan(0);
 });
});

