import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import NavigationTabs from './NavigationTabs';
 
afterEach(() => cleanup());
 
describe('<NavigationTabs/>', () => {
 it('NavigationTabs mounts without failing', () => {
   render(<NavigationTabs />);
   expect(screen.getAllByTestId("test-for-NavigationTabs").length).toBeGreaterThan(0);
 });
});

