import React from 'react';
import Editor from './Editor';
 
export default {
 title: 'Editor',
 component: Editor
};
 
const Template = (args) => <Editor {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
