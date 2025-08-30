"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function EventsPage() {
  const [search, setSearch] = useState("");

  const events = [
    { eventId: 1, title: "Music Festival", startsAt: "2025-09-15", quantity: 200, priceIdr: 50000 },
    { eventId: 2, title: "Art Expo", startsAt: "2025-10-05", quantity: 100, priceIdr: 75000 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header & Create Event Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">Events</h2>
        <Button className="bg-teal-400/30 text-black border border-teal-700/30 backdrop-blur-xl transform transition-transform hover:scale-102 hover:shadow-[0_4px_12px_rgba(0,128,128,0.35)]">
          + Create Event
        </Button>
      </div>

      {/* Search Input */}
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

      {/* Event Table */}
      <Card className="backdrop-blur-xl bg-gradient-to-br from-teal-400/25 via-teal-500/25 to-teal-600/25 border border-teal-700/20 transform transition-transform hover:scale-101 hover:shadow-[0_3px_10px_rgba(0,128,128,0.2)]">
        <CardContent>
          <table className="w-full text-black">
            <thead>
              <tr className="bg-teal-400/15">
                <th className="p-4">Select</th>
                <th className="p-4">Event ID</th>
                <th className="p-4">Title</th>
                <th className="p-4">Start Date</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Price (IDR)</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.eventId} className="border-b border-teal-700/10 hover:bg-teal-400/5">
                  <td className="p-4">
                    <input type="checkbox" className="accent-teal-700" />
                  </td>
                  <td className="p-4">{event.eventId}</td>
                  <td className="p-4">{event.title}</td>
                  <td className="p-4">{event.startsAt}</td>
                  <td className="p-4">{event.quantity}</td>
                  <td className="p-4">{event.priceIdr.toLocaleString()}</td>
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
            className="bg-teal-400/25 text-black border border-teal-700/20 backdrop-blur-xl transform transition-transform hover:scale-101 hover:shadow-[0_3px_10px_rgba(0,128,128,0.2)]"
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
}