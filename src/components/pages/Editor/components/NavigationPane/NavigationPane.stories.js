import React from 'react';
import NavigationPane from './NavigationPane';
 
export default {
 title: 'NavigationPane',
 component: NavigationPane
};
 
const Template = (args) => <NavigationPane {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
