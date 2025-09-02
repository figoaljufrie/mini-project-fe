"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Props = {
  search: string;
  setSearch: (v: string) => void;
};

export default function CouponSearch({ search, setSearch }: Props) {
  return (
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
  );
}