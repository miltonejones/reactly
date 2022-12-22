import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ScriptLine from './ScriptLine';
 
afterEach(() => cleanup());
 
describe('<ScriptLine/>', () => {
 it('ScriptLine mounts without failing', () => {
   render(<ScriptLine />);
   expect(screen.getAllByTestId("test-for-ScriptLine").length).toBeGreaterThan(0);
 });
});

