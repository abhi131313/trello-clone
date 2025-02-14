import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let storedUser;
    try {
      storedUser = JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.error("Error parsing user from localStorage:", error);
      storedUser = null;
    }

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    console.log("User logged in:", userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("User logged out.");
  };

  // Register function
  const register = (userData) => {
    let users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email is already registered
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) {
      alert("Email already exists. Please use a different email.");
      return;
    }

    // Create new user
    const newUser = {
      ...userData,
      id: Date.now().toString(),
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // AutoLogins the user after registration
    login(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
