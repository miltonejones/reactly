import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ScriptAssist from './ScriptAssist';
 
afterEach(() => cleanup());
 
describe('<ScriptAssist/>', () => {
 it('ScriptAssist mounts without failing', () => {
   render(<ScriptAssist />);
   expect(screen.getAllByTestId("test-for-ScriptAssist").length).toBeGreaterThan(0);
 });
});

