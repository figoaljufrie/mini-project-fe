// src/lib/api/endpoints.ts
// Centralized API endpoints configuration

export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    forgotPassword: '/auth/forgot-password',
    resetPassword: '/auth/reset-password',
    me: '/auth/me',
  },
  
  // Events endpoints
  events: {
    list: '/events',
    popular: '/events/popular',
    featured: '/events/featured',
    byCategory: '/events/category',
    byId: '/events',
    create: '/events',
    update: '/events',
    delete: '/events',
    search: '/events/search',
  },
  
  // User endpoints
  users: {
    profile: '/users/profile',
    updateProfile: '/users/profile',
    changePassword: '/users/change-password',
    tickets: '/users/tickets',
    transactions: '/users/transactions',
  },
  
  // Transactions endpoints
  transactions: {
    list: '/transactions',
    create: '/transactions',
    byId: '/transactions',
    update: '/transactions',
    cancel: '/transactions',
    payment: '/transactions/payment',
    uploadProof: '/transactions/upload-proof',
  },
  
  // Dashboard endpoints
  dashboard: {
    stats: '/dashboard/stats',
    events: '/dashboard/events',
    transactions: '/dashboard/transactions',
    revenue: '/dashboard/revenue',
  },
  
  // Coupons endpoints
  coupons: {
    list: '/coupons',
    create: '/coupons',
    update: '/coupons',
    delete: '/coupons',
    validate: '/coupons/validate',
  },
  
  // Reviews endpoints
  reviews: {
    list: '/reviews',
    create: '/reviews',
    update: '/reviews',
    delete: '/reviews',
    byEvent: '/reviews/event',
  },
} as const;

// Helper function to build URLs with parameters
export const buildUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  if (!params) return endpoint;
  
  let url = endpoint;
  Object.entries(params).forEach(([key, value]) => {
    url = url.replace(`:${key}`, String(value));
  });
  
  return url;
};