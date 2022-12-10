import React from 'react';
import ListTableRow from './ListTableRow';
 
export default {
 title: 'ListTableRow',
 component: ListTableRow
};
 
const Template = (args) => <ListTableRow {...args} />;
export const DefaultView = Template.bind({});
DefaultView.args = {};
