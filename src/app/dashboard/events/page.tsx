"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventTable from "./components/eventTables";
import { useEvents } from "./hooks/useEvents";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const { events, loading, error } = useEvents();
  const router = useRouter();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/20 via-teal-500/20 to-teal-600/20 border border-teal-700/30 shadow-lg rounded-2xl p-6 transition-all hover:shadow-[0_6px_18px_rgba(0,128,128,0.4)]">
        {/* Header & Create Event */}
        <CardHeader className="flex justify-between items-center mb-6 p-0">
          <CardTitle className="text-2xl font-bold text-black">
            Events
          </CardTitle>
          <Button
            onClick={() => router.push("/create-event")}
            className="bg-white/20 text-black border border-teal-400/20 backdrop-blur-lg hover:bg-white/30 hover:shadow-[0_4px_12px_rgba(0,128,128,0.3)] transition"
          >
            + Create Event
          </Button>
        </CardHeader>

        {/* Search */}
        <div className="flex items-center gap-4 mb-6">
          <Input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white/10 text-black placeholder-black/40 border border-white/20 focus:border-teal-400/40"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-black">Loading events...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <EventTable events={events} search={search} />
          )}
        </div>
      </Card>
    </div>
  );
}
