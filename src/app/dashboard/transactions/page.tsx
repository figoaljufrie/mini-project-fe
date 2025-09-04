"use client";

import { useState } from "react";
import {
  DataTable,
  transactionColumns,
  TransactionWithRelations,
} from "@/app/dashboard/home/components/tables/recent-transaction";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTransactions } from "../hooks/useTransaction";
import ProtectedRoute from "@/components/protected-routes/ProtectedRoutes";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");
  const { transactions, loading, error, refetch } = useTransactions();

  const filteredTransactions = transactions.filter(
    (tx: TransactionWithRelations) => {
      const lower = search.toLowerCase();
      const customerName = tx.user?.name ?? "";
      const eventTitle = tx.event?.title ?? "";

      return (
        customerName.toLowerCase().includes(lower) ||
        eventTitle.toLowerCase().includes(lower)
      );
    }
  );

  if (loading) return <div className="p-8">Loading transactions...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <ProtectedRoute>
      <div className="p-8 max-w-7xl mx-auto">
        <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/20 via-teal-500/20 to-teal-600/20 border border-teal-700/30 shadow-lg rounded-2xl p-6">
          <CardHeader className="flex justify-between items-center mb-6 p-0">
            <CardTitle className="text-2xl font-bold text-black">
              Transactions
            </CardTitle>
          </CardHeader>

          <div className="flex items-center gap-4 mb-6">
            <Input
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/10 text-black placeholder-black/40 border border-white/20 focus:border-teal-400/40"
            />
          </div>

          <div className="overflow-x-auto">
            <DataTable
              columns={transactionColumns(refetch)}
              data={filteredTransactions}
            />
          </div>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
