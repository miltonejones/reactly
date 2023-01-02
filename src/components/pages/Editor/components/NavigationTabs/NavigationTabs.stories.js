import React from 'react';
import NavigationTabs from './NavigationTabs';
 
export default {
 title: 'NavigationTabs',
 component: NavigationTabs
};
 
const Template = (args) => <NavigationTabs {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
