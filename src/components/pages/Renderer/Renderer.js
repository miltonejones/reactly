import React from 'react';
import {
  Link, 
  Typography, 
  Fab,
} from "@mui/material";
import { Flex, TextBtn, ComponentTree, QuickMenu, Spacer, ContentTree, PageTree } from "../..";
import { Gamepad} from "@mui/icons-material";
import { AppStateContext } from '../../../context';
import { useParams, useLocation } from "react-router-dom";
import { ApplicationTree } from "../..";
import { ConsoleDrawer } from "../..";
import { uniqueId } from '../../library/util';
  
 
const Renderer = ({ applications: apps = {} }) => { 
  const params =  useParams ();
  const { appname, pagename } =params;
  const { 
  debugMode,
  pageResourceState,  
  setPageResourceState,
  appContext,
  selectedPage,
  queryState = {}, 
  setShowTrace,
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
  const firstpage = !!pagename ? appContext.pages.find(f => f.PagePath === pagename) : appContext.pages[0];
  ;  
 

  const componentTreeProps = {

    pageClientState, 
    setPageClientState,
    
    pageResourceState,  
    setPageResourceState,
 
  }

  const applicationTreeProps = {   
    preview: false,
    queryState,
    setQueryState, 
    application: appContext
  }

 
  React.useEffect(() => {  
    if(queryState.pageLoaded) return 
    setQueryState(qs => ({...qs, pageLoaded: true, page: selectedPage, appContext: appContext})) ;  
  }, [selectedPage, refresh, queryState, setQueryState, appContext]);

     
 

 return (
   <>
 
<ApplicationTree {...applicationTreeProps}  />

{!!selectedPage && appContext && <ComponentTree 
                  loadID={uniqueId()}
      loaded={loaded} 
      {...componentTreeProps} 
      setLoaded={setLoaded} 
      themes={appContext?.themes || []}
      appContext={appContext} 
      selectedPage={selectedPage} />}
  {!!debugMode && <Fab onClick={() =>setShowTrace(true)} 
    sx={{position:'absolute', bottom: 50, right: 50}}>
    <Gamepad />
  </Fab>}
  <ConsoleDrawer
        handleSwitch={ () =>setShowTrace(!1)}
       />

</>
 );
}

 


Renderer.defaultProps = {};
export default Renderer;
