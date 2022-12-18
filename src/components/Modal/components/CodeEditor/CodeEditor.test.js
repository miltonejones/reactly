import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CodeEditor from './CodeEditor';
 
afterEach(() => cleanup());
 
describe('<CodeEditor/>', () => {
 it('CodeEditor mounts without failing', () => {
   render(<CodeEditor />);
   expect(screen.getAllByTestId("test-for-CodeEditor").length).toBeGreaterThan(0);
 });
});

