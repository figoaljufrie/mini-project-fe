import { useState, useEffect, useCallback } from 'react';
import { Event, EventFormData } from '@/app/types/event/event';
import { 
  getEvents, 
  getEventById, 
  createEvent, 
  getOrganizerEvents, 
  updateEvent, 
  deleteEvent,
  formatDateTimeLocalToISO
} from '@/app/create-event/services/event.service';

// Hook untuk manage events
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async (params?: {
    category?: string;
    location?: string;
    q?: string;
    upcomingOnly?: boolean;
  }) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getEvents(params);
      setEvents(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil data events');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    fetchEvents,
    refetch: fetchEvents
  };
};

// Hook untuk manage single event
export const useEvent = (eventId: number | null) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvent = useCallback(async () => {
    if (!eventId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getEventById(eventId);
      setEvent(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil detail event');
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  return {
    event,
    loading,
    error,
    refetch: fetchEvent
  };
};

// Hook untuk manage organizer events
export const useOrganizerEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrganizerEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getOrganizerEvents();
      setEvents(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Gagal mengambil events organizer');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganizerEvents();
  }, [fetchOrganizerEvents]);

  return {
    events,
    loading,
    error,
    refetch: fetchOrganizerEvents
  };
};

// Hook untuk create event
export const useCreateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createEventHandler = useCallback(async (formData: EventFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Format dates to ISO string
      const formattedData = {
        ...formData,
        startsAt: formatDateTimeLocalToISO(formData.startsAt),
        endsAt: formatDateTimeLocalToISO(formData.endsAt)
      };

      const newEvent = await createEvent(formattedData);
      setSuccess(true);
      return newEvent;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal membuat event';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    createEvent: createEventHandler,
    loading,
    error,
    success,
    reset
  };
};

// Hook untuk update event
export const useUpdateEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateEventHandler = useCallback(async (eventId: number, formData: Partial<EventFormData>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      // Format dates to ISO string if provided
      const formattedData = {
        ...formData,
        ...(formData.startsAt && { startsAt: formatDateTimeLocalToISO(formData.startsAt) }),
        ...(formData.endsAt && { endsAt: formatDateTimeLocalToISO(formData.endsAt) })
      };

      const updatedEvent = await updateEvent(eventId, formattedData);
      setSuccess(true);
      return updatedEvent;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal mengupdate event';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    updateEvent: updateEventHandler,
    loading,
    error,
    success,
    reset
  };
};

// Hook untuk delete event
export const useDeleteEvent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteEventHandler = useCallback(async (eventId: number) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      await deleteEvent(eventId);
      setSuccess(true);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Gagal menghapus event';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    deleteEvent: deleteEventHandler,
    loading,
    error,
    success,
    reset
  };
};