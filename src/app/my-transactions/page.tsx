"use client";

import Navbar from "@/components/event-browsing/navbar";
import Footer from "@/components/event-browsing/footer";
import Link from "next/link";
import { useMemo, useEffect, useState } from "react";
// Import txStatus sudah dihapus, menggunakan logic sederhana
import { events } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type TransactionStatus = "purchased" | "canceled" | "pending" | "processing";

interface TransactionItem {
  id: string;
  eventId: number;
  title: string;
  date: string;
  location: string;
  quantity: number;
  total: number;
  status: TransactionStatus;
}

export default function MyTransactionsPage() {
  // Mock transactions; in real app this should come from API/auth context
  const transactions: TransactionItem[] = useMemo(
    () => [
      {
        id: "EVT-2024-001",
        eventId: events[0]?.id ?? 1,
        title: events[0]?.title ?? "Sample Event",
        date: events[0]?.date ?? "2024-12-25",
        location: events[0]?.location ?? "Venue",
        quantity: 2,
        total: (events[0]?.price ?? 500000) * 2 * 1.1,
        status: "purchased",
      },
      {
        id: "EVT-2024-002",
        eventId: events[1]?.id ?? 2,
        title: events[1]?.title ?? "Another Event",
        date: events[1]?.date ?? "2024-11-10",
        location: events[1]?.location ?? "Venue",
        quantity: 1,
        total: (events[1]?.price ?? 350000) * 1 * 1.1,
        status: "canceled",
      },
      {
        id: "EVT-2024-003",
        eventId: events[2]?.id ?? 3,
        title: events[2]?.title ?? "Pending Event",
        date: events[2]?.date ?? "2024-10-05",
        location: events[2]?.location ?? "Venue",
        quantity: 3,
        total: (events[2]?.price ?? 250000) * 3 * 1.1,
        status: "pending",
      },
    ],
    []
  );

  // Live status logic sudah disederhanakan
  const [liveStatus, setLiveStatus] = useState<string | null>(null);
  useEffect(() => {
    // Simulasi status live sederhana
    setLiveStatus("done");
  }, []);

  const myTickets = transactions
    .map((t) => ({
      ...t,
      // contoh: map status live ke item pertama
      status: t.id === "EVT-2024-001" && liveStatus
        ? liveStatus === "waiting_payment"
          ? "pending"
          : liveStatus === "waiting_admin"
          ? "processing"
          : liveStatus === "done"
          ? "purchased"
          : liveStatus === "canceled"
          ? "canceled"
          : liveStatus === "rejected"
          ? "canceled"
          : liveStatus === "expired"
          ? "canceled"
          : t.status
        : t.status,
    }))
    .filter((t) => t.status === "purchased" || t.status === "canceled");

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            My Tickets
          </h1>
          <p className="text-gray-400 mt-3">Menampilkan transaksi yang sudah dibeli atau dibatalkan saja</p>
        </div>

        <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 shadow-xl">
          <CardContent className="p-6">
            {myTickets.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🕊️</div>
                <p className="text-gray-300">Belum ada tiket yang dibeli atau dibatalkan.</p>
                <Link href="/event-browsing" className="inline-block mt-6 px-5 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300">
                  Browse Events
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {myTickets.map((t) => (
                  <Card key={t.id} className="bg-black/30 border border-gray-700/40 hover:border-gray-600/60 transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="text-white font-semibold text-lg">{t.title}</div>
                          <div className="text-sm text-gray-400 flex items-center gap-2">
                            <span>📅</span>
                            {t.date}
                            <span>📍</span>
                            {t.location}
                            <span>🎫</span>
                            {t.quantity} tiket
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-sm border ${
                            t.status === "purchased" ? "border-green-500 text-green-400" : "border-red-500 text-red-400"
                          }`}>
                            {t.status === "purchased" ? "Purchased" : "Canceled"}
                          </span>
                          <span className="text-green-400 font-bold">Rp {Math.round(t.total).toLocaleString("id-ID")}</span>
                          {t.status === "purchased" && (
                            <Link href="/transactions" className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-300">
                              Download
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-400">
          Checkout hanya dapat dimulai dari halaman detail event.
        </div>
      </section>

      <Footer />
    </main>
  );
}

