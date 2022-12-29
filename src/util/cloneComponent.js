import { uniqueId } from "../components/library/util";

export const cloneComponent = (component, page, pageID, componentID, clone = []) => {
  const children = page.components.filter(f => f.componentID === component.ID);
  const ID = uniqueId();

  clone.push({
    ...component,
    events: [],
    settings: (component.settings||[])
      .filter(setting => setting.SettingName !== 'bindings'),
    ID,
    pageID,
    cloned: 1,
    oldID: component.ID,
    componentID
  }) 

  children.map(child => cloneComponent(child, page, pageID, ID, clone))

  return clone; 

}
