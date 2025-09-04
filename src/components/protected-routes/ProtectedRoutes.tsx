"use client";

import { useAuthStore } from "@/app/auth/store/auth-store";
import { useRouter, usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectIfNotRole?: "ORGANIZER" | "CUSTOMER";
}

export default function ProtectedRoute({
  children,
  redirectIfNotRole,
}: ProtectedRouteProps) {
  const { user, loading } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/auth/login");
        return;
      }

      const role = user.role?.toUpperCase();

      // Handle explicit role restriction if passed as prop
      if (redirectIfNotRole && role !== redirectIfNotRole.toUpperCase()) {
        if (role === "CUSTOMER") router.replace("/");
        else if (role === "ORGANIZER") router.replace("/dashboard/home");
        else router.replace("/auth/login");
        return;
      }

      // 🔒 Extra rule: ORGANIZER can only visit /dashboard/*
      if (role === "ORGANIZER" && !pathname.startsWith("/dashboard")) {
        router.replace("/dashboard/home");
      }
    }
  }, [user, loading, router, pathname, redirectIfNotRole]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  return <>{user ? children : null}</>;
}