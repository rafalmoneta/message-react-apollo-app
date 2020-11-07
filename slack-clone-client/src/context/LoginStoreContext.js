import React, { useContext } from 'react';
import { useLocalStore } from 'mobx-react';
import { createLoginStore } from '../stores/LoginStore';

const LoginContext = React.createContext(null);

export const LoginProvider = ({children}) => {
  const loginStore = useLocalStore(createLoginStore);

  return <LoginContext.Provider value={loginStore}>
    {children}
  </LoginContext.Provider>
}

export const useLoginStore = () => useContext(LoginContext)