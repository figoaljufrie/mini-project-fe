"use client";

import { useState, useEffect } from "react";

interface SeatRestorationProps {
  seatsReserved: string[];
  event: any;
  isProcessing: boolean;
}

export default function SeatRestoration({
  seatsReserved,
  event,
  isProcessing,
}: SeatRestorationProps) {
  const [restorationProgress, setRestorationProgress] = useState(0);
  const [restorationStatus, setRestorationStatus] = useState<
    "pending" | "processing" | "completed"
  >("pending");
  const [availableSeats, setAvailableSeats] = useState({
    cat1: 50, // Mock available seats
    cat2: 30,
  });

  // Simulate seat restoration process
  useEffect(() => {
    if (isProcessing && restorationStatus === "pending") {
      setRestorationStatus("processing");

      const interval = setInterval(() => {
        setRestorationProgress((prev) => {
          if (prev >= 100) {
            setRestorationStatus("completed");
            // Update available seats
            setAvailableSeats((prev) => ({
              cat1:
                prev.cat1 +
                seatsReserved.filter((seat) => seat.startsWith("A")).length,
              cat2:
                prev.cat2 +
                seatsReserved.filter((seat) => seat.startsWith("VIP")).length,
            }));
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 20;
        });
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isProcessing, restorationStatus, seatsReserved]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✅";
      case "processing":
        return "🔄";
      case "pending":
        return "⏳";
      default:
        return "❓";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600";
      case "processing":
        return "text-blue-600";
      case "pending":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "processing":
        return "bg-blue-500";
      case "pending":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const getSeatCategory = (seat: string) => {
    if (seat.startsWith("A")) return "CAT 1 (Regular)";
    if (seat.startsWith("VIP")) return "CAT 2 (VIP)";
    return "Unknown";
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        💺 Seat Restoration
      </h3>

      {/* Restoration Status */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-blue-800">
            Status Pemulihan Kursi
          </h4>
          <span className="text-2xl">{getStatusIcon(restorationStatus)}</span>
        </div>
        <div className="w-full bg-blue-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(
              restorationStatus
            )}`}
            style={{ width: `${restorationProgress}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-blue-600">
            {Math.round(restorationProgress)}% Selesai
          </span>
          <span
            className={`text-sm font-medium ${getStatusColor(
              restorationStatus
            )}`}
          >
            {restorationStatus === "completed"
              ? "Kursi Dipulihkan"
              : restorationStatus === "processing"
              ? "Sedang Memulihkan"
              : "Menunggu"}
          </span>
        </div>
      </div>

      {/* Seats to be Restored */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          Kursi yang Akan Dipulihkan
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {seatsReserved.map((seat, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-center"
            >
              <div className="text-lg font-bold text-gray-800">{seat}</div>
              <div className="text-xs text-gray-600">
                {getSeatCategory(seat)}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Total: {seatsReserved.length} kursi akan dikembalikan ke ketersediaan
        </p>
      </div>

      {/* Available Seats After Restoration */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">
          Ketersediaan Kursi Setelah Restoration
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-green-700">
              {availableSeats.cat1 +
                (restorationStatus === "completed"
                  ? seatsReserved.filter((seat) => seat.startsWith("A")).length
                  : 0)}
            </div>
            <p className="text-sm text-green-600">CAT 1 (Regular)</p>
            <p className="text-xs text-green-500">Kursi tersedia</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-purple-700">
              {availableSeats.cat2 +
                (restorationStatus === "completed"
                  ? seatsReserved.filter((seat) => seat.startsWith("VIP"))
                      .length
                  : 0)}
            </div>
            <p className="text-sm text-purple-600">CAT 2 (VIP)</p>
            <p className="text-xs text-purple-500">Kursi tersedia</p>
          </div>
        </div>
      </div>

      {/* Restoration Process Info */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
        <h4 className="font-semibold text-green-800 mb-3">
          Proses Pemulihan Kursi
        </h4>
        <div className="space-y-2 text-sm text-green-700">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Kursi yang dibooking otomatis dibebaskan</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Status kursi berubah dari "Reserved" ke "Available"</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Kursi dapat dipesan kembali oleh user lain</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Proses selesai dalam beberapa detik</span>
          </div>
        </div>
      </div>

      {/* Real-time Updates */}
      {restorationStatus === "processing" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="text-sm text-blue-700">
              <p className="font-medium">
                Memulihkan kursi secara real-time...
              </p>
              <p className="text-xs">
                Sistem sedang membebaskan kursi yang dibooking
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Completion Message */}
      {restorationStatus === "completed" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">✅</span>
            <div className="text-sm text-green-700">
              <p className="font-medium">Kursi berhasil dipulihkan!</p>
              <p className="text-xs">
                Semua kursi telah tersedia kembali untuk pemesanan
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Seat Map Preview */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-800 mb-3">Preview Peta Kursi</h4>
        <div className="bg-gray-100 rounded-xl p-4">
          <div className="text-center text-sm text-gray-600 mb-3">
            🎭 {event.title} - Peta Kursi
          </div>
          <div className="grid grid-cols-10 gap-1 mb-2">
            {/* Stage */}
            <div className="col-span-10 bg-yellow-200 rounded text-center text-xs py-1 font-medium">
              STAGE
            </div>
          </div>
          <div className="grid grid-cols-10 gap-1">
            {/* CAT 1 Seats */}
            {Array.from({ length: 5 }, (_, row) => (
              <div
                key={row}
                className="col-span-10 flex justify-center space-x-1"
              >
                {Array.from({ length: 10 }, (_, col) => {
                  const seatNumber = `A${row * 10 + col + 1}`;
                  const isReserved = seatsReserved.includes(seatNumber);
                  const isRestored = restorationStatus === "completed";

                  return (
                    <div
                      key={col}
                      className={`w-6 h-6 rounded text-xs flex items-center justify-center font-medium ${
                        isReserved && !isRestored
                          ? "bg-red-300 text-red-800" // Reserved
                          : isReserved && isRestored
                          ? "bg-green-300 text-green-800" // Restored
                          : "bg-blue-300 text-blue-800" // Available
                      }`}
                      title={seatNumber}
                    >
                      {seatNumber.slice(-1)}
                    </div>
                  );
                })}
              </div>
            ))}
            {/* VIP Seats */}
            <div className="col-span-10 flex justify-center space-x-1 mt-2">
              {Array.from({ length: 8 }, (_, col) => {
                const seatNumber = `VIP${col + 1}`;
                const isReserved = seatsReserved.includes(seatNumber);
                const isRestored = restorationStatus === "completed";

                return (
                  <div
                    key={col}
                    className={`w-8 h-8 rounded text-xs flex items-center justify-center font-medium ${
                      isReserved && !isRestored
                        ? "bg-red-400 text-red-800" // Reserved
                        : isReserved && isRestored
                        ? "bg-green-400 text-green-800" // Restored
                        : "bg-purple-400 text-purple-800" // Available
                    }`}
                    title={seatNumber}
                  >
                    VIP{col + 1}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-3 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-300 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-300 rounded"></div>
              <span>Reserved</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-300 rounded"></div>
              <span>Restored</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
