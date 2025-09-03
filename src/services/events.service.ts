// src/services/events.service.ts
// Service untuk events API calls

import api from '../lib/api/api';

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image: string;
  category: string;
  organizer: string;
  availableSeats: number;
  totalSeats: number;
}

export interface GetEventsParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'price' | 'popularity';
  sortOrder?: 'asc' | 'desc';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const eventsService = {
  // Get all events with filters
  async getEvents(params: GetEventsParams = {}): Promise<ApiResponse<Event[]>> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.category) queryParams.append('category', params.category);
      if (params.search) queryParams.append('search', params.search);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);

      const response = await api.get(`/events?${queryParams.toString()}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  // Get event by ID
  async getEventById(id: number): Promise<ApiResponse<Event>> {
    try {
      const response = await api.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching event ${id}:`, error);
      throw error;
    }
  },

  // Get popular events
  async getPopularEvents(limit: number = 10): Promise<ApiResponse<Event[]>> {
    try {
      const response = await api.get(`/events/popular?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching popular events:', error);
      throw error;
    }
  },

  // Get featured events
  async getFeaturedEvents(limit: number = 5): Promise<ApiResponse<Event[]>> {
    try {
      const response = await api.get(`/events/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching featured events:', error);
      throw error;
    }
  },

  // Get events by category
  async getEventsByCategory(category: string, limit: number = 10): Promise<ApiResponse<Event[]>> {
    try {
      const response = await api.get(`/events/category/${category}?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching events by category ${category}:`, error);
      throw error;
    }
  },

  // Search events
  async searchEvents(query: string, limit: number = 10): Promise<ApiResponse<Event[]>> {
    try {
      const response = await api.get(`/events/search?q=${encodeURIComponent(query)}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error(`Error searching events with query "${query}":`, error);
      throw error;
    }
  },

  // Get event categories
  async getEventCategories(): Promise<ApiResponse<string[]>> {
    try {
      const response = await api.get('/events/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching event categories:', error);
      throw error;
    }
  },

  // Create new event (for organizers)
  async createEvent(eventData: Partial<Event>): Promise<ApiResponse<Event>> {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },

  // Update event (for organizers)
  async updateEvent(id: number, eventData: Partial<Event>): Promise<ApiResponse<Event>> {
    try {
      const response = await api.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      console.error(`Error updating event ${id}:`, error);
      throw error;
    }
  },

  // Delete event (for organizers)
  async deleteEvent(id: number): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await api.delete(`/events/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting event ${id}:`, error);
      throw error;
    }
  },
};
