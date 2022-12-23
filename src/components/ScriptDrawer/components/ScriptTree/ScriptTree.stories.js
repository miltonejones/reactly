import React from 'react';
import ScriptTree from './ScriptTree';
 
export default {
 title: 'ScriptTree',
 component: ScriptTree
};
 
const Template = (args) => <ScriptTree {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
