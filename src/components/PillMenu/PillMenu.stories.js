import React from 'react';
import PillMenu from './PillMenu';
 
export default {
 title: 'PillMenu',
 component: PillMenu
};
 
const Template = (args) => <PillMenu {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
