import React from 'react';
import ReactlyAlert from './ReactlyAlert';
 
export default {
 title: 'ReactlyAlert',
 component: ReactlyAlert
};
 
const Template = (args) => <ReactlyAlert {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
