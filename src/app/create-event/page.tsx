"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/landing-page/navbar";
import Footer from "@/components/landing-page/footer";

export default function BuatEventPage() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [locations, setLocations] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [category, setCategory] = useState("Musik");
  const [description, setDescription] = useState("");
  const [thumbnailName, setThumbnailName] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const summary = [
      `Judul: ${title}`,
      `Kategori: ${category}`,
      `Lokasi: ${locations.join(", ") || "-"}`,
      `Rentang Tanggal: ${startDate || "-"} s/d ${endDate || "-"}`,
      `Waktu: ${startTime || "-"} - ${endTime || "-"}`,
      `Harga: ${price || "-"}`,
      `Thumbnail: ${thumbnailName || "-"}`,
      `Deskripsi: ${description ? description.slice(0, 80) + (description.length > 80 ? "..." : "") : "-"}`,
    ].join("\n");
    alert(`Event disimpan (mock)\n\n${summary}`);
  };

  const addLocation = () => {
    if (!newLocation.trim()) return;
    if (!locations.includes(newLocation.trim())) {
      setLocations([...locations, newLocation.trim()]);
    }
    setNewLocation("");
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold">Create Event</h1>
          <Link href="/event-browsing" className="text-sm text-gray-300 hover:underline">Lihat semua event</Link>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900/80 backdrop-blur rounded-2xl border border-gray-800 p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Form fields */}
            <div className="lg:col-span-2 space-y-5">
              <div>
                <label className="block text-sm mb-1">Title<span className="text-red-500"> *</span></label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-1">Category<span className="text-red-500"> *</span></label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0">
                    <option>Musik</option>
                    <option>Teknologi</option>
                    <option>Hiburan</option>
                    <option>Seni</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm mb-1">Locations<span className="text-red-500"> *</span></label>
                  <div className="flex gap-2">
                    <input value={newLocation} onChange={(e) => setNewLocation(e.target.value)} placeholder="Tambah lokasi" className="flex-1 rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" />
                    <button type="button" onClick={addLocation} className="px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-medium hover:from-indigo-500 hover:to-purple-500 transition">Add</button>
                  </div>
                  {locations.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {locations.map((loc) => (
                        <span key={loc} className="px-2.5 py-1 rounded-full bg-gray-800 border border-gray-700 text-xs">{loc}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Select date range<span className="text-red-500"> *</span></label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
                  <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-1">Start time<span className="text-red-500"> *</span></label>
                  <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
                </div>
                <div>
                  <label className="block text-sm mb-1">End time<span className="text-red-500"> *</span></label>
                  <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm mb-1">Harga (Rp)</label>
                  <input type="number" min={0} value={price as number | undefined} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} className="w-full rounded-xl bg-black border border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" />
                </div>
              </div>
            </div>

            {/* Right: Thumbnail & Description */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm mb-2">Thumbnail<span className="text-red-500"> *</span></label>
                <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-gray-700 bg-black/60 p-6 text-center hover:border-purple-500 transition">
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const file = e.target.files?.[0];
                    setThumbnailName(file ? file.name : null);
                  }} />
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">Upload files</div>
                    <div className="text-xs text-gray-500">{thumbnailName ? thumbnailName : "0 files uploaded so far."}</div>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm mb-2">Description<span className="text-red-500"> *</span></label>
                {/* Simple toolbar (visual) */}
                <div className="flex items-center gap-2 bg-black border border-gray-700 rounded-t-xl px-3 py-2 text-sm">
                  <select className="bg-transparent outline-none">
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                    <option>Paragraph</option>
                  </select>
                  <div className="h-4 w-px bg-gray-700" />
                  <button type="button" className="px-2 py-1 rounded border border-gray-700 hover:border-purple-500">B</button>
                  <button type="button" className="px-2 py-1 rounded border border-gray-700 hover:border-purple-500">I</button>
                  <button type="button" className="px-2 py-1 rounded border border-gray-700 hover:border-purple-500">•</button>
                </div>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full min-h-[180px] rounded-b-xl bg-black border border-t-0 border-gray-700 px-3 py-2 focus:border-purple-500 focus:ring-0" placeholder="Tulis deskripsi event..." required />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button type="submit" className="relative inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white transition transform hover:scale-[1.02] focus:outline-none bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-lg shadow-purple-800/20">
              <span className="relative z-10">Simpan Event</span>
              <span className="absolute inset-0 rounded-xl blur opacity-30 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-pulse" />
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </main>
  );
}


