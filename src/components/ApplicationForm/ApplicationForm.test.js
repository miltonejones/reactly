import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ApplicationForm from './ApplicationForm';
 
afterEach(() => cleanup());
 
describe('<ApplicationForm/>', () => {
 it('ApplicationForm mounts without failing', () => {
   render(<ApplicationForm />);
   expect(screen.getAllByTestId("test-for-ApplicationForm").length).toBeGreaterThan(0);
 });
});

