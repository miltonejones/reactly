import React from 'react';
import ApplicationForm from './ApplicationForm';
 
export default {
 title: 'ApplicationForm',
 component: ApplicationForm
};
 
const Template = (args) => <ApplicationForm {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
