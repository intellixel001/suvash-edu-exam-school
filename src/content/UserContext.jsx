"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "@/api/apiClient";

// Create context
const UserContext = createContext();

// Provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user data when app starts
  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await apiClient.get("/student/me");
      setUser(res.data?.data);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Failed to fetch user"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, error, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier usage
export const useUser = () => {
  return useContext(UserContext);
};
