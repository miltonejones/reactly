import React from 'react';
import ApplicationTree from './ApplicationTree';
 
export default {
 title: 'ApplicationTree',
 component: ApplicationTree
};
 
const Template = (args) => <ApplicationTree {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
