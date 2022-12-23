import React from 'react';
import CodeTabs from './CodeTabs';
 
export default {
 title: 'CodeTabs',
 component: CodeTabs
};
 
const Template = (args) => <CodeTabs {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
