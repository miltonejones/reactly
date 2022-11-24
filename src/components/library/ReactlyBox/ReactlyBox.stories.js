import React from 'react';
import ReactlyBox from './ReactlyBox';
 
export default {
 title: 'ReactlyBox',
 component: ReactlyBox
};
 
const Template = (args) => <ReactlyBox {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
