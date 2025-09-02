// src/app/(protected)/dashboard/services/dashboardService.ts
import api from "@/lib/api/api"; // your configured axios instance

export const dashboardService = {
  getTransactions: async () => {
    const res = await api.get("/dashboard/transactions");
    return res.data ?? []; // array of transactions
  },

  getRevenue: async () => {
    const res = await api.get("/dashboard/revenue");
    // backend returns { total: number }
    return res.data?.total ?? 0;
  },

  getAttendees: async () => {
    const res = await api.get("/dashboard/attendees");
    return res.data?.total ?? 0;
  },

  getCoupons: async () => {
    const res = await api.get("/dashboard/vouchers");
    return res.data?.total ?? 0;
  },

  getEvents: async () => {
    const res = await api.get("/dashboard/events");
    return res.data?.total ?? 0;
  },
};