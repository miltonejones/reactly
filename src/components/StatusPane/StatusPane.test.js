import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import StatusPane from './StatusPane';
 
afterEach(() => cleanup());
 
describe('<StatusPane/>', () => {
 it('StatusPane mounts without failing', () => {
   render(<StatusPane />);
   expect(screen.getAllByTestId("test-for-StatusPane").length).toBeGreaterThan(0);
 });
});

