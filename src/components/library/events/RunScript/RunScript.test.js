import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import RunScript from './RunScript';
 
afterEach(() => cleanup());
 
describe('<RunScript/>', () => {
 it('RunScript mounts without failing', () => {
   render(<RunScript />);
   expect(screen.getAllByTestId("test-for-RunScript").length).toBeGreaterThan(0);
 });
});

