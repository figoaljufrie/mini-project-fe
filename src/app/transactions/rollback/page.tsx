"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { events } from "@/lib/data";
import Navbar from "@/components/event-browsing/navbar";
import Footer from "@/components/event-browsing/footer";
import RollbackSystem from "@/components/transactions/rollback-system";
import SeatRestoration from "@/components/transactions/seat-restoration";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface RollbackData {
  eventSlug: string;
  qtyA: number;
  qtyB: number;
  total: number;
  method: string;
  bank?: string;
  status: string;
  orderId: string;
  pointsUsed: number;
  voucherUsed: string;
  couponUsed: string;
  seatsReserved: string[];
}

export default function RollbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get data from URL parameters
  const eventSlug = searchParams.get("event");
  const qtyA = parseInt(searchParams.get("qtyA") || "0");
  const qtyB = parseInt(searchParams.get("qtyB") || "0");
  const total = parseInt(searchParams.get("total") || "0");
  const method = searchParams.get("method") || "unknown";
  const bank = searchParams.get("bank") || "";
  const status = searchParams.get("status") || "canceled";
  
  const [event, setEvent] = useState<any>(null);
  const [rollbackData, setRollbackData] = useState<RollbackData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (eventSlug) {
      const foundEvent = events.find((e) => 
        e.title.toLowerCase().replace(/\s+/g, "-") === eventSlug
      );
      setEvent(foundEvent);
      
      // Generate realistic rollback data based on event and order
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Calculate realistic points, voucher, and coupon usage
      const basePoints = Math.floor(total * 0.01); // 1% of total as points
      const pointsUsed = Math.min(basePoints, 1000); // Max 1000 points
      const voucherUsed = total > 500000 ? "VOUCHER-50K" : ""; // Voucher for orders > 500k
      const couponUsed = total > 300000 ? "DISKON20" : ""; // Coupon for orders > 300k
      
      setRollbackData({
        eventSlug,
        qtyA,
        qtyB,
        total,
        method,
        bank,
        status,
        orderId,
        pointsUsed,
        voucherUsed,
        couponUsed,
        seatsReserved: generateSeats(qtyA, qtyB)
      });
    }
  }, [eventSlug, qtyA, qtyB, total, method, bank, status]);

  // Generate mock seat numbers
  function generateSeats(qtyA: number, qtyB: number): string[] {
    const seats: string[] = [];
    const cat1Seats = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"];
    const cat2Seats = ["VIP1", "VIP2", "VIP3", "VIP4", "VIP5", "VIP6", "VIP7", "VIP8"];
    
    for (let i = 0; i < qtyA; i++) {
      seats.push(cat1Seats[i]);
    }
    for (let i = 0; i < qtyB; i++) {
      seats.push(cat2Seats[i]);
    }
    
    return seats;
  }

  if (!event || !rollbackData) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Data tidak ditemukan</h1>
            <Link href="/event-browsing" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Kembali ke daftar event
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const priceCat1 = Math.round(event.price);
  const priceCat2 = Math.round(event.price * 1.35);
  const serviceFee = 10000;
  const subtotal = qtyA * priceCat1 + qtyB * priceCat2;
  const calculatedTotal = subtotal + serviceFee;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/event-browsing" className="hover:text-purple-600 transition-colors">Events</Link>
            <span className="text-gray-400">›</span>
            <Link href={`/events/${eventSlug}`} className="hover:text-purple-600 transition-colors">{event.title}</Link>
            <span className="text-gray-400">›</span>
            <Link href={`/transactions/checkout?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}`} className="hover:text-purple-600 transition-colors">Checkout</Link>
            <span className="text-gray-400">›</span>
            <Link href={`/transactions/payment?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`} className="hover:text-purple-600 transition-colors">Payment</Link>
            <span className="text-gray-400">›</span>
            <span className="text-purple-600 font-medium">Rollback & Restoration</span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-500 to-green-700 rounded-full mb-6 shadow-lg">
            <span className="text-4xl">🔄</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Rollback & Seat Restoration
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Transaksi telah dibatalkan/expired. Kami akan mengembalikan poin, voucher, dan kupon Anda, serta memulihkan kursi yang tersedia.
          </p>
          
          {/* Status Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full text-white font-semibold text-lg mb-6">
            {status === 'canceled' ? (
              <span className="bg-red-500 px-4 py-2 rounded-full">🚫 Transaksi Dibatalkan</span>
            ) : status === 'expired' ? (
              <span className="bg-orange-500 px-4 py-2 rounded-full">⏰ Transaksi Expired</span>
            ) : status === 'admin-expired' ? (
              <span className="bg-yellow-500 px-4 py-2 rounded-full">⚠️ Admin Tidak Merespons</span>
            ) : status === 'pending' ? (
              <span className="bg-blue-500 px-4 py-2 rounded-full">⏳ Menunggu Proses</span>
            ) : (
              <span className="bg-gray-500 px-4 py-2 rounded-full">❓ Status Tidak Diketahui</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Rollback System */}
          <div className="lg:col-span-2 space-y-6">
            <RollbackSystem 
              rollbackData={rollbackData}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
            />
          </div>

          {/* Right Column - Order Summary & Seat Restoration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Order Summary */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-3xl">📋</span>
                  Ringkasan Pesanan
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Event Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                  <h4 className="font-semibold text-gray-800 mb-2 text-lg">{event.title}</h4>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span>📅</span>
                    {event.date}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <span>📍</span>
                    {event.location}
                  </p>
                </div>
              
              {/* Ticket Details */}
              <div className="space-y-3 mb-4">
                {qtyA > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CAT 1 (Regular): {qtyA} × Rp {priceCat1.toLocaleString("id-ID")}</span>
                    <span className="text-gray-800">Rp {(qtyA * priceCat1).toLocaleString("id-ID")}</span>
                  </div>
                )}
                {qtyB > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CAT 2 (VIP): {qtyB} × Rp {priceCat2.toLocaleString("id-ID")}</span>
                    <span className="text-gray-800">Rp {(qtyB * priceCat2).toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Biaya Layanan</span>
                  <span className="text-gray-800">Rp {serviceFee.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total Pembayaran</span>
                  <span className="text-purple-600">Rp {calculatedTotal.toLocaleString("id-ID")}</span>
                </div>
              </div>

              {/* Order ID */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Order ID</h4>
                <p className="font-mono text-sm text-gray-600">{rollbackData.orderId}</p>
              </div>

              {/* Payment Method */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-2">Metode Pembayaran</h4>
                <p className="text-purple-700 capitalize">{method}</p>
                {bank && (
                  <p className="text-purple-700 text-sm mt-1">Bank: {bank.toUpperCase()}</p>
                )}
              </div>
              </CardContent>
            </Card>

            {/* Seat Restoration */}
            <SeatRestoration 
              seatsReserved={rollbackData.seatsReserved}
              event={event}
              isProcessing={isProcessing}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href={`/events/${eventSlug}`}
            className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 text-center"
          >
            🎫 Pesan Tiket Baru
          </Link>
          
          <Link
            href="/event-browsing"
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-600 transition-all duration-300 text-center"
          >
            🔍 Lihat Event Lain
          </Link>
          
          <Link
            href={`/transactions/checkout?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}`}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 text-center"
          >
            🔄 Coba Lagi
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 mt-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">❓</span>
            </div>
            <div>
              <p className="font-semibold text-green-800 mb-2">Tentang Rollback & Restoration</p>
              <p className="text-green-700 text-sm leading-relaxed mb-3">
                Ketika transaksi dibatalkan atau expired, sistem otomatis akan mengembalikan semua benefit yang digunakan dan memulihkan kursi yang tersedia.
              </p>
              <div className="space-y-2 text-sm text-green-700">
                <p>🔄 <strong>Rollback Otomatis:</strong> Poin, voucher, dan kupon dikembalikan dalam 24 jam</p>
                <p>💺 <strong>Seat Restoration:</strong> Kursi yang dibooking otomatis tersedia kembali</p>
                <p>📧 <strong>Notifikasi:</strong> Email konfirmasi akan dikirim setelah proses selesai</p>
                <p>⏰ <strong>Waktu Proses:</strong> Maksimal 24 jam untuk semua proses rollback</p>
                <p>🎫 <strong>Pesan Ulang:</strong> Anda bisa langsung memesan tiket baru setelah rollback selesai</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}