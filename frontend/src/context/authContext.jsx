// import { json } from "express";
import { createContext, useContext, useState } from "react";

const authContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("user");
      return stored && stored !== "undefined" ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  //login function saves the token in two places
  const login = (token, user) => {
    localStorage.setItem("token", token); //this stores the token in browser storege to save login even after the page refresh
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    setToken(token); //this stores the token as a context so any other component can access it
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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

//base URL for Book covers
export const COVER_BASE_URL = "http://localhost:5000/uploads/covers";
