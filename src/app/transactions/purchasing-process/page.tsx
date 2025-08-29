"use client";

import Navbar from "@/components/event-browsing/navbar";
import Footer from "@/components/event-browsing/footer";
import PurchasingProcess from "@/components/transactions/purchasing-process";

export default function PurchasingProcessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <Navbar />
      <PurchasingProcess />
      <Footer />
    </main>
  );
}