"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { events } from "@/lib/data";
import Navbar from "@/components/event-browsing/navbar";
import Footer from "@/components/event-browsing/footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface TicketData {
  id: string;
  type: string;
  price: number;
  seatNumber?: string;
  qrCode: string;
}

export default function DownloadTicketsPage() {
  const searchParams = useSearchParams();
  const [event, setEvent] = useState<any>(null);
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
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
      
      if (foundEvent) {
        // Generate ticket data
        const generatedTickets: TicketData[] = [];
        let ticketId = 1;
        
        // Generate CAT 1 tickets
        for (let i = 0; i < qtyA; i++) {
          generatedTickets.push({
            id: `TKT-${foundEvent.title.split(' ')[0].toUpperCase()}-${ticketId.toString().padStart(3, '0')}`,
            type: "CAT 1 (Regular)",
            price: Math.round(foundEvent.price),
            seatNumber: `A${Math.floor(Math.random() * 50) + 1}`,
            qrCode: `QR-${foundEvent.title.split(' ')[0].toUpperCase()}-${ticketId.toString().padStart(3, '0')}`
          });
          ticketId++;
        }
        
        // Generate CAT 2 tickets
        for (let i = 0; i < qtyB; i++) {
          generatedTickets.push({
            id: `TKT-${foundEvent.title.split(' ')[0].toUpperCase()}-${ticketId.toString().padStart(3, '0')}`,
            type: "CAT 2 (VIP)",
            price: Math.round(foundEvent.price * 1.35),
            seatNumber: `VIP${Math.floor(Math.random() * 20) + 1}`,
            qrCode: `QR-${foundEvent.title.split(' ')[0].toUpperCase()}-${ticketId.toString().padStart(3, '0')}`
          });
          ticketId++;
        }
        
        setTickets(generatedTickets);
      }
      
      setIsLoading(false);
    }
  }, [eventSlug, qtyA, qtyB]);

  const handleDownloadTicket = (ticket: TicketData) => {
    // Simulate ticket download
    const ticketContent = `
EVENTFINDER - TICKET
====================

Event: ${event?.title}
Date: ${event?.date}
Location: ${event?.location}

Ticket ID: ${ticket.id}
Type: ${ticket.type}
Price: Rp ${ticket.price.toLocaleString("id-ID")}
Seat: ${ticket.seatNumber}
QR Code: ${ticket.qrCode}

Terms & Conditions:
- This ticket is non-refundable
- Valid for one-time use only
- Please arrive 30 minutes before the event
- Bring valid ID for verification

Generated on: ${new Date().toLocaleDateString("id-ID")}
    `;
    
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${ticket.id}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    tickets.forEach((ticket, index) => {
      setTimeout(() => {
        handleDownloadTicket(ticket);
      }, index * 500);
    });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-700">Loading tickets...</h2>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

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
            <span className="text-purple-600 font-medium">Download Tickets</span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mb-6 shadow-lg">
            <span className="text-4xl">🎫</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Download Tickets
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your tickets for <span className="text-purple-600 font-semibold">{event.title}</span> are ready for download!
          </p>
        </div>

        {/* Event Summary */}
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="h-20 w-20 bg-gradient-to-r from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{event.title.split(' ')[0]}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <span>📅</span>
                    {event.date}
                  </p>
                  <p className="text-gray-600 flex items-center gap-2">
                    <span>📍</span>
                    {event.location}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Tickets</p>
                <p className="text-3xl font-bold text-purple-600">{tickets.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Download All Button */}
        <div className="text-center mb-8">
          <button
            onClick={handleDownloadAll}
            className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-200 hover:shadow-purple-300"
          >
            <span className="text-xl">📥</span>
            <span>Download All Tickets</span>
          </button>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket, index) => (
            <Card key={ticket.id} className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <span className="text-2xl">🎫</span>
                </div>
                <CardTitle className="text-lg font-bold text-gray-800">{ticket.type}</CardTitle>
                <p className="text-sm text-gray-500">Ticket #{index + 1}</p>
              </CardHeader>

              {/* Ticket Details */}
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Ticket ID:</span>
                    <span className="font-mono font-semibold text-gray-800">{ticket.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-semibold text-gray-800">Rp {ticket.price.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Seat:</span>
                    <span className="font-semibold text-purple-600">{ticket.seatNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">QR Code:</span>
                    <span className="font-mono text-xs text-gray-600">{ticket.qrCode}</span>
                  </div>
                </div>

                {/* QR Code Placeholder */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 text-center border border-gray-200">
                  <div className="w-20 h-20 bg-white rounded-lg border-2 border-dashed border-gray-300 mx-auto flex items-center justify-center shadow-sm">
                    <span className="text-gray-400 text-xs">QR Code</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{ticket.qrCode}</p>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownloadTicket(ticket)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-md"
                >
                  📥 Download Ticket
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/event-browsing"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <span>🔍</span>
              <span>Browse More Events</span>
            </Link>
            
            <Link
              href="/my-transactions"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-md"
            >
              <span>📋</span>
              <span>View My Transactions</span>
            </Link>
          </div>
        </div>

        {/* Important Information */}
        <div className="mt-12 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-purple-800 mb-4 flex items-center">
            <span className="mr-2">ℹ️</span>
            Important Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-700">
            <div>
              <p className="font-semibold mb-2">Before the Event:</p>
              <ul className="space-y-1">
                <li>• Save tickets to your phone or print them</li>
                <li>• Arrive 30 minutes before the event starts</li>
                <li>• Bring valid ID for verification</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-2">Terms & Conditions:</p>
              <ul className="space-y-1">
                <li>• Tickets are non-refundable</li>
                <li>• Valid for one-time use only</li>
                <li>• No resale allowed</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}