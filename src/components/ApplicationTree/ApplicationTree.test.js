import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ApplicationTree from './ApplicationTree';
 
afterEach(() => cleanup());
 
describe('<ApplicationTree/>', () => {
 it('ApplicationTree mounts without failing', () => {
   render(<ApplicationTree />);
   expect(screen.getAllByTestId("test-for-ApplicationTree").length).toBeGreaterThan(0);
 });
});

