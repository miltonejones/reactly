
import React from "react";
import { AppStateContext } from "../../hooks/AppStateContext"; 
import { usePageContext } from "../../hooks/usePageContext";
import { useLocation, useParams } from 'react-router-dom';
import { objectReduce } from "../library/util";

export const usePageLoader = () =>{

  const [pageState, setPageState] = React.useState('LOADING')

  const { 
    setQueryState, 
    queryState,
    selectedPage,
    setPageClientState,
    setBusy,
    shout, 
  } = React.useContext(AppStateContext);

  const location = useLocation()
  const { handleComponentEvent } = usePageContext(); 
  const { pagename, appname } = useParams()

  /**
   * returns a resolved Promise when a full page loads
   */
  const handlePageLoad = React.useCallback(() =>  new Promise(resolve => {
    shout(selectedPage, 'staring page load')
    // set pageClientState before attempting any events
    new Promise (report => {

      // don't bother loading for skeleton pages
      if (!selectedPage || selectedPage.skeleton) {
        return report(false);
      }
      setBusy && setBusy('loading page...');
      setPageState('Setting page state...');
      shout(selectedPage, 'Setting page state...')


      const stateProps = !selectedPage?.state
        ? null
        : objectReduce(selectedPage.state); 


      // set client state if it is not already set
      setPageClientState(state => {     
        const hasState = !!state && !!Object.keys(state).length;
        shout({ hasState, stateProps }, 'loading page state');
        if ( !hasState && !!stateProps && !!Object.keys(stateProps).length ) {  
          report(stateProps);
          return stateProps;
        } 
        report(state);
        return state;
      }); 
    })


    // then fire the onPageLoad event once all state variables are set
    .then(props => {

      // if props is false then this was a skeleton page. stop here
      if (!props) {
        return resolve(false);
      }
      setBusy && setBusy('page loaded...')
      setPageState('Firing page events...');
      shout(selectedPage, 'Firing page events...')
       
 

      const solvable = !!selectedPage?.events
      shout({ selectedPage, solvable  }, 'loading '+(selectedPage.skeleton ? "skeleton" : "full")+' page events', 
        'blue', 600);

      // if the page has events, fire them here
      // TODO: what happens when the page gets more than an "onPageLoad" event?
      !!selectedPage?.events && handleComponentEvent(null, {
            name: 'onPageLoad',
            component: selectedPage,
            options: {
              ID: selectedPage?.ID,
              pagename, 
              appname,
              ...props
            }
        })
      
      // resolve true if there was a page to load
      resolve(!!selectedPage); 
      setBusy && setBusy(false);

    })


  }), [
    selectedPage,
    handleComponentEvent,
    pagename, 
    appname
  ]);
 
  // sets pageLoaded to FALSE on navigation
  React.useEffect(() => {  

    shout ({
      ...location,
      pageLoaded: queryState.pageLoaded
    }, 'Handling route change');

    // clear page state for the next page
   // setPageClientState({});
    
    // set page loaded to false to force state to reload
    // setQueryState(qs => ({...qs, selectedComponent: null, pageLoaded: false}))  ;
  }, [location, queryState]);



  // fires when pageLoaded is FALSE
  React.useEffect(() => {   

    setPageState('Waiting for page definition...');
    // dont bother running for skeleton loads
    if (!selectedPage || selectedPage.skeleton) {
      return;
    }

     
    setQueryState(currentState => {
      
      // jot down the previous load time
      const{ loadTime, pageLoaded } = currentState;

      // stop here if the page is already loaded
      if (pageLoaded) return currentState;
 
      // stop here if the previous call was less than 2 secs ago
      if (new Date().getTime() - loadTime < 2000) {
        shout({ loadTime }, 'page loaded to quickly', 'blue')
        return currentState;
      }

      // load the page
      shout( currentState , 'Calling page load', 'red', 400);
      handlePageLoad();

      setPageState('Loaded');
      
      return {
        ...currentState,

        // set page loaded to true
        pageLoaded: true,  
        loadTime: new Date().getTime()
      }

    })
 
  }, [ 
    selectedPage,
    handlePageLoad,
    shout 
  ]);
 

  return {
    pageState
  }

}