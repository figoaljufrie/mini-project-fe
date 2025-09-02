"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CouponTable from "./components/couponTable";
import CreateCouponModal from "./components/createCouponModal";
import { useCoupons } from "./hooks/useCoupon";

export default function CouponsPage() {
  const [search, setSearch] = useState("");
  const { coupons, loading, error, refresh } = useCoupons();
  const router = useRouter();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/20 via-teal-500/20 to-teal-600/20 border border-teal-700/30 shadow-lg rounded-2xl p-6 transition-all hover:shadow-[0_6px_18px_rgba(0,128,128,0.4)]">
        {/* Header */}
        <CardHeader className="flex justify-between items-center mb-6 p-0">
          <CardTitle className="text-2xl font-semibold text-black">
            Coupons
          </CardTitle>
          <CreateCouponModal refresh={refresh} />
        </CardHeader>

        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <input
            placeholder="Search coupons..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 w-full p-1 rounded-md border border-white/20 focus:border-teal-400/40 focus:outline-none text-black placeholder-black/40"
          />
        </div>

        {/* Search */}
        {/* <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 text-black placeholder-black/40 border border-white/20 focus:border-teal-400/40"
          />
        </div> */}

        {/* Table */}
        <CardContent className="p-0">
          {loading ? (
            <p className="text-black">Loading coupons...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <CouponTable coupons={coupons} search={search} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
