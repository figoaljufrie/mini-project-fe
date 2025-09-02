import api from "@/lib/api/api";
import type { Coupon } from "@/app/dashboard/coupons/hooks/useCoupon";

export const couponService = {
  async getOrganizerCoupons(): Promise<Coupon[]> {
    const res = await api.get("/coupons/organizer");
    return res.data.data; // backend wraps in { data }
  },

  async createOrganizerCoupon(payload: {
    code: string;
    discountIdr: number;
    quantity?: number;
    expiresAt?: string;
  }): Promise<Coupon> {
    const res = await api.post("/coupons/create", payload);
    return res.data.data;
  },
};