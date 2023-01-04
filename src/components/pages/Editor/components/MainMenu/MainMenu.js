import React from 'react';
import { EditorStateContext } from '../../../../../context';
import { QuickMenu } from "../../../..";

 
const MainMenu = () => {

  const { 
    collapsed,   
    setCollapsed,
    setHilit,
    hilit,
    showTabs,
    setShowTabs, 
  } = React.useContext(EditorStateContext); 


  const getMenuOption = () => {
    const labels = menuOptions.filter(f => !!f.on);
    return labels.map(label => label.name);
  }
  
  const menuOptions = [
    {
      name: collapsed.left ? "Show Navigation Panel" : "Hide Navigation Panel",
      action: () => setCollapsed((s) => ({ ...s, left: !s.left })),
      on: collapsed.left
    },
    {
      name: collapsed.right ? "Show Settings Panel" : "Hide Settings Panel",
      action: () => setCollapsed((s) => ({ ...s, right: !s.right })),
      on: collapsed.right
    }, 
    {
      name: "-",
    },
    {
      name: `Hilight all components`,
      action: () => setHilit(!hilit),
      on: hilit,
    },
    {
      name: `${showTabs ? 'Hide' : 'Show'} Tabs`,
      action: () => setShowTabs(!showTabs),
      on: showTabs,
    }, 
  ];  
   
  const menuProps =  {
    onChange: (n) => {
      if (!n) return;
      const { action } = menuOptions.find((f) => f.name === n);
      action();
    },
    title: "App Menu",
    value: getMenuOption(),
    options: menuOptions.map((f) => f.name),
    label: "Menu",
    small: true,
    caret: true,
  }


 return <QuickMenu {...menuProps} />
}
MainMenu.defaultProps = {};
export default MainMenu;
