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
  
 
const Renderer = ({ applications = {} }) => { 
  const { appname, pagename } = useParams();
  const { queryState = {}, setQueryState } = React.useContext(AppStateContext);
  const appData = applications.find(f => f.path === appname);


  const crawl = React.useCallback((node, items = []) => {
    const papa = appData.pages.find(f => f.ID === node.pageID);

    if (papa) {
      return crawl(papa).concat([{
        text: node.PageName,
        href: `/apps/${appname}/` + node.PagePath
      }]);
    }

    return items.concat({
      text: node.PageName,
      href: `/apps/${appname}/` + node.PagePath
    })
  } , [appData, appname])

  const firstpage = !!pagename ? appData.pages.find(f => f.PagePath === pagename) : appData.pages[0];
 

  const breadcrumbs = crawl(firstpage);

 return (
   <>
  <Breadcrumbs sx={{m: 2}} separator={<b>›</b>} aria-label="breadcrumb">
    {breadcrumbs.map((crumb, o) => crumb.href 
      ? <Link key={o} href={crumb.href}><Typography variant="body2">{crumb.text}</Typography></Link> 
      : <Typography key={o} sx={{ fontWeight: 600 }} variant="body2">{crumb.text}</Typography>)}
  </Breadcrumbs>


  <ComponentTree tree={firstpage.components} />
  
</>
 );
}

 


Renderer.defaultProps = {};
export default Renderer;
