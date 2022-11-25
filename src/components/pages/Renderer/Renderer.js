import React from 'react';
import {
  Link,
  Breadcrumbs,
  Typography, 
} from "@mui/material";
import { Flex, TextBtn, ComponentTree, QuickMenu, Spacer, ContentTree, PageTree } from "../..";
import { Launch, Save, Sync, Add } from "@mui/icons-material";
import { AppStateContext } from '../../../hooks/AppStateContext';
import { useParams } from "react-router-dom";
  
 
const Renderer = ({ applications: apps = {} }) => { 
  const { appname, pagename } = useParams();
  const { queryState = {}, setQueryState } = React.useContext(AppStateContext);

  const applications = typeof apps === 'object'
    ? apps 
    : JSON.parse(apps)

  const createBreadcrumbs = React.useCallback((node, items = []) => {
    const selectedPage = appData.pages.find(f => f.ID === node.pageID);

    if (selectedPage) {
      return createBreadcrumbs(selectedPage).concat([{
        text: node.PageName,
        href: `/apps/${appname}/` + node.PagePath
      }]);
    }

    return items.concat({
      text: node.PageName,
      href: `/apps/${appname}/` + node.PagePath
    })
  } , [ appname])
 

  const appData = applications.find(f => f.path === appname);

  
  const firstpage = !!pagename ? appData.pages.find(f => f.PagePath === pagename) : appData.pages[0];
 

  const breadcrumbs = createBreadcrumbs(firstpage);

 return (
   <>
  <Breadcrumbs sx={{m: 2}} separator={<b>›</b>} aria-label="breadcrumb">
    {breadcrumbs.map((crumb, o) => crumb.href 
      ? <Link key={o} href={crumb.href}><Typography variant="body2">{crumb.text}</Typography></Link> 
      : <Typography key={o} sx={{ fontWeight: 600 }} variant="body2">{crumb.text}</Typography>)}
  </Breadcrumbs>


  <ComponentTree selectedPage={firstpage} />
  
</>
 );
}

 


Renderer.defaultProps = {};
export default Renderer;
