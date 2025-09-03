// hooks/useCoupons.ts
import { useState, useEffect } from "react";
import { getUserCoupons, type Coupon } from "../services/couponService";

export function useCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getUserCoupons()
      .then((data) => {
        if (!mounted) return;
        console.log("useCoupons -> received data:", data);
        setCoupons(data ?? []);
      })
      .catch((e) => {
        console.error("useCoupons -> error:", e);
        if (!mounted) return;
        setError(e?.message ?? "Failed to load coupons");
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { coupons, loading, error };
}