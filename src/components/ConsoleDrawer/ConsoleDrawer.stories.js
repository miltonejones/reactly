import React from 'react';
import ConsoleDrawer from './ConsoleDrawer';
 
export default {
 title: 'ConsoleDrawer',
 component: ConsoleDrawer
};
 
const Template = (args) => <ConsoleDrawer {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
