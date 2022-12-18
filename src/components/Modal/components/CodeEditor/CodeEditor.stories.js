import React from 'react';
import CodeEditor from './CodeEditor';
 
export default {
 title: 'CodeEditor',
 component: CodeEditor
};
 
const Template = (args) => <CodeEditor {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
