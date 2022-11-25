import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ReactlyAvatar from './ReactlyAvatar';
 
afterEach(() => cleanup());
 
describe('<ReactlyAvatar/>', () => {
 it('ReactlyAvatar mounts without failing', () => {
   render(<ReactlyAvatar />);
   expect(screen.getAllByTestId("test-for-ReactlyAvatar").length).toBeGreaterThan(0);
 });
});

