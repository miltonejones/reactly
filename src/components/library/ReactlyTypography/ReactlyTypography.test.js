import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ReactlyTypography from './ReactlyTypography';
 
afterEach(() => cleanup());
 
describe('<ReactlyTypography/>', () => {
 it('ReactlyTypography mounts without failing', () => {
   render(<ReactlyTypography />);
   expect(screen.getAllByTestId("test-for-ReactlyTypography").length).toBeGreaterThan(0);
 });
});

