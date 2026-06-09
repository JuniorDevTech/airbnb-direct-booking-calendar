/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";

import { login as loginApi, getMe } from "../features/auth/services/authApi";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const data = await getMe();

      setUser(data);

      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem("token");

      setUser(null);

      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    const data = await loginApi(credentials);

    localStorage.setItem("token", data.token);

    setUser(data.user);

    setIsAuthenticated(true);

    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
