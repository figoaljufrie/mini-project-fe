// src/app/profile/services/couponService.ts
import api, { setAuthToken } from "@/lib/api/api";

export interface Coupon {
  id: number;
  code: string;
  status: string;
  expiresAt: string | null;
  discountIdr: number;
  // add other fields if you need them
}

// Get all coupons for the current user
export const getUserCoupons = async (): Promise<Coupon[]> => {
  try {
    const res = await api.get("/coupons/me");
    // DEBUG: log raw response so you can inspect shape in console
    console.log("getUserCoupons - raw response:", res?.data);

    const payload = res.data?.data;

    // Common shapes we accept:
    // 1) payload is an array -> res.data.data = [ {...}, ... ]
    if (Array.isArray(payload)) return payload;

    // 2) payload might be an object that contains coupons property -> { coupons: [...] }
    if (payload && Array.isArray(payload.coupons)) return payload.coupons;

    // 3) payload might be a user object with coupons -> { id, name, coupons: [...] }
    if (payload && Array.isArray(payload.coupons)) return payload.coupons;

    // fallback: nothing found or unexpected shape
    console.warn("getUserCoupons: unexpected response shape", payload);
    return [];
  } catch (err) {
    // log full error for debugging
    console.error("getUserCoupons - request failed:", err);
    // Return empty array so UI won't crash; you could also rethrow to let hook handle error
    return [];
  }
};