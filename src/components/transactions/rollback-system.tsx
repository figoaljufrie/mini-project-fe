"use client";

import { useState, useEffect } from "react";

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

interface RollbackSystemProps {
  rollbackData: RollbackData;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export default function RollbackSystem({
  rollbackData,
  isProcessing,
  setIsProcessing,
}: RollbackSystemProps) {
  const [rollbackProgress, setRollbackProgress] = useState({
    points: 0,
    voucher: 0,
    coupon: 0,
    overall: 0,
  });
  const [rollbackStatus, setRollbackStatus] = useState({
    points: "pending",
    voucher: "pending",
    coupon: "pending",
    overall: "pending",
  });
  const [estimatedTime, setEstimatedTime] = useState(24); // hours

  // Simulate rollback process
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setRollbackProgress((prev) => {
          const newProgress = {
            points: Math.min(prev.points + Math.random() * 15, 100),
            voucher: Math.min(prev.voucher + Math.random() * 20, 100),
            coupon: Math.min(prev.coupon + Math.random() * 25, 100),
            overall: Math.min(prev.overall + Math.random() * 10, 100),
          };

          // Update status when progress reaches 100%
          if (
            newProgress.points >= 100 &&
            rollbackStatus.points === "pending"
          ) {
            setRollbackStatus((prev) => ({ ...prev, points: "completed" }));
          }
          if (
            newProgress.voucher >= 100 &&
            rollbackStatus.voucher === "pending"
          ) {
            setRollbackStatus((prev) => ({ ...prev, voucher: "completed" }));
          }
          if (
            newProgress.coupon >= 100 &&
            rollbackStatus.coupon === "pending"
          ) {
            setRollbackStatus((prev) => ({ ...prev, coupon: "completed" }));
          }
          if (
            newProgress.overall >= 100 &&
            rollbackStatus.overall === "pending"
          ) {
            setRollbackStatus((prev) => ({ ...prev, overall: "completed" }));
            setIsProcessing(false);
          }

          return newProgress;
        });

        setEstimatedTime((prev) => Math.max(prev - 0.1, 0));
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isProcessing, rollbackStatus, setIsProcessing]);

  const startRollback = () => {
    setIsProcessing(true);
    setRollbackProgress({ points: 0, voucher: 0, coupon: 0, overall: 0 });
    setRollbackStatus({
      points: "pending",
      voucher: "pending",
      coupon: "pending",
      overall: "pending",
    });
    setEstimatedTime(24);
  };

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

  return (
    <div className="space-y-6">
      {/* Rollback Overview */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Sistem Rollback Otomatis
          </h3>
          {!isProcessing && rollbackStatus.overall === "pending" && (
            <button
              onClick={startRollback}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all duration-300"
            >
              🚀 Mulai Rollback
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Points Rollback */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-blue-800">Poin</h4>
              <span className="text-2xl">
                {getStatusIcon(rollbackStatus.points)}
              </span>
            </div>
            <div className="text-center mb-3">
              <div className="text-2xl font-bold text-blue-700">
                {rollbackData.pointsUsed.toLocaleString("id-ID")}
              </div>
              <p className="text-sm text-blue-600">
                Poin yang akan dikembalikan
              </p>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                  rollbackStatus.points
                )}`}
                style={{ width: `${rollbackProgress.points}%` }}
              ></div>
            </div>
            <p
              className={`text-xs mt-2 text-center ${getStatusColor(
                rollbackStatus.points
              )}`}
            >
              {rollbackStatus.points === "completed"
                ? "Dikembalikan"
                : rollbackStatus.points === "processing"
                ? "Sedang diproses"
                : "Menunggu"}
            </p>
          </div>

          {/* Voucher Rollback */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-purple-800">Voucher</h4>
              <span className="text-2xl">
                {getStatusIcon(rollbackStatus.voucher)}
              </span>
            </div>
            <div className="text-center mb-3">
              <div className="text-lg font-bold text-purple-700">
                {rollbackData.voucherUsed || "Tidak ada"}
              </div>
              <p className="text-sm text-purple-600">
                Voucher yang akan dikembalikan
              </p>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                  rollbackStatus.voucher
                )}`}
                style={{ width: `${rollbackProgress.voucher}%` }}
              ></div>
            </div>
            <p
              className={`text-xs mt-2 text-center ${getStatusColor(
                rollbackStatus.voucher
              )}`}
            >
              {rollbackStatus.voucher === "completed"
                ? "Dikembalikan"
                : rollbackStatus.voucher === "processing"
                ? "Sedang diproses"
                : "Menunggu"}
            </p>
          </div>

          {/* Coupon Rollback */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-green-800">Kupon</h4>
              <span className="text-2xl">
                {getStatusIcon(rollbackStatus.coupon)}
              </span>
            </div>
            <div className="text-center mb-3">
              <div className="text-lg font-bold text-green-700">
                {rollbackData.couponUsed || "Tidak ada"}
              </div>
              <p className="text-sm text-green-600">
                Kupon yang akan dikembalikan
              </p>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(
                  rollbackStatus.coupon
                )}`}
                style={{ width: `${rollbackProgress.coupon}%` }}
              ></div>
            </div>
            <p
              className={`text-xs mt-2 text-center ${getStatusColor(
                rollbackStatus.coupon
              )}`}
            >
              {rollbackStatus.coupon === "completed"
                ? "Dikembalikan"
                : rollbackStatus.coupon === "processing"
                ? "Sedang diproses"
                : "Menunggu"}
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-gray-800">
              Progress Keseluruhan
            </h4>
            <span className="text-2xl">
              {getStatusIcon(rollbackStatus.overall)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(
                rollbackStatus.overall
              )}`}
              style={{ width: `${rollbackProgress.overall}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">
              {Math.round(rollbackProgress.overall)}% Selesai
            </span>
            <span className="text-sm text-gray-600">
              ⏰ {Math.round(estimatedTime)} jam tersisa
            </span>
          </div>
        </div>
      </div>

      {/* Rollback Details */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Detail Rollback
        </h3>

        <div className="space-y-4">
          {/* Points Details */}
          <div className="border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800">Poin Reward</h4>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  rollbackStatus.points === "completed"
                    ? "bg-green-100 text-green-800"
                    : rollbackStatus.points === "processing"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {rollbackStatus.points === "completed"
                  ? "Dikembalikan"
                  : rollbackStatus.points === "processing"
                  ? "Sedang Diproses"
                  : "Menunggu"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Poin yang digunakan:</span>
                <span className="font-medium ml-2">
                  {rollbackData.pointsUsed.toLocaleString("id-ID")}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Nilai poin:</span>
                <span className="font-medium ml-2">
                  Rp {(rollbackData.pointsUsed * 100).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Poin akan dikembalikan ke akun Anda dalam 24 jam
            </p>
          </div>

          {/* Voucher Details */}
          {rollbackData.voucherUsed && (
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">Voucher</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    rollbackStatus.voucher === "completed"
                      ? "bg-green-100 text-green-800"
                      : rollbackStatus.voucher === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {rollbackStatus.voucher === "completed"
                    ? "Dikembalikan"
                    : rollbackStatus.voucher === "processing"
                    ? "Sedang Diproses"
                    : "Menunggu"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Kode voucher:</span>
                  <span className="font-medium ml-2">
                    {rollbackData.voucherUsed}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Nilai voucher:</span>
                  <span className="font-medium ml-2">Rp 50.000</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Voucher akan dikembalikan dan dapat digunakan kembali
              </p>
            </div>
          )}

          {/* Coupon Details */}
          {rollbackData.couponUsed && (
            <div className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-800">Kupon Diskon</h4>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    rollbackStatus.coupon === "completed"
                      ? "bg-green-100 text-green-800"
                      : rollbackStatus.coupon === "processing"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {rollbackStatus.coupon === "completed"
                    ? "Dikembalikan"
                    : rollbackStatus.coupon === "processing"
                    ? "Sedang Diproses"
                    : "Menunggu"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Kode kupon:</span>
                  <span className="font-medium ml-2">
                    {rollbackData.couponUsed}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Diskon:</span>
                  <span className="font-medium ml-2">20%</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Kupon akan dikembalikan dan dapat digunakan kembali
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Rollback Timeline */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Timeline Rollback
        </h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">1</span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">
                Transaksi dibatalkan/expired
              </p>
              <p className="text-sm text-gray-600">
                Sistem otomatis memulai proses rollback
              </p>
            </div>
            <span className="text-green-600">✅</span>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                rollbackStatus.points === "completed"
                  ? "bg-green-100"
                  : "bg-blue-100"
              }`}
            >
              <span
                className={`text-sm ${
                  rollbackStatus.points === "completed"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                2
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">
                Pengembalian poin reward
              </p>
              <p className="text-sm text-gray-600">
                Poin dikembalikan ke akun user
              </p>
            </div>
            <span
              className={
                rollbackStatus.points === "completed"
                  ? "text-green-600"
                  : "text-blue-600"
              }
            >
              {rollbackStatus.points === "completed" ? "✅" : "🔄"}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                rollbackStatus.voucher === "completed"
                  ? "bg-green-100"
                  : "bg-blue-100"
              }`}
            >
              <span
                className={`text-sm ${
                  rollbackStatus.voucher === "completed"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                3
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Pengembalian voucher</p>
              <p className="text-sm text-gray-600">
                Voucher dikembalikan ke akun user
              </p>
            </div>
            <span
              className={
                rollbackStatus.voucher === "completed"
                  ? "text-green-600"
                  : "text-blue-600"
              }
            >
              {rollbackStatus.voucher === "completed" ? "✅" : "🔄"}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                rollbackStatus.coupon === "completed"
                  ? "bg-green-100"
                  : "bg-blue-100"
              }`}
            >
              <span
                className={`text-sm ${
                  rollbackStatus.coupon === "completed"
                    ? "text-green-600"
                    : "text-blue-600"
                }`}
              >
                4
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Pengembalian kupon</p>
              <p className="text-sm text-gray-600">
                Kupon dikembalikan ke akun user
              </p>
            </div>
            <span
              className={
                rollbackStatus.coupon === "completed"
                  ? "text-green-600"
                  : "text-blue-600"
              }
            >
              {rollbackStatus.coupon === "completed" ? "✅" : "🔄"}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                rollbackStatus.overall === "completed"
                  ? "bg-green-100"
                  : "bg-gray-100"
              }`}
            >
              <span
                className={`text-sm ${
                  rollbackStatus.overall === "completed"
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                5
              </span>
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">Proses selesai</p>
              <p className="text-sm text-gray-600">
                Email konfirmasi dikirim ke user
              </p>
            </div>
            <span
              className={
                rollbackStatus.overall === "completed"
                  ? "text-green-600"
                  : "text-gray-600"
              }
            >
              {rollbackStatus.overall === "completed" ? "✅" : "⏳"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
