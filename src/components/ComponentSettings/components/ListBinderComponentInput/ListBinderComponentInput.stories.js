import React from 'react';
import ListBinderComponentInput from './ListBinderComponentInput';
 
export default {
 title: 'ListBinderComponentInput',
 component: ListBinderComponentInput
};
 
const Template = (args) => <ListBinderComponentInput {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
