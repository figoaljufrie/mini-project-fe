// src/hooks/useAuth.ts
// Hook untuk authentication

import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth.service';

export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  role: 'customer' | 'organizer';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  username?: string;
  role: 'customer' | 'organizer';
}

export interface UseAuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export function useAuth() {
  const [state, setState] = useState<UseAuthState>({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    success: false,
  });

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setState(prev => ({ ...prev, isAuthenticated: false, user: null }));
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await authService.getMe();
      setState({
        user: response.data,
        isAuthenticated: true,
        loading: false,
        error: null,
        success: true,
      });
    } catch (error: any) {
      // Token invalid, clear it
      localStorage.removeItem('token');
      setState({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        success: false,
      });
    }
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await authService.login(credentials);
      const { user, accessToken } = response.data;

      // Store token
      localStorage.setItem('token', accessToken);

      setState({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
        success: true,
      });

      return { user, accessToken };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login gagal';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        success: false,
      }));

      throw error;
    }
  }, []);

  const register = useCallback(async (registerData: RegisterData) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await authService.register(registerData);
      const { user, accessToken } = response.data;

      // Store token
      localStorage.setItem('token', accessToken);

      setState({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
        success: true,
      });

      return { user, accessToken };
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Registrasi gagal';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        success: false,
      }));

      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear token and user data regardless of API call success
      localStorage.removeItem('token');
      setState({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
        success: false,
      });
    }
  }, []);

  const updateProfile = useCallback(async (profileData: Partial<User>) => {
    if (!state.user) {
      throw new Error('User not authenticated');
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await authService.updateProfile(state.user.id, profileData);
      
      setState(prev => ({
        ...prev,
        user: response.data,
        loading: false,
        error: null,
        success: true,
      }));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Update profile gagal';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        success: false,
      }));

      throw error;
    }
  }, [state.user]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await authService.changePassword({
        currentPassword,
        newPassword,
      });

      setState(prev => ({
        ...prev,
        loading: false,
        error: null,
        success: true,
      }));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Ganti password gagal';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        success: false,
      }));

      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  return {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    checkAuthStatus,
    reset,
  };
}
