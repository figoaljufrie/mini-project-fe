"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth-store";

export const useRequireAuth = (opts?: { redirectTo?: string; role?: "ORGANIZER" | "CUSTOMER" }) => {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const redirectTo = opts?.redirectTo ?? "/auth/login";

    if (!user) {
      router.replace(redirectTo);
      return;
    }

    if (opts?.role && user.role !== opts.role) {
      router.replace("/");
    }
  }, [user, loading, router, opts]);
};