import { createContext, useContext, useState } from "react";

const authContext = createContext();

export function authProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  //login function saves the token in two places
  const login = (token, user) => {
    localStorage.setItem("token", token); //this stores the token in browser storege to save login even after the page refresh
    setToken(token); //this stores the token as a context so any other component can access it
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <authContext.Provider value={{ token, user, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

//this is a shortcut function for access user data. Instead of invoke useContext(authContext) just invoke useAuth()
export function useAuth() {
  return useContext(authContext);
}
