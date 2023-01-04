import React from 'react';
import MainMenu from './MainMenu';
 
export default {
 title: 'MainMenu',
 component: MainMenu
};
 
const Template = (args) => <MainMenu {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
