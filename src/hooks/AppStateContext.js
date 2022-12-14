import * as React from 'react';
import { useNavigate, useParams } from "react-router-dom"; 

export const AppStateContext = React.createContext({});
export const EditorStateContext = React.createContext({});
export const RepeaterContext = React.createContext({});

export const useNavigation = () => {
  const navigateTo = useNavigate();
  const { setQueryState } = React.useContext(AppStateContext);
  const navigate = (href) => {
    setQueryState((s) => ({ ...s, data: null, loaded: false }));
    navigateTo(href);
  };
  return { navigate }
}



export const useAppParams = () => {
  const parm = useParams()
  return parm
}


