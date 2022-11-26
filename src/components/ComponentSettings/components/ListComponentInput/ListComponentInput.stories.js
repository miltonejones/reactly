import React from 'react';
import ListComponentInput from './ListComponentInput';
 
export default {
 title: 'ListComponentInput',
 component: ListComponentInput
};
 
const Template = (args) => <ListComponentInput {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
