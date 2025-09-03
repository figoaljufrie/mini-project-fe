// src/lib/auth/auth-guard.ts
// Authentication guard untuk protected routes

import { tokenManager } from './token-manager';
import type { User } from './token-manager';

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

export class AuthGuard {
  private static instance: AuthGuard;
  private authState: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: true,
  };
  private listeners: Set<(state: AuthState) => void> = new Set();

  private constructor() {
    this.initializeAuth();
  }

  public static getInstance(): AuthGuard {
    if (!AuthGuard.instance) {
      AuthGuard.instance = new AuthGuard();
    }
    return AuthGuard.instance;
  }

  private async initializeAuth(): Promise<void> {
    try {
      const token = tokenManager.getToken();
      const user = tokenManager.getUser();

      if (token && user && !tokenManager.isTokenExpired()) {
        this.updateAuthState({
          isAuthenticated: true,
          user,
          isLoading: false,
        });
      } else if (token && tokenManager.isTokenExpired()) {
        // Try to refresh token
        const newToken = await tokenManager.refreshToken();
        if (newToken) {
          this.updateAuthState({
            isAuthenticated: true,
            user: tokenManager.getUser(),
            isLoading: false,
          });
        } else {
          this.updateAuthState({
            isAuthenticated: false,
            user: null,
            isLoading: false,
          });
        }
      } else {
        this.updateAuthState({
          isAuthenticated: false,
          user: null,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      this.updateAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    }
  }

  private updateAuthState(newState: Partial<AuthState>): void {
    this.authState = { ...this.authState, ...newState };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.authState);
      } catch (error) {
        console.error('Error notifying auth listener:', error);
      }
    });
  }

  // Public methods
  public getAuthState(): AuthState {
    return { ...this.authState };
  }

  public subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  public async login(tokenData: { accessToken: string; refreshToken?: string; user: User }): Promise<void> {
    try {
      tokenManager.setTokenData({
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
      });
      tokenManager.setUser(tokenData.user);

      this.updateAuthState({
        isAuthenticated: true,
        user: tokenData.user,
        isLoading: false,
      });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  public async logout(): Promise<void> {
    try {
      tokenManager.clearAuth();
      this.updateAuthState({
        isAuthenticated: false,
        user: null,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  public async updateUser(user: User): Promise<void> {
    try {
      tokenManager.setUser(user);
      this.updateAuthState({
        user,
      });
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }

  public requireAuth(): boolean {
    if (this.authState.isLoading) {
      return false; // Still loading, don't redirect yet
    }

    if (!this.authState.isAuthenticated) {
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
      return false;
    }

    return true;
  }

  public requireRole(requiredRole: 'customer' | 'organizer'): boolean {
    if (!this.requireAuth()) {
      return false;
    }

    if (this.authState.user?.role !== requiredRole) {
      if (typeof window !== 'undefined') {
        window.location.href = '/unauthorized';
      }
      return false;
    }

    return true;
  }

  public canAccess(requiredRole?: 'customer' | 'organizer'): boolean {
    if (!this.authState.isAuthenticated) {
      return false;
    }

    if (requiredRole && this.authState.user?.role !== requiredRole) {
      return false;
    }

    return true;
  }
}

// Export singleton instance
export const authGuard = AuthGuard.getInstance();
