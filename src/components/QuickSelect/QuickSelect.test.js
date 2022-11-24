import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import QuickSelect from './QuickSelect';
 
afterEach(() => cleanup());
 
describe('<QuickSelect/>', () => {
 it('QuickSelect mounts without failing', () => {
   render(<QuickSelect />);
   expect(screen.getAllByTestId("test-for-QuickSelect").length).toBeGreaterThan(0);
 });
});

