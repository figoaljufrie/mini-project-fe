"use client";

import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface EventSearchProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function EventSearch({ search, setSearch }: EventSearchProps) {
  return (
    <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/25 via-teal-500/25 to-teal-600/25 border border-teal-700/20 transform transition-transform hover:scale-101 hover:shadow-[0_3px_10px_rgba(0,128,128,0.2)]">
      <CardContent>
        <Input
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/10 text-black placeholder-black/50 w-full border border-teal-700/10"
        />
      </CardContent>
    </Card>
  );
}
