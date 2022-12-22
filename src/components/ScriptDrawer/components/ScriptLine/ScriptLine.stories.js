import React from 'react';
import ScriptLine from './ScriptLine';
 
export default {
 title: 'ScriptLine',
 component: ScriptLine
};
 
const Template = (args) => <ScriptLine {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
