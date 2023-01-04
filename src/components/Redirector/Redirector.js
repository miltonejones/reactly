import React from 'react';
import { useParams, Navigate } from "react-router-dom"; 
import { AppStateContext } from '../../context';
  
 // redirect user to the application homepage if no page is 
 // specified in the route
const Redirector = () => {
  const { appContext, preview, debugMode } = React.useContext(AppStateContext);
  const { appname, pagename } = useParams();

  if (!!appContext) {
    const { homePage } = appContext;
  
    if (!!homePage && !pagename && !preview) {
      const path = appContext.pages.find(f => f.ID === homePage).PagePath;
      if (path) {
        const rootPath = debugMode ? 'debug' : 'apps';
        const redirectPath = `/${rootPath}/${appname}/${path}`;
        return <Navigate to={redirectPath} />
      }
    }
  
  } 
  return <i />
}

Redirector.defaultProps = {};
export default Redirector;
