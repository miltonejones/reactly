import React from 'react';
import QuickMenu from './QuickMenu';
 
export default {
 title: 'QuickMenu',
 component: QuickMenu
};
 
const Template = (args) => <QuickMenu {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
