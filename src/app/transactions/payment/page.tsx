"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { events } from "@/lib/data";
import { paymentMethods, bankOptions, PaymentMethod, BankOption } from "@/lib/data/payment-method";
import Navbar from "@/components/event-browsing/navbar";
import Footer from "@/components/event-browsing/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQRIS, setShowQRIS] = useState(false);
  
  // Get data from URL parameters
  const eventSlug = searchParams.get("event");
  const qtyA = parseInt(searchParams.get("qtyA") || "0");
  const qtyB = parseInt(searchParams.get("qtyB") || "0");
  const total = parseInt(searchParams.get("total") || "0");
  
  useEffect(() => {
    if (eventSlug) {
      const foundEvent = events.find((e) => 
        e.title.toLowerCase().replace(/\s+/g, "-") === eventSlug
      );
      setEvent(foundEvent);
    }
  }, [eventSlug]);

  // Payment methods available - menggunakan data dari file terpisah

  // Bank options for bank transfer - menggunakan data dari file terpisah

  // Calculate prices
  const priceCat1 = event ? Math.round(event.price) : 0;
  const priceCat2 = event ? Math.round(event.price * 1.35) : 0;
  const serviceFee = 10000;
  const subtotal = qtyA * priceCat1 + qtyB * priceCat2;
  const calculatedTotal = subtotal + serviceFee;

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setSelectedBank("");
    setShowQRIS(methodId === "qris");
  };

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
  };

  const handlePayment = async () => {
    if (!selectedPaymentMethod) {
      alert("Silakan pilih metode pembayaran");
      return;
    }

    if (selectedPaymentMethod === "bank-transfer" && !selectedBank) {
      alert("Silakan pilih bank tujuan");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      if (selectedPaymentMethod === "qris") {
        // Redirect to upload proof for QRIS
        router.push(`/transactions/upload-proof?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${calculatedTotal}&method=qris`);
      } else if (selectedPaymentMethod === "bank-transfer") {
        // Redirect to upload proof for bank transfer
        router.push(`/transactions/upload-proof?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${calculatedTotal}&method=bank-transfer&bank=${selectedBank}`);
      } else {
        // Redirect to upload proof for e-wallet
        router.push(`/transactions/upload-proof?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${calculatedTotal}&method=${selectedPaymentMethod}`);
      }
    }, 2000);
  };

  if (!event) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Event tidak ditemukan</h1>
            <Link href="/event-browsing" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Kembali ke daftar event
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/event-browsing" className="hover:text-purple-600 transition-colors">Events</Link>
            <span className="text-gray-400">›</span>
            <Link href={`/events/${eventSlug}`} className="hover:text-purple-600 transition-colors">{event.title}</Link>
            <span className="text-gray-400">›</span>
            <Link href={`/transactions/checkout?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}`} className="hover:text-purple-600 transition-colors">Checkout</Link>
            <span className="text-gray-400">›</span>
            <span className="text-purple-600 font-medium">Payment</span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mb-6 shadow-lg">
            <span className="text-4xl">💳</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Pilih Metode Pembayaran
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pilih metode pembayaran yang paling nyaman untuk Anda
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Methods Grid */}
            <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-3xl">💳</span>
                  Metode Pembayaran
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                      selectedPaymentMethod === method.id
                        ? "border-purple-500 bg-purple-50"
                        : "border-gray-200 hover:border-purple-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-gray-800">{method.name}</h4>
                          {method.isPopular && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full font-medium">
                              Populer
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-500">Biaya: Rp {method.fee.toLocaleString("id-ID")}</span>
                          <span className="text-xs text-gray-500">{method.processingTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              </CardContent>
            </Card>

            {/* Bank Selection (if bank transfer selected) */}
            {selectedPaymentMethod === "bank-transfer" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Pilih Bank Tujuan</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bankOptions.map((bank) => (
                    <div
                      key={bank.id}
                      onClick={() => handleBankSelect(bank.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-md ${
                        selectedBank === bank.id
                          ? "border-purple-500 bg-purple-50"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{bank.logo}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{bank.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {bank.accountNumber}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {bank.accountName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* QRIS Display (if QRIS selected) */}
            {showQRIS && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Scan QRIS</h3>
                
                <div className="text-center">
                  <div className="w-64 h-64 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 mx-auto flex items-center justify-center mb-4">
                    <div className="text-center">
                      <div className="text-6xl mb-2">📱</div>
                      <p className="text-gray-500 text-sm">QRIS Code</p>
                      <p className="text-gray-400 text-xs">Scan dengan aplikasi e-wallet</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-4">
                    Buka aplikasi e-wallet atau mobile banking Anda, lalu scan QR code di atas
                  </p>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                    <span>✅ GoPay</span>
                    <span>✅ ShopeePay</span>
                    <span>✅ OVO</span>
                    <span>✅ DANA</span>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Instructions */}
            {selectedPaymentMethod && (
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
                  <span className="mr-2">ℹ️</span>
                  Instruksi Pembayaran
                </h3>
                
                {selectedPaymentMethod === "qris" && (
                  <div className="text-purple-700">
                    <p className="mb-2">1. Buka aplikasi e-wallet atau mobile banking</p>
                    <p className="mb-2">2. Pilih menu "Scan QR" atau "Pay"</p>
                    <p className="mb-2">3. Scan QR code di atas</p>
                    <p className="mb-2">4. Masukkan nominal Rp {calculatedTotal.toLocaleString("id-ID")}</p>
                    <p>5. Konfirmasi pembayaran</p>
                  </div>
                )}
                
                {selectedPaymentMethod === "bank-transfer" && selectedBank && (
                  <div className="text-purple-700">
                    <p className="mb-2">1. Buka aplikasi mobile banking atau internet banking</p>
                    <p className="mb-2">2. Pilih menu "Transfer" → "Antar Bank"</p>
                    <p className="mb-2">3. Masukkan kode bank dan nomor rekening tujuan</p>
                    <p className="mb-2">4. Masukkan nominal Rp {calculatedTotal.toLocaleString("id-ID")}</p>
                    <p>5. Konfirmasi dan lakukan transfer</p>
                  </div>
                )}
                
                {(selectedPaymentMethod === "gopay" || selectedPaymentMethod === "shopeepay" || selectedPaymentMethod === "ovo" || selectedPaymentMethod === "dana") && (
                  <div className="text-purple-700">
                    <p className="mb-2">1. Buka aplikasi {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</p>
                    <p className="mb-2">2. Pilih menu "Pay" atau "Transfer"</p>
                    <p className="mb-2">3. Masukkan nominal Rp {calculatedTotal.toLocaleString("id-ID")}</p>
                    <p>4. Konfirmasi pembayaran</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Ringkasan Pembayaran</h3>
              
              {/* Event Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">{event.title}</h4>
                <p className="text-sm text-gray-600">
                  <i className="far fa-calendar-alt mr-2"></i>{event.date}
                </p>
                <p className="text-sm text-gray-600">
                  <i className="fas fa-map-marker-alt mr-2"></i>{event.location}
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
              
              {/* Payment Method Fee */}
              {selectedPaymentMethod && (
                <div className="bg-purple-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-purple-700">Biaya {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</span>
                    <span className="text-purple-700">Rp {paymentMethods.find(m => m.id === selectedPaymentMethod)?.fee.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between font-semibold mt-2">
                    <span className="text-purple-800">Total Akhir</span>
                    <span className="text-purple-800">Rp {calculatedTotal.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              )}
              
              {/* Pay Button */}
              <button
                onClick={handlePayment}
                disabled={!selectedPaymentMethod || isProcessing || (selectedPaymentMethod === "bank-transfer" && !selectedBank)}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-purple-200 hover:shadow-purple-300 transform hover:scale-105"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Bayar Rp ${calculatedTotal.toLocaleString("id-ID")}`
                )}
              </button>
              
              {/* Upload Proof Button */}
              <div className="mt-4">
                <Link
                  href={`/transactions/upload-proof?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${calculatedTotal}&method=${selectedPaymentMethod || 'unknown'}${selectedBank ? `&bank=${selectedBank}` : ''}`}
                  className="w-full py-3 px-6 bg-white border-2 border-purple-300 text-purple-600 rounded-xl font-semibold hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 text-center block"
                >
                  📤 Upload Bukti Pembayaran
                </Link>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Sudah melakukan pembayaran? Upload bukti pembayaran di sini
                </p>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center">
                Dengan melanjutkan, Anda menyetujui <a href="#" className="text-purple-600 hover:underline">Syarat & Ketentuan</a> pembayaran.
              </p>
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 mt-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔒</span>
                </div>
                <div>
                  <p className="font-semibold text-green-800 mb-2">Pembayaran Aman</p>
                  <p className="text-sm text-green-700 leading-relaxed">
                    Semua transaksi dilindungi dengan enkripsi SSL dan sistem keamanan tingkat tinggi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Checkout */}
        <div className="text-center mt-12">
          <Link
            href={`/transactions/checkout?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}`}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-600 transition-all duration-300"
          >
            <span>←</span>
            <span>Kembali ke Checkout</span>
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}