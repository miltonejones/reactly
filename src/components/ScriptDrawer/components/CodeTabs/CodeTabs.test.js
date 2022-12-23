import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import CodeTabs from './CodeTabs';
 
afterEach(() => cleanup());
 
describe('<CodeTabs/>', () => {
 it('CodeTabs mounts without failing', () => {
   render(<CodeTabs />);
   expect(screen.getAllByTestId("test-for-CodeTabs").length).toBeGreaterThan(0);
 });
});

