import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import QuickMenu from './QuickMenu';
 
afterEach(() => cleanup());
 
describe('<QuickMenu/>', () => {
 it('QuickMenu mounts without failing', () => {
   render(<QuickMenu />);
   expect(screen.getAllByTestId("test-for-QuickMenu").length).toBeGreaterThan(0);
 });
});

