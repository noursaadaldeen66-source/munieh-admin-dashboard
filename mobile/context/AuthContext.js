
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../services/api'; // Make sure api service is available

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const loadUser = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        try {
          const user = await api.auth.getMe(); // This needs to be added to api.js
          setAuthState({
            token: token,
            user: user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Token is invalid or expired
          await AsyncStorage.removeItem('token');
          setAuthState({ token: null, user: null, isAuthenticated: false, isLoading: false });
        }
      } else {
        setAuthState({ token: null, user: null, isAuthenticated: false, isLoading: false });
      }
    };
    loadUser();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem('token', token);
    try {
        const user = await api.auth.getMe();
        setAuthState({
            token: token,
            user: user,
            isAuthenticated: true,
            isLoading: false,
        });
    } catch (error) {
        // Handle error if user fetch fails after login
        setAuthState({ token: null, user: null, isAuthenticated: false, isLoading: false });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setAuthState({ token: null, user: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
