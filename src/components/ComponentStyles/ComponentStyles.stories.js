import React from 'react';
import ComponentStyles from './ComponentStyles';
 
export default {
 title: 'ComponentStyles',
 component: ComponentStyles
};
 
const Template = (args) => <ComponentStyles {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
