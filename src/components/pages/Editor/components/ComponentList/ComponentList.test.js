import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ComponentList from './ComponentList';
 
afterEach(() => cleanup());
 
describe('<ComponentList/>', () => {
 it('ComponentList mounts without failing', () => {
   render(<ComponentList />);
   expect(screen.getAllByTestId("test-for-ComponentList").length).toBeGreaterThan(0);
 });
});

