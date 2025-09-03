// src/lib/services/auth.service.ts
// Authentication service dengan API client yang baru

import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { tokenManager } from '@/lib/auth/token-manager';
import { authGuard } from '@/lib/auth/auth-guard';
import type { 
  LoginRequest, 
  RegisterCustomerRequest, 
  RegisterOrganizerRequest,
  User 
} from '@/lib/api/schemas';
import type { ApiResponse } from '@/lib/api/types';

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

export interface AuthService {
  login: (credentials: LoginRequest) => Promise<LoginResponse>;
  registerCustomer: (data: RegisterCustomerRequest) => Promise<User>;
  registerOrganizer: (data: RegisterOrganizerRequest) => Promise<User>;
  logout: () => Promise<void>;
  getMe: () => Promise<User>;
  updateProfile: (id: number, data: Partial<User>) => Promise<User>;
  updatePassword: (data: { currentPassword: string; newPassword: string }) => Promise<{ message: string }>;
  forgotPassword: (email: string) => Promise<{ message: string }>;
  resetPassword: (token: string, password: string) => Promise<{ message: string }>;
}

class AuthServiceImpl implements AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      const { user, accessToken, refreshToken } = response.data;

      // Store tokens and user data
      tokenManager.setTokenData({
        accessToken,
        refreshToken,
      });
      tokenManager.setUser(user);

      // Update auth guard state
      await authGuard.login({
        accessToken,
        refreshToken,
        user,
      });

      return { user, accessToken, refreshToken };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async registerCustomer(data: RegisterCustomerRequest): Promise<User> {
    try {
      const response = await apiClient.post<User>(
        API_ENDPOINTS.AUTH.REGISTER_CUSTOMER,
        data
      );

      return response.data;
    } catch (error) {
      console.error('Register customer error:', error);
      throw error;
    }
  }

  async registerOrganizer(data: RegisterOrganizerRequest): Promise<User> {
    try {
      const response = await apiClient.post<User>(
        API_ENDPOINTS.AUTH.REGISTER_ORGANIZER,
        data
      );

      return response.data;
    } catch (error) {
      console.error('Register organizer error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout API error:', error);
      // Continue with local logout even if API call fails
    } finally {
      // Clear local auth data
      tokenManager.clearAuth();
      await authGuard.logout();
    }
  }

  async getMe(): Promise<User> {
    try {
      const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
      const user = response.data;

      // Update stored user data
      tokenManager.setUser(user);
      await authGuard.updateUser(user);

      return user;
    } catch (error) {
      console.error('Get me error:', error);
      throw error;
    }
  }

  async updateProfile(id: number, data: Partial<User>): Promise<User> {
    try {
      const response = await apiClient.patch<User>(
        API_ENDPOINTS.USERS.UPDATE(id),
        data
      );

      const updatedUser = response.data;

      // Update stored user data
      tokenManager.setUser(updatedUser);
      await authGuard.updateUser(updatedUser);

      return updatedUser;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  }

  async updatePassword(data: { currentPassword: string; newPassword: string }): Promise<{ message: string }> {
    try {
      const response = await apiClient.patch<{ message: string }>(
        API_ENDPOINTS.AUTH.UPDATE_PASSWORD,
        data
      );

      return response.data;
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.post<{ message: string }>(
        API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
        { email }
      );

      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  }

  async resetPassword(token: string, password: string): Promise<{ message: string }> {
    try {
      const response = await apiClient.patch<{ message: string }>(
        API_ENDPOINTS.AUTH.RESET_PASSWORD,
        { password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const authService = new AuthServiceImpl();
