import React from 'react';
import ControlButton from './ControlButton';
 
export default {
 title: 'ControlButton',
 component: ControlButton
};
 
const Template = (args) => <ControlButton {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
