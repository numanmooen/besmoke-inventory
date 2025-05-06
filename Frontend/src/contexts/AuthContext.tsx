/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AuthResponseDTO, LoginDTO } from '../types/authTypes';
import { login as apiLogin } from '../services/authService';
import { getToken, removeToken, setToken } from '../utils/authUtils';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  user: AuthResponseDTO | null;
  login: (credentials: LoginDTO) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          if (decoded.exp * 1000 < Date.now()) {
            removeToken();
            setUser(null);
          } else {
            setUser({
              token,
              expiration: new Date(decoded.exp * 1000),
              userId: decoded.sub,
              email: decoded.email,
              fullName: decoded.name,
              roles: decoded.roles || []
            });
          }
        } catch (error) {
          removeToken();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginDTO) => {
    try {
      const response = await apiLogin(credentials);
      setToken(response.token);
      const decoded: any = jwtDecode(response.token);
      console.log(decoded)
      
      setUser({
        token: response.token,
        expiration: new Date(decoded.exp * 1000),
        userId: decoded.sub,
        email: decoded.email,
        fullName: decoded.name,
        roles: decoded.role || []
      });
      
      navigate('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    navigate('/login');
  };

  const hasRole = (role: string) => {
    return user?.roles.includes(role) || false;
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user, 
        loading,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);