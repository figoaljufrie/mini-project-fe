"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { 
  getEvents, 
  getEventById, 
  createEvent, 
  getOrganizerEvents, 
  updateEvent, 
  deleteEvent 
} from "@/app/create-event/services/event.service";
import type { Event, EventFormData } from "@/app/types/event/event";

type EventState = {
  events: Event[];
  currentEvent: Event | null;
  organizerEvents: Event[];
  loading: boolean;
  error: string | null;
  success: boolean;
  successMessage: string | null;

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: boolean, message?: string) => void;
  clearMessages: () => void;

  // Event operations
  fetchEvents: (params?: {
    category?: string;
    location?: string;
    q?: string;
    upcomingOnly?: boolean;
  }) => Promise<void>;
  
  fetchEventById: (eventId: number) => Promise<void>;
  
  createNewEvent: (formData: EventFormData) => Promise<Event>;
  
  fetchOrganizerEvents: () => Promise<void>;
  
  updateExistingEvent: (eventId: number, formData: Partial<EventFormData>) => Promise<Event>;
  
  deleteExistingEvent: (eventId: number) => Promise<void>;
  
  // Utility actions
  setCurrentEvent: (event: Event | null) => void;
  addEventToList: (event: Event) => void;
  updateEventInList: (eventId: number, updatedEvent: Event) => void;
  removeEventFromList: (eventId: number) => void;
};

export const useEventStore = create<EventState>()(
  devtools((set, get) => ({
    events: [],
    currentEvent: null,
    organizerEvents: [],
    loading: false,
    error: null,
    success: false,
    successMessage: null,

    setLoading: (loading: boolean) => set({ loading }),
    setError: (error: string | null) => set({ error }),
    setSuccess: (success: boolean, message?: string) => set({ 
      success, 
      successMessage: message || null 
    }),
    clearMessages: () => set({ error: null, success: false, successMessage: null }),

    fetchEvents: async (params) => {
      set({ loading: true, error: null });
      try {
        const events = await getEvents(params);
        set({ events, loading: false });
      } catch (err: any) {
        set({ 
          error: err.response?.data?.message || 'Gagal mengambil data events',
          loading: false 
        });
      }
    },

    fetchEventById: async (eventId: number) => {
      set({ loading: true, error: null });
      try {
        const event = await getEventById(eventId);
        set({ currentEvent: event, loading: false });
      } catch (err: any) {
        set({ 
          error: err.response?.data?.message || 'Gagal mengambil detail event',
          loading: false 
        });
      }
    },

    createNewEvent: async (formData: EventFormData) => {
      set({ loading: true, error: null, success: false });
      try {
        const newEvent = await createEvent(formData);
        
        // Add to events list
        const { events } = get();
        set({ 
          events: [newEvent, ...events],
          loading: false,
          success: true,
          successMessage: 'Event berhasil dibuat!'
        });
        
        return newEvent;
      } catch (err: any) {
        set({ 
          error: err.response?.data?.message || 'Gagal membuat event',
          loading: false 
        });
        throw err;
      }
    },

    fetchOrganizerEvents: async () => {
      set({ loading: true, error: null });
      try {
        const events = await getOrganizerEvents();
        set({ organizerEvents: events, loading: false });
      } catch (err: any) {
        set({ 
          error: err.response?.data?.message || 'Gagal mengambil events organizer',
          loading: false 
        });
      }
    },

    updateExistingEvent: async (eventId: number, formData: Partial<EventFormData>) => {
      set({ loading: true, error: null, success: false });
      try {
        const updatedEvent = await updateEvent(eventId, formData);
        
        // Update in events list
        const { events } = get();
        const updatedEvents = events.map(event => 
          event.eventId === eventId ? updatedEvent : event
        );
        
        set({ 
          events: updatedEvents,
          currentEvent: updatedEvent,
          loading: false,
          success: true,
          successMessage: 'Event berhasil diupdate!'
        });
        
        return updatedEvent;
      } catch (err: any) {
        set({ 
          error: err.response?.data?.message || 'Gagal mengupdate event',
          loading: false 
        });
        throw err;
      }
    },

    deleteExistingEvent: async (eventId: number) => {
      set({ loading: true, error: null, success: false });
      try {
        await deleteEvent(eventId);
        
        // Remove from events list
        const { events } = get();
        const filteredEvents = events.filter(event => event.eventId !== eventId);
        
        set({ 
          events: filteredEvents,
          currentEvent: null,
          loading: false,
          success: true,
          successMessage: 'Event berhasil dihapus!'
        });
      } catch (err: any) {
        set({ 
          error: err.response?.data?.message || 'Gagal menghapus event',
          loading: false 
        });
        throw err;
      }
    },

    setCurrentEvent: (event: Event | null) => set({ currentEvent: event }),
    addEventToList: (event: Event) => set((state) => ({ 
      events: [event, ...state.events] 
    })),
    updateEventInList: (eventId: number, updatedEvent: Event) => set((state) => ({
      events: state.events.map(event => 
        event.eventId === eventId ? updatedEvent : event
      )
    })),
    removeEventFromList: (eventId: number) => set((state) => ({
      events: state.events.filter(event => event.eventId !== eventId)
    }))
  }))
);