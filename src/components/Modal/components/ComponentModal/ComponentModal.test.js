import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ComponentModal from './ComponentModal';
 
afterEach(() => cleanup());
 
describe('<ComponentModal/>', () => {
 it('ComponentModal mounts without failing', () => {
   render(<ComponentModal />);
   expect(screen.getAllByTestId("test-for-ComponentModal").length).toBeGreaterThan(0);
 });
});

