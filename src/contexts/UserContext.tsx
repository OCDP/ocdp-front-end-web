import useLocalStorage from "hooks/useLocalStorage";
import React, { createContext, useCallback, useMemo } from "react";

const UserContext = createContext({} as Contexts.User);

export const UserProvider: React.FC = ({ children }) => {
  const [user] = useLocalStorage("currentUser", {} as Models.User);

  const login = useCallback(async () => {}, []);

  const isAuthenticated = useMemo(() => true, []);
  const verifyToken = useCallback(async () => true, []);

  return (
    <UserContext.Provider value={{ user, login, isAuthenticated, verifyToken }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
