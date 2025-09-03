// src/services/auth.service.ts
// Service untuk authentication API calls

import api from '../lib/api/api';

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

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const authService = {
  // Login user
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; accessToken: string }>> {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Register user
  async register(registerData: RegisterData): Promise<ApiResponse<{ user: User; accessToken: string }>> {
    try {
      const response = await api.post('/auth/register', registerData);
      return response.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  // Get current user
  async getMe(): Promise<ApiResponse<User>> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get me error:', error);
      throw error;
    }
  },

  // Update user profile
  async updateProfile(userId: number, profileData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await api.put(`/users/${userId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  },

  // Change password
  async changePassword(passwordData: ChangePasswordData): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.patch('/auth/change-password', passwordData);
      return response.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  },

  // Logout user
  async logout(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.patch('/auth/reset-password', {
        token,
        password: newPassword,
      });
      return response.data;
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  // Refresh token
  async refreshToken(refreshToken: string): Promise<ApiResponse<{ accessToken: string; refreshToken?: string }>> {
    try {
      const response = await api.post('/auth/refresh', { refreshToken });
      return response.data;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
  },

  // Verify email
  async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.patch('/auth/verify-email', { token });
      return response.data;
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  },

  // Resend verification email
  async resendVerificationEmail(): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.post('/auth/resend-verification');
      return response.data;
    } catch (error) {
      console.error('Resend verification error:', error);
      throw error;
    }
  },
};
