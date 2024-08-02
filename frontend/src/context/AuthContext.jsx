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
      getUserByUserName(username);
      window.localStorage.setItem("token", data?.token);
    } catch (error) {
      toast.error(error?.response?.data?.error);
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

  const getUserByUserName = async (username) => {
    try {
      const { data } = await api.get("/users/getIdUser");
      const user = data?.user?.find((usr) => usr?.username === username);
      window.localStorage.setItem("userID", user?._id);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userID");
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
