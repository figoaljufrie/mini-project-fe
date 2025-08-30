"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Dummy data for now
const tickets = [
  {
    transactionId: 1,
    event: { title: "Music Festival", startsAt: "2025-09-15", image: "/placeholder-event.png" },
    quantity: 2,
    totalIdr: 100000,
    status: "DONE",
  },
  {
    transactionId: 2,
    event: { title: "Art Expo", startsAt: "2025-10-05", image: "/placeholder-event.png" },
    quantity: 1,
    totalIdr: 75000,
    status: "WAITING_FOR_PAYMENT",
  },
];

export default function MyTicketsPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="p-8">
      <Card className="bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-2xl p-8">
        <CardContent>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">My Tickets</h2>
          </div>

          {/* Search */}
          <div className="flex items-center gap-4 mb-6">
            <Input
              placeholder="Search your tickets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/20 text-white placeholder-white/70"
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead>
                <tr className="text-left bg-white/20">
                  <th className="p-4">Event</th>
                  <th className="p-4">Thumbnail</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Total (IDR)</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.transactionId} className="border-b border-white/10 hover:bg-white/10">
                    <td className="p-4">{ticket.event.title}</td>
                    <td className="p-4">
                      <Avatar className="h-16 w-16 border-2 border-white">
                        <AvatarImage src={ticket.event.image} alt={ticket.event.title} />
                        <AvatarFallback>IMG</AvatarFallback>
                      </Avatar>
                    </td>
                    <td className="p-4">{new Date(ticket.event.startsAt).toLocaleDateString()}</td>
                    <td className="p-4">{ticket.quantity}</td>
                    <td className="p-4">{ticket.totalIdr.toLocaleString()}</td>
                    <td className="p-4">{ticket.status.replaceAll("_", " ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-2">
            <Button className="bg-white/20 text-white border border-white/30">Previous</Button>
            <Button className="bg-white/20 text-white border border-white/30">1</Button>
            <Button className="bg-white/20 text-white border border-white/30">2</Button>
            <Button className="bg-white/20 text-white border border-white/30">Next</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}