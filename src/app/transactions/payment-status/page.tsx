"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { events } from "@/lib/data";
import Navbar from "@/components/event-browsing/navbar";
import Footer from "@/components/event-browsing/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PaymentStatusData {
  eventSlug: string;
  qtyA: number;
  qtyB: number;
  total: number;
  method: string;
  bank?: string;
  status: 'waiting' | 'processing' | 'confirmed' | 'rejected' | 'expired' | 'canceled';
  orderId: string;
  paymentTime?: string;
  adminNote?: string;
}

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get data from URL parameters
  const eventSlug = searchParams.get("event");
  const qtyA = parseInt(searchParams.get("qtyA") || "0");
  const qtyB = parseInt(searchParams.get("qtyB") || "0");
  const total = parseInt(searchParams.get("total") || "0");
  const method = searchParams.get("method") || "unknown";
  const bank = searchParams.get("bank") || "";
  const status = searchParams.get("status") || "waiting";
  
  const [event, setEvent] = useState<any>(null);
  const [paymentData, setPaymentData] = useState<PaymentStatusData | null>(null);
  const [countdown, setCountdown] = useState(7200); // 2 hours countdown for upload proof
  const [adminDeadline, setAdminDeadline] = useState(259200); // 3 days countdown for admin response

  useEffect(() => {
    if (eventSlug) {
      const foundEvent = events.find((e) => 
        e.title.toLowerCase().replace(/\s+/g, "-") === eventSlug
      );
      setEvent(foundEvent);
      
      // Generate order ID
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      setPaymentData({
        eventSlug,
        qtyA,
        qtyB,
        total,
        method,
        bank,
        status: status as any,
        orderId,
        paymentTime: new Date().toLocaleString("id-ID"),
        adminNote: status === 'rejected' ? 'Pembayaran tidak valid atau tidak lengkap' : 
                   status === 'expired' ? 'Batas waktu pembayaran telah habis' :
                   status === 'canceled' ? 'Pembayaran dibatalkan oleh user' : ''
      });
    }
  }, [eventSlug, qtyA, qtyB, total, method, bank, status]);

  // Countdown timer for upload proof (2 hours)
  useEffect(() => {
    if (status === 'waiting' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Auto-expire after 2 hours countdown
            router.push(`/transactions/payment-status?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}&method=${method}&bank=${bank}&status=expired`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [status, countdown, router, eventSlug, qtyA, qtyB, total, method, bank]);

  // Countdown timer for admin response (3 days)
  useEffect(() => {
    if (status === 'processing' && adminDeadline > 0) {
      const timer = setInterval(() => {
        setAdminDeadline(prev => {
          if (prev <= 1) {
            // Auto-cancel after 3 days if admin doesn't respond
            router.push(`/transactions/payment-status?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}&method=${method}&bank=${bank}&status=canceled`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [status, adminDeadline, router, eventSlug, qtyA, qtyB, total, method, bank]);

  if (!event || !paymentData) {
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

  // Status configuration
  const statusConfig = {
    waiting: {
      title: "Menunggu Upload Bukti Pembayaran",
      icon: "📤",
      color: "purple",
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      textColor: "text-purple-800",
      description: "Silakan upload bukti pembayaran Anda dalam waktu 2 jam",
      action: "Upload Bukti Pembayaran",
      actionLink: `/transactions/upload-proof?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}&method=${method}&bank=${bank}`
    },
    processing: {
      title: "Pembayaran Diproses",
      icon: "🔄",
      color: "blue",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      description: "Pembayaran Anda sedang diproses, mohon tunggu",
      action: "Refresh Status",
      actionLink: `/transactions/payment-status?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}&method=${method}&bank=${bank}&status=processing`
    },
    confirmed: {
      title: "Pembayaran Dikonfirmasi",
      icon: "✅",
      color: "green",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      description: "Pembayaran berhasil! Tiket Anda akan segera diproses",
      action: "Download Tiket",
      actionLink: `/transactions/download-tickets?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`
    },
    rejected: {
      title: "Pembayaran Ditolak",
      icon: "❌",
      color: "red",
      bgColor: "from-red-50 to-red-100",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      description: "Pembayaran Anda ditolak. Silakan coba lagi atau hubungi customer service",
      action: "Coba Lagi",
      actionLink: `/transactions/payment?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`
    },
    expired: {
      title: "Pembayaran Kadaluarsa",
      icon: "⏰",
      color: "gray",
      bgColor: "from-gray-50 to-gray-100",
      borderColor: "border-gray-200",
      textColor: "text-gray-800",
      description: "Batas waktu pembayaran telah habis. Silakan buat pesanan baru",
      action: "Buat Pesanan Baru",
      actionLink: `/events/${eventSlug}`
    },
         canceled: {
       title: "Pembayaran Dibatalkan",
       icon: "🚫",
       color: "gray",
       bgColor: "from-gray-50 to-gray-100",
       borderColor: "border-gray-200",
       textColor: "text-gray-800",
       description: "Pembayaran telah dibatalkan. Silakan buat pesanan baru jika diperlukan",
       action: "Buat Pesanan Baru",
       actionLink: `/events/${eventSlug}`
     },
     "admin-expired": {
       title: "Admin Tidak Merespons",
       icon: "👨‍💼",
       color: "red",
       bgColor: "from-red-50 to-red-100",
       borderColor: "border-red-200",
       textColor: "text-red-800",
       description: "Admin tidak merespons dalam 3 hari. Transaksi otomatis dibatalkan",
       action: "Buat Pesanan Baru",
       actionLink: `/events/${eventSlug}`
     }
  };

  const currentStatus = statusConfig[paymentData.status as keyof typeof statusConfig];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
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
            <span className="text-purple-600 font-medium">Status</span>
          </nav>
        </div>

        {/* Status Header */}
        <div className={`bg-gradient-to-r ${currentStatus.bgColor} border ${currentStatus.borderColor} rounded-2xl p-8 mb-8 text-center`}>
          <div className="text-6xl mb-4">{currentStatus.icon}</div>
          <h1 className={`text-4xl font-bold ${currentStatus.textColor} mb-4`}>
            {currentStatus.title}
          </h1>
          <p className={`text-lg ${currentStatus.textColor} mb-6 max-w-2xl mx-auto`}>
            {currentStatus.description}
          </p>
          
                     {/* Countdown for waiting status */}
           {status === 'waiting' && countdown > 0 && (
             <Card className="bg-white/50 rounded-xl p-4 mb-6 border-0 shadow-lg">
               <CardContent>
                 <p className="text-purple-800 font-semibold mb-2">Batas Waktu Upload Bukti Pembayaran</p>
                 <div className="text-2xl font-bold text-purple-800">
                   {Math.floor(countdown / 3600)}:{(Math.floor(countdown / 60) % 60).toString().padStart(2, '0')}:{(countdown % 60).toString().padStart(2, '0')}
                 </div>
                 <p className="text-sm text-purple-700">jam : menit : detik</p>
                 <p className="text-xs text-purple-600 mt-2">
                   Upload bukti pembayaran sebelum waktu habis untuk menghindari pembatalan otomatis
                 </p>
               </CardContent>
             </Card>
           )}

                     {/* Processing info for processing status */}
           {status === 'processing' && (
             <Card className="bg-white/50 rounded-xl p-4 mb-6 border-0 shadow-lg">
               <CardContent>
                 <p className="text-blue-800 font-semibold mb-2">Status Pembayaran</p>
                 <div className="space-y-2 text-blue-700">
                   <p className="text-sm">✅ Pembayaran telah diterima</p>
                   <p className="text-sm">⏳ Sedang diverifikasi oleh admin</p>
                   <p className="text-sm">📧 Notifikasi akan dikirim ke email Anda</p>
                   <p className="text-sm">⏰ Estimasi waktu: 5-15 menit</p>
                 </div>
               </CardContent>
             </Card>
           )}

           {/* Admin Deadline for processing status */}
           {status === 'processing' && adminDeadline > 0 && (
             <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 mb-6 shadow-lg">
               <CardHeader className="pb-2">
                 <div className="flex items-center justify-center space-x-3">
                   <span className="text-2xl">👨‍💼</span>
                   <CardTitle className="text-lg font-bold text-blue-800">Batas Waktu Admin</CardTitle>
                 </div>
               </CardHeader>
               <CardContent className="text-center">
                 <div className="text-2xl font-bold text-blue-700 mb-2">
                   {Math.floor(adminDeadline / 86400)} hari {Math.floor((adminDeadline % 86400) / 3600)} jam
                 </div>
                 <p className="text-sm text-blue-600">Admin harus respond dalam 3 hari</p>
                 <p className="text-xs text-blue-500 mt-2">
                   Jika tidak, transaksi otomatis dibatalkan
                 </p>
               </CardContent>
             </Card>
           )}

          {/* Action Button */}
          {status === 'processing' ? (
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-bold text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>🔄 Refresh Status</span>
            </button>
          ) : (
            <Link
              href={currentStatus.actionLink}
              className={`inline-flex items-center space-x-2 px-8 py-4 rounded-xl font-xl font-bold text-white transition-all duration-300 transform hover:scale-105 shadow-lg ${
                currentStatus.color === 'yellow' ? 'bg-yellow-500 hover:bg-yellow-600' :
                currentStatus.color === 'blue' ? 'bg-blue-500 hover:bg-blue-600' :
                currentStatus.color === 'green' ? 'bg-green-500 hover:bg-green-600' :
                currentStatus.color === 'red' ? 'bg-red-500 hover:bg-red-600' :
                'bg-purple-500 hover:bg-purple-600'
              }`}
            >
              <span>{currentStatus.action}</span>
              <span>→</span>
            </Link>
          )}
        </div>

        {/* Order Details */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Detail Pesanan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Information */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Informasi Event</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Event:</span>
                  <span className="font-medium">{event.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tanggal:</span>
                  <span className="font-medium">{event.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Lokasi:</span>
                  <span className="font-medium">{event.location}</span>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Informasi Pesanan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium font-mono">{paymentData.orderId}</span>
                </div>
                                 <div className="flex justify-between">
                   <span className="text-gray-600">Status:</span>
                   <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                     currentStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                     currentStatus.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                     currentStatus.color === 'green' ? 'bg-green-100 text-green-800' :
                     currentStatus.color === 'red' ? 'bg-red-100 text-red-800' :
                     'bg-gray-100 text-gray-800'
                   }`}>
                     {currentStatus.title}
                   </span>
                 </div>
                 {status === 'processing' && (
                   <div className="flex justify-between">
                     <span className="text-gray-600">Waktu Submit:</span>
                     <span className="font-medium">{paymentData.paymentTime}</span>
                   </div>
                 )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Metode:</span>
                  <span className="font-medium capitalize">{paymentData.method}</span>
                </div>
                {paymentData.bank && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium">{paymentData.bank.toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Summary */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan Tiket</h2>
          
          <div className="space-y-4">
            {qtyA > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <span className="font-medium">CAT 1 (Regular)</span>
                  <span className="text-gray-500 text-sm ml-2">× {qtyA}</span>
                </div>
                <span className="font-medium">Rp {(qtyA * priceCat1).toLocaleString("id-ID")}</span>
              </div>
            )}
            {qtyB > 0 && (
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <div>
                  <span className="font-medium">CAT 2 (VIP)</span>
                  <span className="text-gray-500 text-sm ml-2">× {qtyB}</span>
                </div>
                <span className="font-medium">Rp {(qtyB * priceCat2).toLocaleString("id-ID")}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">Rp {subtotal.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Biaya Layanan</span>
              <span className="font-medium">Rp {serviceFee.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between items-center py-4">
              <span className="text-lg font-bold">Total Pembayaran</span>
              <span className="text-2xl font-bold text-purple-600">Rp {calculatedTotal.toLocaleString("id-ID")}</span>
            </div>
          </div>
        </div>

        {/* Admin Note (if any) */}
        {paymentData.adminNote && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 mb-8">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">ℹ️</span>
              </div>
              <div>
                <h3 className="font-semibold text-red-800 mb-2">Catatan Admin</h3>
                <p className="text-red-700">{paymentData.adminNote}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/events/${eventSlug}`}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-600 transition-all duration-300 text-center"
          >
            ← Kembali ke Detail Event
          </Link>
          
          <Link
            href="/event-browsing"
            className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 text-center"
          >
            Lihat Event Lain
          </Link>

          {status === 'confirmed' && (
            <Link
              href={`/transactions/download-tickets?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 text-center"
            >
              🎫 Download Tiket
            </Link>
          )}

          {status === 'processing' && (
            <Link
              href={`/transactions/payment?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 text-center"
            >
              💳 Lihat Detail Pembayaran
            </Link>
          )}

                     {(status === 'rejected' || status === 'expired' || status === 'canceled') && (
             <>
               <Link
                 href={`/transactions/payment?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`}
                 className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-all duration-300 text-center"
               >
                 💳 Coba Lagi
               </Link>
               <Link
                 href={`/transactions/rollback?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}&method=${method}&bank=${bank}&status=${status}`}
                 className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300 text-center"
               >
                 🔄 Lihat Rollback & Restoration
               </Link>
             </>
           )}
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 mt-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">❓</span>
            </div>
            <div>
              <p className="font-semibold text-purple-800 mb-2">Butuh Bantuan?</p>
              <p className="text-purple-700 text-sm leading-relaxed mb-3">
                Jika Anda mengalami masalah atau memiliki pertanyaan, silakan hubungi customer service kami.
              </p>
              <div className="space-y-2 text-sm text-purple-700">
                <p>📧 Email: support@eventfinder.com</p>
                <p>📱 WhatsApp: +62 812-3456-7890</p>
                <p>☎️ Telepon: (021) 1234-5678</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}