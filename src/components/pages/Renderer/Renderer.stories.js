import React from 'react';
import Renderer from './Renderer';
 
export default {
 title: 'Renderer',
 component: Renderer
};
 
const Template = (args) => <Renderer {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
