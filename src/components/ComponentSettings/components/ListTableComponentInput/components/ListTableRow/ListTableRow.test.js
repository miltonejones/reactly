import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ListTableRow from './ListTableRow';
 
afterEach(() => cleanup());
 
describe('<ListTableRow/>', () => {
 it('ListTableRow mounts without failing', () => {
   render(<ListTableRow />);
   expect(screen.getAllByTestId("test-for-ListTableRow").length).toBeGreaterThan(0);
 });
});

