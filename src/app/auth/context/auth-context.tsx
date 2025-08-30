'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api, { setAuthToken } from '@/lib/api/api';
import { useRouter } from 'next/navigation';

export type Role = 'CUSTOMER' | 'ORGANIZER';
export type User = { id: number; name: string; email: string; username: string; role: Role };

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  registerCustomer: (payload: any) => Promise<any>;
  registerOrganizer: (payload: any) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassword: (token: string, password: string) => Promise<any>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) { setLoading(false); return; }
    setAuthToken(token);
    api.get('/auth/validate-token')
      .then(res => {
        const payload = res.data?.data ?? res.data;
        setUser(payload);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setAuthToken(undefined);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    const payload = res.data?.data ?? res.data;
    const token = payload?.accessToken ?? payload?.token;
    const userData = payload?.user ?? payload;
    if (!token) throw new Error('No token from login');
    localStorage.setItem('token', token);
    setAuthToken(token);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(undefined);
    setUser(null);
    router.push('/');
  };

  const registerCustomer = async (payload: any) => {
    return api.post('/auth/register', payload);
  };

  const registerOrganizer = async (payload: any) => {
    return api.post('/organizer/register', payload);
  };

  const forgotPassword = async (email: string) => {
    return api.post('/forgot-password', { email });
  };

  const resetPassword = async (token: string, password: string) => {
    return api.patch('/reset-password', { password }, { headers: { Authorization: `Bearer ${token}` } });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, registerCustomer, registerOrganizer, forgotPassword, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
};