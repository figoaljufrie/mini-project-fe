// src/hooks/useEvents.ts
// Hook untuk fetching events data

import { useState, useEffect, useCallback } from 'react';
import { eventsService } from '../services/events.service';

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

export interface UseEventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  success: boolean;
}

export interface UseEventsOptions {
  immediate?: boolean;
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export function useEvents(options: UseEventsOptions = {}) {
  const {
    immediate = true,
    category,
    search,
    page = 1,
    limit = 10
  } = options;

  const [state, setState] = useState<UseEventsState>({
    events: [],
    loading: false,
    error: null,
    success: false,
  });

  const fetchEvents = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await eventsService.getEvents({
        category,
        search,
        page,
        limit
      });

      setState({
        events: response.data,
        loading: false,
        error: null,
        success: true,
      });

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal mengambil data events';
      
      setState({
        events: [],
        loading: false,
        error: errorMessage,
        success: false,
      });

      throw error;
    }
  }, [category, search, page, limit]);

  const fetchEventById = useCallback(async (id: number) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await eventsService.getEventById(id);
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: null,
        success: true,
      }));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal mengambil detail event';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
        success: false,
      }));

      throw error;
    }
  }, []);

  const fetchPopularEvents = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const response = await eventsService.getPopularEvents();
      
      setState({
        events: response.data,
        loading: false,
        error: null,
        success: true,
      });

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Gagal mengambil popular events';
      
      setState({
        events: [],
        loading: false,
        error: errorMessage,
        success: false,
      });

      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      events: [],
      loading: false,
      error: null,
      success: false,
    });
  }, []);

  // Auto fetch on mount if immediate is true
  useEffect(() => {
    if (immediate) {
      fetchEvents();
    }
  }, [immediate, fetchEvents]);

  return {
    ...state,
    fetchEvents,
    fetchEventById,
    fetchPopularEvents,
    reset,
  };
}
