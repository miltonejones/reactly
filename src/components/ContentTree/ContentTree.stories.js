import React from 'react';
import ContentTree from './ContentTree';
 
export default {
 title: 'ContentTree',
 component: ContentTree
};
 
const Template = (args) => <ContentTree {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
