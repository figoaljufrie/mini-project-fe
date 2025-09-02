"use client";

import { DataTable, transactionColumns } from "@/app/dashboard/home/components/tables/recent-transaction";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function TransactionsPage() {
  const [search, setSearch] = useState("");

  const transactions = [
    { id: 1, customer: "Alice Johnson", event: "Music Festival", amount: 50000, status: "Paid" },
    { id: 2, customer: "Bob Smith", event: "Art Expo", amount: 75000, status: "Pending" },
    { id: 3, customer: "Charlie Davis", event: "Tech Conference", amount: 120000, status: "Failed" },
  ];

  const filtered = transactions.filter(
    (tx) =>
      tx.customer.toLowerCase().includes(search.toLowerCase()) ||
      tx.event.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/20 via-teal-500/20 to-teal-600/20 border border-teal-700/30 shadow-lg rounded-2xl p-6 transition-all hover:shadow-[0_6px_18px_rgba(0,128,128,0.4)]">
        <CardHeader className="flex justify-between items-center mb-6 p-0">
          <CardTitle className="text-2xl font-bold text-black">Transactions</CardTitle>
          <Button className="bg-white/20 text-black border border-teal-400/20 backdrop-blur-lg hover:bg-white/30 hover:shadow-[0_4px_12px_rgba(0,128,128,0.3)] transition">
            + Create Transaction
          </Button>
        </CardHeader>

        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 text-black placeholder-black/40 border border-white/20 focus:border-teal-400/40"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <DataTable columns={transactionColumns} data={filtered} />
        </div>
      </Card>
    </div>
  );
}