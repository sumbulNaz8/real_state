'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  id?: string;
  username?: string;
  email?: string;
  role?: string;
  [key: string]: any; // Allow additional properties
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>; // Keeping any for register since it's flexible
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Clear any existing tokens to force fresh login
    // Comment out the next lines if you want to keep persistent login
    // localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');

    // Check if user is logged in on initial load
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);

    // In a real app, you might want to fetch user data here
    // For now, we'll just set the user as logged in if token exists
    if (token) {
      // Decode token to get user info (simplified)
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );

        const userData = JSON.parse(jsonPayload);
        setUser(userData);
      } catch (error) {
        console.error('Error decoding token', error);
      }
    }
  }, []);

  const login = async (username: string, password: string) => {
    const response = await authService.login({ username, password });
    setIsAuthenticated(true);
    // Decode token to get user info (simplified)
    try {
      const base64Url = response.access_token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const userData = JSON.parse(jsonPayload);
      setUser(userData);
    } catch (error) {
      console.error('Error decoding token', error);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const register = async (userData: any) => { // Keeping any for flexibility in registration data
    await authService.register(userData);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};