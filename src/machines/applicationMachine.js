import { createMachine, assign } from 'xstate';

export const applicationMachine = createMachine(
  {
    id: 'application_machine',
    initial: 'loading_applications',
    states: {
      loading_error: {
        invoke: {
          src: 'setError',
          onDone: [
            {
              target: 'loading_applications', 
            },
          ],
        }
      },
      loading_applications: {
        invoke: {
          src: 'initApps',
          onDone: [
            {
              target: 'applications_loaded',
              actions: 'assignAppstoContext',
            },
          ],
          onError: [
            {
              target: '#application_machine.loading_error',
              actions: 'assignErrortoContext',
            },
          ],
        },
      },
      applications_loaded: {
        invoke: {
          src: 'setAppConfig'
        },
        on: {
          LOAD_PAGE: {
            target: 'loading_page',
            actions: 'assignPageIDtoContext',
          },
          SAVE_APP: {
            target: '#application_machine.saving_application', 
            actions: 'assignApptoContext'
          },
        }, 
      },
      page_loaded: {
        initial: 'init_state',
        states: {

          
          init_state: {
            invoke: {
              src: 'setState',
              onDone: [
                {
                  target: 'page_complete',
                  actions: ['assignStatetoContext', 'setPageLoaded'],
                },
              ],
              onError: [
                {
                  target: '#application_machine.loading_error',
                  actions: 'assignErrortoContext',
                },
              ],
            },
          },



          page_complete: {
            invoke: {
              src: 'setPage'
            },

            on: {
              SAVE_APP: {
                target: '#application_machine.saving_application', 
                actions: 'assignApptoContext'
              },
            },
          },
        },
        on: {
          LOAD_PAGE: {
            target: 'loading_page',
            actions: 'assignPageIDtoContext',
          },
        },
      },
      loading_page: {
        invoke: {
          src: 'getPage',
          onDone: [
            {
              target: 'page_loaded',
              actions: 'assignPageToContext',
            },
          ],
          onError: [
            {
              target: '#application_machine.loading_error',
              actions: 'assignErrortoContext',
            },
          ],
        },
      },
      saving_application: {
        invoke: {
          src: 'saveApp',
          onDone: [
            {
              target: '#application_machine.loading_applications', 
            },
          ],
          onError: [
            {
              target: '#application_machine.loading_error',
              actions: 'assignErrortoContext',
            },
          ],
        },
      },
    },
    context: {},
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      assignErrortoContext: assign((context, event) => {
        return {
          errorMessage: event.data,
        };
      }),
      assignPageToContext: assign((context, event) => { 
        return {
          page: event.data,
        };
      }),
      assignStatetoContext: assign((context, event) => { 
        return {
          clientState: event.data,
        };
      }),
      setPageLoaded: assign(() => { 
        return {
          pageLoaded: true,
        };
      }),
      assignAppstoContext: assign((context, event) => {
        return {
          apps: event.data,
        };
      }),
      assignApptoContext: assign((context, event) => {
        return {
          app: event.app,
        };
      }),
      assignPageIDtoContext: assign((context, event) => { 
        return {
          appname: event.appname,
          pagename: event.pagename,
          pageLoaded: false,
        };
      }),
    },
  }
);
