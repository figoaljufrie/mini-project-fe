"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { events } from "@/lib/data";
import Navbar from "@/components/event-details/navbar";
import Footer from "@/components/event-details/footer";
import Link from "next/link";
import TransactionNavigation from "@/components/layout/transaction-navigation";

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

interface TicketSelection {
  cat1: number;  // CAT 1 (Regular)
  cat2: number;  // CAT 2 (VIP)
}

export default function TransactionsCheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const eventSlug = searchParams.get("event");
  const qtyA = parseInt(searchParams.get("qtyA") || "0");
  const qtyB = parseInt(searchParams.get("qtyB") || "0");
  
  const [event, setEvent] = useState<any>(null);
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: ""
  });
  const [ticketSelection, setTicketSelection] = useState<TicketSelection>({
    cat1: qtyA,
    cat2: qtyB
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (eventSlug) {
      const foundEvent = events.find((e) => 
        e.title.toLowerCase().replace(/\s+/g, "-") === eventSlug
      );
      setEvent(foundEvent);
    }
  }, [eventSlug]);

  if (!event) {
    return (
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Event tidak ditemukan</h1>
          <Link href="/event-browsing" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">Kembali ke daftar event</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const priceCat1 = Math.round(event.price);
  const priceCat2 = Math.round(event.price * 1.35);
  const serviceFee = 10000;
  
  const subtotal = ticketSelection.cat1 * priceCat1 + 
                   ticketSelection.cat2 * priceCat2;
  const total = subtotal + serviceFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTicketChange = (type: keyof TicketSelection, increment: boolean) => {
    setTicketSelection(prev => ({
      ...prev,
      [type]: increment ? Math.min(prev[type] + 1, 10) : Math.max(prev[type] - 1, 0)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      // Redirect to payment page
      router.push(`/transactions/payment?event=${eventSlug}&qtyA=${ticketSelection.cat1}&qtyB=${ticketSelection.cat2}&total=${total}`);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/event-browsing" className="hover:text-purple-600 transition-colors">Events</Link>
            <span className="text-gray-400">›</span>
            <Link href={`/events/${eventSlug}`} className="hover:text-purple-600 transition-colors">{event.title}</Link>
            <span className="text-gray-400">›</span>
            <span className="text-purple-600 font-medium">Checkout</span>
          </nav>
        </div>

        {/* Quick Navigation */}
        <div className="mb-6">
          <Link
            href={`/events/${eventSlug}`}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-600 rounded-lg hover:border-purple-400 hover:text-purple-600 transition-all duration-300"
          >
            <span>←</span>
            <span>Kembali ke Detail Event</span>
          </Link>
        </div>

        {/* Transaction Navigation */}
        <TransactionNavigation
          eventSlug={eventSlug || ''}
          qtyA={ticketSelection.cat1}
          qtyB={ticketSelection.cat2}
          total={total}
          currentStep="checkout"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex items-start">
                <div className="h-24 w-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-semibold text-sm">Event</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mt-1">
                    <i className="far fa-calendar-alt mr-2"></i>{event.date}
                  </p>
                  <p className="text-gray-600">
                    <i className="fas fa-map-marker-alt mr-2"></i>{event.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Ticket Selection */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🎫</span>
                Pilih Tiket
              </h3>
              
              <div className="space-y-6">
                {/* CAT 1 (Regular) Ticket */}
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">CAT 1 (Regular)</h4>
                      <p className="text-gray-600 text-sm">💰 Harga: Rp {priceCat1.toLocaleString("id-ID")}</p>
                      <p className="text-green-600 text-sm">✅ Tersedia: 45 tiket</p>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-md">
                      <button 
                        onClick={() => handleTicketChange('cat1', false)}
                        className="w-10 h-10 bg-gray-50 hover:bg-red-50 transition-colors flex items-center justify-center font-bold text-gray-600 hover:border-red-200 border border-gray-300"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-semibold text-gray-800">{ticketSelection.cat1}</span>
                      <button 
                        onClick={() => handleTicketChange('cat1', true)}
                        className="w-10 h-10 bg-gray-50 hover:bg-green-50 transition-colors flex items-center justify-center font-bold text-gray-600 hover:border-green-200 border border-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* CAT 2 (VIP) Ticket */}
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">CAT 2 (VIP)</h4>
                      <p className="text-gray-600 text-sm">💰 Harga: Rp {priceCat2.toLocaleString("id-ID")}</p>
                      <p className="text-green-600 text-sm">✅ Tersedia: 20 tiket</p>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-md">
                      <button 
                        onClick={() => handleTicketChange('cat2', false)}
                        className="w-10 h-10 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center font-bold text-gray-600 hover:bg-red-50"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-semibold text-gray-800">{ticketSelection.cat2}</span>
                      <button 
                        onClick={() => handleTicketChange('cat2', true)}
                        className="w-10 h-10 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-center font-bold text-gray-600 hover:bg-green-50"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">👤</span>
                Data Diri
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Depan *</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Belakang *</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                    required 
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat *</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none" 
                    required 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kota *</label>
                    <input 
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos *</label>
                    <input 
                      type="text" 
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300" 
                      required 
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pesanan</h3>
              
              <div className="space-y-3 mb-6">
                {ticketSelection.cat1 > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiket CAT 1 (Regular)</span>
                    <span className="text-gray-600">{ticketSelection.cat1} × Rp {priceCat1.toLocaleString("id-ID")}</span>
                  </div>
                )}
                {ticketSelection.cat2 > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tiket CAT 2 (VIP)</span>
                    <span className="text-gray-600">{ticketSelection.cat2} × Rp {priceCat2.toLocaleString("id-ID")}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-gray-200">
                  <span className="text-gray-600">Biaya Layanan</span>
                  <span className="text-gray-600">Rp {serviceFee.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-purple-600">Rp {total.toLocaleString("id-ID")}</span>
                </div>
              </div>
              
              <button 
                onClick={handleSubmit}
                disabled={isProcessing || subtotal === 0}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-purple-200 hover:shadow-purple-300 transform hover:scale-105"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Lanjutkan ke Pembayaran"
                )}
              </button>

              {/* Alternative Payment Link */}
              <Link
                href={`/transactions/payment?event=${eventSlug}&qtyA=${ticketSelection.cat1}&qtyB=${ticketSelection.cat2}&total=${total}`}
                className="w-full py-3 px-4 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold text-center hover:bg-purple-50 transition-all duration-300 block mt-3"
              >
                💳 Pilih Metode Pembayaran
              </Link>

              {/* Rollback Feature Access */}
              <div className="mt-4">
                <Link
                  href={`/transactions/rollback?event=${eventSlug}&qtyA=${ticketSelection.cat1}&qtyB=${ticketSelection.cat2}&total=${total}&method=checkout&bank=&status=pending`}
                  className="w-full py-2 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium text-center hover:from-green-600 hover:to-green-700 transition-all duration-300 block text-sm"
                >
                  🔄 Lihat Fitur Rollback & Seat Restoration
                </Link>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                Dengan melanjutkan, Anda menyetujui <a href="#" className="text-purple-600 hover:underline">Syarat & Ketentuan</a> dan <a href="#" className="text-purple-600 hover:underline">Kebijakan Privasi</a> kami.
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 mt-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <p className="font-semibold text-purple-800 mb-2">Pembayaran Aman</p>
                  <p className="text-sm text-purple-700 leading-relaxed">Data Anda dilindungi dengan enkripsi SSL dan tidak akan dibagikan kepada pihak ketiga.</p>
                </div>
              </div>
            </div>

            {/* Rollback & Restoration Info */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 mt-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
                <div>
                  <p className="font-semibold text-green-800 mb-2">Fitur Rollback & Seat Restoration</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Jika transaksi dibatalkan atau expired, sistem akan otomatis mengembalikan points, vouchers, dan coupons yang digunakan, serta memulihkan kursi yang telah dipesan.
                  </p>
                  <div className="mt-3 space-y-1 text-xs text-green-600">
                    <p>✅ Auto-rollback points, vouchers, dan coupons</p>
                    <p>✅ Restorasi kursi otomatis</p>
                    <p>✅ Proses real-time dengan progress bar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}