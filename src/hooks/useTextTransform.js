import * as React from 'react';
import { useParams } from "react-router-dom"; 
import { AppStateContext } from './AppStateContext';

export const useTextTransform = () => {

  const {
    preview,
    shout,  
    pageClientState,  
    appContext,
    selectedPage, 
    queryState, 
    setPageClientState,
    setApplicationClientState,
    applicationClientState, 

 } = React.useContext(AppStateContext);

  const routeParams = useParams();

  /**
   * get appropriate client scope base on key format 
   * @param {*} scopeKey key name to parse
   * @returns  isApplicationScope ,
      boundTo key of the scope object
      scope current scope of the variable, if present
      clientState state object to parse,
      stateSetter setter function to mutate state
   */
  const getPropertyScope = scopeKey => {

    if (!scopeKey) {
      return { }
    }
    const [scope, key] = scopeKey.split('.');
    const isApplicationScope = scope === 'application' 

    const boundTo = !!key 
      ? key 
      : scopeKey;


    const clientState = isApplicationScope 
      ? applicationClientState
      : pageClientState 

    const stateSetter = isApplicationScope 
      ? setApplicationClientState 
      : setPageClientState

    return {
      isApplicationScope,
      boundTo,
      scope,
      clientState,
      stateSetter
    }
  }
 
  /**
   * returns valid parameters object for the current scope 
   * @returns parameters object
   */
  const getParametersInScope = React.useCallback(() => { 

    const { page: previewPage } = queryState; 

    // in preview mode find the page in the queryState prop
    const targetPage = preview ? previewPage : selectedPage;

    const parameters = {};
    const routeProps = routeParams['*'];
   
  
    // when route props are populated use those values
    if (routeProps && targetPage?.parameters) {
  
      // assign values from route path to parameters object
      const routeProp = routeProps.split('/')
      Object.keys(targetPage.parameters).map((parameterKey, i) => {
        parameters[parameterKey] = routeProp[i]
      } );
    
      return parameters; 
    }

    // otherwise return values from query state if present
    if (!!Object.keys(queryState.params || {}).length) { 
      return queryState.params;
    }
   
   
    // console.log ( 'No parameters in scope' );
    // return empty object if neither option found
    return {} 
  }, [queryState, selectedPage, routeParams])
   


  /**
   * transform text with {bracketed} values
   * @param {*} interpolatedText text to be parsed
   * @param {*} innerState client state object to pull values from (defaults to scope derived from key name)
   * @returns transformed text
   */
  const interpolateText = (interpolatedText, innerState) => {
    
    const scopeParams = getParametersInScope();



    const bracketTest = /\{([^}]+)\}/g
    let deterpolatedText = interpolatedText;
  
    // loop through all matches and replace value
    findMatches(bracketTest, interpolatedText).map(match => {
      const [wholeText, foundText] = match;
      const { clientState, boundTo, scope } = getPropertyScope(foundText);
      // derived from key name used when no scope is defined
      const textScope = innerState || clientState;

      // set inner text based on scope
      const innerText = scope === 'parameters'

        // for parameter strings, pull from current PARAMETERS scope
        ? (!scopeParams ? 'unknown' : scopeParams[boundTo] || `---`)

        // otherwise pull from CLIENT or APPLICATION scope
        : textScope[boundTo] || `...`;    
  

       deterpolatedText = deterpolatedText.replace(wholeText, innerText)
 
    }) 

 
    return deterpolatedText;
  }
  

  /**
   *  returns value from an event target using its "target" and "value" properties
   * @param {*} param1 { target - the ID of the event target 
   * (for setState events, this is the key of the state object), value - value passed into the event}
   * @param {*} eventProps - data passed into the event 
   * @returns parsed value
   */
  const getEventTargetProperty = ( 
    clientState,
    { target: eventTarget, value: propertyValue }, 
    eventProps,  
  ) => {
//avatar_open,avatar_closed,photo_open
    const regex = /\[([^}]+)\]/g;
    const literal = regex.exec(propertyValue);

    !!shout && shout({ eventTarget, clientState, eventProps, routeParams }, `getEventTargetProperty: Checking propertyValue "${propertyValue}"`)

    // literal values formatted as [propertyValue]
    if (literal) { 
      return literal[1];
    }

    // blank for nulls (?)
    if (!propertyValue && propertyValue !== 0) {
      return ''
    }

    // no need to parse booleans
    if (typeof propertyValue === 'boolean') {
      return propertyValue;
    }
 
    // transform 'dot' notation values
    // when propertyValue has a DOT, it is a variable in the PARAMETERS or EVENT scope
    if (propertyValue.indexOf('.') > 0) {

      const [scope, scopekey, fieldname] = propertyValue.split('.'); 


      // parameter scope values pulled from current route
      if (scope ==='parameters') { 
        return routeParams[scopekey]  
      }  
 
      // "eventProps" are the fields from the event
      // must have eventProps to transform values 
      if (!eventProps) return 'getEventTargetProperty: NO EVENT DATA';
 

      // values with 3 parts are data-bound
      // values "[component].data.[fieldname]"
      if (!!fieldname) { 
        return eventProps[fieldname];
      }

      // values with 2 parts are pulled from the 
      // event fired by the calling component 
      return eventProps[scopekey]
    }


    // when propertyValue has no DOT, look first in the APPLICATION or CLIENT scope
    if (typeof propertyValue === 'number' || propertyValue?.indexOf('|') < 0) {

      // if the key exists in current client state, return that
      if (clientState[propertyValue]) {
        return clientState[propertyValue];
      }

      // when propertyValue has no DOT and is not in the application or client scope
      // the return as a literal value
      return propertyValue;
    }

    // literal values with 2 parts delimited by "|" are meant to toggle
    // based on the curent APPLICATION or CLIENT scope properties
    const [trueProp, falseProp] = propertyValue.split('|');
    return clientState[eventTarget] === trueProp ? falseProp : trueProp;
  } 

  return {
    interpolateText,
    getParametersInScope,
    getPropertyScope
  }

}


function findMatches(regex, str, matches = []) { 
  const res = regex.exec(str)  
  res && matches.push(res) && findMatches(regex, str, matches)
  return matches
}
