import React from 'react';
import ComponentContainer from './ComponentContainer';
 
export default {
 title: 'ComponentContainer',
 component: ComponentContainer
};
 
const Template = (args) => <ComponentContainer {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
