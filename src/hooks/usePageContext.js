import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppStateContext } from "./AppStateContext";
import moment from "moment";
import Observer from "../util/Observer";
import { PageStateContext } from "./PageStateContext";
import { useOpenLink } from "./subhook";
import { usePageRef } from "./subhook";
import { useDataResource } from "./subhook";
import { useRunScript } from "./subhook";
import { getPropertyValueFromString } from "../components/library/util";
import { map } from "../components/library/util";
import { useTextTransform } from "./useTextTransform";

export const eventTypes = [
  {
    name: "onPageLoad",
    description: "Page  finishes loading.",
  },
  {
    name: "dataLoaded",
    description: "Data finishes loading.",
  },
  {
    name: "loadStarted",
    description: "Data starts loading.",
  },
];

export const usePageContext = () => {
  const { handleClick, loud } = React.useContext(PageStateContext);

  const {
    setPageError,
    pageResourceState,
    setPageResourceState,
    getPageResourceState,

    preview,

    pageModalState,
    setPageModalState,

    shout,

    pageRefState,
    setPageRefState,

    setQueryState,
    pageClientState,
    setPageClientState,
    // getPageClientState,

    appContext,
    selectedPage,
    monitoredEvents,
    Alert,
    queryState,
    Library,
    setApplicationClientState,
    applicationClientState,
    supportedEvents,
  } = React.useContext(AppStateContext);

  const { openLink, openPath, createPageParams } = useOpenLink();
  const { getRefByName, execRefByName, getRef } = usePageRef();

  const listening = React.useCallback((name) => monitoredEvents.indexOf(name) > -1, [monitoredEvents]);

  const { getApplicationScripts, executeScriptByName, executeScript } =
    useRunScript();

  const { getResourceByName } = useDataResource();

  // const applicationScope = !getPageClientState_

  // const getPageClientState = () => applicationScope
  //   ? pageClientState
  //   : applicationClientState

  const { interpolateText, getParametersInScope, getPropertyScope } =
    useTextTransform();

  const includedEvents = eventTypes.concat(
    !supportedEvents ? [] : supportedEvents
  );
  const routeParams = useParams();
  const navigate = useNavigate();

  const hello = async (json, msg) => {
    if (!shout) return console.log({ shoutless: json });
    await shout(json, msg);
  };

  const drillPath = (object, path) => {
    const arr = path.split(".");
    const first = arr.shift();
    const node = object[first];

    if (arr.length) {
      return drillPath(node, arr.join("."));
    }

    return node;
  };

  const execResourceByName = async ( name, options ) => {

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

  }

  const executeComponentRequest = async (
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

    const endpoint = isGetRequest ? `${url}${delimiter}${querystring}` : url;

    if (listening("executeComponentRequest")) {
      await hello({ endpoint, connection, path, querystring });
    }

    if (events) {
      events
        .filter((e) => e.event === "loadStarted")
        .map((e) => {
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
          );
        });
    }

    let requestOptions = null;
    const scriptList = getApplicationScripts();

    if (transform && !isGetRequest) {
      const script = scriptList?.find((f) => f.ID === transform.ID);
      querystring = await executeScript(script.ID, querystring, execResourceByName);

      requestOptions = {
        method,
        body: JSON.stringify(querystring),
        headers: { "Content-Type": "application/json" },
      };
    }

    const response = await fetch(endpoint, requestOptions);
    let json = await response.json();

    if (transform && isGetRequest) {
      const script = scriptList?.find((f) => f.ID === transform.ID);
      json = await executeScript(script.ID, json, execResourceByName);
    }

    const rows = !node ? json : drillPath(json, node);

    const collated = !isGetRequest
      ? json
      : rows.map((row) =>
          columns.reduce((items, res) => {
            items[res] = row[res];
            return items;
          }, {})
        );

    if (events) {
      events
        .filter((e) => e.event === "dataLoaded")
        .map((e) => {
          handleComponentEvent(
            {},
            {
              name: e.event,
              options: json,
            },
            events
          );
        });
    }

    return collated;
  };

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
 

  const executeTerms = async (  
      terms, 
      payload,
      connections,
      resource,  
      getProp
    ) => {

    let querystring;
    const delimiter = resource.format === "rest" ? "/" : "&";

    // await Alert (<pre>{JSON.stringify(terms,0,2)}</pre>);

    if (resource.method === "GET") {
      // build query string from trigger params
      querystring = Object.keys(terms)
        .filter(f => !!terms[f])
        .map((term) => {
          const [scope, key] = term.split('.');
          const property = !key 
            ? getProp(terms[term])
            : terms[term];

          return resource.format === "rest"
            ? property
            : `${key || term}=${property}`;
        })
        .join(delimiter);
  
    } else {

      // for non-GET requests
      querystring = payload;
    }

    // await Alert (querystring);


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


  }


  const handleComponentEvent = async (event, eventProps, events) => {
    const { component, name, options, sources, connect, stateProps } =
      eventProps;

    if (!(events || component?.events))
      return console.log("No events in the component");

    const triggers = (events || component?.events).filter(
      (e) => e.event === name
    );

    setPageError && setPageError(null);

    // const triggerLog = {}

    // console.log ('Found %c%s %s events', 'color: cyan', triggers.length, name);

    await map(triggers, async (trigger, index) => {

      // if (triggerLog[trigger.ID]) {
      //   return console.log ("SKipping repeat trigger %s: %s", index, trigger.ID)
      // }

      // Object.assign(triggerLog, {
      //   [trigger.ID]: true
      // });

      // console.log({index, triggerLog})

      const speakable =
        !!listening(trigger.action.type) && !!listening(trigger.event);
// shout ({
//   type: listening(trigger.action.type),
//   event: listening(trigger.event),
//   trigger
// })
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
          `Trigger ${index}. ${trigger.action.type} on ${trigger.action.target}`
        );
 

      const { selectedComponent, ...rest } = queryState;

      const currentParameters = getParametersInScope();
      const pageParameters = createPageParams(trigger.action.params, options);

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
        case "openLink":
          return openLink(
            // ID of the target link
            trigger.action.target,

            // parameters included in the event
            trigger.action.params,

            // options passed from the event
            options
          );

          break;
        case "dataExec":


          const resources = appContext?.resources || sources;
          if (!resources) {
            Alert(JSON.stringify(sources));
            return Alert("no resources were found to  meet this request.");
          }

          const { triggers } = trigger.action;

          const resource = resources.find(
            (f) => f.ID === trigger.action.target
          );

          // set state source to read values from
          const clientState = !pageClientState ? stateProps : pageClientState;

          // set URL delimiter
          const delimiter = resource.format === "rest" ? "/" : "&";

          let querystring;

          // quick method to get a property value from a term key
          const getProp = (value) =>
            getPropertyValueFromString(
              clientState,
              {
                ...trigger.action,
                value,
              },
              options,
              currentParameters, 
              speakable ? hello : () => true
            );

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

          if (resource.method === "GET") {
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
              const plural = valid.length !== 1 ? "s have" : " has";
              const msg = (
                <div>
                  Could not complete "{resource.name}" request because{" "}
                  {valid.length} field{plural} problems:{" "}
                  {valid.map((f) => (
                    <li>{f.error}</li>
                  ))}
                </div>
              );
              return setPageError && setPageError({
              
                message: msg,
                fields: valid,
                execute: async (missing) => {
                  await execute({
                    ...trigger.action.terms,
                    ...missing
                  })
                }
              
              });
              // return await Alert(msg, 'Request cancelled');
            }

 


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

  };
 

  const attachEventHandlers = React.useCallback(
    (component) => {
      const { settings, events, boundProps } = component;
      const { Methods } = Library[component.ComponentType] ?? {};
 

     // console.log ( `%cattachEventHandle  ${component.ComponentName || component.name}`, 'color: yellow') 

// console.log ({ 
//   names: includedEvents
//   .map((e) => e.namer, 
// })
      const eventHandlers = includedEvents 
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
          const { boundTo, clientState, stateSetter } =
            getPropertyScope(boundKey);

          if (attribute && clientState) {
            const currentParameters = getParametersInScope();

            //  console.log ({ currentParameters })

            const attributeProp = interpolateText(clientState[boundTo]);

            if (attributeProp !== undefined && typeof attributeProp !== 'undefined') {

              // component.ComponentType === 'Collapse' && 
              //   console.log ( {  component: component.ComponentName, attribute, attributeProp, boundTo })

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
      selectedPage,
      queryState,
      setPageClientState,
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
