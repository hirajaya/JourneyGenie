import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/users/login', { username, password });
      const userData = response.data;
      setCurrentUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post('/api/users', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (username, userData) => {
    try {
      const response = await axios.put(`/api/users/${username}`, userData);
      const updatedUser = response.data;
      
      if (currentUser.username === username) {
        const newUserData = { ...currentUser, ...updatedUser };
        setCurrentUser(newUserData);
        localStorage.setItem('user', JSON.stringify(newUserData));
      }
      
      return updatedUser;
    } catch (error) {
      throw error.response?.data || { message: 'Update failed' };
    }
  };

  const deleteAccount = async (username) => {
    try {
      await axios.delete(`/api/users/${username}`);
      if (currentUser.username === username) {
        logout();
      }
    } catch (error) {
      throw error.response?.data || { message: 'Delete failed' };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      loading, 
      login, 
      register, 
      logout, 
      updateProfile,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};