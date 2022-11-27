import React from 'react';
import Detail from './Detail';
 
export default {
 title: 'Detail',
 component: Detail
};
 
const Template = (args) => <Detail {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
