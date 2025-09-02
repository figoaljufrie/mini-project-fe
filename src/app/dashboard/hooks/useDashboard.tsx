"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboardService";
import { couponService } from "@/app/dashboard/services/couponService";
import { useAuthStore } from "@/app/auth/store/auth-store";

// Transactions
export const useTransactions = () => {
  const { user, token, loading } = useAuthStore();
  const enabled = !loading && !!user && !!token;

  return useQuery({
    queryKey: ["transactions", user?.id],
    queryFn: dashboardService.getTransactions,
    enabled,
  });
};

// Dashboard KPIs
export const useDashboardStats = () => {
  const { user, token, loading } = useAuthStore();
  const enabled = !loading && !!user && !!token;

  const revenue = useQuery({
    queryKey: ["revenue", user?.id],
    queryFn: dashboardService.getRevenue,
    enabled,
  });

  const attendees = useQuery({
    queryKey: ["attendees", user?.id],
    queryFn: dashboardService.getAttendees,
    enabled,
  });

  const events = useQuery({
    queryKey: ["events", user?.id],
    queryFn: dashboardService.getEvents,
    enabled,
  });

  // ✅ Use your existing coupon logic
  const coupons = useQuery({
    queryKey: ["organizerCoupons", user?.id],
    queryFn: () => couponService.getOrganizerCoupons(),
    enabled,
  });

  return { revenue, attendees, coupons, events };
};