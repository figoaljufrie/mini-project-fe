"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CouponsPage() {
  const [search, setSearch] = useState("");

  const coupons = [
    {
      id: 1,
      code: "WELCOME100",
      discountIdr: 10000,
      type: "REFERRAL",
      status: "AVAILABLE",
      expiresAt: "2025-12-31",
      usedAt: null,
      createdAt: "2025-08-01",
    },
    {
      id: 2,
      code: "ORGANIZER50",
      discountIdr: 50000,
      type: "ORGANIZER",
      status: "USED",
      expiresAt: "2025-09-15",
      usedAt: "2025-09-01",
      createdAt: "2025-07-20",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Coupons</h2>
        <Button className="bg-white/20 text-black border border-teal-400/20 backdrop-blur-lg hover:bg-white/30 hover:shadow-[0_4px_12px_rgba(0,128,128,0.3)] transition">
          + Create Coupon
        </Button>
      </div>

      {/* Search Input */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/20 via-teal-500/20 to-teal-600/20 border border-teal-700/30 shadow-md rounded-xl transition hover:shadow-[0_6px_18px_rgba(0,128,128,0.4)]">
        <CardContent>
          <Input
            placeholder="Search coupons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 text-black placeholder-black/40 border border-white/20 focus:border-teal-400/40 w-full"
          />
        </CardContent>
      </Card>

      {/* Coupon Table */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/20 via-teal-500/20 to-teal-600/20 border border-teal-700/30 shadow-md rounded-xl transition hover:shadow-[0_6px_18px_rgba(0,128,128,0.4)]">
        <CardContent>
          <table className="w-full text-black border-collapse">
            <thead>
              <tr className="bg-teal-400/15 text-left">
                <th className="p-4">Select</th>
                <th className="p-4">ID</th>
                <th className="p-4">Code</th>
                <th className="p-4">Discount (IDR)</th>
                <th className="p-4">Type</th>
                <th className="p-4">Status</th>
                <th className="p-4">Expires At</th>
                <th className="p-4">Used At</th>
                <th className="p-4">Created At</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-teal-700/20 hover:bg-teal-400/10 transition"
                >
                  <td className="p-4">
                    <input type="checkbox" className="accent-teal-700" />
                  </td>
                  <td className="p-4">{c.id}</td>
                  <td className="p-4">{c.code}</td>
                  <td className="p-4">{c.discountIdr.toLocaleString()}</td>
                  <td className="p-4">{c.type}</td>
                  <td className="p-4">{c.status}</td>
                  <td className="p-4">{c.expiresAt ?? "-"}</td>
                  <td className="p-4">{c.usedAt ?? "-"}</td>
                  <td className="p-4">{c.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center gap-2">
        {["Previous", "1", "2", "Next"].map((item) => (
          <Button
            key={item}
            className="bg-white/20 text-black border border-teal-400/20 backdrop-blur-lg hover:bg-white/30 hover:shadow-[0_4px_12px_rgba(0,128,128,0.3)] transition"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}