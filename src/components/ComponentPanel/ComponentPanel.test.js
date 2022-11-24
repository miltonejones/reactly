import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ComponentPanel from './ComponentPanel';
 
afterEach(() => cleanup());
 
describe('<ComponentPanel/>', () => {
 it('ComponentPanel mounts without failing', () => {
   render(<ComponentPanel />);
   expect(screen.getAllByTestId("test-for-ComponentPanel").length).toBeGreaterThan(0);
 });
});

