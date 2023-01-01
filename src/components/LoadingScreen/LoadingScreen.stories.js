import React from 'react';
import LoadingScreen from './LoadingScreen';
 
export default {
 title: 'LoadingScreen',
 component: LoadingScreen
};
 
const Template = (args) => <LoadingScreen {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
