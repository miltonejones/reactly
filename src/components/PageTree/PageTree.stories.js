import React from 'react';
import PageTree from './PageTree';
 
export default {
 title: 'PageTree',
 component: PageTree
};
 
const Template = (args) => <PageTree {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
