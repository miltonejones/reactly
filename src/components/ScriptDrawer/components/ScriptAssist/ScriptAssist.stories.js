import React from 'react';
import ScriptAssist from './ScriptAssist';
 
export default {
 title: 'ScriptAssist',
 component: ScriptAssist
};
 
const Template = (args) => <ScriptAssist {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
