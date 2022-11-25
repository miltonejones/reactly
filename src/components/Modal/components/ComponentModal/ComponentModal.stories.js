import React from 'react';
import ComponentModal from './ComponentModal';
 
export default {
 title: 'ComponentModal',
 component: ComponentModal
};
 
const Template = (args) => <ComponentModal {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
