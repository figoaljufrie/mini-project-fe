"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { events } from "@/lib/data";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function PurchasingProcess() {
  const searchParams = useSearchParams();
  const [orderStatus, setOrderStatus] = useState<
    "processing" | "confirmed" | "completed"
  >("processing");

  // Get data from URL parameters
  const eventSlug = searchParams.get("event");
  const qtyA = parseInt(searchParams.get("qtyA") || "0");
  const qtyB = parseInt(searchParams.get("qtyB") || "0");
  const total = parseInt(searchParams.get("total") || "0");

  // Find event data
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    if (eventSlug) {
      const foundEvent = events.find(
        (e) => e.title.toLowerCase().replace(/\s+/g, "-") === eventSlug
      );
      setEvent(foundEvent);
    }
  }, [eventSlug]);

  // Generate order ID
  const orderId = `#EVT-${new Date().getFullYear()}-${String(Date.now()).slice(
    -6
  )}`;

  // Calculate ticket details
  const priceCat1 = event ? Math.round(event.price) : 0;
  const priceCat2 = event ? Math.round(event.price * 1.35) : 0;
  const serviceFee = 10000;

  const subtotal = qtyA * priceCat1 + qtyB * priceCat2;
  const calculatedTotal = subtotal + serviceFee;

  // Show loading state if event data is not yet loaded
  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 shadow-lg">
              <span className="text-3xl">⏳</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Loading Order Details...
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Please wait while we load your order information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Validate order data
  if (qtyA === 0 && qtyB === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-600 to-red-700 mb-6 shadow-lg">
              <span className="text-3xl">❌</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
              Invalid Order
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              No tickets selected. Please go back to checkout and select your
              tickets.
            </p>
            <Link
              href={`/transactions/checkout?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}`}
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105"
            >
              Back to Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-400">
            <Link
              href="/event-browsing"
              className="hover:text-blue-400 transition-colors"
            >
              Events
            </Link>
            <span className="text-gray-600">›</span>
            <Link
              href={`/events/${eventSlug}`}
              className="hover:text-blue-400 transition-colors"
            >
              {event.title}
            </Link>
            <span className="text-gray-600">›</span>
            <Link
              href={`/transactions/checkout?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}`}
              className="hover:text-blue-400 transition-colors"
            >
              Checkout
            </Link>
            <span className="text-gray-600">›</span>
            <span className="text-blue-400 font-medium">
              Purchasing Process
            </span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-6 shadow-lg">
            <span className="text-3xl">🛒</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Purchasing Process
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Your order for{" "}
            <span className="text-blue-400 font-semibold">{event.title}</span>{" "}
            is being processed securely.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <span className="text-blue-400">📋</span>
                  Order Details
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-4 border-b border-gray-600/30">
                    <span className="text-gray-400 text-lg">Order ID:</span>
                    <span className="text-white font-mono font-bold text-lg">
                      {orderId}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-600/30">
                    <span className="text-gray-400 text-lg">Event:</span>
                    <span className="text-white font-bold text-lg">
                      {event ? event.title : "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-600/30">
                    <span className="text-gray-400 text-lg">Date:</span>
                    <span className="text-white font-bold text-lg">
                      {event ? event.date : "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-600/30">
                    <span className="text-gray-400 text-lg">Location:</span>
                    <span className="text-white font-bold text-lg">
                      {event ? event.location : "Loading..."}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-4 border-b border-gray-600/30">
                    <span className="text-gray-400 text-lg">Tickets:</span>
                    <div className="text-white font-bold text-lg text-right">
                      {qtyA > 0 && (
                        <div>
                          CAT 1 (Regular): {qtyA} × Rp{" "}
                          {priceCat1.toLocaleString("id-ID")}
                        </div>
                      )}
                      {qtyB > 0 && (
                        <div>
                          CAT 2 (VIP): {qtyB} × Rp{" "}
                          {priceCat2.toLocaleString("id-ID")}
                        </div>
                      )}
                      <div className="text-sm text-gray-400 mt-1">
                        Biaya Layanan: Rp {serviceFee.toLocaleString("id-ID")}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-600 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-white text-xl font-bold">
                        Total Amount:
                      </span>
                      <span className="text-green-400 font-bold text-2xl">
                        Rp {calculatedTotal.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Payment Status
              </h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      orderStatus === "processing"
                        ? "bg-yellow-500"
                        : orderStatus === "confirmed"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  ></div>
                  <span className="text-white capitalize">{orderStatus}</span>
                </div>

                {orderStatus === "processing" && (
                  <p className="text-gray-400 text-sm">
                    Your payment is being verified. This usually takes 24 hours.
                  </p>
                )}

                {orderStatus === "confirmed" && (
                  <p className="text-green-400 text-sm">
                    Payment confirmed! Your tickets are being generated.
                  </p>
                )}

                {orderStatus === "completed" && (
                  <p className="text-green-400 text-sm">
                    Order completed! You can now download your tickets.
                  </p>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">
                Order Summary
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="text-white">
                    Rp {subtotal.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Service Fee:</span>
                  <span className="text-white">
                    Rp {serviceFee.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-white">Total:</span>
                    <span className="text-green-400">
                      Rp {calculatedTotal.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Next Steps</h3>

              <div className="space-y-4">
                {orderStatus === "processing" && (
                  <>
                    <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <p className="text-yellow-400 text-sm">
                        Please wait while we verify your payment
                      </p>
                    </div>
                    <button
                      onClick={() => setOrderStatus("confirmed")}
                      className="w-full py-3 px-6 rounded-xl font-semibold text-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Simulate Payment Confirmation
                    </button>
                  </>
                )}

                {orderStatus === "confirmed" && (
                  <>
                    <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <p className="text-green-400 text-sm">
                        Payment confirmed! Generating your tickets...
                      </p>
                    </div>
                    <button
                      onClick={() => setOrderStatus("completed")}
                      className="w-full py-3 px-6 rounded-xl font-semibold text-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Complete Order
                    </button>
                  </>
                )}

                {orderStatus === "completed" && (
                  <>
                    <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                      <p className="text-blue-400 text-sm">
                        Order completed successfully!
                      </p>
                    </div>
                    <Link
                      href="/transactions/download-tickets"
                      className="w-full py-4 px-6 rounded-xl font-semibold text-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 block"
                    >
                      Download Tickets
                    </Link>
                  </>
                )}

                <Link
                  href="/event-browsing"
                  className="w-full py-3 px-6 rounded-xl font-semibold text-center border border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white transition-all duration-300 block"
                >
                  Browse More Events
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
