import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ReactlyBox from './ReactlyBox';
 
afterEach(() => cleanup());
 
describe('<ReactlyBox/>', () => {
 it('ReactlyBox mounts without failing', () => {
   render(<ReactlyBox />);
   expect(screen.getAllByTestId("test-for-ReactlyBox").length).toBeGreaterThan(0);
 });
});

