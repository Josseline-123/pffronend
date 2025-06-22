import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    const userGuardado = localStorage.getItem("user");

    if (tokenGuardado) setToken(tokenGuardado);

    try {
      setUser(userGuardado ? JSON.parse(userGuardado) : null);
    } catch (e) {
      console.error("Error al parsear el usuario desde localStorage:", e);
      setUser(null);
    }
  }, []);

  // login ahora recibe un objeto { token, user }
  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
