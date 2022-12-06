import React from 'react';
import LibraryTree from './LibraryTree';
 
export default {
 title: 'LibraryTree',
 component: LibraryTree
};
 
const Template = (args) => <LibraryTree {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
