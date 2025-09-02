"use client";

import { useState, useEffect } from "react";
import { eventService, Event } from "@/app/dashboard/services/eventService";

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Pass true to get organizer events (all, not just future)
      const data = await eventService.getOrganizerEvents(true)
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error, refresh: fetchEvents };
}