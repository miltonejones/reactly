import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ComponentTabs from './ComponentTabs';
 
afterEach(() => cleanup());
 
describe('<ComponentTabs/>', () => {
 it('ComponentTabs mounts without failing', () => {
   render(<ComponentTabs />);
   expect(screen.getAllByTestId("test-for-ComponentTabs").length).toBeGreaterThan(0);
 });
});

