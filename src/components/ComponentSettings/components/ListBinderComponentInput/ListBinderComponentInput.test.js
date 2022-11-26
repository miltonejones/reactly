import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ListBinderComponentInput from './ListBinderComponentInput';
 
afterEach(() => cleanup());
 
describe('<ListBinderComponentInput/>', () => {
 it('ListBinderComponentInput mounts without failing', () => {
   render(<ListBinderComponentInput />);
   expect(screen.getAllByTestId("test-for-ListBinderComponentInput").length).toBeGreaterThan(0);
 });
});

