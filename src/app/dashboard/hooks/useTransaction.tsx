"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api/api";
import { useAuthStore } from "@/app/auth/store/auth-store";

export const useTransactions = () => {
  const { user } = useAuthStore();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get("/transactions/organizer/me");
      setTransactions(res.data.data.transactions || []);
    } catch (err: any) {
      console.error("Failed to fetch transactions:", err);
      setError(err?.response?.data?.message || "Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  return { transactions, loading, error, refetch: fetchTransactions };
};
