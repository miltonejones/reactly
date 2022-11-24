import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import PageTree from './PageTree';
 
afterEach(() => cleanup());
 
describe('<PageTree/>', () => {
 it('PageTree mounts without failing', () => {
   render(<PageTree />);
   expect(screen.getAllByTestId("test-for-PageTree").length).toBeGreaterThan(0);
 });
});

