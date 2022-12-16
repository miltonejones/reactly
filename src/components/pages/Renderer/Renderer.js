import React from 'react';
import {
  Link,
  Breadcrumbs,
  Typography, 
} from "@mui/material";
import { Flex, TextBtn, ComponentTree, QuickMenu, Spacer, ContentTree, PageTree } from "../..";
import { Launch, Save, Sync, Add } from "@mui/icons-material";
import { AppStateContext } from '../../../hooks/AppStateContext';
import { useParams, useLocation } from "react-router-dom";
import { ApplicationTree } from "../..";
import { uniqueId } from '../../library/util';
  
 
const Renderer = ({ applications: apps = {} }) => { 
  const params =  useParams ();
  const { appname, pagename } =params;
  const { 
    
  pageResourceState, 
  getPageResourceState,
  setPageResourceState,
  appContext,
  selectedPage,
  queryState = {}, 
  setQueryState ,
  pageClientState,  
  setPageClientState,

} = React.useContext(AppStateContext);
  const [loaded, setLoaded] = React.useState(false)
  const applications = typeof apps === 'object'
    ? apps 
    : JSON.parse(apps)

    const location = useLocation();
    const [refresh, setRefresh] = React.useState(location.state?.refresh);
  const appData = applications.find(f => f.path === appname);
  const firstpage = !!pagename ? appData.pages.find(f => f.PagePath === pagename) : appData.pages[0];
  ; 

  // const createBreadcrumbs = React.useCallback((node, items = []) => {
  //   const selectedPage = appData.pages.find(f => f.ID === node.pageID);

  //   if (selectedPage) {
  //     return createBreadcrumbs(selectedPage).concat([{
  //       text: node.PageName,
  //       href: `/apps/${appname}/` + node.PagePath
  //     }]);
  //   }

  //   return items.concat({
  //     text: node.PageName,
  //     href: `/apps/${appname}/` + node.PagePath
  //   })
  // } , [ appname])
 

  const componentTreeProps = {

    pageClientState, 
    setPageClientState,
    
    pageResourceState, 
    getPageResourceState,
    setPageResourceState,
 
  }

  const applicationTreeProps = {   
    preview: false,
    queryState,
    setQueryState, 
    application: appData
  }

 
  React.useEffect(() => {  
    if(!refresh) return 
    setQueryState(qs => ({...qs, rendered: true, page: firstpage, appContext: appData})) 
    setRefresh(false)
  }, [firstpage, refresh, queryState, setQueryState, appData]);

     

  // const breadcrumbs = createBreadcrumbs(firstpage);

  // if (!queryState.rendered) {
  //   return <>{JSON.stringify(queryState)}</>
  // }

  // return <>
  // {JSON.stringify(params['*']) +
  //  JSON.stringify(firstpage.parameters) }
  // </>

 return (
   <>
  {/* <Breadcrumbs sx={{m: 2}} separator={<b>›</b>} aria-label="breadcrumb">
    {breadcrumbs.map((crumb, o) => crumb.href 
      ? <Link key={o} href={crumb.href}><Typography variant="body2">{crumb.text}</Typography></Link> 
      : <Typography key={o} sx={{ fontWeight: 600 }} variant="body2">{crumb.text}</Typography>)}
  </Breadcrumbs> */} 

{/* [{JSON.stringify(selectedPage.parameters)}] */}
<ApplicationTree {...applicationTreeProps}  />

{!!selectedPage && appContext && <ComponentTree 
                  loadID={uniqueId()}
      loaded={loaded} 
      {...componentTreeProps} 
      setLoaded={setLoaded} 
      themes={appContext?.themes || []}
      appContext={appContext} 
      selectedPage={selectedPage} />}
  
</>
 );
}

 


Renderer.defaultProps = {};
export default Renderer;
