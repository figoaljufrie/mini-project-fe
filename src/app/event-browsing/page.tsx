"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/event-browsing/navbar";
import Footer from "@/components/event-browsing/footer";
import EventList from "@/components/event-browsing/event-list";
import EventFilter from "@/components/event-browsing/event-filter";
import SearchBar from "@/components/layout/search-bar";
import { events as rawEvents } from "@/lib/data";

const demoEvents = rawEvents.map((e) => ({
  title: e.title,
  // tampilkan tanggal dalam format yang simple (YYYY-MM-DD)
  date: e.date,
  location: e.location,
  price: `Rp ${e.price.toLocaleString("id-ID")}`,
  image: e.image,
  organizer: "EventFinder",
}));

export default function EventsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const categories = useMemo(() => {
    const set = new Set<string>();
    rawEvents.forEach((e) => set.add(e.category));
    return Array.from(set);
  }, []);

  const locations = useMemo(() => {
    const set = new Set<string>();
    rawEvents.forEach((e) => set.add(e.location));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const out = demoEvents.filter((e, idx) => {
      const source = rawEvents[idx];
      const matchCategory = category === "All" || source.category === category;
      const matchLocation = location === "All" || source.location === location;
      const q = query.trim().toLowerCase();
      const matchQuery =
        q === "" ||
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q);
      return matchCategory && matchLocation && matchQuery;
    });
    return out;
  }, [query, category, location]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="px-6 pt-6 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto rounded-2xl p-5 sm:p-6 backdrop-blur-md">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Discover Event</h1>
            <div className="flex w-full flex-col sm:flex-row gap-3 sm:items-center sm:justify-center">
              <SearchBar onSearch={setQuery} className="w-full sm:w-[28rem] border-transparent" />
              <div className="flex gap-3 justify-center w-full sm:w-auto">
                <EventFilter value={category} onChange={(v) => { setCategory(v); setPage(1); }} categories={categories} className="category-select" />
                <EventFilter value={location} onChange={(v) => { setLocation(v); setPage(1); }} categories={locations} className="category-select" />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6" />

        {paged.length > 0 ? (
          <>
            <EventList events={paged} />
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </button>
              <span className="text-sm text-gray-300">
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-700 hover:to-indigo-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Berikutnya
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-gray-700 rounded-xl">
            <img src="/window.svg" alt="No results" className="w-20 h-20 opacity-60 mb-4" />
            <p className="text-lg font-semibold">Belum ada event yang cocok</p>
            <p className="text-sm text-gray-400 mt-1">Coba ubah kata kunci, lokasi, atau kategori.</p>
          </div>
        )}
      </section>

      <div className="mt-10">
        <Footer />
      </div>
    </main>
  );
}