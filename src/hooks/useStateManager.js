import * as React from 'react';
import { AppStateContext } from './AppStateContext';
import { objectReduce } from "../components/library/util";


export const ClientStateContext = React.createContext({});


export const useStateManager = () => {
  const {
    queryState = {}, 
    selectedPage
  } = React.useContext(AppStateContext);
  const [pageClientState, setPageClientState] = React.useState({});
 
  const selectedPageState = selectedPage?.state;
  const stateProps = !selectedPageState ? {} : objectReduce(selectedPageState);

  return {
    pageClientState, setPageClientState
  }

}