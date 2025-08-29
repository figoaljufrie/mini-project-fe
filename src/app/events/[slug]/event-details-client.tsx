"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type EventItem = {
  title: string;
  date: string;
  location: string;
  image: string;
  price: number;
};

export default function EventDetailsClient({ event }: { event: EventItem }) {
  const [activeTab, setActiveTab] = useState<"description" | "tickets" | "checkout">("description");
  const [qtyA, setQtyA] = useState(0);
  const [qtyB, setQtyB] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const priceA = Math.round(event.price);
  const priceB = Math.round(event.price * 1.35);
  const total = qtyA * priceA + qtyB * priceB;

  return (
    <section className="details-section grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-5">
        {/* Hero */}
        <div className="details-hero relative">
          <div className="relative w-full h-72 sm:h-96">
            <Image src={event.image} alt={event.title} fill className="object-cover" />
          </div>
          <div className="details-hero-overlay" />
        </div>

        {/* Tabs */}
        <div className="details-tabs">
          <div className="grid grid-cols-3 gap-2">
            <button onClick={() => setActiveTab("description")} className={`details-tab-btn ${activeTab === "description" ? "details-tab-btn-active" : ""}`}>Description</button>
            <button onClick={() => setActiveTab("tickets")} className={`details-tab-btn ${activeTab === "tickets" ? "details-tab-btn-active" : ""}`}>Tickets</button>
            <button 
              onClick={() => setActiveTab("checkout")} 
              className={`details-tab-btn ${activeTab === "checkout" ? "details-tab-btn-active" : ""} ${total === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={total === 0}
            >
              Checkout
            </button>
          </div>
        </div>

        {activeTab === "description" ? (
          <Card className="details-card border-0 shadow-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="details-card-title text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">📋</span>
                Tentang Event
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4 text-sm text-gray-300">
                <Card className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700/30 p-4 rounded-xl">
                  <CardContent className="p-0">
                    <p className="opacity-80">📍 Lokasi</p>
                    <p className="font-medium text-white mt-1">{event.location}</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/30 p-4 rounded-xl">
                  <CardContent className="p-0">
                    <p className="opacity-80">📅 Tanggal</p>
                    <p className="font-medium text-white mt-1">{event.date}</p>
                  </CardContent>
                </Card>
              </div>
              <p className="text-sm text-gray-300 leading-7 mt-4">
                {event.title} akan digelar di {event.location}. Nikmati pengalaman seru dengan rangkaian acara menarik serta fasilitas yang nyaman. Segera amankan tiketmu sebelum kehabisan.
              </p>
            </CardContent>
          </Card>
        ) : activeTab === "tickets" ? (
          <Card className="details-card border-0 shadow-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="details-card-title text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">🎫</span>
                Pilih Tiket
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/30 p-4 rounded-xl">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">CAT 2 (FRONT ROW)</p>
                      <p className="text-xs text-gray-300">Rp {priceB.toLocaleString("id-ID")} • exclude tax & admin</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQtyB((v) => Math.max(0, v - 1))} className="qty-btn">-</button>
                      <span className="text-white">{qtyB}</span>
                      <button onClick={() => setQtyB((v) => v + 1)} className="qty-btn">+</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-700/30 p-4 rounded-xl">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">CAT 1</p>
                      <p className="text-xs text-gray-300">Rp {priceA.toLocaleString("id-ID")} • exclude tax & admin</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQtyA((v) => Math.max(0, v - 1))} className="qty-btn">-</button>
                      <span className="text-white">{qtyA}</span>
                      <button onClick={() => setQtyA((v) => v + 1)} className="qty-btn">+</button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        ) : (
          <Card className="details-card border-0 shadow-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-700/50">
            <CardHeader className="pb-4">
              <CardTitle className="details-card-title text-2xl font-bold text-white flex items-center gap-3">
                <span className="text-3xl">🛒</span>
                Checkout & Konfirmasi Order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Order Summary */}
              <Card className="bg-gradient-to-r from-black/30 to-gray-900/30 border border-gray-600/30 p-4 rounded-xl">
                <CardContent className="p-0">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <span>📋</span>
                    Order Summary
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Event:</span>
                      <span className="text-white">{event.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Date:</span>
                      <span className="text-white">{event.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Location:</span>
                      <span className="text-white">{event.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tickets:</span>
                      <span className="text-white">
                        {qtyA > 0 && `${qtyA} x CAT 1`}
                        {qtyA > 0 && qtyB > 0 && ' + '}
                        {qtyB > 0 && `${qtyB} x CAT 2`}
                      </span>
                    </div>
                    <div className="border-t border-gray-600 pt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Total Amount:</span>
                        <span className="text-green-400">Rp {(total * 1.1).toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <div className="bg-black/30 rounded-xl p-4 border border-gray-600/30">
                <h4 className="text-lg font-bold text-white mb-4">Payment Method</h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <span className="text-blue-400">🏦</span>
                    <span className="text-white">Bank Transfer - BCA</span>
                  </div>
                  <div className="text-sm text-gray-400">
                    You will be redirected to complete your payment after confirmation
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <p className="text-green-400 text-sm text-center">
                    By clicking Accept, you agree to proceed with this purchase
                  </p>
                </div>

                <Link 
                  href={`/transactions/checkout?event=${event.title.toLowerCase().replace(/\s+/g, "-")}&qtyA=${qtyA}&qtyB=${qtyB}`}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 block ${
                    total === 0
                      ? "bg-gray-600 cursor-not-allowed opacity-50" 
                      : "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                  }`}
                >
                  ✅ Proceed to Checkout
                </Link>

                <button 
                  onClick={() => setActiveTab("tickets")}
                  disabled={isProcessing}
                  className="w-full py-4 px-6 rounded-xl font-semibold text-center border border-red-600 text-red-400 hover:border-red-500 hover:text-red-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ❌ Cancel Order
                </button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <aside className="space-y-4">
        <div className="details-card">
          <h1 className="text-2xl font-bold mb-1">{event.title}</h1>
          <p className="text-sm text-gray-300">📍 {event.location}</p>
          <p className="text-sm text-gray-300">📅 {event.date}</p>
        </div>

        <div className="details-card">
          <div className="flex items-center justify-between mb-2 text-sm text-gray-300">
            <span>Subtotal</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
            <span>Est. tax & admin</span>
            <span>Rp {(total * 0.1).toLocaleString("id-ID")}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-300">Total price</span>
            <span className="text-lg font-semibold">Rp {(total * 1.1).toLocaleString("id-ID")}</span>
          </div>
          
          {total > 0 && (
            <div className="space-y-3">
              <Link 
                href={`/transactions/checkout?event=${event.title.toLowerCase().replace(/\s+/g, "-")}&qtyA=${qtyA}&qtyB=${qtyB}`}
                className="w-full py-3 px-4 rounded-xl font-semibold text-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 block"
              >
                🛒 Proceed to Checkout
              </Link>
              <p className="text-xs text-gray-400 text-center">
                Click to review and confirm your order
              </p>
            </div>
          )}
          
          {total === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-400">Select tickets to proceed</p>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}