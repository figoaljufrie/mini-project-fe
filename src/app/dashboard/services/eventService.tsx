import api from "@/lib/api/api";

export type Event = {
  eventId: number;
  title: string;
  category: string;
  location: string;
  startsAt: string;
  endsAt: string;
  quantity: number;
  priceIdr: number;
  isFree: boolean;
  description: string;
  ticketTypes?: string;
  organizer: {
    id: number;
    name: string;
    email: string;
  };
};

export const eventService = {
  async getOrganizerEvents(all: boolean = true): Promise<Event[]> {
    // If all=true, fetch all organizer events
    const res = await api.get(all ? "/events/organizer" : "/events");
    return res.data; 
  },
};