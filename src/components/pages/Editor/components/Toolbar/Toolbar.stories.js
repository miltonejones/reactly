import React from 'react';
import Toolbar from './Toolbar';
 
export default {
 title: 'Toolbar',
 component: Toolbar
};
 
const Template = (args) => <Toolbar {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
