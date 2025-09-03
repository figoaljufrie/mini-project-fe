// Event types untuk frontend
export interface CreateEventRequest {
  title: string;
  category: string;
  location: string;
  priceIdr: number;
  startsAt: string; // ISO format
  endsAt: string;   // ISO format
  quantity: number;
  description: string;
  ticketTypes: string; // "VIP,Regular" format
  isFree: boolean;
}

export interface Event {
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
  ticketTypes: string | null;
  createdAt: string;
  updatedAt: string;
  organizerId: number;
  organizer: {
    id: number;
    name: string;
    email: string;
  };
  thumbnailUrl?: string;
  thumbnailPublicId?: string;
  promotions?: Promotion[];
  reviews?: Review[];
  transactions?: Transaction[];
}

export interface Promotion {
  id: number;
  discount: number;
  startDate: string;
  endDate: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string | null;
  createdAt: string;
  user: {
    id: number;
    name: string;
  };
}

export interface Transaction {
  id: number;
  status: string;
  totalIdr: number;
  createdAt: string;
}

export interface EventFormData {
  title: string;
  category: string;
  location: string;
  priceIdr: string; // string untuk form input
  startsAt: string; // ISO format
  endsAt: string;   // ISO format
  quantity: string; // string untuk form input
  description: string;
  ticketTypes: string; // "VIP,Regular" format
  isFree: boolean;
}

export interface EventCategory {
  value: string;
  label: string;
}

export const EVENT_CATEGORIES: EventCategory[] = [
  { value: "Workshop", label: "Workshop" },
  { value: "Conference", label: "Conference" },
  { value: "Seminar", label: "Seminar" },
  { value: "Concert", label: "Concert" },
  { value: "Sports", label: "Sports" },
  { value: "Exhibition", label: "Exhibition" },
  { value: "Festival", label: "Festival" },
  { value: "Networking", label: "Networking" },
  { value: "Training", label: "Training" },
  { value: "Other", label: "Other" }
];