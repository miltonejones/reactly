import React from 'react';
import ThemePanel from './ThemePanel';
 
export default {
 title: 'ThemePanel',
 component: ThemePanel
};
 
const Template = (args) => <ThemePanel {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
