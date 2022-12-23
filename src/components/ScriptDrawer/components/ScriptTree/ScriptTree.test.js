import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ScriptTree from './ScriptTree';
 
afterEach(() => cleanup());
 
describe('<ScriptTree/>', () => {
 it('ScriptTree mounts without failing', () => {
   render(<ScriptTree />);
   expect(screen.getAllByTestId("test-for-ScriptTree").length).toBeGreaterThan(0);
 });
});

