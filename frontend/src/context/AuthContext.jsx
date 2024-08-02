import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const { data } = await api.post("/users/login", {
        username,
        password,
      });
      window.localStorage.setItem("token", data?.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data } = await api.post("/users/register", {
        username,
        email,
        password,
      });
      setUser(data);
      toast.success("User registered successfully");
    } catch (error) {
      toast.error("User registered failed");
      console.error("Registration failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        register,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
