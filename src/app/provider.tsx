"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "@/app/auth/store/auth-store";
import { setAuthToken } from "@/lib/api/api";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token); // set axios header immediately
    }

    useAuthStore.getState()
      .hydrateFromStorage()
      .finally(() => setHydrated(true));
  }, []);

  if (!hydrated) {
    return <div className="p-8 text-black">Loading app...</div>;
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}