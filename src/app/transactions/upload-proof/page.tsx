"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { events } from "@/lib/data";
import Navbar from "@/components/event-browsing/navbar";
import Footer from "@/components/event-browsing/footer";

interface UploadProofData {
  eventSlug: string;
  qtyA: number;
  qtyB: number;
  total: number;
  method: string;
  bank?: string;
  orderId: string;
}

interface FileUpload {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  preview?: string;
  uploadProgress: number;
  status: "uploading" | "success" | "error";
}

export default function UploadProofPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get data from URL parameters
  const eventSlug = searchParams.get("event");
  const qtyA = parseInt(searchParams.get("qtyA") || "0");
  const qtyB = parseInt(searchParams.get("qtyB") || "0");
  const total = parseInt(searchParams.get("total") || "0");
  const method = searchParams.get("method") || "unknown";
  const bank = searchParams.get("bank") || "";

  const [event, setEvent] = useState<any>(null);
  const [uploadData, setUploadData] = useState<UploadProofData | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<FileUpload[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadNote, setUploadNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (eventSlug) {
      const foundEvent = events.find(
        (e) => e.title.toLowerCase().replace(/\s+/g, "-") === eventSlug
      );
      setEvent(foundEvent);

      // Generate order ID
      const orderId = `ORD-${Date.now()}-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}`;

      setUploadData({
        eventSlug,
        qtyA,
        qtyB,
        total,
        method,
        bank,
        orderId,
      });
    }
  }, [eventSlug, qtyA, qtyB, total, method, bank]);

  if (!event || !uploadData) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Data tidak ditemukan
            </h1>
            <Link
              href="/event-browsing"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
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

  // Handle file selection
  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: FileUpload[] = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : undefined,
      uploadProgress: 0,
      status: "uploading",
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
    setIsUploading(true);

    // Simulate upload progress
    newFiles.forEach((fileUpload, index) => {
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileUpload.id
              ? { ...f, uploadProgress: Math.min(f.uploadProgress + 10, 100) }
              : f
          )
        );

        if (fileUpload.uploadProgress >= 100) {
          clearInterval(interval);
          setUploadedFiles((prev) =>
            prev.map((f) =>
              f.id === fileUpload.id ? { ...f, status: "success" as const } : f
            )
          );
        }
      }, 200);
    });

    setTimeout(() => setIsUploading(false), 2000);
  };

  // Handle drag and drop
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  // Remove file
  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  // Submit proof
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFiles.length === 0) {
      alert("Silakan upload minimal satu bukti pembayaran");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      router.push(
        `/transactions/payment-status?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}&method=${method}&bank=${bank}&status=processing`
      );
    }, 2000);
  };

  // Supported file types
  const supportedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const maxFileSize = 10 * 1024 * 1024; // 10MB

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/event-browsing"
              className="hover:text-purple-600 transition-colors"
            >
              Events
            </Link>
            <span className="text-gray-400">›</span>
            <Link
              href={`/events/${eventSlug}`}
              className="hover:text-purple-600 transition-colors"
            >
              {event.title}
            </Link>
            <span className="text-gray-400">›</span>
            <Link
              href={`/transactions/checkout?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}`}
              className="hover:text-purple-600 transition-colors"
            >
              Checkout
            </Link>
            <span className="text-gray-400">›</span>
            <Link
              href={`/transactions/payment?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`}
              className="hover:text-purple-600 transition-colors"
            >
              Payment
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-purple-600 font-medium">Upload Proof</span>
          </nav>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full mb-6 shadow-lg">
            <span className="text-4xl">📤</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            Upload Bukti Pembayaran
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload bukti pembayaran Anda untuk mempercepat proses verifikasi
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Area */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Upload Bukti Pembayaran
              </h3>

              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="text-6xl mb-4">📁</div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {dragActive
                    ? "Lepaskan file di sini"
                    : "Drag & Drop file di sini"}
                </h4>
                <p className="text-gray-600 mb-4">
                  Atau klik tombol di bawah untuk memilih file
                </p>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                >
                  Pilih File
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
              </div>

              {/* File Requirements */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h5 className="font-semibold text-blue-800 mb-2">
                  📋 Persyaratan File:
                </h5>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Format: JPG, PNG, GIF, PDF, DOC, DOCX</li>
                  <li>• Ukuran maksimal: 10MB per file</li>
                  <li>• Minimal 1 file, maksimal 5 file</li>
                  <li>• File harus jelas dan mudah dibaca</li>
                </ul>
              </div>
            </div>

            {/* Uploaded Files */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-6">
                  File yang Diupload
                </h3>

                <div className="space-y-4">
                  {uploadedFiles.map((fileUpload) => (
                    <div
                      key={fileUpload.id}
                      className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg"
                    >
                      {/* File Icon */}
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        {fileUpload.type.startsWith("image/") ? "🖼️" : "📄"}
                      </div>

                      {/* File Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">
                          {fileUpload.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(fileUpload.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      {/* Upload Progress */}
                      <div className="flex items-center space-x-3">
                        {fileUpload.status === "uploading" && (
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${fileUpload.uploadProgress}%` }}
                            ></div>
                          </div>
                        )}

                        {fileUpload.status === "success" && (
                          <span className="text-green-600 text-sm">
                            ✅ Berhasil
                          </span>
                        )}

                        {fileUpload.status === "error" && (
                          <span className="text-red-600 text-sm">❌ Error</span>
                        )}
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFile(fileUpload.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Catatan Tambahan
              </h3>
              <textarea
                value={uploadNote}
                onChange={(e) => setUploadNote(e.target.value)}
                placeholder="Tambahkan catatan atau instruksi khusus untuk admin (opsional)"
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || uploadedFiles.length === 0}
                className="w-full max-w-md py-4 px-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-bold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg shadow-purple-200 hover:shadow-purple-300 transform hover:scale-105"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Mengirim Bukti Pembayaran...</span>
                  </div>
                ) : (
                  "📤 Kirim Bukti Pembayaran"
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Ringkasan Pesanan
              </h3>

              {/* Event Info */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">
                  {event.title}
                </h4>
                <p className="text-sm text-gray-600">📅 {event.date}</p>
                <p className="text-sm text-gray-600">📍 {event.location}</p>
              </div>

              {/* Ticket Details */}
              <div className="space-y-3 mb-4">
                {qtyA > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      CAT 1 (Regular): {qtyA} × Rp{" "}
                      {priceCat1.toLocaleString("id-ID")}
                    </span>
                    <span className="text-gray-800">
                      Rp {(qtyA * priceCat1).toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
                {qtyB > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      CAT 2 (VIP): {qtyB} × Rp{" "}
                      {priceCat2.toLocaleString("id-ID")}
                    </span>
                    <span className="text-gray-800">
                      Rp {(qtyB * priceCat2).toLocaleString("id-ID")}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                  <span className="text-gray-600">Biaya Layanan</span>
                  <span className="text-gray-800">
                    Rp {serviceFee.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                  <span>Total Pembayaran</span>
                  <span className="text-purple-600">
                    Rp {calculatedTotal.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-purple-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-purple-800 mb-2">
                  Metode Pembayaran
                </h4>
                <p className="text-purple-700 capitalize">{method}</p>
                {bank && (
                  <p className="text-purple-700 text-sm mt-1">
                    Bank: {bank.toUpperCase()}
                  </p>
                )}
              </div>

              {/* Order ID */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Order ID</h4>
                <p className="font-mono text-sm text-gray-600">
                  {uploadData.orderId}
                </p>
              </div>
            </div>

            {/* Upload Tips */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-6 mt-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <div>
                  <p className="font-semibold text-green-800 mb-2">
                    Tips Upload
                  </p>
                  <div className="space-y-2 text-sm text-green-700">
                    <p>• Pastikan bukti pembayaran jelas</p>
                    <p>• Tampilkan nominal dan tanggal</p>
                    <p>• Upload dari berbagai sumber (PC, HP, dll)</p>
                    <p>• Tunggu konfirmasi dari admin</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href={`/transactions/payment?event=${eventSlug}&qtyA=${qtyA}&qtyB=${qtyB}&total=${total}`}
            className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-600 transition-all duration-300 text-center"
          >
            ← Kembali ke Payment
          </Link>

          <Link
            href={`/events/${eventSlug}`}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 text-center"
          >
            Lihat Detail Event
          </Link>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-2xl p-6 mt-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">❓</span>
            </div>
            <div>
              <p className="font-semibold text-purple-800 mb-2">
                Butuh Bantuan?
              </p>
              <p className="text-purple-700 text-sm leading-relaxed mb-3">
                Jika Anda mengalami masalah dalam upload bukti pembayaran,
                silakan hubungi customer service kami.
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
