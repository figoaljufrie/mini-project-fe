// src/app/dashboard/services/transactionService.ts
import api from "@/lib/api/api";

export type Transaction = {
  id: number;
  userId: number;
  eventId: number;
  status: string;
  totalIdr: number;
  user?: { id: number; name: string };
  event?: { eventId: number; title: string };
  createdAt: string; // <-- add this
};

export type Event = {
  eventId: number;
  title: string;
};

export type User = {
  id: number;
  name: string;
};

export const transactionService = {
  // Fetch all transactions for organizer dashboard
  getAll: async (): Promise<Transaction[]> => {
    const res = await api.get("/dashboard/transactions");
    return res.data.data || [];
  },

  // Fetch all events for organizer
  getEvents: async (): Promise<Event[]> => {
    const res = await api.get("/dashboard/events");
    return res.data.data || [];
  },

  // Fetch users (if needed separately)
  getUsers: async (): Promise<User[]> => {
    const res = await api.get("/users"); // Adjust endpoint if needed
    return res.data.data || [];
  },

  // Update transaction status
  updateStatus: async (id: number, status: string) => {
    await api.patch(`/dashboard/transactions/${id}/status`, { status });
  },
};