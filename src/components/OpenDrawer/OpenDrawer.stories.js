import React from 'react';
import OpenDrawer from './OpenDrawer';
 
export default {
 title: 'OpenDrawer',
 component: OpenDrawer
};
 
const Template = (args) => <OpenDrawer {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
