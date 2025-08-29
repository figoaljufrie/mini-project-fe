"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { events } from "@/lib/data";

export default function TransactionsPage() {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [ticketQuantity, setTicketQuantity] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<"selection" | "checkout" | "payment" | "upload" | "status" | "download">("selection");
  const [isProcessing, setIsProcessing] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const subtotal = selectedEvent.price * ticketQuantity;
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setTicketQuantity(newQuantity);
    }
  };

  const handleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else if (selectedSeats.length < ticketQuantity) {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleNextStep = (step: typeof currentStep) => {
    setIsProcessing(true);
    setTimeout(() => {
      setCurrentStep(step);
      setIsProcessing(false);
    }, 1500);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "selection":
        return (
          <div className="space-y-8">
            {/* Event Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-4xl">🎵</span>
                Pilih Event
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    onClick={() => setSelectedEvent(event)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedEvent.id === event.id
                        ? "border-purple-500 bg-purple-50 shadow-lg" 
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-5xl mb-4">🎵</div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{event.title}</h4>
                      <p className="text-gray-600 text-sm mb-3">{event.date}</p>
                      <p className="text-gray-600 text-sm mb-4">{event.location}</p>
                      <div className="text-green-600 font-bold text-lg">
                        Rp {event.price.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticket Quantity Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-4xl">🎫</span>
                Pilih Jumlah Tiket
              </h3>
              
              <div className="flex items-center justify-center gap-8">
                <button
                  onClick={() => handleQuantityChange(ticketQuantity - 1)}
                  disabled={ticketQuantity <= 1}
                  className="w-16 h-16 rounded-2xl bg-red-500 disabled:bg-gray-300 text-white text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  -
                </button>
                
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900 mb-2">{ticketQuantity}</div>
                  <div className="text-gray-600 text-lg">Tiket</div>
                </div>
                
                <button
                  onClick={() => handleQuantityChange(ticketQuantity + 1)}
                  disabled={ticketQuantity >= 10}
                  className="w-16 h-16 rounded-2xl bg-green-500 disabled:bg-gray-300 text-white text-3xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        );

      case "checkout":
        return (
          <div className="space-y-8">
            {/* Event Information */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-6xl">🎵</span>
                </div>
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
                  <div className="grid grid-cols-2 gap-4 text-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📅</span>
                      <span className="text-lg">{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📍</span>
                      <span className="text-lg">{selectedEvent.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⏰</span>
                      <span className="text-lg">19:00 WIB</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💰</span>
                      <span className="text-lg text-green-600 font-bold">Rp {selectedEvent.price.toLocaleString("id-ID")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Selection */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-4xl">🪑</span>
                Pilih Kursi
              </h3>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-4 p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span className="text-gray-600">Tersedia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-500 rounded"></div>
                    <span className="text-purple-600">Dipilih</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <span className="text-gray-500">Tidak Tersedia</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-10 gap-2 max-w-2xl mx-auto">
                {Array.from({ length: 50 }, (_, i) => {
                  const seatNumber = `A${i + 1}`;
                  const isSelected = selectedSeats.includes(seatNumber);
                  const isAvailable = Math.random() > 0.3;
                  
                  return (
                    <button
                      key={seatNumber}
                      onClick={() => isAvailable && handleSeatSelection(seatNumber)}
                      disabled={!isAvailable}
                      className={`w-8 h-8 rounded text-xs font-bold transition-all duration-300 ${
                        isSelected
                          ? "bg-purple-500 text-white shadow-lg"
                          : isAvailable
                          ? "bg-gray-400 hover:bg-gray-500 text-white"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      {seatNumber}
                    </button>
                  );
                })}
              </div>
              
              <div className="mt-6 text-center text-gray-600">
                Kursi yang dipilih: {selectedSeats.length > 0 ? selectedSeats.join(", ") : "Belum ada kursi dipilih"}
              </div>
            </div>
          </div>
        );

      case "payment":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">💳</span>
              Metode Pembayaran
            </h3>
            
            <div className="text-center py-16">
              <div className="text-8xl mb-6">💳</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Pilih Metode Pembayaran</h4>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Transfer Bank atau Payment Gateway yang aman dan terpercaya
              </p>
              <div className="flex justify-center gap-6 text-base text-gray-500">
                <span className="px-6 py-3 bg-gray-100 rounded-2xl">🏦 Transfer Bank</span>
                <span className="px-6 py-3 bg-gray-100 rounded-2xl">🔒 Payment Gateway</span>
              </div>
            </div>
          </div>
        );

      case "upload":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">📤</span>
              Upload Bukti Pembayaran
            </h3>
            
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📤</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Upload Bukti Transfer</h4>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Upload screenshot atau foto bukti transfer bank Anda untuk verifikasi pembayaran
              </p>
              <div className="inline-flex items-center gap-4 p-6 bg-gray-50 rounded-2xl">
                <span className="text-4xl">📱</span>
                <div className="text-left">
                  <p className="text-gray-900 font-semibold">Drag & Drop atau Klik untuk Upload</p>
                  <p className="text-gray-500 text-sm">Format: JPG, PNG, PDF (Max 5MB)</p>
                </div>
              </div>
            </div>
          </div>
        );

      case "status":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">📊</span>
              Status Pembayaran
            </h3>
            
            <div className="text-center py-16">
              <div className="text-8xl mb-6">⏳</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Sedang Memverifikasi</h4>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Tim kami sedang memverifikasi bukti pembayaran Anda. Proses ini biasanya memakan waktu 1-2 jam.
              </p>
              <div className="inline-flex items-center gap-4 p-6 bg-blue-50 rounded-2xl">
                <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-blue-600 font-semibold">Memverifikasi Pembayaran...</span>
              </div>
            </div>
          </div>
        );

      case "download":
        return (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-4xl">🎫</span>
              Tiket Siap!
            </h3>
            
            <div className="text-center py-16">
              <div className="text-8xl mb-6">🎉</div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Pembayaran Berhasil!</h4>
              <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                Selamat! Pembayaran Anda telah berhasil diverifikasi. Tiket digital Anda siap untuk didownload.
              </p>
              <div className="inline-flex items-center gap-4 p-6 bg-green-50 rounded-2xl">
                <span className="text-4xl">📱</span>
                <div className="text-left">
                  <p className="text-gray-900 font-semibold">Tiket Digital Tersedia</p>
                  <p className="text-gray-500 text-sm">Download dan simpan dengan aman</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: "selection", label: "Pilih Event", icon: "🎵" },
      { key: "checkout", label: "Checkout", icon: "🛒" },
      { key: "payment", label: "Pembayaran", icon: "💳" },
      { key: "upload", label: "Upload Bukti", icon: "📤" },
      { key: "status", label: "Verifikasi", icon: "📊" },
      { key: "download", label: "Download", icon: "🎫" }
    ];

    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <span className="text-4xl">📋</span>
          Progress Transaksi
        </h3>
        
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = currentStep === step.key;
            const isCompleted = steps.findIndex(s => s.key === currentStep) > index;
            
            return (
              <div key={step.key} className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-3 transition-all duration-300 ${
                  isActive
                    ? "bg-purple-500 text-white shadow-lg"
                    : isCompleted
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}>
                  {isCompleted ? "✅" : step.icon}
                </div>
                <span className={`text-sm font-medium text-center ${
                  isActive ? "text-purple-600" : isCompleted ? "text-green-600" : "text-gray-500"
                }`}>
                  {step.label}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mt-3 rounded-full ${
                    isCompleted ? "bg-green-500" : "bg-gray-200"
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-purple-600 mb-8 shadow-lg">
            <span className="text-4xl">🎫</span>
          </div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
            Transaksi Tiket
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jalani seluruh proses pembelian tiket dari pemilihan event hingga download tiket
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {renderStepContent()}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 sticky top-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="text-4xl">📋</span>
                Ringkasan Pesanan
              </h3>
              
              {/* Event Info */}
              <div className="bg-purple-50 rounded-2xl p-6 mb-8 border border-purple-200">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h4>
                <div className="space-y-2 text-gray-600">
                  <p>📅 {selectedEvent.date}</p>
                  <p>📍 {selectedEvent.location}</p>
                  <p>🎫 {ticketQuantity} tiket</p>
                  {selectedSeats.length > 0 && (
                    <p>🪑 Kursi: {selectedSeats.join(", ")}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-gray-600 text-lg">Subtotal:</span>
                  <span className="text-gray-900 font-semibold text-lg">Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between items-center py-4 border-b border-gray-200">
                  <span className="text-gray-600 text-lg">Pajak & Admin:</span>
                  <span className="text-gray-900 font-semibold text-lg">Rp {tax.toLocaleString("id-ID")}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-900 text-2xl font-bold">Total:</span>
                    <span className="text-green-600 font-bold text-3xl">Rp {total.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <div className="space-y-4">
                {currentStep === "selection" && (
                  <button
                    onClick={() => handleNextStep("checkout")}
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-2xl font-bold text-lg text-center bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {isProcessing ? "Memproses..." : "🛒 Lanjut ke Checkout"}
                  </button>
                )}
                
                {currentStep === "checkout" && (
                  <button
                    onClick={() => handleNextStep("payment")}
                    disabled={isProcessing || selectedSeats.length !== ticketQuantity}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-lg text-center transition-all duration-300 transform hover:scale-105 ${
                      isProcessing || selectedSeats.length !== ticketQuantity
                        ? "bg-gray-400 cursor-not-allowed opacity-50" 
                        : "bg-purple-600 hover:bg-purple-700 shadow-lg"
                    }`}
                  >
                    {isProcessing ? "Memproses..." : "💳 Lanjut ke Pembayaran"}
                  </button>
                )}
                
                {currentStep === "payment" && (
                  <button
                    onClick={() => handleNextStep("upload")}
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-2xl font-bold text-lg text-center bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {isProcessing ? "Memproses..." : "📤 Lanjut ke Upload Bukti"}
                  </button>
                )}
                
                {currentStep === "upload" && (
                  <button
                    onClick={() => handleNextStep("status")}
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-2xl font-bold text-lg text-center bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {isProcessing ? "Memproses..." : "📊 Lanjut ke Verifikasi"}
                  </button>
                )}
                
                {currentStep === "status" && (
                  <button
                    onClick={() => handleNextStep("download")}
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-2xl font-bold text-lg text-center bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {isProcessing ? "Memproses..." : "🎫 Lanjut ke Download"}
                  </button>
                )}
                
                {currentStep === "download" && (
                  <button
                    onClick={() => setCurrentStep("selection")}
                    className="w-full py-4 px-6 rounded-2xl font-bold text-lg text-center bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🔄 Mulai Lagi
                  </button>
                )}
                
                <Link 
                  href="/event-browsing"
                  className="w-full py-4 px-6 rounded-2xl font-semibold text-center border-2 border-red-500 text-red-500 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 block"
                >
                  ❌ Batalkan Pesanan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}