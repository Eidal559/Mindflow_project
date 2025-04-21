// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on page load
  useEffect(() => {
    const userSession = localStorage.getItem('user');
    if (userSession) {
      setUser(JSON.parse(userSession));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    // In a real app, you'd verify credentials with a backend
    // For now, we'll simulate a successful login
    const user = {
      id: 1,
      name: userData.email.split('@')[0], // Extract name from email
      email: userData.email,
      joinDate: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long'}),
      stats: {
        sessionsCompleted: Math.floor(Math.random() * 30),
        averageStressLevel: (Math.random() * 5 + 3).toFixed(1),
        streakDays: Math.floor(Math.random() * 15)
      }
    };
    
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  };

  // Register function
  const register = (userData) => {
    // In a real app, you'd send this to a backend
    // For now, we'll simulate a successful registration
    const user = {
      id: 1,
      name: userData.name,
      email: userData.email,
      joinDate: new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long'}),
      stats: {
        sessionsCompleted: 0,
        averageStressLevel: 5.0,
        streakDays: 0
      }
    };
    
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(user));
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        user, 
        loading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
