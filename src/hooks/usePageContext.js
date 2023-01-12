import * as React from "react";
// import { useNavigate, useParams } from "react-router-dom";
import { AppStateContext } from "../context";
// import moment from "moment";
// import Observer from "../util/Observer";
import { PageStateContext } from "../context";
import { useOpenLink } from "./subhook";
import { usePageRef } from "./subhook";
// import { useDataResource } from "./subhook";
import { useRunScript } from "./subhook";
import { getPropertyValueFromString } from "../components/library/util";
import { map } from "../components/library/util";
import { useTextTransform } from "./useTextTransform";
 

export const usePageContext = () => {
  // const { handleClick, loud } = React.useContext(PageStateContext);

  const { 
    pageResourceState,
    setPageResourceState,
    // getPageResourceState,

    preview,

    // pageModalState,/
    setPageModalState,

    shout,

    // pageRefState,/
    // setPageRefState,

    // setQueryState,
    pageClientState,
    setPageClientState,
    // getPageClientState,
    // setDisableRequests,
    disableRequests,
    appContext,
    selectedPage,
    monitoredEvents,
    Alert,
    // queryState,
    // Library,
    setApplicationClientState,
    // applicationClientState,
    supportedEvents,
  } = React.useContext(AppStateContext);

  const { openLink, openPath, createPageParams } = useOpenLink();
  const { getRefByName, execRefByName, getRef } = usePageRef();

  const listening = React.useCallback((name) => monitoredEvents.indexOf(name) > -1, [monitoredEvents]);

  const { getApplicationScripts, invokeScriptSync, executeScript } =
    useRunScript();

  // const { getResourceByName } = useDataResource();

  // const applicationScope = !getPageClientState_

  // const getPageClientState = () => applicationScope
  //   ? pageClientState
  //   : applicationClientState

  const { interpolateText, getParametersInScope, getPropertyScope } =
    useTextTransform();
 
  // const routeParams = useParams();
  // const navigate = useNavigate();

  const hello = React.useCallback(async (json, msg) => {
    if (!shout) return console.log({ shoutless: json });
    await shout(json, msg);
  }, [shout]);


  const drillPath = React.useCallback((object, path) => {
    console.log ({ path })
    const delimiter = '.';
    // const delimiter = '/';
    const arr = path.split(delimiter);
    const first = arr.shift();
    const node = object[first];

    if (arr.length) {
      return drillPath(node, arr.join(delimiter));
    }

    return node;
  }, []);


  const executeComponentRequest = React.useCallback(async (
    connections,
    querystring,
    res,
    delimiter = "?"
  ) => {
    const { events, connectionID, method, path, node, columns, transform } =
      res;
    const connection = connections.find((f) => f.ID === connectionID);
    const url = new URL(path, connection.root);

    const isGetRequest = method === "GET";

    const suffix = typeof querystring === 'string' && !!querystring?.length
      ? `${delimiter}${querystring}`
      : ''

    const endpoint = isGetRequest ? `${url}${suffix}` : url;

    if (listening("executeComponentRequest")) {
      await hello({ endpoint, connection, path, querystring });
    }

    if (events) {
      events
        .filter((e) => e.event === "loadStarted")
        .map((e) =>  
          handleComponentEvent(
            {},
            {
              name: e.event,
              options: {
                url,
                endpoint,
              },
            },
            events
          ) 
        );
    }

    let requestOptions = null;
    const scriptList = getApplicationScripts();

    if (transform) {
      const transformID = transform.ID || transform;
      const script = scriptList?.find((f) => f.ID === transformID);
      querystring = await executeScript(script.ID, querystring, execResourceByName);
    }

    if (!isGetRequest) {
      requestOptions = {
        method,
        body: JSON.stringify(querystring),
        headers: { "Content-Type": "application/json" },
      };
    }

    const response = await fetch(endpoint, requestOptions);
    let json = await response.json();

    shout ({json, res}, res.name + ' data received');
    if (transform && isGetRequest) {
      const transformID = transform.ID || transform;
      shout ({transform}, 'transforming');
      const script = scriptList?.find((f) => f.ID === transformID);
      json = await executeScript(script.ID, json, execResourceByName);
    }

    const rows = !(!!node && !!columns?.length) ? json : drillPath(json, node);

    const collated = !isGetRequest || !rows || !rows?.map
      ? json
      : rows?.map((row) =>
          columns.reduce((items, res) => {
            items[res] = row[res];
            return items;
          }, {})
        );

    if (events) {
      events
        .filter((e) => e.event === "dataLoaded")
        .map((e) =>  
          handleComponentEvent(
            {},
            {
              name: e.event,
              options: json,
            },
            events
          ) 
       );
    }

    return collated;
    // eslint-disable-next-line
  },[drillPath, executeScript, getApplicationScripts,  hello, listening, shout]);

  // trackName,artworkUrl100,collectionName,artistName
  const execResourceByName = React.useCallback(async ( name, options ) => {

    const resource = appContext.resources.find(
      (f) => f.name === name
    );

    if (!resource) {
      Alert (`No resource named ${name} was found`)
      return false;
    }

    return await executeComponentRequest(
      appContext.connections,
      options,
      resource,
      resource.format === "rest" ? "/" : "?"
    );

  }, [Alert, appContext.connections, appContext.resources, executeComponentRequest]);

  const handleComponentRequest = (querystring, resource) => {
    executeComponentRequest(appContext.connections, querystring, resource).then(
      (records) => {
        setPageResourceState((s) =>
          s
            .filter((e) => e.resourceID !== resource.ID)
            .concat({
              resourceID: resource.ID,
              name: resource.name,
              records,
            })
        );
      }
    );
  };
 

  const commitComponentRequest = React.useCallback(async ( connections, querystring, resource) => {

    const records = await executeComponentRequest(
      connections,
      querystring,
      resource,
      resource.format === "rest" ? "/" : "?"
    );

    const datum = {
      resourceID: resource.ID,
      name: resource.name,
      records,
      querystring
    };

    if (!pageResourceState) {
      setPageResourceState([datum]);
    } else {
      setPageResourceState((s) =>
        (s || [])
          .filter((e) => e.resourceID !== resource.ID)
          .concat(datum)
      );
    } 

  },[executeComponentRequest, pageResourceState, setPageResourceState]);

  const executeTerms = React.useCallback(async (  
      terms, 
      payload,
      connections,
      resource,  
      getProp
    ) => {

    let querystring;
    const delimiter = resource.format === "rest" ? "/" : "&";

    // await Alert (<pre>{JSON.stringify(terms,0,2)}</pre>);

    if (resource.method === "GET" && !!terms) {
      // build query string from trigger params
      querystring = Object.keys(terms)
        .filter(f => !!terms[f])
        .map((term) => {
          const vars = term.split('.');
          const key = vars[1];
          const property = !key 
            ? getProp(terms[term])
            : terms[term];

          return resource.format === "rest"
            ? encodeURIComponent(property)
            : `${key || term}=${encodeURIComponent(property)}`;
        })
        .join(delimiter);
  
    } else {

      // for non-GET requests
      querystring = payload;
    }
 
   return await commitComponentRequest(connections, querystring, resource); 

  },[commitComponentRequest]);

  const clearResource = React.useCallback((resource) => {

    const datum = {
      resourceID: resource.ID,
      name: resource.name ,
      records: [],
      update: (index, key, value) => {
        resource.records = resource.records.map((record, i) => i === index 
          ? {...record, [key]: value} 
          : record);
      }
    };
 
    if (listening("dataExec")) { 
      hello(
        { datum },
        `Clearing ${resource.name}`
      );
    }

    if (!pageResourceState) {
      setPageResourceState([datum]);
    } else {
      setPageResourceState((s) =>
        (s || [])
          .filter((e) => e.resourceID !== resource.ID)
          .concat(datum)
      );
    }

  },[ hello, listening, pageResourceState, setPageResourceState]);


  const handleComponentEvent = React.useCallback( async (event, eventProps, events) => {
    const { component, name, options, sources, connect } =
      eventProps;

    if (!(events || component?.events))
      return console.log("No events in the component");

    const triggers = (events || component?.events).filter(
      (e) => e.event === name
    );
 

    // const triggerLog = {}

    // console.log ('Found %c%s %s events', 'color: cyan', triggers.length, name);

    await map(triggers, async (trigger, index) => {

      // console.log ({
      //   trigger
      // })

      const speakable =
        !!listening(trigger.action.type) && !!listening(trigger.event);

        
      // temporary logging
      speakable &&
        console.log(
          '%s, triggering "%s" script on %s',
          index,
          trigger.action.type,
          trigger.action.target,
          trigger,
          {
            caller: event?.currentTarget,
            eventProps,
          }
        );

      speakable &&
        shout(
          { trigger, options },
          `Trigger ${index}. ${trigger.action.type}.${name} on ${trigger.action.target}`,
          'firebrick',
          800
        );
 

      // const { selectedComponent, ...rest } = queryState;

      const currentParameters = getParametersInScope();
      const currentClientState = await new Promise(yes => {
        setPageClientState(state => {
          yes(state);
          return state;
        })
      })
      const currentAppState = await new Promise(yes => {
        setApplicationClientState(state => {
          yes(state);
          return state;
        })
      })

      switch (trigger.action.type) {
        case "methodCall":
          setTimeout(() => {
            // TODO: add support for arguments
            execRefByName(trigger.action.componentName, (callee) => {
              // call a method on a component that has them
              callee[trigger.action.methodName].call(callee);
            });
          }, trigger.action.delay || 2);
          break;
        case "setState":

          const pageParameters = createPageParams(trigger.action.params, options);

          const { boundTo, stateSetter } = getPropertyScope(
            trigger.action.target
          );

          stateSetter((state) => {
            const obj = {
              ...state,
              [boundTo]:
                trigger.action.value === "toggle"
                  ? !state[boundTo]
                  : getPropertyValueFromString(
                      state,
                      { ...trigger.action, target: boundTo },
                      options,
                      pageParameters,
                      speakable ? hello : () => true
                    ),
            };

            if (obj[boundTo] === state[boundTo]) return state;

            if (listening('setState')) {
              shout ({ trigger }, `Setting ${boundTo} to ${obj[boundTo]}`)
            }

            return obj;
          });
          break;
        case "modalOpen":
          const componentList = (selectedPage?.components || []).concat(
            appContext.components || []
          );
          const component = componentList?.find(
            (f) => f.ID === trigger.action.target
          );

          if (component) {
            setPageModalState((s) => ({
              ...s,
              [trigger.action.target]:
                trigger.action.open === "toggle"
                  ? !s[trigger.action.target]
                  : trigger.action.open,
              anchorEl: event?.currentTarget,
              index,
            }));

            if (listening("modalOpen")) {
              hello(
                { trigger },
                `${trigger.action.open ? "Opened" : "Closed"} modal ${
                  component.ComponentName
                } on ${selectedPage?.PageName}`
              );
            }
          } else {
            const existing = appContext.pages.reduce((out, pg) => {
              const modal =
                pg.components &&
                pg.components.find((f) => f.ID === trigger.action.target);
              if (!modal) return out;
              return {
                ...modal,
                page: pg.PageName,
                selectedPage: selectedPage?.PageName,
              };
            }, false);

            if (listening("modalOpen")) {
              hello(
                {
                  trigger,
                  existing,
                  preview,
                  previewPage: selectedPage?.PageName,
                },
                "Modal does not exist"
              );
            }
            // console.log ( { appContext, trigger } )
            // Alert(<>Could not find modal {trigger.action.target}</>)
          }

          break;
        case "dataReset":
          setPageResourceState((s) =>
            s.map((state) =>
              state.resourceID === trigger.action.target
                ? {
                    resourceID: state.resourceID,
                    name: state.name,
                    records: [],
                  }
                : state
            )
          );

          break;
        case "dataRefresh":
         
          const resourceState = pageResourceState.find( 
            f => f.resourceID === trigger.action.target 
          );


          const refresher = appContext.resources.find(
            (f) => f.ID === trigger.action.target
          );

          if (!resourceState) {
            return Alert('Could not find resource')
          }

         clearResource(refresher);
         
         await commitComponentRequest(appContext.connections, resourceState.querystring, refresher); 

         console.log ({ resourceState }); 

          break;
        case "openLink":
          return openLink(
            // ID of the target link
            trigger.action.target,

            // parameters included in the event
            trigger.action.params,

            // options passed from the event
            options
          );

          // break;
        case "dataExec":

          if (disableRequests) {
            return;
          }


          const resources = appContext?.resources || sources;
          if (!resources) {
            Alert(JSON.stringify(sources));
            return Alert("no resources were found to  meet this request.");
          }

          // const { triggers } = trigger.action;

          const resource = resources.find(
            (f) => f.ID === trigger.action.target
          );

          if (!resource) {
            return Alert(`No resource was found for ${trigger.action.target}`)
          }

          // set state source to read values from
          // const clientState = !pageClientState ? stateProps : pageClientState;

          // set URL delimiter
          // const delimiter = resource.format === "rest" ? "/" : "&";

          // let querystring;

          clearResource(resource);

          // const datum = {
          //   resourceID: resource.ID,
          //   name: resource.name ,
          //   records: []
          // };
       
          // if (listening("dataExec")) { 
          //   hello(
          //     { datum },
          //     `Executing ${resource.name}`
          //   );
          // }

          // if (!pageResourceState) {
          //   setPageResourceState([datum]);
          // } else {
          //   setPageResourceState((s) =>
          //     (s || [])
          //       .filter((e) => e.resourceID !== resource.ID)
          //       .concat(datum)
          //   );
          // }
      
          // quick method to get a property value from a term key
          const getProp = (value) => {

           const { scope, boundTo, clientState } = getPropertyScope(value);

           if (listening("dataExec")) { 
            hello(
              { scope, currentAppState, clientState, boundTo},
              `Getting scope`
            );
          }

            return getPropertyValueFromString(
              scope === 'application' 
                ? currentAppState
                : currentClientState,
              {
                ...trigger.action,
                value
              },
              options,
              currentParameters, 
              speakable ? hello : () => true
            );
          }
        

          // returns a number if value is not isNaN
          const trueProp = (val) => {
            if (isNaN(val)) return val;
            return parseInt(val);
          };

          const execute = async (terms) => await executeTerms(
            terms,
            options,
            connect || appContext.connections,
            resource,
            getProp
          ); 

          // validate querystring if there is one
          // TODO: make this its own method

          if (resource.method === "GET" && !!trigger.action.terms) {
            const valid = Object.keys(trigger.action.terms).reduce(
              (ok, term) => {
                const property = getProp(trigger.action.terms[term]);
                const comparison = resource.values?.find((f) => f.key === term);
                const type1 = typeof trueProp(comparison?.value);
                const type2 = typeof trueProp(property);

                const mismatch =
                  !!comparison &&
                  typeof trueProp(comparison.value) !==
                    typeof trueProp(property);

                    

                if (!property) {
                  ok.push({
                    ...comparison,
                    error: `${term} is missing`
                  });
                } else if (mismatch)
                  ok.push(
                    {
                      ...comparison,
                      error: `${term} (${JSON.stringify(
                        trueProp(property)
                      )}) is ${type2} when type ${type1} was expected.`
                    }
                  );

                if (listening("dataExec")) {
                  console.log("validating %s:  %s", term, property);
                  hello(
                    { term, property, mismatch },
                    `Validating field "${term}" as ${JSON.stringify(property)}`
                  );
                }

                return ok;
              },
              []
            );
            if (valid.length) { 
           
              console.log("error in execute", valid);
              if (listening("dataExec")) {
                hello(
                  valid,
                  `Could not execute query`,
                  'red',
                  900
                );
              }
              return;
            } 
          } 
       
          if (listening("dataExec")) {
            console.log("execute", trigger.action.terms );
            hello(
              trigger.action.terms ,
              `Executing query`
            );
          }


          await execute( trigger.action.terms )
 
          break;
        case "scriptRun":
          executeScript(trigger.action.target, options, execResourceByName);
          break;
        default:
        // do nothing
      }
    });

  }, [
    Alert, appContext.components, appContext.connections, appContext.pages, appContext.resources, clearResource, commitComponentRequest, createPageParams, disableRequests, execRefByName, execResourceByName, executeScript, executeTerms, getParametersInScope, getPropertyScope, hello, listening, openLink, pageResourceState, preview, selectedPage?.PageName, selectedPage?.components, 
    setApplicationClientState, setPageClientState, setPageModalState, setPageResourceState,  shout
  ]);
 

  const attachEventHandlers = React.useCallback(
    (component) => {
      const { events, boundProps, scripts } = component;
      // const { Methods } = Library[component.ComponentType] ?? {};
 

 
      const eventHandlers = supportedEvents 
        .reduce((handlers, event) => {
          const eventName = event.name;
          const supported = events?.find((f) => f.event === eventName);
          if (!supported || !!handlers[eventName]) return handlers;
 
 
 
          // console.log ( ` %cattaching "${eventName}" to  
          //   ${component.ComponentName || component.name}`, 'color: red') 

          handlers[eventName] = (e, options) => {

            // console.log ('%c%s calling %c%s', 'font-weight:600,color: lime',
            //       component.ComponentName || component.name, 'color: yellow', eventName);
            if (listening('attachEventHandlers')) {
              shout({ component: component.ComponentName || component.name, eventName }, 
                  `calling ${component.ComponentName || component.name}.${eventName}`)
            }
            return handleComponentEvent(e, {
              name: eventName,
              component,
              pageClientState,

              // get current state at the time the event fires
              state: pageClientState,
              options,
              api: { getRef, getRefByName, openLink, openPath },
            });
          };
 

          return handlers;
        }, {});

      // Object.assign(eventHandlers, { boundProps });

      if (boundProps) {
        // get current state at the time the component renders

        boundProps.map((boundProp) => {

          const { attribute, boundTo: boundKey } = boundProp;
          const { scope, boundTo, clientState, stateSetter } =
            getPropertyScope(boundKey);

          if (attribute && scope === 'scripts') {
            try {

              const script = scripts?.find(d => d.ID === boundTo)
              const prop =  invokeScriptSync(script , component,  execResourceByName, clientState)
            //  console.log ({ boundTo, attribute, prop, eventHandlers })

            if (listening('attachEventHandlers')) {
              console.log({ attribute, prop}, 
                  `Setting ${attribute} to "${prop}"`)
            }

            Object.assign(eventHandlers, {
              // set current component value to client state
              [attribute]:  prop,
            });
            } catch (ex) {
              Object.assign(eventHandlers, {
                // set current component value to client state
                [attribute]:  ex.message,
              });
            }
            return;
          } 
          
          if (attribute && clientState) {
            const currentParameters = getParametersInScope();

            //  console.log ({ currentParameters })

            const attributeProp = interpolateText(clientState[boundTo]);

            if (attributeProp !== undefined && typeof attributeProp !== 'undefined') {

              //  component.ComponentName === 'Pagination-1' &&  
              //    console.log ( {  eventHandlers, attribute, attributeProp, boundTo })

              Object.assign(eventHandlers, {
                // set current component value to client state
                [attribute]: attributeProp,
              });
            }

            if (
              attributeProp?.indexOf &&
              attributeProp?.split &&
              attributeProp.indexOf(".") > 0
            ) {
              const [type, val] = attributeProp.split(".");
              if (type === "parameters") {
                if (listening('attachEventHandlers')) {
                  shout({ attribute, value: currentParameters[val], currentParameters }, 
                      `Setting ${attribute} to "${currentParameters[val]}"`)
                }
                Object.assign(eventHandlers, {
                  // set current component value to client state
                  [attribute]: currentParameters[val],
                });
              }
            }


            
            if (attribute === "value") {
              // console.log ('assigning %s.%s', component.ComponentName, attribute)
              Object.assign(eventHandlers, {
                // add onChange event to update client state
                onChange: (e) => {
                  stateSetter((s) => ({
                    ...s,
                    [boundTo]: !e.target ? e : e.target.value,
                  }));
                },
              });
            }
          }
        });
      }

      // Object.keys(eventHandlers).map (key => console.log (key, typeof eventHandlers[key]))

      // Object.keys(eventHandlers).length && console.log ({ 
      //   eventHandlers,
      //   keys: Object.keys(eventHandlers) 
      // })
 // 
//  component.ComponentName === 'Pagination-1' && console.log( eventHandlers )

      return eventHandlers;
    },
    [
      pageClientState,
      // getPageClientState,
      getRef,
      getRefByName,
      handleComponentEvent,
      openLink,
      openPath,
      // selectedPage,
      // queryState,
      // setPageClientState,
      // Library, 
      execResourceByName, 
      getParametersInScope, 
      getPropertyScope, 
      interpolateText, 
      invokeScriptSync, 
      listening, 
      shout, 
      supportedEvents
    ]
  );

  return {
    handleComponentEvent,
    pageClientState,
    setPageClientState,
    attachEventHandlers,
    executeComponentRequest,
    handleComponentRequest,
  };
};

export { PageStateContext };
