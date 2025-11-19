
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from './api';
import { IUser } from '../types'; // Import IUser

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  user: IUser | null; // Add user to context type
  login: (token: string) => void;
  logout: () => void;
  fetchUser: () => Promise<void>; // Add fetchUser to context type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [user, setUser] = useState<IUser | null>(null); // State to store user data

  const fetchUser = useCallback(async () => {
    if (token) {
      try {
        const response = await api.get('/auth'); // Assuming /auth returns the current user's data
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        // Optionally log out if token is invalid
        logout();
      }
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchUser(); // Fetch user data when token changes or on mount if token exists
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token, fetchUser]);

  const login = (newToken: string) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, user, login, logout, fetchUser }}>
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
