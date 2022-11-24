import React from 'react';
import QuickSelect from './QuickSelect';
 
export default {
 title: 'QuickSelect',
 component: QuickSelect
};
 
const Template = (args) => <QuickSelect {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
