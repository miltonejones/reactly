import React from 'react';
import StatusPane from './StatusPane';
 
export default {
 title: 'StatusPane',
 component: StatusPane
};
 
const Template = (args) => <StatusPane {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
