import { createContext, useContext, useState } from 'react';
import localforage from "localforage";

const AppContext = createContext();

export const checkoutStorage = localforage.createInstance({
  name: "checkout"
});

export function AuthContext({ children }) {
  const [currentUser, setUser] = useState({});

  const value = {
      currentUser,
      setUser,
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAuth() {
  return useContext(AppContext);
}