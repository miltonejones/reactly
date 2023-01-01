import React from 'react';
import Redirector from './Redirector';
 
export default {
 title: 'Redirector',
 component: Redirector
};
 
const Template = (args) => <Redirector {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
