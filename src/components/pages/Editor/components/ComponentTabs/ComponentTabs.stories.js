import React from 'react';
import ComponentTabs from './ComponentTabs';
 
export default {
 title: 'ComponentTabs',
 component: ComponentTabs
};
 
const Template = (args) => <ComponentTabs {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
