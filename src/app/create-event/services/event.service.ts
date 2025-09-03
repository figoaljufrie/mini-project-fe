import api from "@/lib/api/api";
import type { Event, CreateEventRequest, EventFormData } from "@/app/types/event/event";

// Interface untuk response API
export interface EventResponse {
  data: Event;
}

export interface EventsResponse {
  data: Event[];
}

export interface CreateEventResponse {
  data: Event;
  message: string;
}

// Helper function untuk convert form data ke API format
const convertFormDataToApiFormat = (formData: EventFormData): CreateEventRequest => {
  return {
    title: formData.title,
    category: formData.category,
    location: formData.location,
    priceIdr: Number(formData.priceIdr),
    startsAt: formData.startsAt,
    endsAt: formData.endsAt,
    quantity: Number(formData.quantity),
    description: formData.description,
    ticketTypes: formData.ticketTypes,
    isFree: formData.isFree
  };
};

// Helper function untuk format tanggal ke ISO string
export const formatDateToISO = (date: Date): string => {
  return date.toISOString();
};

// Helper function untuk format tanggal dari input datetime-local
export const formatDateTimeLocalToISO = (dateTimeLocal: string): string => {
  return new Date(dateTimeLocal).toISOString();
};

// Get all events dengan filter opsional
export const getEvents = async (params?: {
  category?: string;
  location?: string;
  q?: string;
  upcomingOnly?: boolean;
}): Promise<Event[]> => {
  const res = await api.get("/events/get-event", { params });
  return res.data.data || res.data;
};

// Get event by ID
export const getEventById = async (eventId: number): Promise<Event> => {
  const res = await api.get(`/events/get-eventby/${eventId}`);
  return res.data.data || res.data;
};

// Create event baru (ORGANIZER ONLY)
export const createEvent = async (formData: EventFormData): Promise<Event> => {
  const apiData = convertFormDataToApiFormat(formData);
  const res = await api.post("/events/create-event", apiData);
  return res.data.data || res.data;
};

// Get organizer events
export const getOrganizerEvents = async (): Promise<Event[]> => {
  const res = await api.get("/events/organizer");
  return res.data.data || res.data;
};

// Update event (jika ada endpoint untuk update)
export const updateEvent = async (
  eventId: number, 
  formData: Partial<EventFormData>
): Promise<Event> => {
  const apiData = convertFormDataToApiFormat(formData as EventFormData);
  const res = await api.put(`/events/update-event/${eventId}`, apiData);
  return res.data.data || res.data;
};

// Delete event (jika ada endpoint untuk delete)
export const deleteEvent = async (eventId: number): Promise<void> => {
  await api.delete(`/events/delete-event/${eventId}`);
};