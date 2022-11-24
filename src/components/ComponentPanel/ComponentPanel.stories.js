import React from 'react';
import ComponentPanel from './ComponentPanel';
 
export default {
 title: 'ComponentPanel',
 component: ComponentPanel
};
 
const Template = (args) => <ComponentPanel {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
