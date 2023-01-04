import React from 'react';
import Addressbox from './Addressbox';
 
export default {
 title: 'Addressbox',
 component: Addressbox
};
 
const Template = (args) => <Addressbox {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
