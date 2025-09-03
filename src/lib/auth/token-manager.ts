import api from '../api/api';

export interface TokenData {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username?: string;
  role: 'customer' | 'organizer';
  avatar?: string;
}

class TokenManager {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';
  private refreshPromise: Promise<string | null> | null = null;

  // Get token from localStorage
  public getToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  // Set token to localStorage
  public setToken(token: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.TOKEN_KEY, token);
      this.setApiClientToken(token);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  }

  // Get refresh token
  public getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    try {
      return localStorage.getItem(this.REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  // Set refresh token
  public setRefreshToken(token: string): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting refresh token:', error);
    }
  }

  // Get user data
  public getUser(): User | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  // Set user data
  public setUser(user: User): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error setting user data:', error);
    }
  }

  // Set token data (access + refresh)
  public setTokenData(tokenData: TokenData): void {
    this.setToken(tokenData.accessToken);
    
    if (tokenData.refreshToken) {
      this.setRefreshToken(tokenData.refreshToken);
    }
    
    if (tokenData.expiresAt) {
      // Set expiration time for auto-refresh
      this.scheduleTokenRefresh(tokenData.expiresAt);
    }
  }

  // Clear all auth data
  public clearAuth(): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      delete api.defaults.headers.common['Authorization'];
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  // Check if user is authenticated
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  // Set token to API client
  private setApiClientToken(token: string): void {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  // Initialize token from localStorage
  public initializeAuth(): void {
    const token = this.getToken();
    if (token) {
      this.setApiClientToken(token);
    }
  }

  // Refresh token
  public async refreshToken(): Promise<string | null> {
    // Prevent multiple refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.clearAuth();
      return null;
    }

    this.refreshPromise = this.performTokenRefresh(refreshToken);

    try {
      const newToken = await this.refreshPromise;
      return newToken;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async performTokenRefresh(refreshToken: string): Promise<string | null> {
    try {
      const response = await api.post<{ accessToken: string; refreshToken?: string }>(
        '/auth/refresh',
        { refreshToken }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;
      
      this.setToken(accessToken);
      
      if (newRefreshToken) {
        this.setRefreshToken(newRefreshToken);
      }

      return accessToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      this.clearAuth();
      return null;
    }
  }

  // Schedule token refresh before expiration
  private scheduleTokenRefresh(expiresAt: number): void {
    const now = Date.now();
    const timeUntilExpiry = expiresAt - now;
    
    // Refresh 5 minutes before expiry
    const refreshTime = Math.max(timeUntilExpiry - 5 * 60 * 1000, 0);
    
    setTimeout(() => {
      this.refreshToken();
    }, refreshTime);
  }

  // Check if token is expired
  public isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      // Decode JWT token (basic check)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  }
}

// Export singleton instance
export const tokenManager = new TokenManager();

// Initialize auth on module load
if (typeof window !== 'undefined') {
  tokenManager.initializeAuth();
}
