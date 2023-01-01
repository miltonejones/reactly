import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';
 
afterEach(() => cleanup());
 
describe('<LoadingScreen/>', () => {
 it('LoadingScreen mounts without failing', () => {
   render(<LoadingScreen />);
   expect(screen.getAllByTestId("test-for-LoadingScreen").length).toBeGreaterThan(0);
 });
});

