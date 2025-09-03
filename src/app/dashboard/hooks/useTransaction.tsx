"use client";

import { useState, useEffect } from "react";
import { transactionService } from "../services/transactionService";
import { useAuthStore } from "@/app/auth/store/auth-store";
import { TransactionWithRelations } from "../home/components/tables/recent-transaction";

export const useTransactions = () => {
  const { user } = useAuthStore();
  const [transactions, setTransactions] = useState<TransactionWithRelations[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const txs: TransactionWithRelations[] = await transactionService.getAll();

      // Now we store the full transaction including user and event
      setTransactions(
        txs.map((tx) => ({
          ...tx,
          user: tx.user ?? { id: tx.userId, name: "Unknown Customer" },
          event: tx.event ?? { eventId: tx.eventId, title: "Unknown Event" },
          createdAt: tx.createdAt,
        }))
      );
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
