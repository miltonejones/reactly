import React from 'react';
import ComponentList from './ComponentList';
 
export default {
 title: 'ComponentList',
 component: ComponentList
};
 
const Template = (args) => <ComponentList {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
