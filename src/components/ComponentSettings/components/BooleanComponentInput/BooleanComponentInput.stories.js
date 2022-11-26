import React from 'react';
import BooleanComponentInput from './BooleanComponentInput';
 
export default {
 title: 'BooleanComponentInput',
 component: BooleanComponentInput
};
 
const Template = (args) => <BooleanComponentInput {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
