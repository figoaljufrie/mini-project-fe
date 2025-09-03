// Custom hook untuk authentication state management
import { useState, useEffect } from 'react';
import { authGuard } from '@/lib/auth/auth-guard';
import { authService } from '@/lib/services/auth.service';
import type { User } from '@/services/auth.service';
import type { AuthState } from '@/lib/auth/auth-guard';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Subscribe to auth state changes
    const unsubscribe = authGuard.subscribe((state) => {
      setAuthState(state);
    });

    // Get initial state
    setAuthState(authGuard.getAuthState());

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await authService.login({ email, password });
      return result;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      throw error;
    }
  };

  const updateProfile = async (id: number, data: Partial<User>) => {
    try {
      const updatedUser = await authService.updateProfile(id, data);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      const result = await authService.updatePassword({
        currentPassword,
        newPassword,
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  const requireAuth = () => {
    return authGuard.requireAuth();
  };

  const requireRole = (role: 'customer' | 'organizer') => {
    return authGuard.requireRole(role);
  };

  const canAccess = (role?: 'customer' | 'organizer') => {
    return authGuard.canAccess(role);
  };

  return {
    ...authState,
    login,
    logout,
    updateProfile,
    updatePassword,
    requireAuth,
    requireRole,
    canAccess,
  };
}
