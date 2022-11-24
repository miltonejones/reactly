import React from 'react';
import ComponentSettings from './ComponentSettings';
 
export default {
 title: 'ComponentSettings',
 component: ComponentSettings
};
 
const Template = (args) => <ComponentSettings {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
