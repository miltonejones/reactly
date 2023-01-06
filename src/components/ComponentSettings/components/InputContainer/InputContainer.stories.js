import React from 'react';
import InputContainer from './InputContainer';
 
export default {
 title: 'InputContainer',
 component: InputContainer
};
 
const Template = (args) => <InputContainer {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
