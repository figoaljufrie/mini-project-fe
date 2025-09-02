"use client";

import { useState, useEffect } from "react";
import { couponService } from "@/app/dashboard/services/couponService";
import { useAuthStore } from "@/app/auth/store/auth-store";

export type Coupon = {
  id: number;
  code: string;
  discountIdr: number;
  type: "REFERRAL" | "ORGANIZER";
  status: "AVAILABLE" | "USED" | "EXPIRED";
  expiresAt: string | null;
  usedAt: string | null;
  createdAt: string;
  organizerId: number | null;
  quantity: number | null;
  used: number | null; // ✅ now tracked
  usedCount?: number;  // ✅ included from backend service (transactions count)
};

export type CreateCouponPayload = {
  code: string;
  discountIdr: number;
  quantity?: number;
  expiresAt?: string;
};

export function useCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hydrated = useAuthStore((state) => state.hydrated);

  const fetchCoupons = async () => {
    setLoading(true);
    try {
      const data = await couponService.getOrganizerCoupons();
      setCoupons(data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  const createCoupon = async (payload: CreateCouponPayload) => {
    try {
      const newCoupon = await couponService.createOrganizerCoupon(payload);
      setCoupons((prev) => [...prev, newCoupon]);
      return newCoupon;
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Failed to create coupon");
      throw err;
    }
  };

  useEffect(() => {
    if (!hydrated) return;
    fetchCoupons();
  }, [hydrated]);

  return {
    coupons,
    loading,
    error,
    refresh: fetchCoupons,
    createCoupon,
  };
}