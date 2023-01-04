import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import NavigationPane from './NavigationPane';
 
afterEach(() => cleanup());
 
describe('<NavigationPane/>', () => {
 it('NavigationPane mounts without failing', () => {
   render(<NavigationPane />);
   expect(screen.getAllByTestId("test-for-NavigationPane").length).toBeGreaterThan(0);
 });
});

