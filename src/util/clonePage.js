import { uniqueId } from "../components/library/util";
import { cloneComponent } from "./cloneComponent";


export const clonePage = (page, PageName, pageID, clone = []) => {
 
  const ID = uniqueId();

  const PagePath = PageName.toLowerCase().replace(/\s/g, '-');

  const copy = { ...page }

  copy.components
    .filter(f => !f.componentID)
    .map(component =>  {
    const clones = cloneComponent(component, copy, ID);
    Object.assign(copy, { 
      components: clones
    
    }); 
  }); 

  return {
    ...copy, 
    ID,
    oldID: copy.ID,
    pageID,
    events: [],
    scripts: [],
    PageName,
    PagePath,
    state: copy.state?.map(state => ({
      ...state,
      ID: uniqueId(),
      ownerID: ID
    }))
  }; 

}
