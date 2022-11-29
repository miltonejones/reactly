import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ThemePanel from './ThemePanel';
 
afterEach(() => cleanup());
 
describe('<ThemePanel/>', () => {
 it('ThemePanel mounts without failing', () => {
   render(<ThemePanel />);
   expect(screen.getAllByTestId("test-for-ThemePanel").length).toBeGreaterThan(0);
 });
});

