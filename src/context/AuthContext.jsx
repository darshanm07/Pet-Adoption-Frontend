import { createContext, useState, useEffect } from "react";
import { authAPI } from "../api/authAPI";
import { toast } from "react-toastify";
import { getFcmToken } from "../utils/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Get the FCM token
      const fcmToken = await getFcmToken();

      const { data } = await authAPI.login({ email, password, fcmToken });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Login successful!");
      return data;
    } catch (error) {
      console.error("Login error:", error); // Log the error to understand what is going wrong
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      // Get the FCM token
      const fcmToken = await getFcmToken();
      const { data } = await authAPI.register({ ...userData, fcmToken });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      toast.success("Registration successful!");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
