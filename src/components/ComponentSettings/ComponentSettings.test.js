import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ComponentSettings from './ComponentSettings';
 
afterEach(() => cleanup());
 
describe('<ComponentSettings/>', () => {
 it('ComponentSettings mounts without failing', () => {
   render(<ComponentSettings />);
   expect(screen.getAllByTestId("test-for-ComponentSettings").length).toBeGreaterThan(0);
 });
});

