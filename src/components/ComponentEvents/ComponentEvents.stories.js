import React from 'react';
import ComponentEvents from './ComponentEvents';
 
export default {
 title: 'ComponentEvents',
 component: ComponentEvents
};
 
const Template = (args) => <ComponentEvents {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
